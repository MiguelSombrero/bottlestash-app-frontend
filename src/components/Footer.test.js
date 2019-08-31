import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Footer from './Footer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<Footer />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Footer />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Home')
    expect(component.container).toHaveTextContent('About')
    expect(component.container).toHaveTextContent('Github')
    expect(component.container).toHaveTextContent('Miika Somero 2019')
  })

  test('home link render correctly', () => {
    const home = component.getByText('Home')
    expect(home.href).toBe('http://localhost/')
  })

  test('about link render correctly', () => {
    const about = component.getByText('About')
    expect(about.href).toBe('http://localhost/about')
  })

  test('github link render correctly', () => {
    const github = component.getByText('Github')
    expect(github.href).toBe('https://github.com/MiguelSombrero/bottlestash-app-backend')
  })
})