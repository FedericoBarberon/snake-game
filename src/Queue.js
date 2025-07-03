export class Queue {
    #elements

    constructor() {
        this.#elements = []
    }

    get size() {
        return this.#elements.length
    }

    enqueue(element) {
        this.#elements.push(element)
    }

    dequeue() {
        return this.#elements.shift()
    }

    getElement(pos) {
        return this.#elements[pos]
    }

    contains(element) {
        return this.#elements.includes(element)
    }
}
