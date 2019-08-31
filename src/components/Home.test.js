import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Home from './Home'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

describe('<Home /> without login', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Home bottles={helper.bottles} ratings={helper.ratings} user={false} />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Bottlestash, eh?')
    expect(component.container).toHaveTextContent('That\'s right mate!')
    expect(component.container).toHaveTextContent('Bottlestash is an app which let you keep track of your beer cellar. Because lets face it; you like beer. So do I - it\'s allright!')
    expect(component.container).toHaveTextContent('Main features:')
    expect(component.container).toHaveTextContent('Save bottles to your stash')
    expect(component.container).toHaveTextContent('Perfect! Register for free and start collect some awesomeness in your stash!')
  })

  test('doesn\'t render content only for logged users', () => {
    expect(component.container).not.toHaveTextContent('Recently added bottles')
    expect(component.container).not.toHaveTextContent('Recently added ratings')
    expect(component.container).not.toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).not.toHaveTextContent('brewery: Sonnisaari')
    expect(component.container).not.toHaveTextContent('added by Miika Somero, a few seconds ago')
  })

  test('doesn\'t render ratings or bottles', () => {
    const cards = component.container.querySelectorAll('.card-header')
    expect(cards.length).toBe(0)
  })

})

describe('<Home /> with login', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <Home bottles={helper.bottles} ratings={helper.ratings} user={helper.loggedUser} />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Recently added bottles')
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('Recently added ratings')
    expect(component.container).toHaveTextContent('brewery: Sonnisaari')
    expect(component.container).toHaveTextContent('added by Miika Somero, a few seconds ago')
  })

  test('doesn\'t render content only for logged users', () => {
    expect(component.container).not.toHaveTextContent('Bottlestash, eh?')
    expect(component.container).not.toHaveTextContent('That\'s right mate!')
    expect(component.container).not.toHaveTextContent('Bottlestash is an app which let you keep track of your beer cellar. Because lets face it; you like beer. So do I - it\'s allright!')
    expect(component.container).not.toHaveTextContent('Main features:')
    expect(component.container).not.toHaveTextContent('Save bottles to your stash')
    expect(component.container).not.toHaveTextContent('Perfect! Register for free and start collect some awesomeness in your stash!')
  })

  test('renders ratings and bottles', () => {
    const cards = component.container.querySelectorAll('.card-header')
    expect(cards.length).toBe(9)
  })

})