// @flow
import immutable from 'object-path-immutable'
import {createAction, handleActions} from 'redux-actions'
import type {ActionType} from 'redux-actions'

const GAME_MOVE_ROBOT = 'GAME_MOVE_ROBOT'

export const moveRobot = createAction(GAME_MOVE_ROBOT, (x: number, y: number): Object => ({x, y}))

export type GameAction = ActionType<typeof moveRobot>

const defaultGameState = {
  robotPosition: [1, 7],
}

type GameState = {
  robotPosition: Array<number>,
}

const moveRobotHandler = (state: GameState, action: ActionType<typeof moveRobot>): GameState => {
  const {x, y} = action.payload
  const newState = immutable(state)
    .set(['robotPosition', '0'], x)
    .set(['robotPosition', '1'], y)
    .value()
  return newState
}

const game = handleActions({
  [GAME_MOVE_ROBOT]: moveRobotHandler,
}, defaultGameState)

export function canMoveRobot(robotPosition: Array<number>, toX: number, toY: number): boolean {
  const [x, y] = robotPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

export default game
