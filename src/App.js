import React, {Component} from 'react'
import Board from './Board'
import {observe} from './Game'

class App extends Component {

  state = {
    knightPosition: [1, 7]
  }
  handleChange = (knightPosition) => {
    const nextState = {
      knightPosition
    }
    this.setState(nextState)
  }

  unobserve = observe(this.handleChange)

  componentWillUnmount() {
    this.unobserve()
  }

  render() {
    const {knightPosition} = this.state
    return (
      <div>
        <div
          style={{
            width: 500,
            height: 500,
            border: '1px solid gray'
          }}>
          <Board knightPosition={knightPosition}/>
        </div>
      </div>
    )
  }
}

export default App
