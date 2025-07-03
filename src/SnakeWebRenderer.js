import { SnakeRenderer } from "./SnakeRenderer.js"

export class SnakeWebRenderer extends SnakeRenderer {
    #boardElement
    #scoreElement
    #boardDimensions

    constructor(boardElement, scoreElement) {
        const boardDimensions = {
            x: boardElement.children.length,
            y: boardElement.children[0].children.length,
        }
        super()
        this.#boardDimensions = boardDimensions
        this.#boardElement = boardElement
        this.#scoreElement = scoreElement
    }

    draw(snake, apple) {
        this.#clearBoard()
        for (let i = 0; i < snake.size; i++) {
            const pos = snake.getElement(i)
            const cell = this.#getCell(pos)
            cell.classList.add("snake")
        }

        const cell = this.#getCell(apple)
        cell.classList.add("apple")
    }

    updateScore(newScore) {
        this.#scoreElement.textContent = `Score: ${newScore}`
    }

    #clearBoard() {
        for (let x = 0; x < this.#boardDimensions.x; x++) {
            for (let y = 0; y < this.#boardDimensions.y; y++) {
                const cell = this.#getCell({ x, y })
                cell.classList.remove("snake")
                cell.classList.remove("apple")
            }
        }
    }

    #getCell(pos) {
        return this.#boardElement.children[pos.y].children[pos.x]
    }
}
