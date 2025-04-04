import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Search from '../Search'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { getFiles } from '@/src/lib/actions/file.actions'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('@/lib/actions/file.actions', () => ({
  getFiles: jest.fn(),
}))

jest.mock('@/components/Thumbnail', () => (props: any) => (
  <div data-testid='thumbnail' {...props}>
    Mock Thumbnail
  </div>
))

jest.mock('@/components/FormattedDateTime', () => (props: any) => (
  <p data-testid='formatted-date'>{props.date}</p>
))

const mockPush = jest.fn()

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: () => '',
      toString: () => '',
    })
  })

  it('renders the search input', () => {
    render(<Search />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('shows search results when query is entered', async () => {
    const mockFiles = {
      documents: [
        {
          $id: '1',
          name: 'Test File',
          type: 'image',
          extension: 'png',
          url: 'http://example.com/file.png',
          $createdAt: '2024-01-01',
        },
      ],
    }

    ;(getFiles as jest.Mock).mockResolvedValueOnce(mockFiles)

    render(<Search />)

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'test' },
    })

    await waitFor(() => {
      expect(screen.getByText('Test File')).toBeInTheDocument()
      expect(screen.getByTestId('thumbnail')).toBeInTheDocument()
      expect(screen.getByTestId('formatted-date')).toHaveTextContent('2024-01-01')
    })
  })

  it('shows empty result message if no files found', async () => {
    ;(getFiles as jest.Mock).mockResolvedValueOnce({ documents: [] })

    render(<Search />)

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'nothing' },
    })

    await waitFor(() => {
      expect(screen.getByText('No files found')).toBeInTheDocument()
    })
  })
})
