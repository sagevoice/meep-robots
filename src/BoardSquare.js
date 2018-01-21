// @flow
import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import type {
  ConnectDropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd'
import {connect} from 'react-redux'
import {canMoveRobot, moveRobot} from './game'
import type {GameAction} from './game'
import ItemTypes from './ItemTypes'
import type {Robots} from './game'
import Square from './Square'
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
}

type StateProps = {
  robots: Robots
}

type DispatchProps = {
  dropRobot: (x: number, y: number) => void,
}

type Props = OwnProps & CollectProps & StateProps & DispatchProps

const squareTarget = {
  canDrop(props: Props): boolean {
    const {robots, item} = props
    if (item) {
      const robotPosition = robots[item.id]
      return canMoveRobot(robotPosition, props.x, props.y)
    }
    return false
  },

  drop(props: Props): void {
    props.dropRobot(props.x, props.y)
  }
}

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor): CollectProps => {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class BoardSquareRender extends Component<Props> {

  renderOverlay(color) {
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
      x,
      y,
      connectDropTarget,
      isOver,
      canDrop,
      children
    } = this.props
    const black = (x + y) % 2 === 1

    return connectDropTarget(
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
        <Square black={black}>{children}</Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>,
    )
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const robots = state.game.robots
  return {
    robots,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<GameAction>, ownProps: OwnProps): DispatchProps => (
  {
    dropRobot: (x: number, y:number): void => {
      dispatch(moveRobot(x, y))
    },
  }
)

const BoardSquareDropTarget = DropTarget(ItemTypes.ROBOT, squareTarget, collect)(BoardSquareRender)
const BoardSquare = connect(mapStateToProps, mapDispatchToProps)(BoardSquareDropTarget)

export default BoardSquare
