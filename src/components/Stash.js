import React, { useState } from 'react'
import { Row, Col, Jumbotron, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import BottlesTable from './BottlesTable'
import StashDetails from './StashDetails'

const Stash = (props) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  if (!props.userToView) {
    return null
  }

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{props.userToView.name} 's Stash</h2>
        </Jumbotron>
      </Row>

      {props.userToView.username === props.user.username && props.userToView.hidden &&
      <Row>
        <Col className='maindiv'>
          <p>
            Your stash is hidden and won't show to other users.
            If you wan't to make it visible to other users, please
            update visibility settings in your profile
          </p>
        </Col>
      </Row>
      }

      {props.userToView.username !== props.user.username && props.userToView.hidden &&
      <Row>
        <Col className='maindiv'>
          <p>This stash is private and cannot be peeked - sorry!</p>
        </Col>
      </Row>
      }

      {(props.userToView.username === props.user.username) &&
      <Row>
        <Col className='d-flex justify-content-center mb-4'>
          <Nav>
            <Nav.Link onClick={() => setDetailsVisible(!detailsVisible)} className='p-2'>
              {detailsVisible ? 'Back to stash' : 'Stash details'}
            </Nav.Link>
            <Nav.Link as='span' className='p-2'>
              <NavLink to='/bottles'>Add new bottle</NavLink>
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
      }
      {(props.userToView.username === props.user.username || !props.userToView.hidden) &&
      <Row className='mb-3'>
        {!detailsVisible
          ? <BottlesTable stash={props.userToView.stash} user={props.user} userToView={props.userToView}></BottlesTable>
          : <StashDetails stash={props.userToView.stash}></StashDetails>
        }
      </Row>
      }
    </Container>
  )
}

export default Stash