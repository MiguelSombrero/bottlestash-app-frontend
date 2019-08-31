import React from 'react'
import { Col, Row, Jumbotron, ListGroup, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import SearchForm from './SearchForm'
import { NavLink } from 'react-router-dom'

const SearchResults = (props) => {

  const byHidden = (b) => !b.user.hidden
  const byBeerName = (b) => !props.filter ? false : b.name.toLowerCase().includes(props.filter.toLowerCase())
  const byBreweryName = (b) => !props.filter ? false : b.name.toLowerCase().includes(props.filter.toLowerCase())

  const bottlesToShow = props.bottles
    ? props.bottles.filter(byHidden).filter(b => byBeerName(b.beer) || byBreweryName(b.beer.brewery))
    : null

  const beersToShow = props.beers
    ? props.beers.filter(byBeerName)
    : null

  const breweriesToShow = props.breweries
    ? props.breweries.filter(byBreweryName)
    : null

  const handleSearch = (e) => {
    e.preventDefault()
    props.setFilter(e.target.filter.value)
    e.target.filter.value = ''
  }

  const showBottles = () => 
    <>
    <Row>
      <Col className='text-center'>
        <h3>Bottles</h3>
        <p>
          {bottlesToShow.length} bottles for search '{props.filter}'
        </p>
      </Col>
    </Row>
    <Row>
      <Col className='maindiv'>
        <ListGroup variant='flush'>
          {bottlesToShow.map(b =>
            <ListGroup.Item key={b.id}>
              {b.beer.name} {b.beer.abv} %, {b.beer.brewery.name} <NavLink to={`users/${b.user.id}/stash`} >in {b.user.name} stash</NavLink>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  </>

const showBeers = () => 
  <>
    <Row>
      <Col className='text-center'>
        <h3>Beers</h3>
        <p>
          {beersToShow.length} beers for search '{props.filter}'
        </p>
      </Col>
    </Row>
    <Row>
      <Col className='maindiv'>
        <ListGroup variant='flush'>
          {beersToShow.map(b =>
            <ListGroup.Item key={b.id}>
              <NavLink to={`/beers/${b.id}`} >{b.name} {b.abv} %</NavLink>, beer by {b.brewery.name}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  </>

const showBreweries = () => 
  <>
    <Row>
      <Col className='text-center'>
        <h3>Breweries</h3>
        <p>
          {breweriesToShow.length} breweries for search '{props.filter}'
        </p>
      </Col>
    </Row>
    <Row>
      <Col className='maindiv'>
        <ListGroup variant='flush'>
          {breweriesToShow.map(b =>
            <ListGroup.Item key={b.id}>
              <NavLink to={`/breweries/${b.id}`} >{b.name}</NavLink>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  </>

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Search from Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='maindiv d-flex justify-content-center mb-5'>
          <SearchForm
            handleSearch={handleSearch}
            id='search'
          />
        </Col>
      </Row>
      {props.filter &&
        <>
          {bottlesToShow.length > 0
            ? showBottles()
            : <p className='text-center'>No bottles for search '{props.filter}'</p>
          }
          {beersToShow.length > 0
            ? showBeers()
            : <p className='text-center'>No beers for search '{props.filter}'</p>
          }
          {breweriesToShow.length > 0
            ? showBreweries()
            : <p className='text-center'>No breweries for search '{props.filter}'</p>
          }
        </>
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    bottles: state.bottles,
    beers: state.beers,
    breweries: state.breweries
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)