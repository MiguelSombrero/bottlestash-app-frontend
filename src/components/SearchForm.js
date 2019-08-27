import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import ListSuggestion from './ListSuggestion'

const SearchForm = (props) => {

  const suggestions =
    props.bottles ? props.bottles.map(b => b.beer.name) : null

  return (
    <Form onSubmit={props.handleSearch} inline>
      <Form.Control list={props.id} name='filter' type ='text' className='p-2 m-2' placeholder='search for bottles ...'></Form.Control>
        <ListSuggestion
          suggestions={suggestions}
          id={props.id}
        />
      <Button type='submit'>Search</Button>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    bottles: state.bottles,
    beers: state.beers,
    breweries: state.breweries
  }
}

export default connect(mapStateToProps)(SearchForm)