// @flow
import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import type {
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
}

type StateProps = {
  robots: Robots
}

type DispatchProps = {
  dropRobot: (robotId: string, x: number, y: number) => void
}

type Props = OwnProps & CollectProps & StateProps & DispatchProps

class BoardSquareRender extends Component<Props> {

  renderInvalidTarget(): React$Element<*> {
    return (
      <div
        style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <svg
          height="80%"
          style={{
            display: 'block',
            margin: '10%',
          }}
          version="1.1"
          viewBox="0 0 512 512"
          width="90%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="256" cy="256" r="232" stroke="darkred" stroke-width="48" fill="none"/>
          <line x1="88" y1="88" x2="424" y2="424" stroke="darkred" stroke-width="48"/>
        </svg>
      </div>
    )
  }

  renderValidTarget(): React$Element<*> {
    return (
      <div
        style={{
          border: '8px solid yellow',
          boxSizing: 'border-box',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      />
    )
  }

  renderCurTarget(): React$Element<*> {
    return (
      <div
        style={{
          backgroundColor: 'Lime',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      />
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
        {isOver && !canDrop && this.renderInvalidTarget()}
        {!isOver && canDrop && this.renderValidTarget()}
        {isOver && canDrop && this.renderCurTarget()}
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
