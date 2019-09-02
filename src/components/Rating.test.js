import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Rating from './Rating'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

/**
 * doesn't test rendering of pictures, only does the src formed correctly
 */

describe('<Beer />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Rating rating={helper.rating} />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('brewery: Sonnisaari')
    expect(component.container).toHaveTextContent('wery delicate taste, with hints of chocolate. Liked!')
    expect(component.container).toHaveTextContent('by Miika Somero, a few seconds ago')
    expect(component.container).toHaveTextContent('aroma')
    expect(component.container).toHaveTextContent('taste')
    expect(component.container).toHaveTextContent('mouthfeel')
    expect(component.container).toHaveTextContent('appearance')
    expect(component.container).toHaveTextContent('overall')
    expect(component.container).toHaveTextContent('score')
    expect(component.container).toHaveTextContent('6/10')
    expect(component.container).toHaveTextContent('8/10')
    expect(component.container).toHaveTextContent('4/5')
    expect(component.container).toHaveTextContent('17/20')
    expect(component.container).toHaveTextContent('35/50')
  })

  test('rating picture links render correctly', () => {
    const images = component.container.querySelectorAll('img')
    expect(images[0].src).toContain('http://localhost/api/pictures/1d4bc0527958a42219ca2037')
    expect(images.length).toBe(1)
  })

  test('users, brewerys and beers link render correctly', () => {
    const elements = component.container.querySelectorAll('a')
    const links = [ elements[0].href, elements[1].href, elements[2].href ]
    expect(links).toContain('http://localhost/users/5d4bc0527958a42219ca2034/stash')
    expect(links).toContain('http://localhost/breweries/2d4bc0527958a42219ca2032')
    expect(links).toContain('http://localhost/beers/5d4bc0527958a42219ca2034')
  })
})