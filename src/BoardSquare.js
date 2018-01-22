// @flow
import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import type {
  ClientOffset,
  ConnectDropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from 'react-dnd'
import {connect} from 'react-redux'
import ItemTypes from './ItemTypes'
import {moveRobot} from './game'
import type {GameAction, Robots} from './game'
import gamerules from './gamerules'
import type {State} from './store'

type OwnProps = {
  children: React$Node,
  x: number,
  y: number,
}

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
  dropRobot: (robotId: string, x: number, y: number) => void
}

type Props = OwnProps & CollectProps & StateProps & DispatchProps

class BoardSquareRender extends Component<Props> {

  renderOverlay(color: string): React$Element<*> {
    return (
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
        }}/>
    )
  }

  render() {
    const {
      canDrop,
      children,
      connectDropTarget,
      isOver,
      x,
      y,
    } = this.props
    const player1 = (x + y) % 2 === 0
    const backgroundColor = player1
      ? 'LightGreen'
      : 'DeepSkyBlue'

    return connectDropTarget(
      <div
        style={{
          backgroundColor,
          height: '12.5%',
          position: 'relative',
          width: '12.5%',
        }}>
        {children}
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    )
  }
}

const boardTarget = {
  canDrop: (props: Props, monitor: DropTargetMonitor): boolean => {
    const item = monitor.getItem()
    if (item) {
      const {robots, x, y} = props
      return gamerules.isValidMove(item.id, robots, {x, y})
    }
    return false
  },

  drop: (props: Props, monitor: DropTargetMonitor): ?Object => {
    const {dropRobot, x, y} = props
    const item = monitor.getItem()
    dropRobot(item.id, x, y)
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
    dropRobot: (robotId: string, x: number, y: number): void => {
      dispatch(moveRobot(robotId, x, y))
    },
  }
)
const BoardSquareDropTarget = DropTarget(ItemTypes.ROBOT, boardTarget, collect)(BoardSquareRender)
const BoardSquare = connect(mapStateToProps, mapDispatchToProps)(BoardSquareDropTarget)
export default BoardSquare
