/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react'
import Header from '@/src/components/Header'

jest.mock('@/components/Search', () => () => <div data-testid='search-component' />)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock('@/components/FileUploader', () => ({ ownerId, accountId }: any) => (
  <div data-testid='file-uploader' data-owner={ownerId} data-account={accountId} />
))
jest.mock('@/lib/actions/user.action', () => ({
  signOutUser: jest.fn(),
}))
jest.mock('@/src/assets/icons/logout.svg', () => () => <svg data-testid='logout-icon' />)

describe('Header Component', () => {
  const userId = 'user1'
  const accountId = 'acc1'

  it('renders Search component', () => {
    render(<Header userId={userId} accountId={accountId} />)
    expect(screen.getByTestId('search-component')).toBeInTheDocument()
  })

  it('renders FileUploader with correct props', () => {
    render(<Header userId={userId} accountId={accountId} />)
    const uploader = screen.getByTestId('file-uploader')
    expect(uploader).toBeInTheDocument()
    expect(uploader.getAttribute('data-owner')).toBe(userId)
    expect(uploader.getAttribute('data-account')).toBe(accountId)
  })

  it('renders logout button and icon', () => {
    render(<Header userId={userId} accountId={accountId} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument()
  })
})
