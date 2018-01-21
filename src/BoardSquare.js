// @flow
import React, {Component} from 'react'

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
    const player1 = (x + y) % 2 === 0
    const backgroundColor = player1
      ? 'LightGreen'
      : 'DeepSkyBlue'

    return (
      <div
        style={{
          backgroundColor,
          height: '12.5%',
          width: '12.5%',
        }}>
        {children}
      </div>
    )
  }
}

export default BoardSquare
