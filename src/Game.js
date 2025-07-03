import { Queue } from "./Queue.js"

export const DIRECTIONS = Object.freeze({
    DOWN: 0,
    RIGHT: 1,
    UP: 2,
    LEFT: 3,
})

export class Game {
    #snake
    #actualDirection
    #nextDirections
    #apple
    #boardDimensions
    isRunning
    #renderer
    hasLost
    score

    constructor(boardsDimension, renderer) {
        this.#boardDimensions = boardsDimension
        this.#renderer = renderer
        this.#actualDirection = DIRECTIONS.RIGHT
        this.#nextDirections = new Queue()
        this.#nextDirections.enqueue(DIRECTIONS.RIGHT)
        this.isRunning = false
        this.hasLost = false
        this.score = 0

        this.#snake = new Queue()
        this.#snake.enqueue({ x: 1, y: 1 })
        this.#snake.enqueue({ x: 2, y: 1 })
        this.#snake.enqueue({ x: 3, y: 1 })
        this.#apple = this.#getNewApplePosition()
    }

    async start() {
        this.isRunning = true
        this.#renderer.updateScore(this.score)

        while (this.isRunning) {
            this.#renderer.draw(this.#snake, this.#apple)
            this.#update()
            await sleep(0.15)
        }
    }

    changeDirection(newDirection) {
        if (newDirection === this.#getOpositeDirection(this.#actualDirection)) return

        this.#nextDirections.enqueue(newDirection)
    }

    #update() {
        if (this.#nextDirections.size > 0) {
            this.#actualDirection = this.#nextDirections.dequeue()
        }

        const head = this.#snake.getElement(this.#snake.size - 1)
        const nextPosition = this.#calcNextPosition(head, this.#actualDirection)

        if (
            !inRange(nextPosition.x, 0, this.#boardDimensions.x) ||
            !inRange(nextPosition.y, 0, this.#boardDimensions.y)
        ) {
            this.hasLost = true
            this.isRunning = false
            return
        }

        for (let i = 0; i < this.#snake.size; i++) {
            const snakePart = this.#snake.getElement(i)
            if (nextPosition.x === snakePart.x && nextPosition.y === snakePart.y) {
                this.hasLost = true
                this.isRunning = false
                return
            }
        }

        if (nextPosition.x === this.#apple.x && nextPosition.y === this.#apple.y) {
            this.#apple = this.#getNewApplePosition()
            this.score++
            this.#renderer.updateScore(this.score)
        } else {
            this.#snake.dequeue()
        }

        this.#snake.enqueue(nextPosition)
    }

    #calcNextPosition(pos, direction) {
        switch (direction) {
            case DIRECTIONS.DOWN:
                return { x: pos.x, y: pos.y + 1 }
            case DIRECTIONS.LEFT:
                return { x: pos.x - 1, y: pos.y }
            case DIRECTIONS.RIGHT:
                return { x: pos.x + 1, y: pos.y }
            case DIRECTIONS.UP:
                return { x: pos.x, y: pos.y - 1 }
        }
    }

    #getOpositeDirection(direction) {
        switch (direction) {
            case DIRECTIONS.DOWN:
                return DIRECTIONS.UP
            case DIRECTIONS.LEFT:
                return DIRECTIONS.RIGHT
            case DIRECTIONS.RIGHT:
                return DIRECTIONS.LEFT
            case DIRECTIONS.UP:
                return DIRECTIONS.DOWN
        }
    }

    #getNewApplePosition() {
        let position = {}

        do {
            position = {
                x: getRandomArbitraryInt(0, this.#boardDimensions.x),
                y: getRandomArbitraryInt(0, this.#boardDimensions.y),
            }
        } while (this.#snake.contains(position))

        return position
    }
}

function sleep(seconds) {
    return new Promise((res) => setTimeout(res, seconds * 1000))
}

function getRandomArbitraryInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function inRange(x, min, max) {
    return x >= min && x < max
}
