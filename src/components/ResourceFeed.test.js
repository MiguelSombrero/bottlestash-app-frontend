import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ResourceFeed from './ResourceFeed'
import { BrowserRouter as Router } from 'react-router-dom'
import helper from '../setupTests'

/**
 * No tests for Ratings yet
 */

describe('<ResourceFeed />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Router>
        <ResourceFeed resources={helper.bottles} resource='bottle' />
      </Router>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('brewery: Sonnisaari')
    expect(component.container).toHaveTextContent('added by Miika Somero, a few seconds ago')
  })

  test('have load more button', () => {
    const button = component.getByText('Load more ...')
    expect(button).toBeDefined()
  })

  test('load more button will vanish if no new rendeable content', () => {
    const button = component.getByText('Load more ...')
    fireEvent.click(button)
    expect(component.container).not.toHaveTextContent('Load more ...')
  })

  test('first renders maximum of 5 elements', () => {
    const cards = component.container.querySelectorAll('.card-header')
    expect(cards.length).toBe(5)
  })

  test('clicking load more button will render more content', () => {
    const button = component.getByText('Load more ...')
    fireEvent.click(button)
    const cards = component.container.querySelectorAll('.card-header')
    expect(cards.length).toBe(7)
  })
})