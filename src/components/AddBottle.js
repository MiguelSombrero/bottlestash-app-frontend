import React from 'react'
import { connect } from 'react-redux'
import { addBeer } from '../reducers/beersReducer'
import { addBrewery } from '../reducers/breweriesReducer'
import { addBottle } from '../reducers/bottlesReducer'
import { withRouter } from 'react-router-dom'
import breweriesService from '../services/breweries'
import beersService from '../services/beers'
import bottlesService from '../services/bottles'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'

const AddBottle = (props) => {

  const handleAddBottle = async (event) => {
    event.preventDefault()

    const breweryName = event.target.brewery.value
    const name = event.target.name.value
    const abv = event.target.abv.value
    const price = event.target.price.value
    const count = event.target.count.value
    const volume = event.target.volume.value
    const bottled = event.target.bottled.value
    const expiration = event.target.expiration.value

    try {
      let brewery = await breweriesService.getOne(breweryName)
      
      if (!brewery) {
        brewery = await breweriesService.create({ name: breweryName })
        props.addBrewery(brewery)
      }

      let beer = await beersService.getOne({ breweryId: brewery.id, name, abv })

      if (!beer) {
        beer = await beersService.create({ breweryId: brewery.id, name, abv })
        props.addBeer(beer)
      }

      await bottlesService.create({
        price, count, volume, bottled, expiration, beerId: beer.id
      })


      // nyt pullo on lisätty tietokantaan sekä pullo skeemaan että kirjautuneelle käyttäjälle
      // kirjautuneen käyttäjän tiedot ei kuitenkaan ole päivittyneet tilassa
      // mieti miten tämä kannattaisi ratkaista: haetaanko tässä kirjautuneen käyttäjän
      // tiedot kannasta ja viedään tilaan tjs?

      // props.history.push(`/users/${props.user.id}/stash`)
      // mieti myös tässä ohjausta: ei ole olemassa props.user.id

    } catch (exception) {
      console.log('error hehee')
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
              <Form.Control
                type='text'
                name='brewery'
                placeholder='name of the brewery'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='name of your beer'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Abv</Form.Label>
              <Form.Control
                type='number'
                step='0.1'
                min='0.0'
                max='100.0'
                name='abv'
                placeholder='alcohol %'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Count</Form.Label>
              <Form.Control
                type='number'
                min='0'
                max='50'
                name='count'
                placeholder='number of bottles to save'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                min='0.00'
                max='10.00'
                name='volume'
                placeholder='volume of the bottle in litres'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                min='0.00'
                max='1000.00'
                name='price'
                placeholder='price of an one bottle'
              />
            </Form.Group>
            <Form.Row>
              <Form.Group className='p-2'>
                <Form.Label>Bottled</Form.Label>
                <Form.Control
                  type='date'
                  name='bottled'
                  placeholder='day beer was bottled'
                />
              </Form.Group>
              <Form.Group className='p-2'>
                <Form.Label>Expiration</Form.Label>
                <Form.Control
                  type='date'
                  name='expiration'
                  placeholder='expiration day of bottles'
                />
              </Form.Group>
            </Form.Row>
            <Button variant='success' type='submit' block>Add beer</Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addBeer, addBottle, addBrewery
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddBottle))