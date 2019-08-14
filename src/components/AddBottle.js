import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBeer } from '../reducers/beersReducer'
import { addBrewery } from '../reducers/breweriesReducer'
import { updateUserToState } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import breweriesService from '../services/breweries'
import beersService from '../services/beers'
import bottlesService from '../services/bottles'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'
import { useNumberField, useTextField } from '../hooks'
import ListSuggestion from './ListSuggestion'

const AddBottle = (props) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const breweryName = useTextField('text', 1, 50, true)
  const name = useTextField('text', 1, 50, true)
  const abv = useNumberField('number', 0, 100, 0.1, true)
  const price = useNumberField('number', 0, 1000, 0.01)
  const count = useNumberField('number', 0, 50, 1, true)
  const volume = useNumberField('number', 0, 10, 0.01)
  const bottled = useNumberField('date', '1900-01-01', '2100-01-01', 1)
  const expiration = useNumberField('date', '1900-01-01', '2100-01-01', 1)

  const handleAddBottle = async (event) => {
    setIsLoading(true)
    event.preventDefault()

    try {
      let brewery = await breweriesService.getOne(breweryName.value)
      
      if (!brewery) {
        brewery = await props.addBrewery(breweryName.value)
      }

      let beer = await beersService.getOne({ breweryId: brewery.id, name: name.value, abv: abv.value })

      if (!beer) {
        beer = await props.addBeer({ breweryId: brewery.id, name: name.value, abv: abv.value })
      }

      await bottlesService.create({
        price: price.value,
        count: count.value,
        volume: volume.value,
        bottled: bottled.value,
        expiration: expiration.value,
        beerId: beer.id
      })

      const user = await props.updateUserToState(props.user.username)
      setIsLoading(false)
      props.setNotification('Added bottle succesfully')
      props.history.push(`/users/${user.id}/stash`)
      
    } catch (exception) {
      props.setNotification('Adding bottle failed - sorry!', 'error')
    }
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='d-flex justify-content-center mb-2'>
          <h2>Add new bottle to your stash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          <Form onSubmit={handleAddBottle} id='addBottleForm' >
            <Form.Group >
            <Form.Label>Brewery</Form.Label>
              <Form.Control {...breweryName} list='breweriesAsList' placeholder='name of the brewery' />
              <ListSuggestion
                suggestions={props.breweries}
                id='breweriesAsList'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} placeholder='name of your beer' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Abv</Form.Label>
              <Form.Control {...abv} placeholder='alcohol %' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Count</Form.Label>
              <Form.Control {...count} placeholder='number of bottles to save' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume</Form.Label>
              <Form.Control {...volume} placeholder='volume of the bottle in litres' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control {...price} placeholder='price of an one bottle' />
            </Form.Group>
            <Form.Row>
              <Form.Group className='p-2'>
                <Form.Label>Bottled</Form.Label>
                <Form.Control {...bottled} placeholder='day beer was bottled' />
              </Form.Group>
              <Form.Group className='p-2'>
                <Form.Label>Expiration</Form.Label>
                <Form.Control {...expiration} placeholder='expiration day of bottles' />
              </Form.Group>
            </Form.Row>
            <Button
              variant='success'
              type='submit'
              block
              disabled={isLoading}
              
              > {isLoading ? 'Loading ...' : 'Add beer'}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = {
  addBeer,
  addBrewery,
  updateUserToState,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(AddBottle))