// @flow
import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './Board'
import {observe} from './Game'

type Props = {}
type LocalState = {
  knightPosition: Array<number>,
}
class App extends Component<Props, LocalState> {

  state = {
    knightPosition: [1, 7]
  }
  handleChange = (knightPosition: Array<number>): void => {
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

export default DragDropContext(HTML5Backend)(App)
