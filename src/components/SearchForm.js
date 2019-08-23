import React from 'react'
import { Form, Button } from 'react-bootstrap'
import ListSuggestion from './ListSuggestion'

const SearchForm = (props) => {
  return (
    <Form onSubmit={props.handleSearch} inline>
      <Form.Control list={props.id} name='filter' type ='text' className='p-2 m-2' placeholder='search for bottles ...'></Form.Control>
        <ListSuggestion
          suggestions={props.suggestions}
          id={props.id}
        />
      <Button type='submit'>Search</Button>
    </Form>
  )
}

export default SearchForm