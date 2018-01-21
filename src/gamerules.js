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
  const positionComparator = (item: Position, item2: Position): boolean => {
    return (item.x === item2.x && item.y === item2.y)
  }
  const validMoves = _.differenceWith(possiblePos, conflicts, positionComparator)
  return validMoves
}

const gamerules = {
  getValidMoves,
}

export default gamerules
