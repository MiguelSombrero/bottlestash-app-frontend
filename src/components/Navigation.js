import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { setUserToState } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBottlestashUser')
    props.setUserToState(null)
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/' >Home</Link>
          </Nav.Link>

          {!props.user &&
            <div>
              <Nav.Link href='#' as='span'>
                <Link to='/login' >Login</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link to='/register' >Create account</Link>
              </Nav.Link>
            </div>
          }

          {props.user &&
            <div>
              <Nav.Link href='#' as='span'>
                <Link to='/stash' >Manage stash</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Button className='btn nav-link' onClick={handleLogout} >Logout</Button>
              </Nav.Link>
            </div>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = { setUserToState }

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)