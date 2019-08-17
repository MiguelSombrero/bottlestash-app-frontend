import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Row } from 'react-bootstrap'
import { logoutUser } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logoutUser()
    props.setNotification('Logout was successfull')
    props.history.push('/')
  }

  const style = {
    color: '#ffac41'
  }

  return (
    <Navbar as={Row} collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <NavLink to='/' activeStyle={style} >Home</NavLink>
          </Nav.Link>

          {!props.user &&
            <>
              <Nav.Link href='#' as='span'>
                <NavLink to='/login' activeStyle={style} >Login</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <NavLink to='/register' activeStyle={style} >Create account</NavLink>
              </Nav.Link>
            </>
          }

          {props.user &&
            <>
              <Nav.Link href='#' as='span'>
                <NavLink to={`/users/${props.user.id}/stash`} activeStyle={style} >Manage stash</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <NavLink to={`/bottles`} activeStyle={style} >Add new bottle</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <NavLink to='/rate' activeStyle={style} >Rate beer</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <NavLink to='/profile' activeStyle={style} >Profile</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Nav.Item onClick={handleLogout} style={style} >Logout</Nav.Item>
              </Nav.Link>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapDispatchToProps = {
  logoutUser
}

export default connect(null, mapDispatchToProps)(withRouter(Navigation))