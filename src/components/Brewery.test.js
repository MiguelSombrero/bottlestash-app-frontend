import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Brewery from './Brewery'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

describe('<Brewery />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Brewery brewery={helper.brewery} />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Sonnisaari')
    expect(component.container).toHaveTextContent('Beers')
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('Vattu 5.8 %')
    expect(component.container).toHaveTextContent('Mulkero 6.7 %')
  })

  test('renders all beers', async () => {
    const beers = component.container.querySelectorAll('a')
    expect(beers.length).toBe(3)
  })

  test('beers link render correctly', () => {
    const beers = component.container.querySelectorAll('a')
    const links = [ beers[0].href, beers[1].href, beers[2].href ]
    expect(links).toContain('http://localhost/beers/5d4bc0527958a42219ca2034')
    expect(links).toContain('http://localhost/beers/1d4bc0527958a42219ca2034')
    expect(links).toContain('http://localhost/beers/8d4bc0527958a42219ca2034')
  })

})