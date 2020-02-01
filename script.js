const $canvas = document.querySelector(".js-canvas")
const context = $canvas.getContext('2d')

$canvas.width = 600
$canvas.height = 600
let fps, fpsInterval, startTime, now, then, elapsed

class PacMan{
    constructor() {
        /*
            0: $$
            1: wall (collision part)
            2: bonus
            3: pacman initial position
            4: monster initial position
            5: empty
        */
        this.map = [
            (new Array(32)).fill(1), // ROW 1 OUT OF 32
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // ROW 2 OUT OF 32
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1], // ROW 3 OUT OF 32
            [1, 2, 1, 5, 1, 0, 1, 5, 5, 1, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 1, 5, 5, 1, 0, 1, 5, 1, 2, 1], // ROW 4 OUT OF 32
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1], // ROW 5 OUT OF 32
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // ROW 6 OUT OF 32
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1], // ROW 7 OUT OF 32
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1], // ROW 8 OUT OF 32
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1], // ROW 9 OUT OF 32
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], // ROW 10 OUT OF 32
            [5, 5, 5, 5, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 5, 5, 5, 5], // ROW 11 OUT OF 32
            [5, 5, 5, 5, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 5, 5, 5], // ROW 12 OUT OF 32
            [5, 5, 5, 5, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 5, 5, 5], // ROW 13 OUT OF 32
            [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 5, 5, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1], // ROW 14 OUT OF 32
            [5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5], // ROW 15 OUT OF 32
            [5, 5, 5, 5, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 4, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5], // ROW 16 OUT OF 32
            [5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5], // ROW 17 OUT OF 32
            [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1], // ROW 18 OUT OF 32
            [5, 5, 5, 5, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 5, 5, 5], // ROW 19 OUT OF 32
            [5, 5, 5, 5, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 5, 5, 5], // ROW 20 OUT OF 32
            [5, 5, 5, 5, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 5, 5, 5], // ROW 21 OUT OF 32
            [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1], // ROW 22 OUT OF 32
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1], // ROW 23 OUT OF 32
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // ROW 24 OUT OF 32
            [1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1], // ROW 25 OUT OF 32
            [1, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1], // ROW 26 OUT OF 32
            [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], // ROW 26 OUT OF 32
            [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1], // ROW 27 OUT OF 32
            [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1], // ROW 28 OUT OF 32
            [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1], // ROW 29 OUT OF 32
            [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1], // ROW 30 OUT OF 32
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // ROW 31 OUT OF 32
            (new Array(32)).fill(1), // ROW 32 OUT OF 32
        ]
        this.currentDirection = "right" // up/down/left/right
        this.animationFrameId = null
        this.life = 3
        this.score = 0
        this.TILE_SIZE = $canvas.width / this.map.length
        this.areMonstersVulnerable = false
        this.currentMonstersMoveIndex = [0, 0, 0, 0]
        this.monstersMove = []
        this.previousMonsterCase = [5, 5, 5, 5]

        setInterval(() => {
            this.generatePathfinding()
        }, 500) // regenerate pathfinding every 3 seconds
    }

    drawMap(){
        for(let x = 0;x < this.map.length;x++) {
            for(let y = 0;y < this.map[x].length;y++) {
                context.beginPath()
                switch(this.map[x][y]) {
                    case 0:
                        context.fillStyle = "white"
                        // context.arc(posX, posY, radius, angleDépart, angleFin)
                        context.arc(y * this.TILE_SIZE + this.TILE_SIZE / 2, x * this.TILE_SIZE + this.TILE_SIZE / 2, this.TILE_SIZE / 6, 0, Math.PI * 2)
                        context.fill()
                        break
                    case 1:
                        context.fillStyle = "blue"
                        context.fillRect(y * this.TILE_SIZE, x * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
                        break
                    case 2:
                        context.fillStyle = "gray"
                        context.arc(y * this.TILE_SIZE + this.TILE_SIZE / 2, x * this.TILE_SIZE + this.TILE_SIZE / 2, this.TILE_SIZE / 2.5, 0, Math.PI * 2)
                        context.fill()
                        break
                    case 3:
                        context.fillStyle = "yellow"
                        context.arc(y * this.TILE_SIZE + this.TILE_SIZE / 2, x * this.TILE_SIZE + this.TILE_SIZE / 2, this.TILE_SIZE / 2, 0, Math.PI * 2)
                        context.fill()
                        break
                    case 4:
                        if(this.areMonstersVulnerable){
                            context.fillStyle = "blue"
                        }else{
                            context.fillStyle = "pink"
                        }
                        context.arc(y * this.TILE_SIZE + this.TILE_SIZE / 2, x * this.TILE_SIZE + this.TILE_SIZE / 2, this.TILE_SIZE / 3, 0, Math.PI * 2)
                        context.fill()
                        break
                    case 5:
                        context.fillStyle = "black"
                        context.fillRect(y * this.TILE_SIZE, x * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
                        break
                }
            }
        }
    }

    handleScore(x, y){
        const tile = this.map[x][y]
        if(tile === 0) { // $$
            this.score++
        } else if(tile === 2) { // bonus
            this.score += 5
            this.areMonstersVulnerable = true
            clearTimeout(this.monsterVulnerabilityTimeout)
            this.monsterVulnerabilityTimeout = setTimeout(() => {
                this.areMonstersVulnerable = false
            }, 5000) // monster are vulnerable for 5 seconds
        } else if(tile === 4) { // monster
            if(!this.areMonstersVulnerable){
                this.life--
                console.log(`losing one life (remaining: ${this.life})`)
            }else{
                this.score += 500
                // TODO: respawn monster
            }
        }
    }

    getMonstersPositions(){
        const monstersX = this.map.reduce((_array, _element, _index) => { // find xPos of each monster (only 1 value if original map state)
            if(_element.includes(4)) {
                _array.push(_index)
            }
            return _array
        }, [])

        let monstersPositions = [] // store all monster positions
        monstersX.forEach(_xPosition => {
            this.map[_xPosition].reduce((_array, _element, _index) => {
                if(_element == 4) {
                    monstersPositions.push([_xPosition, _index])
                }
                return _array
            }, [])
        })

        return monstersPositions
    }

    generatePathfinding(){
        this.currentMonstersMoveIndex = [0, 0, 0, 0]
        this.monstersMove = []

        let monstersPositions = this.getMonstersPositions()

        for(const monsterPosition of monstersPositions) {
            const grid = this.map.map(_arr => [..._arr])

            let shortestPath = [monsterPosition].concat(findShortestPath([monsterPosition[0], monsterPosition[1]], [...grid]))
            let i = 0
            // change direction into coordinates
            for(const moveToMake of shortestPath) {
                switch(moveToMake) {
                    case 'up':
                        shortestPath[i] = [shortestPath[i - 1][0] - 1, shortestPath[i - 1][1]]
                        break
                    case 'down':
                        shortestPath[i] = [shortestPath[i - 1][0] + 1, shortestPath[i - 1][1]]
                        break
                    case "left":
                        shortestPath[i] = [shortestPath[i - 1][0], shortestPath[i - 1][1] - 1]
                        break
                    case "right":
                        shortestPath[i] = [shortestPath[i - 1][0], shortestPath[i - 1][1] + 1]
                        break
                }
                i++
            }

            this.monstersMove.push(shortestPath)
        }
    }

    doGameOver() {
        if(this.map.filter(_line => _line.includes(0) || _line.includes(2)).length === 0){
            // if no more $$
            window.cancelAnimationFrame(this.animationFrameId)
            context.textAlign = "center"
            context.font = "25px Arial"
            context.fillStyle = "#FF0"
            context.fillText(`GAME OVER - YES WINNER!!!`, $canvas.width / 2, $canvas.height / 2)
            context.fillText(`PRESS R TO RESTART`, $canvas.width / 2, $canvas.height / 2 + 50)
        }else if(this.life === 0){
            // losing
            window.cancelAnimationFrame(this.animationFrameId)
            context.textAlign = "center"
            context.font = "25px Arial"
            context.fillStyle = "#FF0"
            context.fillText(`GAME OVER - LOSER!!!`, $canvas.width / 2, $canvas.height / 2)
            context.fillText(`DON'T PRESS R YOU'RE GONNA LOSE AGAIN !`, $canvas.width / 2, $canvas.height / 2 + 50)
        }
    }

    loop() {
        this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this)) // found solution here https://stackoverflow.com/questions/48816441/how-to-use-requestanimationframe-inside-a-class-object

        now = Date.now()
        elapsed = now - then

        // if enough time has elapsed, draw the next frame
        if(elapsed < fpsInterval) { // If elapsed time is less than the required fps interval
            return
        }
        then = now - (elapsed % fpsInterval)
        
        context.clearRect(0, 0, $canvas.width, $canvas.height)
        this.drawMap()

        // draw score
        context.textAlign = "start"
        context.font = "16px Arial"
        context.fillStyle = "#FF0"
        context.fillText(`Score: ${this.score}`, 16, 16)

        // draw life
        context.textAlign = "end"
        context.font = "16px Arial"
        context.fillStyle = "#FF0"
        context.fillText(`Life: ${this.life}`, $canvas.width - 32, 16)

        this.doGameOver()


        // Pac-Man movement
        const playerX = this.map.findIndex(item => item.includes(3)) // 3 is pac-man
        const playerY = this.map[playerX].findIndex(item => item === 3)

        if(this.currentDirection == "up") {
            if(this.map[playerX - 1][playerY] !== 1) {
                this.handleScore(playerX - 1, playerY)

                this.map[playerX][playerY] = 5
                this.map[playerX - 1][playerY] = 3
            }
        } else if(this.currentDirection == "down") {
            if(this.map[playerX + 1][playerY] !== 1) {
                this.handleScore(playerX + 1, playerY)

                this.map[playerX][playerY] = 5
                this.map[playerX + 1][playerY] = 3
            }
        } else if(this.currentDirection == "left") {
            if(this.map[playerX][playerY - 1] !== 1) {
                this.handleScore(playerX, playerY - 1)

                if(playerY - 1 < 0) { // short path to change side
                    this.map[playerX][playerY] = 5
                    this.map[playerX][this.map.length - 1] = 3
                } else {
                    this.map[playerX][playerY] = 5
                    this.map[playerX][playerY - 1] = 3
                }
            }
        } else if(this.currentDirection == "right") {
            if(this.map[playerX][playerY + 1] !== 1) {
                this.handleScore(playerX, playerY + 1)

                if(playerY + 1 > this.map.length) { // change side
                    this.map[playerX][playerY] = 5
                    this.map[playerX][0] = 3
                } else {
                    this.map[playerX][playerY] = 5
                    this.map[playerX][playerY + 1] = 3
                }
            }
        }

        //Monsters movement
        for(let i = 0; i < this.currentMonstersMoveIndex.length; i++){ // maxLength should be either 0 or 4 || for each monster existing, we parse its current move index
            if(this.currentMonstersMoveIndex[i] + 1 < this.monstersMove[i].length){ // if the current move of the monster is less than the total of move it has to do
                this.currentMonstersMoveIndex[i]++ // increment the current move index
                const lastMove = this.monstersMove[i][this.currentMonstersMoveIndex[i] - 1]
                const nextMove = this.monstersMove[i][this.currentMonstersMoveIndex[i]]

                if(this.map[nextMove[0]][nextMove[1]] === 3){ // if Pac-Man, eat or get eaten
                    if(this.areMonstersVulnerable){
                        this.currentMonstersMoveIndex.splice(i, 1)
                        this.previousMonsterCase.splice(i, 1)
                        this.monstersMove.splice(i, 1)
                        i--
                    }else{
                        this.life--
                    }
                    console.log("EAT OR GET EATEN l. 275")
                    this.currentMonstersMoveIndex[i]--
                }else if(this.map[nextMove[0]][nextMove[1]] === 4){ // if monster, wait until next move
                    console.log("WAIT UNTIL NEXT STEP l.277")
                    this.currentMonstersMoveIndex[i]--
                }else{
                    this.map[lastMove[0]][lastMove[1]] = this.previousMonsterCase[i] // restore previous case state
                    this.previousMonsterCase[i] = this.map[nextMove[0]][nextMove[1]] // save & update the future previous case (= next move)
                    this.map[nextMove[0]][nextMove[1]] = 4 // make the monster move
                }
            }
        }
    // console.log(`Player index: ${playerX} - ${playerY}`)
    }
}

let game = null

const initGame = () => {
    fpsInterval = 1000 / 8 // downgrade to 8 FPS 
    then = Date.now()
    startTime = then

    game = new PacMan()
    game.loop()
}

initGame()

document.addEventListener("keydown", (_event) => {
    if(_event.key == "ArrowUp"){
        game.currentDirection = "up"
    }else if(_event.key == "ArrowDown"){
        game.currentDirection = "down"
    }else if(_event.key == "ArrowLeft"){
        game.currentDirection = "left"
    }else if(_event.key == "ArrowRight"){
        game.currentDirection = "right"
    }


    if(_event.key == "R" || _event.key == "r"){
        console.log("resetting map")
        window.cancelAnimationFrame(game.animationFrameId)
        initGame()
    }
})

/*****************\
|***PATHFINDING***|
|*****MONSTER*****|
|******LOGIC******|
\*****************/

// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
const findShortestPath = (startCoordinates, grid) => {
    const distanceFromTop = startCoordinates[0]
    const distanceFromLeft = startCoordinates[1]

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    const location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
    }

    // Initialize the queue with the start location already inside
    let queue = [location]

    // Loop through the grid searching for the goal
    while(queue.length > 0) {
        // Take the first location off the queue
        let currentLocation = queue.shift()

        // Explore North
        let newLocation = exploreInDirection(currentLocation, 'up', grid)
        if(newLocation.status === 'Goal') {
            return newLocation.path
        } else if(newLocation.status === 'Valid') {
            queue.push(newLocation)
        }

        // Explore East
        newLocation = exploreInDirection(currentLocation, 'right', grid)
        if(newLocation.status === 'Goal') {
            return newLocation.path
        } else if(newLocation.status === 'Valid') {
            queue.push(newLocation)
        }

        // Explore South
        newLocation = exploreInDirection(currentLocation, 'down', grid)
        if(newLocation.status === 'Goal') {
            return newLocation.path
        } else if(newLocation.status === 'Valid') {
            queue.push(newLocation)
        }

        // Explore West
        newLocation = exploreInDirection(currentLocation, 'left', grid)
        if(newLocation.status === 'Goal') {
            return newLocation.path
        } else if(newLocation.status === 'Valid') {
            queue.push(newLocation)
        }
    }

    // No valid path found
    return false

}

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
const locationStatus = (location, grid) => {
    let gridSize = grid.length
    let dft = location.distanceFromTop
    let dfl = location.distanceFromLeft

    if(location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        // location is not on the grid--return false
        return 'Invalid'
    } else if(grid[dft][dfl] === 3) { // == 'Goal'
        return 'Goal'
    } else if(grid[dft][dfl] !== 0 && grid[dft][dfl] !== 2 && grid[dft][dfl] !== 4 && grid[dft][dfl] !== 5) {
        // location is either an obstacle or has been visited
        return 'Blocked'
    } else {
        return 'Valid'
    }
}


// Explores the grid from the given location in the given
// direction
const exploreInDirection = (currentLocation, direction, grid) => {
    let newPath = currentLocation.path.slice()
    newPath.push(direction)

    let dft = currentLocation.distanceFromTop
    let dfl = currentLocation.distanceFromLeft

    if(direction === 'up') {
        dft -= 1
    } else if(direction === 'right') {
        dfl += 1
    } else if(direction === 'down') {
        dft += 1
    } else if(direction === 'left') {
        dfl -= 1
    }

    let newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    }
    newLocation.status = locationStatus(newLocation, grid)

    // If this new location is valid, mark it as 'Visited'
    if(newLocation.status === 'Valid') {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited'
    }

    return newLocation
}
