import React, { useState } from 'react'
import { Row, Col, Jumbotron, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Bottles from './Bottles'
import StashDetails from './StashDetails'

const Stash = (props) => {
  const [stashVisible, setStashVisible ] = useState(false)

  if (!props.userToView) {
    return null
  }

  const stash = props.userToView.stash

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{props.userToView.name} 's Stash</h2>
        </Jumbotron>
      </Row>

      {props.userToView.username === props.user.username && props.userToView.hidden &&
      <Row>
        <Col className='p-2 text-center'>
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
        This stash is private and cannot be peeked - sorry! 
      </Row>
      }

      {(props.userToView.username === props.user.username || !props.userToView.hidden) &&
      <Row>
        <Col md={3} style={{ maxWidth: '15rem' }} >
          <Nav justify className='flex-column'>
            <Nav.Link onClick={() => setStashVisible(!stashVisible)} as='span' className='p-2'>
              Stash details
            </Nav.Link>
            <Nav.Link as='span' className='p-2'>
              <NavLink to='/bottles'>Add new bottle</NavLink>
            </Nav.Link>
          </Nav>
        </Col>
        {!stashVisible &&
          <Bottles stash={stash} user={props.user} ></Bottles>
        }
        {stashVisible &&
          <StashDetails stash={stash}></StashDetails>
        }
      </Row>
      }
    </>
  )
}

export default (Stash)