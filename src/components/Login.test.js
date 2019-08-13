import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Login from './Login'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([thunk])
const onSubmit = jest.fn()

const Wrapper = (props) => {
  return (
    <Provider store={mockStore}>
      <BrowserRouter>
        <Login onSubmit={props.onSubmit} />
      </BrowserRouter>
    </Provider>
  )
}
  
describe('<Login />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <Wrapper onSubmit={onSubmit} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Login to Bottlestash')
    expect(component.container).toHaveTextContent('Not yet a member? Register here:')
    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('Register')
  })

  test('clicking something', async () => {
    const username = component.container.querySelector('#username')
    const password = component.container.querySelector('#password')
    const form = component.container.querySelector('form')

    fireEvent.change(username, { target: { value: 'Somero' }})
    fireEvent.change(password, { target: { value: 'salainen' }})
    fireEvent.submit(form)

    expect(onSubmit.mock.calls.length).toBe(1)
  })
})