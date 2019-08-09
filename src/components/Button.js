import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const LoadableButton = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      props.handleThis()
    }
    setIsLoading(false)
  }, [isLoading])

  const handleClick = () => setIsLoading(true)

  return (
    <Button type='submit' onClick={!isLoading ? handleClick : null} disable={isLoading} >
      {isLoading ? 'Loading ...' : props.text}
    </Button>
  )
}

export default LoadableButton