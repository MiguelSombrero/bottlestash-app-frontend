import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Bottle from './Bottle'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

/**
 * testi ei testaa renderöityykö Bottlelle kuva
 * testaa vain muodostuuko <a> elementin src prop oikein
 */

describe('<Bottle />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Bottle bottle={helper.bottle} />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('brewery: Sonnisaari')
    expect(component.container).toHaveTextContent('added by Miika Somero, a few seconds ago')
  })

  test('pictures link render correctly', () => {
    const image = component.container.querySelector('img')
    expect(image.src).toBe('http://localhost/api/pictures/4d4bc0527958a42219ca2037')
  })

  test('users link render correctly', () => {
    const user = component.getByText('Miika Somero')
    expect(user.href).toBe('http://localhost/users/5d4bc0527958a42219ca2034/stash')
  })

  test('brewerys link render correctly', () => {
    const brewery = component.getByText('Sonnisaari')
    expect(brewery.href).toBe('http://localhost/breweries/2d4bc0527958a42219ca2032')
  })

  test('beers link render correctly', () => {
    const beer = component.getByText('Sonnisaari Pils 5.6 %')
    expect(beer.href).toBe('http://localhost/beers/5d4bc0527958a42219ca2034')
  })

})