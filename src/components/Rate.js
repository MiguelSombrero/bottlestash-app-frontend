import React, { useState, useEffect } from 'react'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'
import { useTextField, useNumberField } from '../hooks'
import breweriesService from '../services/breweries'
import beersService from '../services/beers'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addBeer } from '../reducers/beersReducer'
import { addBrewery } from '../reducers/breweriesReducer'
import { addRating } from '../reducers/ratingsReducer'
import { addPicture } from '../reducers/picturesReducer'
import { setNotification } from '../reducers/notificationReducer'
import moment from 'moment'

const Rate = (props) => {
  const [validated, setValidated] = useState(false)
  const [picture, setPicture] = useState(null)
  const [beerName, beerErrors, setBeerName] = useTextField('text', 1, 50, true)
  const [breweryName, breweryErrors, setBreweryName] = useTextField('text', 1, 50, true)
  const [description, descriptionErrors] = useTextField('text', 0, 1000, false)
  const [alcohol, alcoholErrors, setAlcohol] = useNumberField('number', 0, 100, 0.1, true)
  const [bottled, bottledErrors, setBottled] = useNumberField('date', '1990-01-01', '2050-01-01', 1, false)
  const [aroma] = useNumberField('range', 1, 10, 1, true)
  const [taste] = useNumberField('range', 1, 10, 1, true)
  const [appearance] = useNumberField('range', 1, 5, 1, true)
  const [mouthfeel] = useNumberField('range', 1, 5, 1, true)
  const [overall] = useNumberField('range', 1, 20, 1, true)

  useEffect(() => {
    if (props.location.state) {
      const bottle = props.location.state.bottle

      setBeerName(bottle.beer.name)
      setBreweryName(bottle.beer.brewery.name)
      setAlcohol(bottle.beer.abv)
      setBottled(moment(bottle.bottled).format('YYYY-MM-DD'))
    }
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
        let brewery = await breweriesService.getOne(breweryName.value)
        
        if (!brewery) {
          brewery = await props.addBrewery({ name: breweryName.value })
        }
  
        beer = await beersService.getOne({ breweryId: brewery.id, name: beerName.value, abv: alcohol.value })
  
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
    <>
      <Row>
        <Jumbotron as={Col} className='text-center mb-2'>
            <h2>Rate beer</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col style={{ maxWidth: '25rem', margin: 'auto' }}>
          <Form noValidate validated={validated} onSubmit={handleRate} id='rateForm'>
            <Form.Group >
              <Form.Label>Brewery</Form.Label>
              <Form.Control {...breweryName} placeholder='name of brewery' />
              <Form.Control.Feedback type='invalid' >{breweryErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Beer</Form.Label>
              <Form.Control {...beerName} placeholder='name of beer' />
              <Form.Control.Feedback type='invalid' >{beerErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Abv</Form.Label>
              <Form.Control {...alcohol} placeholder='alcohol volume' />
              <Form.Control.Feedback type='invalid' >{alcoholErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Bottled</Form.Label>
              <Form.Control {...bottled} placeholder='(optional)' />
              <Form.Control.Feedback type='invalid' >{bottledErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Aroma</Form.Label>
              <Form.Text>{aroma.value || 0}</Form.Text>
              <Form.Control {...aroma} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Taste</Form.Label>
              <Form.Text>{taste.value || 0}</Form.Text>
              <Form.Control {...taste} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Appearance</Form.Label>
              <Form.Text>{appearance.value || 0}</Form.Text>
              <Form.Control {...appearance} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Mouthfeel</Form.Label>
              <Form.Text>{mouthfeel.value || 0}</Form.Text>
              <Form.Control {...mouthfeel} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Overall</Form.Label>
              <Form.Text>{overall.value || 0}</Form.Text>
              <Form.Control {...overall} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows='4' {...description} placeholder='describe your beer' />
              <Form.Control.Feedback type='invalid' >{descriptionErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='custom-file mb-4 p-2'>
              <Form.Label className='custom-file-label'>Click to add pic of your beer</Form.Label>
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
            <Button type='submit' variant='success' block>Add rating</Button>
          </Form>
        </Col>
      </Row>    
    </>
  )
}

const mapDispatchToProps = {
  addBeer,
  addBrewery,
  addRating,
  addPicture,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Rate))