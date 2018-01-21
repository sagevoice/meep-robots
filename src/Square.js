// @flow
import React, {Component} from 'react'

export default class Square extends Component<{
  black: boolean,
  children: React$Node
}> {
  render() {
    const {black} = this.props
    const backgroundColor = black
      ? 'DeepSkyBlue'
      : 'LightGreen'

    return (
      <div
        style={{
          backgroundColor,
          height: '100%',
          width: '100%',
        }}>
        {this.props.children}
      </div>
    )
  }
}
