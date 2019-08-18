import React from 'react'
import { Row, Col, Jumbotron, Accordion, Card, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Bottles from './Bottles'

const Stash = (props) => {
  if (!props.userToView) {
    return null
  }

  const stash = props.userToView.stash

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='d-flex justify-content-center mb-2'>
          <h2>{props.userToView.name} 's Stash</h2>
        </Jumbotron>
      </Row>

      {props.userToView.username === props.user.username && props.userToView.hidden &&
      <Row>
        Your stash is hidden and won't show to other users.
        If you wan't to make it visible to other users, please
        update visibility settings in your <NavLink to='/profile'>Profile</NavLink>
      </Row>
      }

      {props.userToView.username !== props.user.username && props.userToView.hidden &&
      <Row>
        This stash is private and cannot be peeked - sorry! 
      </Row>
      }

      {props.userToView.username === props.user.username &&
      <Row>
        <Accordion as={Col} className='text-center'>
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            <Card.Text>Click here to see details of your stash</Card.Text>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body >
              <NavLink to='/bottles'>Add new bottle</NavLink>
              <Card.Text>You have {stash.length} different beers in your stash</Card.Text>
              <Card.Text>You have {stash.reduce((sum, bottle) => sum + bottle.count, 0)} bottles in your stash</Card.Text>
              <Card.Text>Your stash costs {stash.reduce((sum, bottle) => sum + bottle.price, 0)}</Card.Text>
              <Card.Text>Your stash has {stash.reduce((sum, bottle) => sum + bottle.volume, 0)} beer</Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Row>
      }

      {(props.userToView.username === props.user.username || !props.userToView.hidden) &&
      <Row>
        <Bottles stash={stash} ></Bottles>
      </Row>
      }
    </>
  )
}

export default (Stash)