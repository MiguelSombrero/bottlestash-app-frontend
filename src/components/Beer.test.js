import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Beer from './Beer'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

/**
 * testi ei testaa renderöityykö Ratingille annettu kuva
 * testaa vain muodostuuko <a> elementin src prop oikein
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
    const image = component.container.querySelectorAll('img')
    expect(image).toHaveTextContent('http://localhost/api/pictures/1d4bc0527958a42219ca2037')
    expect(image).toHaveTextContent('http://localhost/api/pictures/5d4bc0527958a42219ca2038')
    expect(image).toHaveTextContent('http://localhost/api/pictures/5d4bc0527958a42219ca2039')
  })

  test('users link render correctly', () => {
    const user = component.getAllByText('Miika Somero')
    expect(user.href).toBe('http://localhost/users/5d4bc0527958a42219ca2034/stash')
  })

  test('brewerys link render correctly', () => {
    const brewery = component.getAllByText('Sonnisaari')
    expect(brewery.href).toBe('http://localhost/breweries/2d4bc0527958a42219ca2032')
  })

  test('beers link render correctly', () => {
    const beer = component.getAllByText('Sonnisaari Pils 5.6 %')
    expect(beer.href).toBe('http://localhost/beers/5d4bc0527958a42219ca2034')
  })
})