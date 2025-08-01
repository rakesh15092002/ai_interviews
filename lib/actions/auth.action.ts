'use server'

import { auth, db } from "@/firebase/admin";
import { error } from "console";
import { cookies } from "next/headers";
import { success } from "zod";

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead',
      };
    }

    await db.collection('users').doc(uid).set({ name, email });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (e: any) {
    console.log('Error creating a user', e);
    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use.',
      };
    }
    return {
      success: false,
      message: 'Failed to create an account',
    };
  }
}


export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Create an account instead.',
      };
    }

    // ✅ Set session cookie after user is verified
    await setSessionCookie(idToken);

    return {
      success: true,
      message: 'Successfully signed in.',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Failed to log into an account',
    };
  }
}

export async function setSessionCookie(idToken:string) {
    const cookieStore  = await cookies();

    const sessionCookies = await auth.createSessionCookie(idToken,{
        expiresIn:60*60*24*7*100, // one week 

    })

    cookieStore.set('session',sessionCookies,{
        maxAge:60*60*24*7*100,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path:'/',
        sameSite:'lax'
    })
}

export async function getCurrentUser():Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookies = cookieStore.get('session')?.value;
    if(!sessionCookies) return null;
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookies,true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) return null;
        return {
            ...userRecord.data(),
            id:userRecord.id,

        } as  User;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;

    
}