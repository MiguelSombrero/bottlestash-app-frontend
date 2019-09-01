import React from 'react'
import { Jumbotron, Row, Col, Container } from 'react-bootstrap'
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
        <Col className='maindiv' style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
          <h3 className='mb-2'>Main features:</h3>
            <p>Save bottles to your stash</p>
            <p>Keep track of your beers expiration and drink them before</p>
            <p>Rate beers you drink</p>
            <p>Peek other user's cellars and see what beers they have</p>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv' style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
          <h3 className='mb-2'>So do we have a deal?</h3>
            <p>Perfect! Register for free and start collect some awesomeness in your stash!</p>
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