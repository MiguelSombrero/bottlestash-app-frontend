import React, { useState } from 'react'
import { Col, Table } from 'react-bootstrap'
import BottleDetails from './BottleDetails'

const Bottles = (props) => {
  const [showDetails, setShowDetails] = useState(false)
  const [bottle, setBottle] = useState(null)

  if (!props.stash) {
    return null
  }

  const handleShowDetails = (b) => {
    setBottle(b)
    setShowDetails(true)
  }

  return (
    <Col>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Count</th>
            <th>Brewery</th>
            <th>Beer</th>
          </tr>
        </thead>
        <tbody>
          {props.stash.map(b => 
            <tr
              key={b.id}
              onClick={() => handleShowDetails(b)}
            >
              <td>{b.count}</td>
              <td>{b.beer.brewery.name}</td>
              <td>{b.beer.name}, {b.beer.abv} %</td>
            </tr>
          )}
        </tbody>
      </Table>
      <BottleDetails show={showDetails} setShow={setShowDetails} bottle={bottle} user={props.user} ></BottleDetails>
    </Col>
  )
}

export default Bottles