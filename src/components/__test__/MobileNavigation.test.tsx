import { render, screen, fireEvent } from '@testing-library/react'
import MobileNavigation from '@/src/components/MobileNavigation'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))
jest.mock('@/components/FileUploader', () => () => (
  <div data-testid='file-uploader'>MockUploader</div>
))
jest.mock('@/lib/actions/user.action', () => ({
  signOutUser: jest.fn(),
}))
jest.mock('@/assets/icons/logo-full-brand.svg', () => () => <svg data-testid='logo-icon' />)

describe('MobileNavigation', () => {
  const mockProps = {
    $id: 'user123',
    accountId: 'acc456',
    fullName: 'Shantanu Mishra',
    avatar: '/avatar.png',
    email: 'shantanu@example.com',
  }

  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
  })

  it('renders file uploader and logout button when menu is opened', () => {
    render(<MobileNavigation {...mockProps} />)

    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)

    expect(screen.getByTestId('file-uploader')).toBeInTheDocument()
  })

  it('renders user info when menu is opened', () => {
    render(<MobileNavigation {...mockProps} />)

    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)

    expect(screen.getByText(mockProps.fullName)).toBeInTheDocument()
    expect(screen.getByText(mockProps.email)).toBeInTheDocument()
  })
})
