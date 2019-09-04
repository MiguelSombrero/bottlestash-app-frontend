import React from 'react'
import { Jumbotron, Row, Col, Container, ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import ResourceFeed from './ResourceFeed'

const Home = (props) => {
  
  const byAdded = (a, b) => b.added > a.added ? 1 : -1
  const byHidden = b => !b.user.hidden

  const bottlesToShow = props.bottles.filter(byHidden).sort(byAdded)
  const ratingsToShow = props.ratings.sort(byAdded)
  
  const showToLoggedUser = () => {
    return (
      <>
      <Row>
        <Col className='maindiv'>
          <h2 style={{ color: 'white', textShadow: '2px 2px 5px black' }}>Recently added bottles</h2>
        </Col>
      </Row>
      <ResourceFeed resources={bottlesToShow} resource='bottle' />
      <Row>
        <Col className='maindiv'>
          <h2 style={{ color: 'white', textShadow: '2px 2px 5px black' }}>Recently added ratings</h2>
        </Col>
      </Row>
      <ResourceFeed resources={ratingsToShow} resource='rating' />
    </>
    )
  }

  const showToVisitor = () => {
    return (
      <>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgb(245, 245, 245)' }} >
          <section>
            <h2 className='mb-3'>Bottlestash, eh?</h2>
            <h6 className='mb-4'>
              That's right mate! Bottlestash is an app which lets you keep track of your beer cellar.
              Because lets face it; you like beer. So do I - it's allright!
            </h6>
            <h6>
              With Bottlestash you can manage your beer cellar, 
              so you can easily track what beers you have, how many bottles and when to drink them!
            </h6>
          </section>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
          <h2 className='mb-3'>Main features:</h2>
            <ListGroup variant='flush'>
              <ListGroup.Item><h6>Save bottles to your stash</h6></ListGroup.Item>
              <ListGroup.Item><h6>Keep track of your beers expiration and drink them before</h6></ListGroup.Item>
              <ListGroup.Item><h6>Rate beers you drink</h6></ListGroup.Item>
              <ListGroup.Item><h6>Peek other user's cellars and see what beers they have</h6></ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
          <h6 className='mb-2'>Register now - it's free!</h6>
            <NavLink to='/register'>To registration</NavLink>
        </Col>
      </Row>
      </>
    )
  }

  return (
    <Container fluid className='home'>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h1>Bottlestash</h1>
          <h5>Cooler than your wine cellar - wetter than Finnish summer</h5>
          <h6>(or something similar)</h6>
        </Jumbotron>
      </Row>

      {props.user
        ? showToLoggedUser()
        : showToVisitor()
      }

    </Container>
    
  )
}

export default Home