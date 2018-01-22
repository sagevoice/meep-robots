// @flow
import immutable from 'object-path-immutable'
import {createAction, handleActions} from 'redux-actions'
import type {ActionType} from 'redux-actions'

const GAME_MOVE_ROBOT = 'GAME_MOVE_ROBOT'

export const moveRobot = createAction(GAME_MOVE_ROBOT, (robotId: string, x: number, y: number): Object => ({robotId, x, y}))

export type GameAction = ActionType<typeof moveRobot>

export type Position = {
  x: number,
  y: number
}

export type RobotData = {
  crowned: boolean,
  id: string,
  inPlay: boolean,
  player: string,
  position: Position,
}

export type Robots = {
  p1r1: RobotData,
  p1r2: RobotData,
  p1r3: RobotData,
  p1r4: RobotData,
  p1r5: RobotData,
  p1r6: RobotData,
  p1r7: RobotData,
  p1r8: RobotData,
  p2r1: RobotData,
  p2r2: RobotData,
  p2r3: RobotData,
  p2r4: RobotData,
  p2r5: RobotData,
  p2r6: RobotData,
  p2r7: RobotData,
  p2r8: RobotData,
}

type GameState = {
  whoseTurn: string,
  robots: Robots
}

const defaultGameState = {
  whoseTurn: 'p1',
  robots: {
    p1r1: {
      crowned: true,
      id: 'p1r1',
      inPlay: true,
      player: 'p1',
      position: {x: 0, y: 0},
    },
    p1r2: {
      crowned: false,
      id: 'p1r2',
      inPlay: true,
      player: 'p1',
      position: {x: 1, y: 1},
    },
    p1r3: {
      crowned: false,
      id: 'p1r3',
      inPlay: true,
      player: 'p1',
      position: {x: 0, y: 2},
    },
    p1r4: {
      crowned: false,
      id: 'p1r4',
      inPlay: true,
      player: 'p1',
      position: {x: 1, y: 3},
    },
    p1r5: {
      crowned: false,
      id: 'p1r5',
      inPlay: true,
      player: 'p1',
      position: {x: 0, y:4},
    },
    p1r6: {
      crowned: false,
      id: 'p1r6',
      inPlay: true,
      player: 'p1',
      position: {x: 1, y: 5},
    },
    p1r7: {
      crowned: false,
      id: 'p1r7',
      inPlay: true,
      player: 'p1',
      position: {x: 0, y: 6},
    },
    p1r8: {
      crowned: false,
      id: 'p1r8',
      inPlay: true,
      player: 'p1',
      position: {x: 1, y: 7},
    },
    p2r1: {
      crowned: true,
      id: 'p2r1',
      inPlay: true,
      player: 'p2',
      position: {x: 7, y: 0},
    },
    p2r2: {
      crowned: false,
      id: 'p2r2',
      inPlay: true,
      player: 'p2',
      position: {x: 6, y: 1},
    },
    p2r3: {
      crowned: false,
      id: 'p2r3',
      inPlay: true,
      player: 'p2',
      position: {x: 7, y: 2},
    },
    p2r4: {
      crowned: false,
      id: 'p2r4',
      inPlay: true,
      player: 'p2',
      position: {x: 6, y: 3},
    },
    p2r5: {
      crowned: false,
      id: 'p2r5',
      inPlay: true,
      player: 'p2',
      position: {x: 7, y:4},
    },
    p2r6: {
      crowned: false,
      id: 'p2r6',
      inPlay: true,
      player: 'p2',
      position: {x: 6, y: 5},
    },
    p2r7: {
      crowned: false,
      id: 'p2r7',
      inPlay: true,
      player: 'p2',
      position: {x: 7, y: 6},
    },
    p2r8: {
      crowned: false,
      id: 'p2r8',
      inPlay: true,
      player: 'p2',
      position: {x: 6, y: 7},
    },
  }
}

const moveRobotHandler = (state: GameState, action: ActionType<typeof moveRobot>): GameState => {
  const {robotId, x, y} = action.payload
  const whoseTurn = state.whoseTurn
  const nextTurn = whoseTurn === 'p1' ? 'p2' : 'p1'
  const newState = immutable(state)
    .set(['whoseTurn'], nextTurn)
    .set(['robots', robotId, 'position', 'x'], x)
    .set(['robots', robotId, 'position', 'y'], y)
    .value()
  return newState
}

const game = handleActions({
  [GAME_MOVE_ROBOT]: moveRobotHandler,
}, defaultGameState)

export default game
