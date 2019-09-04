import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import ListSuggestion from './ListSuggestion'

const SearchForm = (props) => {

  const beersAsList = () => props.beers ? props.beers.map(b => b.name) : []
  const breweriesAsList = () => props.breweries ? props.breweries.map(b => b.name) : []

  const suggestions = beersAsList().concat(breweriesAsList())

  return (
    <Form onSubmit={props.handleSearch} inline className='pl-2'>
      <Form.Control list={props.id} name='filter' type ='text' className='p-2 m-2' placeholder='search for bottles, beers and more ...'></Form.Control>
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
    beers: state.beers,
    breweries: state.breweries
  }
}

export default connect(mapStateToProps)(SearchForm)