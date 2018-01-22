// @flow
import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import BoardSquare from './BoardSquare'
import Robot from './Robot'
import type {Robots} from './game'
import type {State} from './store'

type OwnProps = {}

type StateProps = {
  robots: Robots
}

type Props = OwnProps & StateProps

class BoardRender extends Component<Props> {

  renderPiece(robotId: string, x: number, y: number): ?React$Element<*> {
      if(robotId) {
        const {robots} = this.props
        const robot = robots[robotId]
        return (<Robot data={robot}/>)
      }
      return null
  }

  renderSquare(robotId: string, i: number): React$Element<*> {
    const x = i % 8
    const y = Math.floor(i / 8)
    return (
      <BoardSquare key={i} x={x} y={y}>
        {this.renderPiece(robotId, x, y)}
      </BoardSquare>
    )
  }

  render() {
    const {robots} = this.props
    const squares = Array(64).fill('')
    Object.keys(robots).forEach((robotId: string): void => {
        const robot = robots[robotId]
        const {position} = robot
        const index = position.x + 8 * position.y
        squares[index] = robotId
      })

    return (
        <div
          style={{
            border: '4px solid gray',
            display: 'flex',
            flexWrap: 'wrap',
            height: '512px',
            margin: '0 auto',
            width: '512px',
          }}
        >
          {squares.map(
              (robotId: string, index: number) =>
                (this.renderSquare(robotId, index))
          )}
      </div>
    )
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const robots = state.game.robots
  return {
    robots,
  }
}

const BoardContext = DragDropContext(HTML5Backend)(BoardRender)
const Board = connect(mapStateToProps, null)(BoardContext)
export default Board
