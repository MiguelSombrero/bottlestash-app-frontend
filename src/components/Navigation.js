import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { setUserToState } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBottlestashUser')
    props.setUserToState(null)
  }

  const loggedUser = async () => {
    
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

          {props.user && props.users &&
            <div>
              <Nav.Item href='#' as='span'>
              <Link to={`/profile`} >{props.user.name}</Link>
              </Nav.Item>
              <Nav.Link href='#' as='span'>
                <Link to={`/stash/${loggedUser()}`} >Manage stash</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <div onClick={handleLogout} >Logout</div>
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
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = { setUserToState }

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)