import { ReactNode } from 'react'
import Header from '@/src/components/Header'
import Sidebar from '@/src/components/Sidebar'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/src/lib/actions/user.action'
import MobileNavigation from '@/src/components/MobileNavigation'
import { Toaster } from '@/src/components/ui/toaster'
import ColorSwitcher from '@/src/components/ColorSwitcher'

export const dynamic = 'force-dynamic'

const Layout = async ({ children }: { children: ReactNode }) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return redirect('/sign-in')
  return (
    <main className='flex h-screen'>
      <Sidebar {...currentUser} />
      <section className='flex h-full flex-1 flex-col relative'>
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <ColorSwitcher />
        <div className='main-content'>{children}</div>
      </section>
      <Toaster />
    </main>
  )
}

export default Layout
