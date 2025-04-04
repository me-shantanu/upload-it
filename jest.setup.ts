import '@testing-library/jest-dom'
import { TextEncoder } from 'util'

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

global.Request = Request

global.TextEncoder = TextEncoder

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}))

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
