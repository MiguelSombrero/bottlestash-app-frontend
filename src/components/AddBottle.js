import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBeer, getOneBeer } from '../reducers/beersReducer'
import { addBrewery, getOneBrewery } from '../reducers/breweriesReducer'
import { addBottle } from '../reducers/bottlesReducer'
import { addPicture } from '../reducers/picturesReducer'
import { updateUserToState } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import { Row, Col, Jumbotron, Form, Button, Container } from 'react-bootstrap'
import { useTextField, useNumberField } from '../hooks'
import ImageInputGroup from './ImageInputGroup'
import InputGroup from './InputGroup'

const AddBottle = (props) => {
  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [picture, setPicture] = useState(null)
  const [breweryName, breweryErrors] = useTextField('text', 1, 50, true)
  const [name, nameErrors] = useTextField('text', 1, 50, true)
  const [abv, abvErrors] = useNumberField('number', 0, 100, 0.1, true)
  const [price, priceErrors] = useNumberField('number', 0, 1000, 0.01)
  const [count, countErrors] = useNumberField('number', 0, 50, 1, true)
  const [volume, volumeErrors] = useNumberField('number', 0, 10, 0.001)
  const [bottled, bottledErrors] = useNumberField('date', '1990-01-01', '2050-01-01', 1)
  const [expiration, expirationErrors] = useNumberField('date', '1990-01-01', '2050-01-01', 1)
  
  const handleAddBottle = async (event) => {
    event.preventDefault()
    
    if (!event.target.checkValidity()) {
      setValidated(true)
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

      const user = await props.updateUserToState(props.user.username)

      setIsLoading(false)
      props.setNotification('Added bottle succesfully')
      props.history.push(`/users/${user.id}/stash`)
      
    } catch (exception) {
      props.setNotification('Adding bottle failed!', 'error')
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
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Add new bottle to your stash</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col className='formstyle'>
          <Form noValidate validated={validated} onSubmit={handleAddBottle} id='addBottleForm' >
            <InputGroup
              name='Brewery'
              suggestions={breweriesAsList()}
              state={breweryName}
              placeholder='brewery name'
              errors={breweryErrors}
            />
            <InputGroup
              name='Name'
              suggestions={beersAsList()}
              state={name}
              placeholder='beers name'
              errors={nameErrors}
            />
            <InputGroup
              name='Abv'
              suggestions={abvAsList()}
              state={abv}
              placeholder='alcohol by volume'
              errors={abvErrors}
            />
            <InputGroup
              name='Count'
              state={count}
              placeholder='number of bottles'
              errors={countErrors}
            />
            <InputGroup
              name='Volume'
              state={volume}
              placeholder='volume of one bottle in litres'
              errors={volumeErrors}
            />
            <InputGroup
              name='Price'
              state={price}
              placeholder='price of one bottle in euros'
              errors={priceErrors}
            />
            <Form.Row>
              <Col style={{ maxWidth: '50%' }} className='p-2'>
                <InputGroup
                  name='Bottled'
                  state={bottled}
                  errors={bottledErrors}
                />
              </Col>
              <Col style={{ maxWidth: '50%' }} className='p-2'>
                <InputGroup
                  name='Expiration'
                  state={expiration}
                  errors={expirationErrors}
                />
              </Col>
            </Form.Row>
            <ImageInputGroup picture={picture} setPicture={setPicture} />
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
    </Container>
  )
}

const mapDispatchToProps = {
  addBeer,
  addBrewery,
  addBottle,
  addPicture,
  getOneBeer,
  getOneBrewery,
  updateUserToState,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(AddBottle))