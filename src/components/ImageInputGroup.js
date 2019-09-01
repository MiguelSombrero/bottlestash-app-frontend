import React from 'react'
import { Form, Card } from 'react-bootstrap'

const ImageInputGroup = (props) => {
  return (
    <Form.Group className='custom-file mb-2'>
      <Form.Label className='custom-file-label'>Click to add picture</Form.Label>
      <Form.Control
        name='picture'
        className='custom-file-input'
        type='file'
        accept='image/*'
        onChange={({ target }) => props.setPicture(target.files[0])}
      />
      {props.picture &&
        <Card className='mt-2' onClick={() => props.setPicture(null)}>
          <Card.Img
            src={URL.createObjectURL(props.picture)}
            alt=''
            className='img-thumbnail'
          />
        </Card>
      }
    </Form.Group>
  )
}

export default ImageInputGroup