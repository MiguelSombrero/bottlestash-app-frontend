import React, { useState, useEffect } from 'react'
import { Jumbotron, Row, Col, Button, CardColumns } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getAllRatings } from '../reducers/ratingsReducer'
import { getAllBottles } from '../reducers/bottlesReducer'
import Rating from './Rating'
import Bottle from './Bottle'

const Home = (props) => {
  const [visibleRatings, setVisibleRatings] = useState(6)
  const [visibleBottles, setVisibleBottles] = useState(6)

  useEffect(() => {
    props.getAllRatings()
  }, [])

  useEffect(() => {
    props.getAllBottles()
  }, [])

  const handleSetVisibleRatings = () => {
    setVisibleRatings(visibleRatings + 6)
  }

  const handleSetVisibleBottles = () => {
    setVisibleBottles(visibleBottles + 6)
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h1>Bottlestash</h1>
          <p>Cooler than wine cellar - wetter than Finnish summer</p>
        </Jumbotron>
      </Row>

      {!props.user &&
      <>
      <Row>
        <Col className='d-flex justify-content-center mb-2' >
          <h3>Bottlestash, eh?</h3>
          <p>
            That's right! Bottlestash let's you keep track of your
            beer cellar; what you have, how many bottles and when to drink them!
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2' >
          <h4>Main features:</h4>
          <ul>
            <li>Save bottles to your stash</li>
            <li>Keep track of your beers expiration</li>
            <li>Rate beers you drink</li>
            <li>Peek other user's cellars</li>
          </ul>
        </Col>
      </Row>
      </>
      }

      {props.user &&
      <>
      <Row>
        <Col className='text-center' >
          <h3>Welcome back, {props.user.name}</h3>
        </Col>
      </Row>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Recently added bottles:</h2>
        </Jumbotron>
      </Row>
      <Row>
        <CardColumns>
          {props.bottles.slice(0, visibleBottles).map(b =>
            <Bottle key={b.id} bottle={b} ></Bottle>
            )
          }
        </CardColumns>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          {props.bottles.length > visibleBottles &&
            <Button onClick={handleSetVisibleBottles}>Load more</Button>
          }
        </Col>
      </Row>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Recently added ratings:</h2>
        </Jumbotron>
      </Row>
      <Row>
        <CardColumns as={Col}>
          {props.ratings.slice(0, visibleRatings).map(rating =>
            <Rating key={rating.id} rating={rating} ></Rating>
            )
          }
        </CardColumns>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          {props.ratings.length > visibleRatings &&
            <Button onClick={handleSetVisibleRatings}>Load more</Button>
          }
        </Col>
      </Row>
      </>
      }
    </>
    
  )
}

const mapStateToProps = (state) => {
  return {
    ratings: state.ratings,
    bottles: state.bottles
  }
}

const mapDispatchToProps = {
  getAllRatings, getAllBottles
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)