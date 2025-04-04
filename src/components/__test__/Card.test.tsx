/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from '../Card'
import { Models } from 'node-appwrite'

jest.mock('next/link', () => ({ children, ...props }: any) => {
  return <a {...props}>{children}</a>
})

jest.mock('@/components/Thumbnail', () => () => <div data-testid='thumbnail' />)
jest.mock('@/components/ActionDropdown', () => () => <div data-testid='action-dropdown' />)
jest.mock('@/components/FormattedDateTime', () => ({ date }: { date: any }) => (
  <div data-testid='formatted-date'>{date}</div>
))

jest.mock('@/lib/utils', () => ({
  convertFileSize: jest.fn(() => '10 MB'),
}))

describe('Card Component', () => {
  const mockFile: Models.Document = {
    $id: 'file123',
    $createdAt: '2024-04-01T12:00:00.000Z',
    name: 'Test File.pdf',
    url: 'https://example.com/file.pdf',
    type: 'pdf',
    extension: 'pdf',
    size: 10485760,
    owner: { fullName: 'John Doe' },
  } as unknown as Models.Document

  it('renders file details correctly', () => {
    render(<Card file={mockFile} />)

    expect(screen.getByText('Test File.pdf')).toBeInTheDocument()
    expect(screen.getByText('10 MB')).toBeInTheDocument()
    expect(screen.getByText('By: John Doe')).toBeInTheDocument()
  })

  it('renders child components', () => {
    render(<Card file={mockFile} />)

    expect(screen.getByTestId('thumbnail')).toBeInTheDocument()
    expect(screen.getByTestId('action-dropdown')).toBeInTheDocument()
    expect(screen.getByTestId('formatted-date')).toHaveTextContent('2024-04-01T12:00:00.000Z')
  })

  it('has the correct link to the file', async () => {
    render(<Card file={mockFile} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', mockFile.url)
    expect(link).toHaveAttribute('target', '_blank')

    await userEvent.click(link)
  })
})
