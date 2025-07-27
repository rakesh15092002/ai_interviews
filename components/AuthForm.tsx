"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link"; // ✅ Fixed: Use next/link, not lucide-react
import { toast } from "sonner";
import FormFeild from "./FormFeild"; // ✅ Custom form field component
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

// Acceptable types for form variant
type FormType = "sign-in" | "sign-up";

// Validation schema based on type
const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Name too short")
        : z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Password too short"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type); // Dynamic schema based on form type

  // react-hook-form setup with Zod schema validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const {name,email,password} = values;
        const userCreadentials = await  createUserWithEmailAndPassword(auth,email,password);

        const result = await signUp({
          uid: userCreadentials.user.uid,
          name:name!,
          email,
          password,
        })
        if(!result.success){
          toast.error(result?.message)
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const {email,password} = values;
        const userCreadentials = await signInWithEmailAndPassword(auth,email,password);
        const idToken = await userCreadentials.user.getIdToken();

        if(!idToken){
          toast.error("Sign in failed");
          return ;
        }
        await  signIn({
          email,idToken
        })
        toast.success("Account Login successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-6 px-10">
        {/* Logo */}
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={34} width={38} />
          <h2 className="text-primary-100">InternPractice</h2>
        </div>

        <h3 className="flex justify-center items-center">
          Practise job interview with AI
        </h3>

        {/* Form wrapper from shadcn */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 mt-4 "
          >
            {/* Show name only in sign-up */}
            {!isSignIn && (
              <FormFeild
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
                type="text"
              />
            )}

            <FormFeild
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormFeild
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <div className="w-full flex justify-center">
              <Button className="btn-primary w-full" type="submit">
                {isSignIn ? "Sign in" : "Create an Account"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Bottom toggle link */}
        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
