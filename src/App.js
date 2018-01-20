// @flow
import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './Board'

type Props = {}

class App extends Component<Props> {

  render() {
    return (
      <div>
        <div
          style={{
            width: 500,
            height: 500,
            border: '1px solid gray'
          }}>
          <Board/>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
