// @flow
import React, {Component} from 'react'
import {DragDropContext, DropTarget} from 'react-dnd'
import type {
  ConnectDropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import BoardSquare from './BoardSquare'
import ItemTypes from './ItemTypes'
import Robot from './Robot'
import {moveRobot} from './game'
import type {GameAction, Robots} from './game'
import type {State} from './store'

type OwnProps = {}

type CollectProps = {
  canDrop: boolean,
  connectDropTarget: ConnectDropTarget,
  isOver: boolean,
  item: Object
}

type StateProps = {
  robots: Robots
}

type DispatchProps = {
  dropRobot: (x: number, y: number) => void
}

type Props = OwnProps & CollectProps & StateProps & DispatchProps

class BoardRender extends Component<Props> {

  renderOverlay(color: string): React$Element<*> {
    return(
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color
        }}
      />
    )
  }

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
    const {connectDropTarget, robots} = this.props
    const squares = Array(64).fill('')
    Object.keys(robots).forEach((robotId: string): void => {
        const robot = robots[robotId]
        const {position} = robot
        const index = position.x + 8 * position.y
        squares[index] = robotId
      })

    return connectDropTarget(
        <div
          style={{
            border: '4px solid gray',
            display: 'flex',
            flexWrap: 'wrap',
            height: '512px',
            margin: '0 auto',
            width: '512px'
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

const boardTarget = {
  canDrop(props: Props): boolean {
    return true
  },

  drop(props: Props): void {
    // props.dropRobot(props.x, props.y)
  }
}

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor): CollectProps => (
  {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  }
)

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const robots = state.game.robots
  return {
    robots,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<GameAction>, ownProps: OwnProps): DispatchProps => (
  {
    dropRobot: (x: number, y: number): void => {
      dispatch(moveRobot(x, y))
    },
  }
)

const BoardDropTarget = DropTarget(ItemTypes.ROBOT, boardTarget, collect)(BoardRender)
const BoardContext = DragDropContext(HTML5Backend)(BoardDropTarget)
const Board = connect(mapStateToProps, mapDispatchToProps)(BoardContext)
export default Board
