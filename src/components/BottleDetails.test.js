import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BottleDetails from './BottleDetails'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import helper from '../setupTests'
import configureStore from 'redux-mock-store'

/**
 * problem with rendering modal in test because tests fail?
 */

const mockStore = configureStore([])

describe('<BottleDetails /> user checking his/her own bottle', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Provider store={mockStore({})}>
        <Router>
          <BottleDetails
            bottle={helper.bottle}
            user={helper.loggedUser}
            userToView={helper.userToview}
            visible={true}
          />
        </Router>
      </Provider>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Alcohol: 5.6 %')
    expect(component.container).toHaveTextContent('Brewery: Sonnisaari')
    expect(component.container).toHaveTextContent('Price: 4.89 €')
    expect(component.container).toHaveTextContent('Volume: 0.33 litres')
    expect(component.container).toHaveTextContent('Bottled: 12.04.2019')
    expect(component.container).toHaveTextContent('Expires: 01.03.2021')
    expect(component.container).toHaveTextContent('Beers age: - months')
    expect(component.container).toHaveTextContent('Bottles: 4')
  })

  test('showing options', () => {
    const link = component.getByText('Drink and rate')
    const button = component.getByText('Just drink')
    expect(link).toBeDefined()
    expect(button).toBeDefined()
  })
})

describe('<Stash /> user checking someone elses bottle', () => {
    let component
      
    beforeEach(() => {
      component = render(
        <Provider store={mockStore({})}>
          <Router>
            <BottleDetails
              bottle={helper.bottle}
              user={helper.loggedUser}
              userToView={helper.userToview}
              visible={true}
            />
          </Router>
        </Provider>
      )
    })
  
    test('renders content', () => {
      expect(component.container).toHaveTextContent('Alcohol: 5.6 %')
      expect(component.container).toHaveTextContent('Brewery: Sonnisaari')
      expect(component.container).toHaveTextContent('Price: 4.89 €')
      expect(component.container).toHaveTextContent('Volume: 0.33 litres')
      expect(component.container).toHaveTextContent('Bottled: 12.04.2019')
      expect(component.container).toHaveTextContent('Expires: 01.03.2021')
      expect(component.container).toHaveTextContent('Beers age: - months')
      expect(component.container).toHaveTextContent('Bottles: 4')
    })
    
    test('showing options', () => {
      const link = component.getByText('Drink and rate')
      const button = component.getByText('Just drink')
      expect(link).toBeDefined()
      expect(button).toBeDefined()
    })
  })