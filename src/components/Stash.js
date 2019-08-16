import React from 'react'
import { Row, Col, Jumbotron, Accordion, Card, CardColumns } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Bottle from './Bottle'

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
      <Row>
        <Accordion as={Col} >
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            Peek
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body >
              <p>You have {stash.length} different beers in your stash</p>
              <Link to={`/bottles`}>Add new bottle to your stash</Link>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Row>
      <Row>
        <CardColumns >
          {stash.map(bottle =>
            <Bottle key={bottle.id} bottle={bottle} user={props.user} />
          )}
        </CardColumns>
      </Row>
    </>
  )
}

export default (Stash)