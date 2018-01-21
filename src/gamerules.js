// @flow
import _ from 'lodash'
import type {Position, Robots} from './game'

const calcDiagonals = (position: Position, distance: number): Array<Position> => {
  const diagonals = []
  const signs = [-1, 1]
  const delta = signs.map((sign: number) => (sign * distance))
  // diagonals
  delta.forEach((x: number): void => {
    const newX = position.x + x
    if (newX > -1 && newX < 8) {
      delta.forEach((y: number): void => {
        const newY = position.y + y
        if (newY > -1 && newY < 8) {
          diagonals.push({x: newX, y: newY})
        }
      })
    }
  })
  return diagonals
}

const calcMeeps = (position: Position, multiplier: number): Array<Position> => {
  const meeps = []
  const signs = [-2, 2]
  const delta = signs.map((sign: number) => (sign * multiplier))
  // horizonatal meep
  delta.forEach((x: number): void => {
    const newX = position.x + x
    if (newX > -1 && newX < 8) {
      meeps.push({x: newX, y: position.y})
    }
  })
  // vertical meep
  delta.forEach((y: number): void => {
    const newY = position.y + y
    if (newY > -1 && newY < 8) {
      meeps.push({x: position.x, y: newY})
    }
  })
  return meeps
}


const calcPossibleMoves = (position: Position, crowned: boolean): Array<Position> => {
  let possible = []
  if (crowned) {
    for(let i = 1; i < 8; i++) {
      const diagonals = calcDiagonals(position, i)
      possible = possible.concat(diagonals)
    }
    for(let i = 1; i < 4; i++) {
      const meeps = calcDiagonals(position, i)
      possible = possible.concat(meeps)
    }

  } else {
    const diagonals = calcDiagonals(position, 1)
    const meeps = calcMeeps(position, 1)
    possible = possible.concat(diagonals, meeps)
  }
  return possible
}

const equalPositions = (item: Position, item2: Position): boolean => {
  return (item.x === item2.x && item.y === item2.y)
}

const getValidMoves = (robotId: string, robots: Robots): Array<Position> => {
  const robotData = robots[robotId]
  const {crowned, player, position} = robotData
  const robotIds = Object.keys(robots)
  const conflictIds = robotIds.filter((id: string): boolean => {
    const data = robots[id]
    return (id !== robotId && data.player === player)
  })
  const conflicts = conflictIds.map((id: string): Position => {
    const data = robots[id]
    return data.position
  })
  const possiblePos = calcPossibleMoves(position, crowned)
  const validMoves = _.differenceWith(possiblePos, conflicts, equalPositions)
  return validMoves
}

const isTargetOccupied = (robots: Robots, target: Position): boolean => {
  const robotIds = Object.keys(robots)
  return robotIds.some((robotId: string): boolean => (
    equalPositions(target, robots[robotId].position)
  ))
}

const isMoveLegal = (crowned: boolean, position: Position, target: Position): boolean => {
  if (target.x > -1 && target.x < 8 && target.y > -1 && target.y < 8) {
    const dx = Math.abs(target.x - position.x)
    const dy = Math.abs(target.y - position.y)
    if (crowned) {
      return (
        (dx > 0 && dx === dy) ||
        (dx === 0 && (dy % 2) === 0) ||
        ((dx % 2) === 0 && dy === 0)
      )
    } else {
      return (
        (dx === 1 && dy === 1) ||
        (dx === 0 && dy === 2) ||
        (dx === 2 && dy === 0)
      )
    }
  }
  return false
}

const isValidMove = (robotId: string, robots: Robots, target: Position): boolean => {
  const robotData = robots[robotId]
  const {crowned, position} = robotData
  // first check if this is even a possible move
  if (isMoveLegal(crowned, position, target)) {
    // then check if the target is already occupied
    return !isTargetOccupied(robotData, target)
  }
  return false
}

const gamerules = {
  getValidMoves,
  isValidMove,
}

export default gamerules
