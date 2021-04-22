import React from 'react'
import {connect} from 'react-redux'
import Navbar from './navbar'

/**
 * COMPONENT
 */
export const Home = props => {
  //const {username} = props

  return (
    <div>
      <h2>Welcome To Grace Hopper</h2>
      <p>Your #1 Place To Buy All Things That Hop!</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
