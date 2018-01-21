// @flow
import _ from 'lodash'
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
import type {GameAction, Position, Robots} from './game'
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

  renderFeedback(): React$Element<*> {
    // const {item} = this.props
    const style = {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    }
    return(
      <div
        style={style}
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

const calcDiagonals = (position: Position, distance: number): Array<Position> => {
  const diagonals = []
  const signs = [-1, 1]
  const delta = signs.map((sign: number) => (sign * distance))
  // diagonals
  delta.forEach((x: number): void => {
    const newX = position.x + x
    if (newX > -1 && newX < 8) {
      delta.forEach((y: number): void => {
        const newY = position.y + y
        if (newY > -1 && newY < 8) {
          diagonals.push({x: newX, y: newY})
        }
      })
    }
  })
  return diagonals
}

const calcMeeps = (position: Position, multiplier: number): Array<Position> => {
  const meeps = []
  const signs = [-2, 2]
  const delta = signs.map((sign: number) => (sign * multiplier))
  // horizonatal meep
  delta.forEach((x: number): void => {
    const newX = position.x + x
    if (newX > -1 && newX < 8) {
      meeps.push({x: newX, y: position.y})
    }
  })
  // vertical meep
  delta.forEach((y: number): void => {
    const newY = position.y + y
    if (newY > -1 && newY < 8) {
      meeps.push({x: position.x, y: newY})
    }
  })
  return meeps
}


const calcPossibleMoves = (position: Position, crowned: boolean): Array<Position> => {
  let possible = []
  if (crowned) {
    for(let i = 1; i < 8; i++) {
      const diagonals = calcDiagonals(position, i)
      possible = possible.concat(diagonals)
    }
    for(let i = 1; i < 4; i++) {
      const meeps = calcDiagonals(position, i)
      possible = possible.concat(meeps)
    }

  } else {
    const diagonals = calcDiagonals(position, 1)
    const meeps = calcMeeps(position, 1)
    possible = possible.concat(diagonals, meeps)
  }
  return possible
}

const getValidMoves = (robotId: string, robots: Robots): Array<Position> => {
  const robotData = robots[robotId]
  const {crowned, player, position} = robotData
  const robotIds = Object.keys(robots)
  const conflictIds = robotIds.filter((id: string): boolean => {
    const data = robots[id]
    return (id !== robotId && data.player === player)
  })
  const conflicts = conflictIds.map((id: string): Position => {
    const data = robots[id]
    return data.position
  })
  const possiblePos = calcPossibleMoves(position, crowned)
  const positionComparator = (item: Position, item2: Position): boolean => {
    return (item.x === item2.x && item.y === item2.y)
  }
  const validMoves = _.differenceWith(possiblePos, conflicts, positionComparator)
  return validMoves
}

const boardTarget = {
  canDrop: (props: Props, monitor: DropTargetMonitor): boolean => {
    const item = monitor.getItem()
    if (item) {
      const {robots} = props
      const validMoves = getValidMoves(item.id, robots)
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
