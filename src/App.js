// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Board from './Board'
import type {State} from './store'

type OwnProps = {}

type StateProps = {
  whoseTurn: string
}

type Props = OwnProps & StateProps

class AppRender extends Component<Props> {

  render() {
    const {whoseTurn} = this.props
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
            }}
          >
            <h1
              style={{
                backgroundColor: 'LightGreen',
                color: 'DarkGreen',
                padding: '0.5em',
              }}
            >PLAYER 1</h1>
            {whoseTurn === 'p1' &&
              <h2
                style={{
                  padding: '0.5em',
                }}
              >Your turn.</h2>
            }
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
            <h1
              style={{
                backgroundColor: 'DeepSkyBlue',
                color: 'MediumBlue',
                padding: '0.5em',
              }}
            >PLAYER 2</h1>
            {whoseTurn === 'p2' &&
              <h2
                style={{
                  padding: '0.5em',
                }}
              >Your turn.</h2>
            }
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

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const whoseTurn = state.game.whoseTurn
  return {
    whoseTurn,
  }
}

const App = connect(mapStateToProps, null)(AppRender)
export default App
