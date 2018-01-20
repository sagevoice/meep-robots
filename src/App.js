// @flow
import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './Board'

type Props = {}

class App extends Component<Props> {

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          width: '100%',
        }}
      >
        <header
          style={{
            flexShrink: 0,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h1>MEEP-ROBOTS</h1>
        </header>
        <main
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            flexWrap: 'nowrap',
            overflow: 'auto',
            width: '100%',
          }}
        >
          <div
            style={{
              flexShrink: 0,
            }}>
            <h1 style={{padding: '0.5em'}}>PLAYER 1</h1>
          </div>
          <div
            style={{
              flexGrow: 1,
              overflow: 'auto',
            }}>
            <Board/>
          </div>
          <div
            style={{
              flexShrink: 0,
            }}>
            <h1 style={{padding: '0.5em'}}>PLAYER 2</h1>
          </div>
        </main>
        <footer
          style={{
            flexShrink: 0,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <p>©2018 Noah Stafford & Jason Stafford</p>
        </footer>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
