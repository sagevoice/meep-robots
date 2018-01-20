// @flow
import React, {Component} from 'react'
import BoardSquare from './BoardSquare'
import Knight from './Knight'

type OwnProps = {
  knightPosition: Array<number>
}

class Board extends Component <OwnProps> {

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

  renderPiece(x: number, y: number): ?React$Element<*>  {
    const [knightX, knightY] = this.props.knightPosition
    const isKnightHere = x === knightX && y === knightY
    return isKnightHere
      ? <Knight/>
      : null
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

export default Board
