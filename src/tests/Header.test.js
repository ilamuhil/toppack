import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './../components/Header'
import { BrowserRouter } from 'react-router-dom'

describe('Header', () => {
  test('renders header text and link', () => {
    const headerText = 'Sample Header'
    const linkText = 'Sample Link'
    const linkPath = '/sample-link'

    render(
      <BrowserRouter>
        <Header
          headerText={headerText}
          linkText={linkText}
          linkPath={linkPath}
        />
      </BrowserRouter>
    )

    const headerElement = screen.getByText(headerText)
    expect(headerElement).toBeInTheDocument()
    const linkElement = screen.getByText(linkText)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement.getAttribute('href')).toBe(linkPath)
  })
})
