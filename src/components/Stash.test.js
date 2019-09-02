import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Stash from './Stash'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import helper from '../setupTests'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('<Stash /> user in his/her own stash', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Provider store={mockStore({})}>
        <Router>
          <Stash user={helper.loggedUser} userToView={helper.userToview} />
        </Router>
      </Provider>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Miika Somero \'s Stash')
    expect(component.container).toHaveTextContent('Stash details')
    expect(component.container).toHaveTextContent('Add new bottle')
    expect(component.container).toHaveTextContent('Count')
    expect(component.container).toHaveTextContent('Brewery')
    expect(component.container).toHaveTextContent('Beer')
    expect(component.container).toHaveTextContent('Expiration')
    expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).toHaveTextContent('Vattu 5.8 %')
    expect(component.container).toHaveTextContent('2')
    expect(component.container).toHaveTextContent('6')
  })

  test('does not render details', () => {
    expect(component.container).not.toHaveTextContent('Back to stash')
    expect(component.container).not.toHaveTextContent('Details of your stash')
    expect(component.container).not.toHaveTextContent('2 different beers and 8 different bottles')
    expect(component.container).not.toHaveTextContent('Your stash costs 10.78 €')
    expect(component.container).not.toHaveTextContent('Your stash has 0.83 litres of beer')
  })

  test('renders details when Stash details is clicked', () => {
    const link = component.getByText('Stash details')
    fireEvent.click(link)

    expect(component.container).toHaveTextContent('Back to stash')
    expect(component.container).toHaveTextContent('Details of your stash')
    expect(component.container).toHaveTextContent('2 different beers and 8 different bottles')
    expect(component.container).toHaveTextContent('Your stash costs 10.78 €')
    expect(component.container).toHaveTextContent('Your stash has 0.83 litres of beer')
  })

  test('not showing beers when Stash details is clicked', () => {
    const link = component.getByText('Stash details')
    fireEvent.click(link)
    
    expect(component.container).not.toHaveTextContent('Count')
    expect(component.container).not.toHaveTextContent('Brewery')
    expect(component.container).not.toHaveTextContent('Beer')
    expect(component.container).not.toHaveTextContent('Expiration')
    expect(component.container).not.toHaveTextContent('Sonnisaari Pils 5.6 %')
    expect(component.container).not.toHaveTextContent('Vattu 5.8 %')
  })
})

describe('<Stash /> user in someone elses stash not private', () => {
    let component
      
    beforeEach(() => {
      component = render(
        <Provider store={mockStore({})}>
          <Router>
            <Stash user={helper.loggedUser2} userToView={helper.userToview} />
          </Router>
        </Provider>
      )
    })
  
    test('renders content', () => {
      expect(component.container).toHaveTextContent('Miika Somero \'s Stash')
      expect(component.container).toHaveTextContent('Count')
      expect(component.container).toHaveTextContent('Brewery')
      expect(component.container).toHaveTextContent('Beer')
      expect(component.container).toHaveTextContent('Expiration')
      expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
      expect(component.container).toHaveTextContent('Vattu 5.8 %')
      expect(component.container).toHaveTextContent('2')
      expect(component.container).toHaveTextContent('6')
    })
  
    test('does not render details', () => {
      expect(component.container).not.toHaveTextContent('Stash details')
      expect(component.container).not.toHaveTextContent('Add new bottle')
      expect(component.container).not.toHaveTextContent('Back to stash')
      expect(component.container).not.toHaveTextContent('Details of your stash')
      expect(component.container).not.toHaveTextContent('2 different beers and 8 different bottles')
      expect(component.container).not.toHaveTextContent('Your stash costs 10.78 €')
      expect(component.container).not.toHaveTextContent('Your stash has 0.83 litres of beer')
    })

    /** siirrä tämä testi bottle detailsiin
    test('clicking beer will show its details', () => {
        
        const beer = component.getByText('Sonnisaari Pils 5.6 %')
        fireEvent.click(beer)

        expect(component.container).toHaveTextContent('Alcohol: 5.6 %')
        expect(component.container).toHaveTextContent('Brewery: Sonnisaari')
        expect(component.container).toHaveTextContent('Price: 5.89 €')
        expect(component.container).toHaveTextContent('Volume: 0.33 litres')
        expect(component.container).toHaveTextContent('Bottled: -')
        expect(component.container).toHaveTextContent('Expires: -')
        expect(component.container).toHaveTextContent('Beers age: - months')
        expect(component.container).toHaveTextContent('Bottles: 6')
      })
       */
  })

  describe('<Stash /> user in someone elses private stash', () => {
    let component
      
    beforeEach(() => {
      component = render(
        <Provider store={mockStore({})}>
          <Router>
            <Stash user={helper.loggedUser} userToView={helper.userToview2} />
          </Router>
        </Provider>
      )
    })
  
    test('renders content', () => {
      expect(component.container).toHaveTextContent('Matti Luukkainen \'s Stash')
      expect(component.container).toHaveTextContent('This stash is private and cannot be peeked - sorry!')
    })
  
    test('does not render any details', () => {
      expect(component.container).not.toHaveTextContent('Count')
      expect(component.container).not.toHaveTextContent('Brewery')
      expect(component.container).not.toHaveTextContent('Beer')
      expect(component.container).not.toHaveTextContent('Expiration')
      expect(component.container).not.toHaveTextContent('Sonnisaari Pils 5.6 %')
      expect(component.container).not.toHaveTextContent('Vattu 5.8 %')
      expect(component.container).not.toHaveTextContent('Stash details')
      expect(component.container).not.toHaveTextContent('Add new bottle')
      expect(component.container).not.toHaveTextContent('Back to stash')
      expect(component.container).not.toHaveTextContent('Details of your stash')
      expect(component.container).not.toHaveTextContent('2 different beers and 8 different bottles')
      expect(component.container).not.toHaveTextContent('Your stash costs 10.78 €')
      expect(component.container).not.toHaveTextContent('Your stash has 0.83 litres of beer')
    })
  })

  describe('<Stash /> user in own private stash', () => {
    let component
      
    beforeEach(() => {
      component = render(
        <Provider store={mockStore({})}>
          <Router>
            <Stash user={helper.loggedUser2} userToView={helper.userToview2} />
          </Router>
        </Provider>
      )
    })
  
    test('renders content', () => {
      expect(component.container).toHaveTextContent('Matti Luukkainen \'s Stash')
      expect(component.container).toHaveTextContent('Your stash is hidden and won\'t show to other users. If you wan\'t to make it visible to other users, please update visibility settings in your profile')
      expect(component.container).toHaveTextContent('Count')
      expect(component.container).toHaveTextContent('Brewery')
      expect(component.container).toHaveTextContent('Beer')
      expect(component.container).toHaveTextContent('Expiration')
      expect(component.container).toHaveTextContent('Sonnisaari Pils 5.6 %')
      expect(component.container).toHaveTextContent('Vattu 5.8 %')
      expect(component.container).toHaveTextContent('Stash details')
      expect(component.container).toHaveTextContent('Add new bottle')
    })

    test('renders details when Stash details is clicked', () => {
      const link = component.getByText('Stash details')
      fireEvent.click(link)
    
      expect(component.container).toHaveTextContent('Back to stash')
      expect(component.container).toHaveTextContent('Details of your stash')
      expect(component.container).toHaveTextContent('2 different beers and 8 different bottles')
      expect(component.container).toHaveTextContent('Your stash costs 10.78 €')
      expect(component.container).toHaveTextContent('Your stash has 0.83 litres of beer')
    })
  })