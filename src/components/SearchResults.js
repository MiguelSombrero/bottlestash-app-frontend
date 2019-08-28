import React from 'react'
import { Col, Row, Jumbotron, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import SearchForm from './SearchForm'

const SearchResults = (props) => {

  const byHidden = (b) => !b.user.hidden
  const byBeerName = (b) => !props.filter ? false : props.filter.toLowerCase().includes(b.name.toLowerCase())
  const byBreweryName = (b) => !props.filter ? false : props.filter.toLowerCase().includes(b.name.toLowerCase())

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
      <Col className='maindiv'>
        <h3>Bottles</h3>
        <p>
          {bottlesToShow.length} bottles for search '{props.filter}'
        </p>
      </Col>
    </Row>
    <Row>
      <Col className='maindiv' >
        <Table>
          <thead>
            <tr>
              <th>Beer</th>
              <th>Brewery</th>
              <th>Abv</th>
            </tr>
          </thead>
          <tbody >
            {bottlesToShow.map(b =>
              <tr key={b.id} >
                <td>{b.beer.name}, {b.beer.abv} %</td>
                <td>{b.beer.brewery.name}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  </>

const showBeers = () => 
  <>
    <Row>
      <Col >
        <h3>Beers</h3>
        <p>
          {beersToShow.length} beers for search '{props.filter}'
        </p>
      </Col>
    </Row>
    <Row>
      <Col  >
        <Table>
          <thead>
            <tr>
              <th>Beer</th>
              <th>Brewery</th>
              <th>Abv</th>
            </tr>
          </thead>
          <tbody >
            {beersToShow.map(b =>
              <tr key={b.id} >
                <td>{b.name}</td>
                <td>{b.brewery.name}</td>
                <td>{b.abv} %</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  </>

const showBreweries = () => 
  <>
    <Row>
      <Col>
        <h3>Breweries</h3>
        <p>
          {breweriesToShow.length} breweries for search '{props.filter}'
        </p>
      </Col>
    </Row>
    <Row>
      <Col >
        <Table>
          <thead>
            <tr>
              <th>Brewery</th>
              <th>Beers</th>
            </tr>
          </thead>
          <tbody >
            {breweriesToShow.map(b =>
              <tr key={b.id} >
                <td>{b.name}</td>
                <td>{b.beers.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  </>

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Search from Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <SearchForm
            handleSearch={handleSearch}
            id='search'
          />
        </Col>
      </Row>
      {props.filter &&
        <Col className='maindiv'>
          {bottlesToShow.length > 0
            ? showBottles()
            : <p>No bottles for search '{props.filter}'</p>
          }
          {beersToShow.length > 0
            ? showBeers()
            : <p>No beers for search '{props.filter}'</p>
          }
          {breweriesToShow.length > 0
            ? showBreweries()
            : <p>No breweries for search '{props.filter}'</p>
          }
        </Col>
      }
    </>
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