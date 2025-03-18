class PriorityQueue {
    constructor(compareFn) {
        this.heap = [];
        this.compare = compareFn;
    }
    enqueue(item) {
        this.heap.push(item);
        this.heap.sort(this.compare);
    }
    dequeue() {
        return this.heap.shift();
    }
}

module.exports = { PriorityQueue };