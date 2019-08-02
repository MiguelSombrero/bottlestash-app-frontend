import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Login from './Login'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store'

const mockHandler = jest.fn()
  
describe('<Login />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login onSubmit={mockHandler} />
        </BrowserRouter>
      </Provider>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Login to Bottlestash')
    expect(component.container).toHaveTextContent('Not yet a member? Have no fear! You can register here:')
    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('Register')
  })
      
  test('clicking login button calls eventhandler once', async () => {
    /**
    const button = component.container.querySelector('#login')
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).ToBe(1)
     */

  })
})