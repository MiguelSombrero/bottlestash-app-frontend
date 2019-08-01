import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = (props) => {
  console.log(props.user)
  return (
    <div>
      {props.user.name}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)