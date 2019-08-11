import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Row, Dropdown } from 'react-bootstrap'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logoutUser()
    props.setNotification('Logout was successfull')
    props.history.push('/')
  }

  return (
    <Navbar as={Row} collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <NavLink to='/' >Home</NavLink>
          </Nav.Link>

          {!props.user &&
            <>
              <Nav.Link href='#' as='span'>
                <NavLink to='/login' >Login</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <NavLink to='/register' >Create account</NavLink>
              </Nav.Link>
            </>
          }

          {props.user &&
            <>
              <Nav.Link href='#' as='span'>
                <NavLink to={`/users/${props.user.id}/stash`} >Manage stash</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <NavLink to='/rate' >Rate</NavLink>
              </Nav.Link>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link}>
                  Settings
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <NavLink to={{ pathname: '/profile', state: { user: props.user } }}>Profile</NavLink>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapDispatchToProps = {
  logoutUser,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Navigation))