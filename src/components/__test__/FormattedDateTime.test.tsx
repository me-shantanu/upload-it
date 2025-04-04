import { render, screen } from '@testing-library/react'
import FormattedDateTime from '@/src/components/FormattedDateTime'
import { formatDateTime } from '@/src/lib/utils'

describe('FormattedDateTime Component', () => {
  const testDate = '2024-01-15T14:30:00Z'

  it('renders the formatted date text', () => {
    const formatted = formatDateTime(testDate)

    render(<FormattedDateTime date={testDate} />)

    const dateElement = screen.getByText(formatted)
    expect(dateElement).toBeInTheDocument()
  })

  it('applies custom class names', () => {
    render(<FormattedDateTime date={testDate} className='custom-class' />)

    const element = screen.getByText(formatDateTime(testDate))
    expect(element).toHaveClass('custom-class')
    expect(element).toHaveClass('body-1')
    expect(element).toHaveClass('text-light-200')
  })
})
