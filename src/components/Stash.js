import React from 'react'
import AddBottle from './AddBottle'
import Bottles from './Bottles'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Stash = (props) => {
  if (!props.userToView) {
    return null
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col}>
          <h2>{props.userToView.name} 's Stash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col>
          <Link to={`/users/${props.userToView.id}/bottles`}>Add new bottle to your stash</Link>
        </Col>
      </Row>
      <Row>
        <Bottles bottles={props.userToView.stash} />
      </Row>
    </>
  )
}

export default (Stash)