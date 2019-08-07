import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Col, Row } from 'react-bootstrap'
import { setUserToState } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBottlestashUser')
    props.setUserToState(null)
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
                <Link to={`/profile`} >{props.user.name}</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link to={`/users/${loggedUser(props.user.username)}/stash`} >Manage stash</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <div onClick={handleLogout} >Logout</div>
              </Nav.Link>
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

const mapDispatchToProps = { setUserToState }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))