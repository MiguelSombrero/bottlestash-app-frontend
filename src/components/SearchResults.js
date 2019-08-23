import React from 'react'
import { Col, Row, Jumbotron } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import Bottle from './Bottle'
import SearchForm from './SearchForm'

const SearchResults = (props) => {

  const byBeerOrBrewery = (b) => !props.filter
    ? false
    : b.beer.name.toLowerCase().includes(props.filter.toLowerCase()) ||
      b.beer.brewery.name.toLowerCase().includes(props.filter.toLowerCase())

  const bottlesToShow = props.bottles
    .filter(b => !b.user.hidden)
    .filter(byBeerOrBrewery)

  const handleSearch = (e) => {
    e.preventDefault()
    props.setFilter(e.target.filter.value)
    e.target.filter.value = ''
  }

  return (
    <>
      <Row>
        <Col>
          <Jumbotron className='text-center'>
            <h2>Search from Bottlestash</h2>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center block'>
          <SearchForm
            handleSearch={handleSearch}
            suggestions={props.suggestions}
            id='search'
          />
        </Col>
      </Row>
      {props.filter &&
      <Row>
        <Col className='text-center'>
          <p>We have {bottlesToShow.length} results for search '{props.filter}'</p>
        </Col>
      </Row>
      }
      <Row>
        <Col style={{ maxWidth: '35em', margin: 'auto' }} >
          {bottlesToShow.map(b =>
            <Bottle key={b.id} bottle={b} ></Bottle>
          )}
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)