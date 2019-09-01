import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Login from './Login'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
jest.mock('../reducers/loginReducer')

const mockStore = configureStore([])

const Wrapper = (props) => {
  return (
    <Provider store={mockStore({})} >
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )
}

describe('<Login />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Wrapper />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Login to Bottlestash')
    expect(component.container).toHaveTextContent('Not yet a member? Register here')
    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('Register')
  })

  test('login will redirect to home page', async () => {
    const username = component.getByPlaceholderText('username')
    const password = component.getByPlaceholderText('password')
    const form = component.container.querySelector('form')

    fireEvent.change(username, { target: { value: 'Somero' }})
    fireEvent.change(password, { target: { value: 'salainen' }})
    fireEvent.submit(form)

    // ???
  })
})
