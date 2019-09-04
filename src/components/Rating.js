import React from 'react'
import { Card, Table, Badge, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const Rating = ({ rating }) => {

  const score = () => rating.overall + rating.aroma + rating.taste + rating.mouthfeel + rating.appearance

  return (
    <Card className='text-center p-2 m-2'>
      <Card.Header style={{ backgroundColor: 'white', color: 'rgb(52, 58, 64)' }}>
        <Card.Title>
          <NavLink to={`/beers/${rating.beer.id}`} >{rating.beer.name} {rating.beer.abv} %</NavLink>
        </Card.Title>
        <Row>
          <Col>
            <small>
              brewery: <NavLink to={`/breweries/${rating.beer.brewery.id}`} >{rating.beer.brewery.name}</NavLink>
            </small>
          </Col>
        </Row>
        <Row>
          <Col>
            {rating.ageofbeer &&
              <small>rated: {rating.ageofbeer} months age</small>
            }
          </Col>
        </Row>
      </Card.Header>
      <Table responsive>
          <thead>
            <tr>
              <th><small className='text-muted'>aroma</small></th>
              <th><small className='text-muted'>taste</small></th>
              <th><small className='text-muted'>mouthfeel</small></th>
              <th><small className='text-muted'>appearance</small></th>
              <th><small className='text-muted'>overall</small></th>
              <th><small>score</small></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><small className='text-muted'>{rating.aroma}/10</small></td>
              <td><small className='text-muted'>{rating.taste}/10</small></td>
              <td><small className='text-muted'>{rating.mouthfeel}/5</small></td>
              <td><small className='text-muted'>{rating.appearance}/5</small></td>
              <td><small className='text-muted'>{rating.overall}/20</small></td>
              <td><Badge variant='warning' >{score()}/50</Badge></td>
            </tr>
          </tbody>
        </Table>
      <Card.Body>
        {rating.picture &&
          <Card.Img src={`/api/pictures/${rating.picture}`} className='img-thumbnail' alt='' />
        }

        <blockquote className='blockquote mt-2'>{rating.description}</blockquote>
        <footer className='blockquote-footer'> <cite>{rating.user.name}</cite></footer>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          by <NavLink to={`/users/${rating.user.id}/stash`} >{rating.user.name}</NavLink>, {moment(rating.added).fromNow()}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Rating