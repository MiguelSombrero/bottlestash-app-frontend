import React, { useState, useEffect } from 'react'
import { Row, Col, Jumbotron, Form, Button, Container } from 'react-bootstrap'
import { useTextField, useNumberField } from '../hooks'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addBeer, getOneBeer } from '../reducers/beersReducer'
import { addBrewery, getOneBrewery } from '../reducers/breweriesReducer'
import { addRating } from '../reducers/ratingsReducer'
import { addPicture } from '../reducers/picturesReducer'
import { setNotification } from '../reducers/notificationReducer'
import ImageInputGroup from './ImageInputGroup'
import InputGroup from './InputGroup'
import moment from 'moment'

const Rate = (props) => {
  const [validated, setValidated] = useState(false)
  const [picture, setPicture] = useState(null)
  const [beerName, beerErrors, setBeerName] = useTextField('text', 1, 50, true)
  const [breweryName, breweryErrors, setBreweryName] = useTextField('text', 1, 50, true)
  const [description, descriptionErrors] = useTextField('text', 0, 1000, false)
  const [alcohol, alcoholErrors, setAlcohol] = useNumberField('number', 0, 100, 0.1, true)
  const [bottled, bottledErrors, setBottled] = useNumberField('date', '1990-01-01', '2050-01-01', 1, false)
  const [aroma, , setAroma] = useNumberField('range', 1, 10, 1, true)
  const [taste, , setTaste] = useNumberField('range', 1, 10, 1, true)
  const [appearance, , setAppearance] = useNumberField('range', 1, 5, 1, true)
  const [mouthfeel, , setMouthfeel] = useNumberField('range', 1, 5, 1, true)
  const [overall, , setOverall] = useNumberField('range', 1, 20, 1, true)

  useEffect(() => {
    if (props.location.state) {
      const bottle = props.location.state.bottle

      setBeerName(bottle.beer.name)
      setBreweryName(bottle.beer.brewery.name)
      setAlcohol(bottle.beer.abv)
      if (bottle.bottled) {
        setBottled(moment(bottle.bottled).format('YYYY-MM-DD'))
      }
    }
    setAroma(5)
    setTaste(5)
    setMouthfeel(3)
    setAppearance(3)
    setOverall(10)
  }, [])

  const handleRate = async (event) => {
    event.preventDefault()
    setValidated(true)

    if (!event.target.checkValidity()) {
      return
    }
    
    try {
      let beer = null

      if (!props.beer) {
        let brewery = await props.getOneBrewery(breweryName.value)
        
        if (!brewery) {
          brewery = await props.addBrewery({ name: breweryName.value })
        }
  
        beer = await props.getOneBeer(brewery.id, beerName.value, alcohol.value)
  
        if (!beer) {
          beer = await props.addBeer({ breweryId: brewery.id, name: beerName.value, abv: alcohol.value })
        }
      }

      const newPicture = picture
        ? await props.addPicture(picture)
        : null

      const newRating = {
        beerId: props.beer === undefined ? beer.id : props.beer.id,
        description: description.value,
        ageofbeer: bottled ? moment(new Date()).diff(moment(bottled.value), 'months') : null,
        aroma: aroma.value,
        taste: taste.value,
        appearance: appearance.value,
        mouthfeel: mouthfeel.value,
        overall: overall.value,
        pictureId: newPicture ? newPicture.id : null
      }
  
      props.addRating(newRating)
      props.setNotification('New rating added!')
      props.history.push('/')

    } catch (exception) {
      props.setNotification('Adding a new rating failed!', 'error')
    }
  }

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center mb-2'>
            <h2>Rate beer</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col className='formstyle'>
          <Form noValidate validated={validated} onSubmit={handleRate} id='rateForm'>
            <InputGroup
              name='Brewery'
              state={breweryName}
              placeholder='brewery name'
              errors={breweryErrors}
            />
            <InputGroup
              name='Beer'
              state={beerName}
              placeholder='beers name'
              errors={beerErrors}
            />
            <InputGroup
              name='Abv'
              state={alcohol}
              placeholder='alcohol by volume'
              errors={alcoholErrors}
            />
            <InputGroup
              name='Bottled'
              state={bottled}
              errors={bottledErrors}
            />
            <Form.Group >
              <Form.Label>Aroma</Form.Label>
              <Form.Text>{aroma.value}</Form.Text>
              <Form.Control {...aroma} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Taste</Form.Label>
              <Form.Text>{taste.value}</Form.Text>
              <Form.Control {...taste} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Appearance</Form.Label>
              <Form.Text>{appearance.value}</Form.Text>
              <Form.Control {...appearance} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Mouthfeel</Form.Label>
              <Form.Text>{mouthfeel.value}</Form.Text>
              <Form.Control {...mouthfeel} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Overall</Form.Label>
              <Form.Text>{overall.value}</Form.Text>
              <Form.Control {...overall} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows='4' {...description} placeholder='describe your beer' />
              <Form.Control.Feedback type='invalid' >{descriptionErrors}</Form.Control.Feedback>
            </Form.Group>
            <ImageInputGroup picture={picture} setPicture={setPicture} />
            <Button type='submit' variant='success' block>Add rating</Button>
          </Form>
        </Col>
      </Row>    
    </Container>
  )
}

const mapDispatchToProps = {
  addBeer,
  getOneBeer,
  addBrewery,
  getOneBrewery,
  addRating,
  addPicture,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Rate))