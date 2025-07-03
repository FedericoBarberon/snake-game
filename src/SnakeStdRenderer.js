import { SnakeRenderer } from "./SnakeRenderer.js"

export class SnakeStdRenderer extends SnakeRenderer {
    #boardDimensions

    constructor(boardDimensions) {
        super()
        this.#boardDimensions = boardDimensions
    }

    draw(snake, apple) {
        console.clear()
        const board = new Array(this.#boardDimensions.y)
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(this.#boardDimensions.x)
            board[i].fill(" ")
        }
        for (let i = 0; i < snake.size; i++) {
            const pos = snake.getElement(i)
            board[pos.y][pos.x] = "@"
        }

        board[apple.y][apple.x] = "X"

        board.forEach((row) => {
            console.log(row.join(" "))
        })
    }

    updateScore(newScore) {}
}
