// @flow
import immutable from 'object-path-immutable'
import {createAction, handleActions} from 'redux-actions'
import type {ActionType} from 'redux-actions'

const GAME_MOVE_ROBOT = 'GAME_MOVE_ROBOT'

export const moveRobot = createAction(GAME_MOVE_ROBOT, (x: number, y: number): Object => ({x, y}))

export type GameAction = ActionType<typeof moveRobot>

export type Position = {
  x: number,
  y: number
}

type Robot = {
  color: string,
  id: string,
  inPlay: boolean,
  kinged: boolean,
  position: Position,
}


type GameState = {
  robots: {
    p1r1: Robot
  }
}

const defaultGameState = {
  robots: {
    p1r1: {
      color: 'red',
      id: 'p1r1',
      inPlay: true,
      kinged: false,
      position: {x: 1, y: 7},
    }
  }
}


const moveRobotHandler = (state: GameState, action: ActionType<typeof moveRobot>): GameState => {
  const {x, y} = action.payload
  const newState = immutable(state)
    .set(['robots', 'p1r1', 'position', 'x'], x)
    .set(['robots', 'p1r1', 'position', 'y'], y)
    .value()
  return newState
}

const game = handleActions({
  [GAME_MOVE_ROBOT]: moveRobotHandler,
}, defaultGameState)

export function canMoveRobot(robotPosition: Position, toX: number, toY: number): boolean {
  const {x, y} = robotPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 1 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 0 && Math.abs(dy) === 2) ||
    (Math.abs(dx) === 2 && Math.abs(dy) === 0)
  )
}

export default game
