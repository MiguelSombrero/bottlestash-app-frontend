import React from 'react'
import { Form } from 'react-bootstrap'
import ListSuggestion from './ListSuggestion'

const InputGroup = (props) => 
  <Form.Group >
    <Form.Label>{props.name}</Form.Label>
    <Form.Control {...props.state} placeholder={props.placeholder} list={props.name} />
    <ListSuggestion suggestions={props.suggestions} id={props.name} />
    <Form.Control.Feedback type='invalid' >{props.errors}</Form.Control.Feedback>
  </Form.Group>
 
export default InputGroup