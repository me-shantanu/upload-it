import { render, screen, fireEvent } from '@testing-library/react'
import { FileDetails, ShareInput } from '@/src/components/ActionsModalContent'
import { Models } from 'node-appwrite'

const mockFile = {
  $id: '123',
  name: 'test-file.pdf',
  extension: 'pdf',
  size: 1024000,
  owner: { fullName: 'John Doe' },
  users: ['user1@example.com', 'user2@example.com'],
  $createdAt: '2025-04-02T12:00:00Z',
  $updatedAt: '2025-04-02T12:30:00Z',
} as unknown as Models.Document

describe('FileDetails Component', () => {
  it('renders file details correctly', () => {
    render(<FileDetails file={mockFile} />)
    expect(screen.getByText('test-file.pdf')).toBeInTheDocument()
    expect(screen.getByText('pdf')).toBeInTheDocument()
    expect(screen.getByText('Owner:')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

describe('ShareInput Component', () => {
  it('renders shared users correctly', () => {
    render(<ShareInput file={mockFile} onInputChange={jest.fn()} onRemove={jest.fn()} />)
    expect(screen.getByText('user1@example.com')).toBeInTheDocument()
    expect(screen.getByText('user2@example.com')).toBeInTheDocument()
  })

  it('calls onInputChange when input is changed', () => {
    const mockOnInputChange = jest.fn()
    render(<ShareInput file={mockFile} onInputChange={mockOnInputChange} onRemove={jest.fn()} />)
    const input = screen.getByPlaceholderText('Enter email address')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(mockOnInputChange).toHaveBeenCalledWith(['test@example.com'])
  })

  it('calls onRemove when remove button is clicked', () => {
    const mockOnRemove = jest.fn()
    render(<ShareInput file={mockFile} onInputChange={jest.fn()} onRemove={mockOnRemove} />)
    const removeButtons = screen.getAllByAltText('Remove')
    fireEvent.click(removeButtons[0])
    expect(mockOnRemove).toHaveBeenCalledWith('user1@example.com')
  })
})
