/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from '@testing-library/react'
import AuthLotties from '../AuthLotties'

jest.mock('next/dynamic', () => () => {
  const Component = require('react-lottie-player').default
  return Component
})

jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: () => <div data-testid='lottie-player'>Mock Lottie</div>,
}))

describe('AuthLotties Component', () => {
  it('renders Lottie animation with correct props', () => {
    render(<AuthLotties />)

    const lottie = screen.getByTestId('lottie-player')
    expect(lottie).toBeInTheDocument()
  })
})
