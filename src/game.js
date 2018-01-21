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

export type RobotData = {
  color: string,
  id: string,
  inPlay: boolean,
  kinged: boolean,
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
  robots: Robots
}

const defaultGameState = {
  robots: {
    p1r1: {
      color: 'DarkGreen',
      id: 'p1r1',
      inPlay: true,
      kinged: true,
      position: {x: 0, y: 0},
    },
    p1r2: {
      color: 'DarkGreen',
      id: 'p1r2',
      inPlay: true,
      kinged: false,
      position: {x: 1, y: 1},
    },
    p1r3: {
      color: 'DarkGreen',
      id: 'p1r3',
      inPlay: true,
      kinged: false,
      position: {x: 0, y: 2},
    },
    p1r4: {
      color: 'DarkGreen',
      id: 'p1r4',
      inPlay: true,
      kinged: false,
      position: {x: 1, y: 3},
    },
    p1r5: {
      color: 'DarkGreen',
      id: 'p1r5',
      inPlay: true,
      kinged: false,
      position: {x: 0, y:4},
    },
    p1r6: {
      color: 'DarkGreen',
      id: 'p1r6',
      inPlay: true,
      kinged: false,
      position: {x: 1, y: 5},
    },
    p1r7: {
      color: 'DarkGreen',
      id: 'p1r7',
      inPlay: true,
      kinged: false,
      position: {x: 0, y: 6},
    },
    p1r8: {
      color: 'DarkGreen',
      id: 'p1r8',
      inPlay: true,
      kinged: false,
      position: {x: 1, y: 7},
    },
    p2r1: {
      color: 'MediumBlue',
      id: 'p2r1',
      inPlay: true,
      kinged: true,
      position: {x: 7, y: 0},
    },
    p2r2: {
      color: 'MediumBlue',
      id: 'p2r2',
      inPlay: true,
      kinged: false,
      position: {x: 6, y: 1},
    },
    p2r3: {
      color: 'MediumBlue',
      id: 'p2r3',
      inPlay: true,
      kinged: false,
      position: {x: 7, y: 2},
    },
    p2r4: {
      color: 'MediumBlue',
      id: 'p2r4',
      inPlay: true,
      kinged: false,
      position: {x: 6, y: 3},
    },
    p2r5: {
      color: 'MediumBlue',
      id: 'p2r5',
      inPlay: true,
      kinged: false,
      position: {x: 7, y:4},
    },
    p2r6: {
      color: 'MediumBlue',
      id: 'p2r6',
      inPlay: true,
      kinged: false,
      position: {x: 6, y: 5},
    },
    p2r7: {
      color: 'MediumBlue',
      id: 'p2r7',
      inPlay: true,
      kinged: false,
      position: {x: 7, y: 6},
    },
    p2r8: {
      color: 'MediumBlue',
      id: 'p2r8',
      inPlay: true,
      kinged: false,
      position: {x: 6, y: 7},
    },
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
