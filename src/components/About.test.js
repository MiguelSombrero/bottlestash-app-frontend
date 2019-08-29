import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import About from './About'

describe('<About />', () => {
  let component
    
  beforeEach(() => {
    component = render(
      <About />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('About Bottlestash')
    expect(component.container).toHaveTextContent('Bottlestash is my (Miika Somero) course project for University of Helsinki course Full Stack Open 2019')
    expect(component.container).toHaveTextContent('Project is about rehearsing web development with React and Node.js. See source code and documentation from my Github page')
  })

  test('renders links', () => {
    const link1 = component.getByText('Full Stack Open 2019')
    const link2 = component.getByText('Github')
    expect(link1).toBeDefined()
    expect(link2).toBeDefined()
  })
})