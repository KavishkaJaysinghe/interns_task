import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'

// Mock window.matchMedia used in dark mode detection
beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    }
  }
})

describe('App', () => {
  it('renders header and footer', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()   // Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
  })

  it('renders dashboard by default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  })

  it('renders completed page on route "/completed"', () => {
    render(
      <MemoryRouter initialEntries={['/completed']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/completed/i)).toBeInTheDocument()
  })

  it('renders about page on route "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })
})
