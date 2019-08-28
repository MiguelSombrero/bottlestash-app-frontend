import React from 'react'
import { Row, Col, Jumbotron } from 'react-bootstrap'

const About = () => {
  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
            <h2>About Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='maindiv'>
          <p>
            Bottlestash is my (Miika Somero) course project for University of
            Helsinki course <a href='https://fullstackopen.com/' >Full Stack Open 2019</a>.
          </p>
          <p>
            Project is about rehearsing web development with React and Node.js. See source code
            and documentation from my <a href='https://github.com/MiguelSombrero/bottlestash-app-backend' >Github</a> page
          </p>
        </Col>
      </Row>
    </>
  )
}

export default About