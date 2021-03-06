import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Row, Card, Col, Container } from 'react-bootstrap'
import { logoutUser } from '../reducers/loginReducer'
import { setFilter } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'
import SearchForm from './SearchForm'

const Navigation = (props) => {

  const handleLogout = () => {
    try {
      props.logoutUser()
      props.setNotification('Logout was successfull')
      props.history.push('/')
    } catch (exception) {
      props.setNotification('Logout failed!', 'error')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    props.setFilter(e.target.filter.value)
    e.target.filter.value = ''
    props.history.push('/search')
  }

  return (
    <Container fluid>
      <Row>
        <Navbar as={Col} collapseOnSelect expand='lg' bg='dark' variant='dark'>
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
                <Nav.Link href='#'>
                  <Nav.Item onClick={handleLogout} >Logout</Nav.Item>
                </Nav.Link>
              </>
              }
            </Nav>
        
            {props.user &&
            <>
              {!props.user.picture &&
                <Nav.Link href='#' as='span' >
                  <NavLink to='/profile' >Profile</NavLink>
                </Nav.Link>
              }
              {props.user.picture &&
                <NavLink to='/profile' >
                  <Card.Img
                    src={`/api/pictures/${props.user.picture}`}
                    href='/profile'
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
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
      </Row>
    </Container>
  )
}

const mapDispatchToProps = {
  logoutUser,
  setFilter,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Navigation))