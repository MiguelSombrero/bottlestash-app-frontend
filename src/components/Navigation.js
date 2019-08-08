import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Row, Dropdown } from 'react-bootstrap'
import { logoutUser } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logoutUser()
    props.history.push('/')
  }

  const loggedUser = (username) => {
    const logged = props.users.find(user => user.username === username)
    return logged === undefined
      ? 1
      : logged.id
  }

  return (
    <Navbar as={Row} collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/' >Home</Link>
          </Nav.Link>

          {!props.user &&
            <>
              <Nav.Link href='#' as='span'>
                <Link to='/login' >Login</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link to='/register' >Create account</Link>
              </Nav.Link>
            </>
          }

          {props.user &&
            <>
              <Nav.Link href='#' as='span'>
                <Link to={`/users/${loggedUser(props.user.username)}/stash`} >Manage stash</Link>
              </Nav.Link>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link}>
                  Settings
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <Link to={`/profile`} >Profile</Link>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = { logoutUser }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))