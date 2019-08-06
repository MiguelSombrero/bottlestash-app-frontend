import React from 'react'
import AddBottle from './AddBottle'
import Bottles from './Bottles'

const Stash = (props) => {
  if (!props.userToView) {
    return null
  }

  return (
    <div>
      <h2>{props.userToView.name} 's Stash</h2>
      <AddBottle />
      <Bottles bottles={props.userToView.stash} />
    </div>
  )
}

export default (Stash)