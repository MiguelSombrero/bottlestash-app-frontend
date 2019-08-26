import React, { useState } from 'react'
import { Col, Table } from 'react-bootstrap'
import BottleDetails from './BottleDetails'
import moment from 'moment'

const Bottles = (props) => {
  const [visible, setVisible] = useState(false)
  const [bottle, setBottle] = useState(null)

  if (!props.stash) {
    return null
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleShowDetails = (b) => {
    setBottle(b)
    setVisible(true)
  }

  return (
    <Col style={{ maxWidth: '50em', margin: 'auto' }}>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Count</th>
            <th>Brewery</th>
            <th>Beer</th>
            <th>Expiration</th>
          </tr>
        </thead>
        <tbody >
          {props.stash.map(b =>
            <tr
              key={b.id}
              onClick={() => handleShowDetails(b)}
            >
              <td>{b.count}</td>
              <td>{b.beer.brewery.name}</td>
              <td>{b.beer.name}, {b.beer.abv} %</td>
              <td>{b.expiration ? moment(b.expiration).fromNow() : '-'}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <BottleDetails
        user={props.user}
        bottle={bottle}
        visible={visible}
        toggleVisibility={toggleVisibility}
      />
    </Col>
  )
}

export default Bottles