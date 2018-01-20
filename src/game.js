// @flow
import immutable from 'object-path-immutable'
import {createAction, handleActions} from 'redux-actions'
import type {ActionType} from 'redux-actions'

const GAME_MOVE_KNIGHT = 'GAME_MOVE_KNIGHT'

export const moveKnight = createAction(GAME_MOVE_KNIGHT, (x: number, y: number): Object => ({x, y}))

export type GameAction = ActionType<typeof moveKnight>

const defaultGameState = {
  knightPosition: [1, 7],
}

type GameState = {
  knightPosition: Array<number>,
}

const moveKnightHandler = (state: GameState, action: ActionType<typeof moveKnight>): GameState => {
  const {x, y} = action.payload
  const newState = immutable(state)
    .set(['knightPosition', '0'], x)
    .set(['knightPosition', '1'], y)
    .value()
  return newState
}

const game = handleActions({
  [GAME_MOVE_KNIGHT]: moveKnightHandler,
}, defaultGameState)

export function canMoveKnight(knightPosition: Array<number>, toX: number, toY: number): boolean {
  const [x, y] = knightPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

export default game
