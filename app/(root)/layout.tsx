import Link from 'next/link' // ✅ Corrected import
import Image from 'next/image'
import { ReactNode } from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';

const RootLayout = async({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated) redirect('/sign-in');
  return (

    <div className='root-layout min-h-screen flex flex-col'>
      <nav className='flex items-center gap-3 px-6 py-4 shadow-md]'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src="/logo.svg" alt='Logo' width={38} height={32} />
          <h2 className='text-primary-100'>PrepWise</h2>
        </Link>
      </nav>

      <main className='flex-1 px-6 py-4'>
        {children}
      </main>
    </div>
  )
}

export default RootLayout
