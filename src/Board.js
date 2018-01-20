// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import BoardSquare from './BoardSquare'
import Robot from './Robot'
import type {State} from './store'

type OwnProps = {
}

type StateProps = {
  robotPosition: Array<number>
}

type Props = OwnProps & StateProps

class BoardRender extends Component<Props> {

  renderPiece(x: number, y: number): ?React$Element<*>  {
    const {robotPosition} = this.props
    const [robotX, robotY] = robotPosition
    const isKnightHere = x === robotX && y === robotY
    return isKnightHere
      ? <Robot/>
      : null
  }

  renderSquare(i: number): React$Element<*> {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
      <div
        key={i}
        style={{
          width: '12.5%',
          height: '12.5%'
        }}>
        <BoardSquare x={x} y={y} children={this.renderPiece(x, y)}/>
      </div>
    )
  }

  render() {
    const squares = Array(64).fill(1)

    return <div
      style={{
        border: '4px solid gray',
        display: 'flex',
        flexWrap: 'wrap',
        height: '512px',
        margin: '0 auto',
        width: '512px',
      }}>{squares.map((item: number, index: number) => (this.renderSquare(index)))}</div>
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const robotPosition = state.game.robotPosition
  return {
    robotPosition,
  }
}

const Board = connect(mapStateToProps, null)(BoardRender)
export default Board
