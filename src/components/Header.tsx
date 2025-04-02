import Search from './Search'
import { Button } from './ui/button'
import FileUploader from './FileUploader'
import { signOutUser } from '@/src/lib/actions/user.action'
import LogOutIcon from '@/src/assets/icons/logout.svg'

const Header = ({ userId, accountId }: { userId: string; accountId: string }) => {
  return (
    <header className='header'>
      <Search />
      <div className='header-wrapper'>
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            'use server'
            await signOutUser()
          }}
        >
          <Button type='submit' className='sign-out-button'>
            <LogOutIcon className='stroke-brand scale-150' />
          </Button>
        </form>
      </div>
    </header>
  )
}

export default Header
