// @flow
import React, {Component} from 'react'
import Square from './Square'

type OwnProps = {
  children: React$Node,
  x: number,
  y: number,
}

class BoardSquare extends Component<OwnProps> {

  render() {
    const {
      x,
      y,
      children
    } = this.props
    const black = (x + y) % 2 === 1

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
        <Square black={black}>{children}</Square>
      </div>
    )
  }
}

export default BoardSquare
