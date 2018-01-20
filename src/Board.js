import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BoardSquare from './BoardSquare'
import Knight from './Knight'

class Board extends Component < {
  knightPosition: Array<number>
} > {

  renderSquare(i) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
      <div
        key={i}
        style={{
          width: '12.5%',
          height: '12.5%'
        }}>
        <BoardSquare x={x} y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition
    const isKnightHere = x === knightX && y === knightY
    return isKnightHere
      ? <Knight/>
      : null
  }

  render() {
    const squares = []
    for (let i = 0; i < 64; i += 1) {
      squares.push(this.renderSquare(i))
    }

    return <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>{squares}</div>
  }
}

export default DragDropContext(HTML5Backend)(Board);
