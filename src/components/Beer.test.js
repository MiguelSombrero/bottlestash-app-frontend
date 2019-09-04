import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Beer from './Beer'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

/**
 * doesn't test rendering of pictures, only does the src form correctly
 */

describe('<Beer />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Beer beer={helper.beer} ratings={helper.ratings} />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('Ratings')
    expect(component.container).toHaveTextContent('brewery: Sonnisaari')
    expect(component.container).toHaveTextContent('5 ratings with average score 34.4/50')
    expect(component.container).toHaveTextContent('wery delicate taste, with hints of chocolate. Liked!')
    expect(component.container).toHaveTextContent('A bit alcoholy aftertaste. Light yellow body. Not too good.')
    expect(component.container).toHaveTextContent('Best Imperial Stout I have ever tasted!')
    expect(component.container).toHaveTextContent('by Miika Somero, a few seconds ago')
    expect(component.container).toHaveTextContent('aroma')
    expect(component.container).toHaveTextContent('taste')
    expect(component.container).toHaveTextContent('mouthfeel')
    expect(component.container).toHaveTextContent('appearance')
    expect(component.container).toHaveTextContent('overall')
    expect(component.container).toHaveTextContent('8/10')
    expect(component.container).toHaveTextContent('7/10')
    expect(component.container).toHaveTextContent('5/5')
    expect(component.container).toHaveTextContent('4/5')
    expect(component.container).toHaveTextContent('18/20')
  })

  test('rating picture links render correctly', () => {
    const images = component.container.querySelectorAll('img')
    const image1 = component.container.querySelectorAll("img[src='http://localhost/api/pictures/1d4bc0527958a42219ca2037']")
    const image2 = component.container.querySelectorAll("img[scr='http://localhost/api/pictures/5d4bc0527958a42219ca2038']")
    const image3 = component.container.querySelectorAll("img[scr='http://localhost/api/pictures/5d4bc0527958a42219ca2039']")
    expect(images.length).toBe(3)
    expect(image1).toBeDefined()
    expect(image2).toBeDefined()
    expect(image3).toBeDefined()
  })

  test('users, brewerys and beers link render correctly', () => {
    const elements = component.container.querySelectorAll('a')
    const links = [ elements[0].href, elements[1].href, elements[2].href ]
    expect(links).toContain('http://localhost/users/5d4bc0527958a42219ca2034/stash')
    expect(links).toContain('http://localhost/breweries/2d4bc0527958a42219ca2032')
    expect(links).toContain('http://localhost/beers/5d4bc0527958a42219ca2034')
  })
})