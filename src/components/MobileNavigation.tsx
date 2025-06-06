'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'
import { useState } from 'react'
import { navItems } from '@/src/constants'
import FileUploader from './FileUploader'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { signOutUser } from '@/src/lib/actions/user.action'
import LogOutIcon from '@/src/assets/icons/logout.svg'
import Logo from '@/src/assets/icons/logo-full-brand.svg'

interface Props {
  $id: string
  accountId: string
  fullName: string
  avatar: string
  email: string
}

const MobileNavigation = ({ $id: ownerId, accountId, fullName, avatar, email }: Props) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className='mobile-header'>
      <Logo className='fill-brand scale-90' />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image src='/assets/icons/menu.svg' alt='Search' width={30} height={30} />
        </SheetTrigger>
        <SheetContent className='shad-sheet h-screen px-3'>
          <SheetTitle>
            <div className='header-user'>
              <Image
                src={avatar}
                alt='avatar'
                width={44}
                height={44}
                className='header-user-avatar'
              />
              <div className='sm:hidden lg:block'>
                <p className='subtitle-2 capitalize'>{fullName}</p>
                <p className='caption'>{email}</p>
              </div>
            </div>
            <Separator className='mb-4 bg-light-200/20' />
          </SheetTitle>
          <nav className='mobile-nav'>
            <ul className='mobile-nav-list'>
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className='lg:w-full'>
                  <li className={cn('mobile-nav-item', pathname === url && 'shad-active')}>
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn('nav-icon', pathname === url && 'nav-icon-active')}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className='my-5 bg-light-200/20' />
          <div className='flex flex-col justify-between gap-5 pb-5'>
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type='submit'
              className='mobile-sign-out-button'
              onClick={async () => await signOutUser()}
            >
              <LogOutIcon className='stroke-brand scale-150' />
              <p>Logout</p>
            </Button>
          </div>
          <SheetDescription>{''}</SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation
