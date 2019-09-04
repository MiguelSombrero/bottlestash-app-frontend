import React from 'react'
import { connect } from 'react-redux'
import { Row, Alert, Col } from 'react-bootstrap'

const Notification = (props) => {
  if (!props.notification) {
    return null
  }

  return (
    <Row className='alert'>
      <Alert as={Col} className='text-center col-12' variant={props.notification.type === 'success' ? 'success' : 'danger'}>
        <h6>{props.notification.message}</h6>
      </Alert>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)