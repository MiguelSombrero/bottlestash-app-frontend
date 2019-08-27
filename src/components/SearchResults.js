import React from 'react'
import { Col, Row, Jumbotron, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import Bottle from './Bottle'
import Beer from './Beer'
import Brewery from './Brewery'
import SearchForm from './SearchForm'

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

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Search from Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center block'>
          <SearchForm
            handleSearch={handleSearch}
            id='search'
          />
        </Col>
      </Row>
      {props.filter &&
      <>
      <Row>
        <Col className='text-center'>
          <h5>Bottles</h5>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <p>
            {bottlesToShow.length < 1
              ?  `No bottles for search '${props.filter}'`
              :  `${bottlesToShow.length} bottles for search '${props.filter}'`
            }
          </p>
        </Col>
      </Row>
      <Row>
        <Col style={{ maxWidth: '35em', margin: 'auto' }} >
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
                  <td>{b.beer.name}</td>
                  <td>{b.beer.brewery.name}</td>
                  <td>{b.beer.abv} %</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <h5>Beers</h5>
      </Row>
      <Row>
        <Col className='text-center'>
          <p>
            {beersToShow.length < 1
              ?  `We have no beers for search '${props.filter}'`
              :  `${beersToShow.length} beers for search '${props.filter}'`
            }
          </p>
        </Col>
      </Row>
      <Row>
        <Col style={{ maxWidth: '35em', margin: 'auto' }} >
          {beersToShow.map(b =>
            <Beer key={b.id} beer={b} ratings={[]} ></Beer>
          )}
        </Col>
      </Row>
      <Row>
        <h5>Breweries</h5>
      </Row>
      <Row>
        <Col className='text-center'>
          <p>
            {beersToShow.length < 1
              ?  `We have no breweries for search '${props.filter}'`
              :  `${breweriesToShow.length} breweries for search '${props.filter}'`
            }
          </p>
        </Col>
      </Row>
      <Row>
        <Col style={{ maxWidth: '35em', margin: 'auto' }} >
          {breweriesToShow.map(b =>
            <Brewery key={b.id} brewery={b} ></Brewery>
          )}
        </Col>
      </Row>
      </>
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