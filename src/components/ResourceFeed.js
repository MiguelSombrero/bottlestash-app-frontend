import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Rating from './Rating'
import Bottle from './Bottle'

const ResourceFeed = (props) => {
  const [visible, setVisible] = useState(5)
    
  const handleSetVisible = () => {
    setVisible(visible + 5)
  }

  const resourcesToShow = props.resources.slice(0, visible)
  
  return (
    <>
      <Row>
        <Col className='maindiv'>
          {resourcesToShow.map(r =>
            props.resource === 'rating'
              ? <Rating key={r.id} rating={r} ></Rating>
              : <Bottle key={r.id} bottle={r} ></Bottle>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          {props.resources.length > visible &&
            <Button onClick={handleSetVisible}>Load more ...</Button>
          }
        </Col>
      </Row>
    </>
  )
}

export default ResourceFeed