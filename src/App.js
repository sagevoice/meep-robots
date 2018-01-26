// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {newGame, resignGame} from './game'
import Board from './Board'
import type {State} from './store'

type OwnProps = {}

type StateProps = {
  gameOver: boolean,
  whoseTurn: string,
}

type DispatchProps = {
  startNewGame: () => void,
  resignGame: (player: string) => void,
}

type Props = OwnProps & StateProps & DispatchProps

class AppRender extends Component<Props> {

  newGameClick = (): void => {
    const {startNewGame} = this.props
    startNewGame()
  }

  resignClick = (player: string): void => {
    const {resignGame} = this.props
    resignGame(player)
  }

  render() {
    const {gameOver, whoseTurn} = this.props
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
          {gameOver &&
            <button onClick={this.newGameClick} style={{
                position: 'absolute',
                display: 'block',
                float: 'left',
                fontSize: 'large',
                fontWeight: 'bold',
                margin: '1em',
              }}>Start New Game</button>
          }
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
            {whoseTurn === 'p1' && !gameOver &&
              <h2
                style={{
                  padding: '0.5em',
                }}
              >Your turn.</h2>
            }
            {gameOver &&
              <h2
                style={{
                  padding: '0.5em',
                }}
              >GAME OVER</h2>
            }
            {!gameOver &&
              <button onClick={() => this.resignClick('p1')} style={{
                  fontSize: 'large',
                  fontWeight: 'bold',
                  margin: '1em',
                }}>Resign</button>
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
            {whoseTurn === 'p2' && !gameOver &&
              <h2
                style={{
                  padding: '0.5em',
                }}
              >Your turn.</h2>
            }
            {gameOver &&
              <h2
                style={{
                  padding: '0.5em',
                }}
              >GAME OVER</h2>
            }
            {!gameOver &&
              <button onClick={() => this.resignClick('p2')} style={{
                  fontSize: 'large',
                  fontWeight: 'bold',
                  margin: '1em',
                }}>Resign</button>
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
  const gameOver = state.game.gameOver
  return {
    gameOver,
    whoseTurn,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<GameAction>, ownProps: OwnProps): DispatchProps => (
  {
    startNewGame: (): void => {
      dispatch(newGame())
    },
    resignGame: (player: string): void => {
      dispatch(resignGame(player))
    },
  }
)


const App = connect(mapStateToProps, mapDispatchToProps)(AppRender)
export default App
