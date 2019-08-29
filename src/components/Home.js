import React, { useState } from 'react'
import { Jumbotron, Row, Col, Button } from 'react-bootstrap'
import Bottle from './Bottle'
import { NavLink } from 'react-router-dom'
import Ratings from './Ratings'

const Home = (props) => {
  const [visibleBottles, setVisibleBottles] = useState(6)

  const handleSetVisibleBottles = () => {
    setVisibleBottles(visibleBottles + 6)
  }

  const byAdded = (a, b) => b.added > a.added ? 1 : -1
  const byHidden = b => !b.user.hidden

  const bottlesToShow = props.bottles
    .filter(byHidden)
    .sort(byAdded)
    .slice(0, visibleBottles)

  const ratingsToShow = props.ratings.sort(byAdded)
  
  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h1>Bottlestash</h1>
          <h5>Cooler than your wine cellar - wetter than Finnish summer</h5>
          <h6>(or something as lame)</h6>
        </Jumbotron>
      </Row>

      {!props.user &&
      <div className='home' style={{ marginTop: '-2rem' }}>
      <Row>
        <Col className='maindiv mt-4' style={{ backgroundColor: 'rgba(245, 245, 245, 0.9)' }}>
          <h2 className='mb-3'>Bottlestash, eh?</h2>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgba(245, 245, 245, 0.9)' }} >
          <section>
            <h3 className='mb-3'>
              That's right mate!
            </h3>
            <p>
              Bottlestash is an app which let you keep track of your beer cellar.
              Because lets face it; you like beer. So do I - it's allright!
            </p>
            <p>
              So you have lot's of good beer in your cellar - or more likely - in
              your wardrope. Not really sure what and how many bottles, or is their
              expiration day long gone.
            </p>
            <p>
              Bottlestash helps you with that! With Bottlestash you can keep track of your beer cellar, 
              so you can easily track what beers do you have, how many bottles and when to drink them!
            </p>
          </section>
          
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgba(245, 245, 245, 0.9)' }}>
          <h3 className='mb-2'>Main features:</h3>
            <p>Save bottles to your stash</p>
            <p>Keep track of your beers expiration and drink them before</p>
            <p>Rate beers you drink</p>
            <p>Peek other user's cellars and see what beers they have</p>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgba(245, 245, 245, 0.9)' }}>
          <h3 className='mb-2'>So do we have a deal?</h3>
            <p>Perfect! Register for free and start collect some awesomeness in your stash!</p>
            <NavLink to='/register'>To registration</NavLink>
        </Col>
      </Row>
      </div>
      }

      {props.user &&
      <>
      <Row>
        <Col className='maindiv'>
          <h3>Recently added bottles</h3>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' >
          {bottlesToShow.map(b =>
            <Bottle key={b.id} bottle={b} ></Bottle>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-3'>
          {props.bottles.length > visibleBottles &&
            <Button onClick={handleSetVisibleBottles}>Load more ...</Button>
          }
        </Col>
      </Row>
      <Row>
        <Col className='maindiv'>
          <h3>Recently added ratings</h3>
        </Col>
      </Row>
      <Ratings ratings={ratingsToShow} />
      </>
      }
    </>
    
  )
}

export default Home