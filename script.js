function minimumCostOfRopes(lengths) {
  if (lengths.length < 2) {
    return 0; // If there is only one or no rope, the cost is 0.
  }

  let totalCost = 0;
  const minHeap = new MinHeap();

  // Add all the rope lengths to the min heap
  for (let i = 0; i < lengths.length; i++) {
    minHeap.insert(lengths[i]);
  }

  // Connect the ropes until there is only one left
  while (minHeap.size() > 1) {
    const mergedLength = minHeap.extractMin() + minHeap.extractMin();
    totalCost += mergedLength;
    minHeap.insert(mergedLength);
  }

  return totalCost;
}

// MinHeap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.sinkDown(0);
    }

    return minValue;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element >= parent) {
        break;
      }
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;
    const length = this.heap.length;

    if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      const temp = this.heap[smallestIndex];
      this.heap[smallestIndex] = this.heap[index];
      this.heap[index] = temp;
      this.sinkDown(smallestIndex);
    }
  }
}

// Get the input value from the form
const input = document.getElementById('rope-lengths').value;
const lengths = input.split(',').map(Number);

// Calculate the minimum cost of ropes
const minimumCost = minimumCostOfRopes(lengths);

// Display the result
const resultDiv = document.getElementById('result');
resultDiv.textContent = minimumCost;
