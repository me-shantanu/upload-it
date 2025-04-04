import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AuthForm from '@/src/components/AuthForm'
import { createAccount, signInUser } from '@/src/lib/actions/user.action'

jest.mock('@/lib/actions/user.action', () => ({
  createAccount: jest.fn(),
  signInUser: jest.fn(),
}))

describe('AuthForm Component', () => {
  test('renders Sign Up form correctly', () => {
    render(<AuthForm type='sign-up' />)

    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
  })

  test('renders Sign In form correctly', () => {
    render(<AuthForm type='sign-in' />)

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
  })

  test('calls createAccount on Sign Up form submission', async () => {
    ;(createAccount as jest.Mock).mockResolvedValue({ accountId: '12345' })

    render(<AuthForm type='sign-up' />)

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'johndoe@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(createAccount).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'johndoe@example.com',
      })
    })
  })

  test('calls signInUser on Sign In form submission', async () => {
    ;(signInUser as jest.Mock).mockResolvedValue({ accountId: '67890' })

    render(<AuthForm type='sign-in' />)

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'johndoe@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(signInUser).toHaveBeenCalledWith({ email: 'johndoe@example.com' })
    })
  })

  test('displays error message on authentication failure', async () => {
    ;(createAccount as jest.Mock).mockRejectedValue(new Error('Failed to create account'))

    render(<AuthForm type='sign-up' />)

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'johndoe@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(screen.getByText(/failed to create account/i)).toBeInTheDocument()
    })
  })
})
