import { DIRECTIONS, Game } from "./Game.js"
import { SnakeStdRenderer } from "./SnakeStdRenderer.js"
import { SnakeWebRenderer } from "./SnakeWebRenderer.js"

const startButton = document.getElementById("start")
const board = document.getElementById("board")
const score = document.getElementById("score")

const boardDimension = { x: 25, y: 25 }

let game

startButton.addEventListener("click", () => {
    if (game && game.isRunning) return

    const renderer = new SnakeWebRenderer(board, score)
    // const renderer = new SnakeStdRenderer(boardDimension)
    game = new Game(boardDimension, renderer)
    game.start()
})

window.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "ArrowRight") game.changeDirection(DIRECTIONS.RIGHT)
    if (e.key === "a" || e.key === "ArrowLeft") game.changeDirection(DIRECTIONS.LEFT)
    if (e.key === "w" || e.key === "ArrowUp") game.changeDirection(DIRECTIONS.UP)
    if (e.key === "s" || e.key === "ArrowDown") game.changeDirection(DIRECTIONS.DOWN)
})
