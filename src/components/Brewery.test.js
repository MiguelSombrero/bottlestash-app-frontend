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

  test('beers link render correctly', () => {
    console.log(component.container)

    const beer = component.getByText('Sonnisaari Pils 5.6 %')
    expect(beer.href).toBe('http://localhost/beers/5d4bc0527958a42219ca2034')
  })

})