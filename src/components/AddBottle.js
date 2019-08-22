import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBeer, getOneBeer } from '../reducers/beersReducer'
import { addBrewery, getOneBrewery } from '../reducers/breweriesReducer'
import { addBottle } from '../reducers/bottlesReducer'
import { updateUserToState } from '../reducers/usersReducer'
import { withRouter } from 'react-router-dom'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import ListSuggestion from './ListSuggestion'

const AddBottle = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [breweryName] = useField('text', 1, 50, true)
  const [name] = useField('text', 1, 50, true)
  const [abv] = useField('number', 0, 100, 0.1, true)
  const [price] = useField('number', 0, 1000, 0.01)
  const [count] = useField('number', 0, 50, 1, true)
  const [volume] = useField('number', 0, 10, 0.01)
  const [bottled] = useField('date', '1900-01-01', '2100-01-01', 1)
  const [expiration] = useField('date', '1900-01-01', '2100-01-01', 1)

  const handleAddBottle = async (event) => {
    setIsLoading(true)
    event.preventDefault()

    try {
      let brewery = await props.getOneBrewery(breweryName.value)
      
      if (!brewery) {
        brewery = await props.addBrewery({ name: breweryName.value })
      }

      let beer = await props.getOneBeer(brewery.id, name.value, abv.value)

      if (!beer) {
        beer = await props.addBeer({ breweryId: brewery.id, name: name.value, abv: abv.value })
      }

      await props.addBottle({
        price: price.value,
        count: count.value,
        volume: volume.value,
        bottled: bottled.value,
        expiration: expiration.value,
        beerId: beer.id
      })

      // tämän voisi muuttaa niin, että yllä oleva pullo lisätään käyttäjän
      // stashiin ja käyttäjä viedään tilaan, ilman että haetaan tietokannasta
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
        <Jumbotron as={Col} className='text-center'>
          <h2>Add new bottle to your stash</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col style={{ maxWidth: '25rem', margin: 'auto' }}>
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
              <Form.Group style={{ maxWidth: '50%' }} className=' p-2'>
                <Form.Label>Bottled</Form.Label>
                <Form.Control {...bottled} placeholder='day beer was bottled' />
              </Form.Group>
              <Form.Group style={{ maxWidth: '50%' }} className='p-2'>
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
  addBottle,
  getOneBeer,
  getOneBrewery,
  updateUserToState
}

export default connect(null, mapDispatchToProps)(withRouter(AddBottle))