# meep-robots
A computer version of the board game MeepRobots, invented by my 11 year old son Noah.

The game is slightly similar to checkers, in the sense that is played by two players on an eight by eight two color grid, the units move diagonally, and when pieces reach the opposite side they are kinged. That is it for the similarities.

In MeepRobots, unlike checkers, each team stays on their own color tile. In the default rule set, all pieces can move in in any direction and being crowned does not grant any special abilities. Robots have the special ability to _Meep_, which means they can move forward or backward to the next tile of of their color in the same row or column. When a robot _Meeps_, it destroys any robots of the opposing color who occupied a tile that the _Meeping_ robot passed through.

The game ends when one player destroys all the robots of all the other player, or when one player has all their remaining robots crowned.

The design of the game is Copyright ©2017 by Noah Stafford. The code to implement the game is Copyright ©2017 Jason Stafford. The artwork was all designed by Noah Stafford and is Copyright ©2017. The SVG renderings are by Jason Stafford and are Copyright ©2017.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Information about how to perform common tasks is in the [react-scripts README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
