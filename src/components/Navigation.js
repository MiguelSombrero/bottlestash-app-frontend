import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Row, Card } from 'react-bootstrap'
import { logoutUser } from '../reducers/loginReducer'
import { setFilter } from '../reducers/filterReducer'
import SearchForm from './SearchForm'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logoutUser()
    props.setNotification('Logout was successfull')
    props.history.push('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    props.setFilter(e.target.filter.value)
    e.target.filter.value = ''
    props.history.push('/search')
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
                <NavLink to='/rate' >Rate beer</NavLink>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Nav.Item onClick={handleLogout} >Logout</Nav.Item>
              </Nav.Link>

              {!props.user.picture &&
                <Nav.Link href='#' as='span'>
                  <NavLink to='/profile' >Profile</NavLink>
                </Nav.Link>
              }
            </>
          }
        </Nav>
        
        {props.user &&
          <>
          {props.user.picture &&
            <NavLink to='/profile' >
              <Card.Img
                src={`/api/pictures/${props.user.picture}`}
                href='/profile'
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                className='avatar'
                alt='Profile'
              />
            </NavLink>
          }
          <SearchForm
            handleSearch={handleSearch}
            id='search'
          />
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapDispatchToProps = {
  logoutUser, setFilter
}

export default connect(null, mapDispatchToProps)(withRouter(Navigation))