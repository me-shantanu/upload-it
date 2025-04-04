import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ColorSwitcher from '../ColorSwitcher'

describe('ColorSwitcher Component', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => '139, 92, 246')
    Storage.prototype.setItem = jest.fn()
  })

  it('renders and applies stored color', () => {
    render(<ColorSwitcher />)
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('brandColor')
    expect(document.documentElement.style.getPropertyValue('--brand-color')).toBe('139, 92, 246')
  })

  it('changes color on button click', async () => {
    render(<ColorSwitcher />)

    const settingsButton = screen.getByRole('button', { name: /open color switcher/i })
    fireEvent.click(settingsButton)

    await screen.findAllByRole('button')

    const colorButtons = screen.getAllByRole('button')
    expect(colorButtons.length).toBeGreaterThan(1)
    fireEvent.click(colorButtons[1])

    expect(Storage.prototype.setItem).toHaveBeenCalled()
  })
})
