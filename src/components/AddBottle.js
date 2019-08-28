import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBeer, getOneBeer } from '../reducers/beersReducer'
import { addBrewery, getOneBrewery } from '../reducers/breweriesReducer'
import { addBottle } from '../reducers/bottlesReducer'
import { addPicture } from '../reducers/picturesReducer'
import { updateUserToState } from '../reducers/usersReducer'
import { withRouter } from 'react-router-dom'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'
import { useTextField, useNumberField } from '../hooks'
import ListSuggestion from './ListSuggestion'

const AddBottle = (props) => {
  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [picture, setPicture] = useState(null)
  const [breweryName, breweryErrors] = useTextField('text', 1, 50, true)
  const [name, nameErrors] = useTextField('text', 1, 50, true)
  const [abv, abvErrors] = useNumberField('number', 0, 100, 0.1, true)
  const [price, priceErrors] = useNumberField('number', 0, 1000, 0.01)
  const [count, countErrors] = useNumberField('number', 0, 50, 1, true)
  const [volume, volumeErrors] = useNumberField('number', 0, 10, 0.01)
  const [bottled, bottledErrors] = useNumberField('date', '1990-01-01', '2050-01-01', 1)
  const [expiration, expirationErrors] = useNumberField('date', '1990-01-01', '2050-01-01', 1)
  
  const handleAddBottle = async (event) => {
    event.preventDefault()
    setValidated(true)

    if (!event.target.checkValidity()) {
      return
    }

    setIsLoading(true)

    try {
      let brewery = await props.getOneBrewery(breweryName.value)
      
      if (!brewery) {
        brewery = await props.addBrewery({ name: breweryName.value })
      }

      let beer = await props.getOneBeer(brewery.id, name.value, abv.value)

      if (!beer) {
        beer = await props.addBeer({ breweryId: brewery.id, name: name.value, abv: abv.value })
      }

      const newPicture = picture
        ? await props.addPicture(picture)
        : null

      await props.addBottle({
        price: price.value,
        count: count.value,
        volume: volume.value,
        bottled: bottled.value,
        expiration: expiration.value,
        beerId: beer.id,
        pictureId: newPicture ? newPicture.id : null
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

  const breweriesAsList = () => !props.breweries
    ? null
    : props.breweries.map(b => b.name)

  const beersAsList = () => !props.beers
    ? null
    : props.beers.filter(b => b.brewery.name === breweryName.value).map(b => b.name)

  const abvAsList = () => !props.beers
    ? null
    : props.beers.filter(b => b.brewery.name === breweryName.value && b.name === name.value).map(b => b.abv)

    return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Add new bottle to your stash</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col className='formstyle'>
          <Form noValidate validated={validated} onSubmit={handleAddBottle} id='addBottleForm' >
            <Form.Group >
            <Form.Label>Brewery</Form.Label>
              <Form.Control {...breweryName} list='breweriesAsList' placeholder='name of the brewery' />
              <ListSuggestion suggestions={breweriesAsList()} id='breweriesAsList' />
              <Form.Control.Feedback type='invalid' >{breweryErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} list='beersAsList' placeholder='name of your beer' />
              <ListSuggestion suggestions={beersAsList()} id='beersAsList' />
              <Form.Control.Feedback type='invalid' >{nameErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Abv</Form.Label>
              <Form.Control {...abv} list='abvAsList' placeholder='alcohol %' />
              <ListSuggestion suggestions={abvAsList()} id='abvAsList' />
              <Form.Control.Feedback type='invalid' >{abvErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Count</Form.Label>
              <Form.Control {...count} placeholder='number of bottles to save' />
              <Form.Control.Feedback type='invalid' >{countErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume</Form.Label>
              <Form.Control {...volume} placeholder='volume of the bottle in litres' />
              <Form.Control.Feedback type='invalid' >{volumeErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control {...price} placeholder='price of an one bottle' />
              <Form.Control.Feedback type='invalid' >{priceErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group style={{ maxWidth: '50%' }} className=' p-2'>
                <Form.Label>Bottled</Form.Label>
                <Form.Control {...bottled} placeholder='day beer was bottled' />
                <Form.Control.Feedback type='invalid' >{bottledErrors}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group style={{ maxWidth: '50%' }} className='p-2'>
                <Form.Label>Expiration</Form.Label>
                <Form.Control {...expiration} placeholder='expiration day of bottles' />
                <Form.Control.Feedback type='invalid' >{expirationErrors}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group className='custom-file mb-4 p-2'>
              <Form.Label className='custom-file-label'>Click to add pic of your bottle</Form.Label>
              <Form.Control
                name='picture'
                className='custom-file-input'
                type='file'
                accept='image/*'
                onChange={({ target }) => setPicture(target.files[0])}
              />
              {picture &&
              <Form.Text className='text-center'>{picture.name}</Form.Text>
              }
            </Form.Group>
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
  addPicture,
  getOneBeer,
  getOneBrewery,
  updateUserToState
}

export default connect(null, mapDispatchToProps)(withRouter(AddBottle))