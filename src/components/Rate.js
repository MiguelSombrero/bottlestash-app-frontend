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
import { setNotification } from '../reducers/notificationReducer'

const Rate = (props) => {
  const [validated, setValidated] = useState(false)
  const [beerName, beerErrors, setBeerName] = useTextField('text', 1, 50, true)
  const [breweryName, breweryErrors, setBreweryName] = useTextField('text', 1, 50, true)
  const [description, descriptionErrors] = useTextField('text', 0, 1000, false)
  const [alcohol, alcoholErrors, setAlcohol] = useNumberField('number', 0, 100, 0.1, true)
  const [ageofbeer, ageofbeerErrors, setAgeofbeer] = useNumberField('number', 0, 360, 1, false)
  const [aroma] = useNumberField('range', 0, 10, 1, true)
  const [taste] = useNumberField('range', 0, 10, 1, true)
  const [appearance] = useNumberField('range', 0, 5, 1, true)
  const [mouthfeel] = useNumberField('range', 0, 5, 1, true)
  const [overall] = useNumberField('range', 0, 20, 1, true)

  useEffect(() => {
    if (props.location.state) {
      const bottle = props.location.state.bottle

      setBeerName(bottle.beer.name)
      setBreweryName(bottle.beer.brewery.name)
      setAlcohol(bottle.beer.abv)
      //setAgeofbeer()
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
      
      const newRating = {
        beerId: props.beer === undefined ? beer.id : props.beer.id,
        description: description.value,
        ageofbeer: ageofbeer.value,
        aroma: aroma.value,
        taste: taste.value,
        appearance: appearance.value,
        mouthfeel: mouthfeel.value,
        overall: overall.value
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
            <h2>Give rating to this beer</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col style={{ maxWidth: '25rem', margin: 'auto' }}>
          <Form noValidate validated={validated} onSubmit={handleRate} id='rateForm'>
            <Form.Group >
              <Form.Label>Brewery</Form.Label>
              <Form.Control {...breweryName} />
              <Form.Control.Feedback type='invalid' >{breweryErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Beer</Form.Label>
              <Form.Control {...beerName} />
              <Form.Control.Feedback type='invalid' >{beerErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Abv</Form.Label>
              <Form.Control {...alcohol} />
              <Form.Control.Feedback type='invalid' >{alcoholErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Beers age when drinked</Form.Label>
              <Form.Control {...ageofbeer} />
              <Form.Control.Feedback type='invalid' >{ageofbeerErrors}</Form.Control.Feedback>
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
              <Form.Control as='textarea' rows='4' {...description} />
              <Form.Control.Feedback type='invalid' >{descriptionErrors}</Form.Control.Feedback>
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
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Rate))