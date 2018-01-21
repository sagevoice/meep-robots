// @flow
import React, {Component} from 'react'
import {DragDropContext, DropTarget} from 'react-dnd'
import type {
  ClientOffset,
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
import type {GameAction, Position, Robots} from './game'
import gamerules from './gamerules'
import type {State} from './store'

type OwnProps = {}

type CollectProps = {
  canDrop: boolean,
  connectDropTarget: ConnectDropTarget,
  isOver: boolean,
  item: Object,
  sourceClientOffset: ClientOffset,
}

type StateProps = {
  robots: Robots
}

type DispatchProps = {
  dropRobot: (x: number, y: number) => void
}

type Props = OwnProps & CollectProps & StateProps & DispatchProps

class BoardRender extends Component<Props> {

  renderFeedback(): React$Element<*> {
    const {item, robots, sourceClientOffset} = this.props
    const style = {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    }
    const validMoves = gamerules.getValidMoves(item.id, robots)
    const curPos = {
      x: Math.floor(sourceClientOffset.x / 64),
      y: Math.floor(sourceClientOffset.y / 64),
    }
    const isValidPos = gamerules.isValidMove(item.id, robots, curPos)
    const hightlightColor = isValidPos ? 'GreenYellow' : 'red'
    return(
      <div
        style={style}
      >
        {validMoves.map((pos: Position): React$Element<*> => (
            <div
              style={{
                border: '8px solid yellow',
                boxSizing: 'border-box',
                height: '64px',
                left: 64 * pos.x,
                opacity: '50%',
                position: 'absolute',
                top: 64 * pos.y,
                width: '64px',
              }}
            />
          ))
        }
        <div
          style={{
            backgroundColor: hightlightColor,
            height: '64px',
            left: 64 * curPos.x,
            opacity: '50%',
            position: 'absolute',
            top: 64 * curPos.y,
            width: '64px',
          }}
        />
      </div>
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
    const {connectDropTarget, isOver, robots} = this.props
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
            position: 'relative',
            width: '512px',
          }}
        >
          {squares.map(
              (robotId: string, index: number) =>
                (this.renderSquare(robotId, index))
          )}
          {isOver && this.renderFeedback()}
      </div>
    )
  }
}

const boardTarget = {
  canDrop: (props: Props, monitor: DropTargetMonitor): boolean => {
    const item = monitor.getItem()
    if (item) {
      const {robots} = props
      const validMoves = gamerules.getValidMoves(item.id, robots)
      return validMoves.length > 0
    }
    return false
  },

  drop: (props: Props, monitor: DropTargetMonitor): ?Object => {

  },

  hover: (props: Props, monitor: DropTargetMonitor): void => {

  },
}

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor): CollectProps => (
  {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem(),
    sourceClientOffset: monitor.getSourceClientOffset(),
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
