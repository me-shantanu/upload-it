'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'
import { navItems } from '@/src/constants'
import { usePathname } from 'next/navigation'
import Logo from '@/src/assets/icons/logo-full-brand.svg'
import LogoMobile from '@/src/assets/icons/logo-brand.svg'

interface Props {
  fullName: string
  avatar: string
  email: string
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname()

  return (
    <aside className='sidebar'>
      <Link href='/'>
        <Logo className='fill-brand hidden h-auto lg:block' />
        <LogoMobile className='fill-brand lg:hidden' />
      </Link>

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li className={cn('sidebar-nav-item', pathname === url && 'shad-active')}>
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn('nav-icon', pathname === url && 'nav-icon-active')}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src='/assets/images/files-2.png'
        alt='logo'
        width={506}
        height={418}
        className='w-full'
        priority
      />
      <div className='sidebar-user-info'>
        <Image src={avatar} alt='Avatar' width={44} height={44} className='sidebar-user-avatar' />
        <div className='hidden lg:block'>
          <p className='subtitle-2 capitalize'>{fullName}</p>
          <p className='caption'>{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
