// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import BoardSquare from './BoardSquare'
import Knight from './Knight'
import type {State} from './store'

type OwnProps = {
}

type StateProps = {
  knightPosition: Array<number>
}

type Props = OwnProps & StateProps

class BoardRender extends Component<Props> {

  renderPiece(x: number, y: number): ?React$Element<*>  {
    const {knightPosition} = this.props
    const [knightX, knightY] = knightPosition
    const isKnightHere = x === knightX && y === knightY
    return isKnightHere
      ? <Knight/>
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
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        width: '100%',
      }}>{squares.map((item: number, index: number) => (this.renderSquare(index)))}</div>
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const knightPosition = state.game.knightPosition
  return {
    knightPosition,
  }
}

const Board = connect(mapStateToProps, null)(BoardRender)
export default Board
