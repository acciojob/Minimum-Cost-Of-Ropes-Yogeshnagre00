function findMinimumCostRopes(ropes) {
  // Create a min heap using the ropes array
  const minHeap = new MinHeap(ropes);

  let totalCost = 0;

  // Keep connecting ropes until there is only one rope left in the heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting the ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the new rope (combined rope) back into the min heap
    minHeap.insert(cost);
  }

  return totalCost;
}

// Implementation of a min heap data structure
class MinHeap {
  constructor(arr = []) {
    this.heap = [];

    if (arr.length > 0) {
      // Insert elements from the input array into the heap
      for (let i = 0; i < arr.length; i++) {
        this.insert(arr[i]);
      }
    }
  }

  size() {
    return this.heap.length;
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

    // Replace the root of the heap with the last element
    this.heap[0] = this.heap.pop();

    this.bubbleDown(0);

    return minValue;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestChildIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallestChildIndex]
    ) {
      smallestChildIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallestChildIndex]
    ) {
      smallestChildIndex = rightChildIndex;
    }

    if (smallestChildIndex !== index) {
      this.swap(index, smallestChildIndex);
      this.bubbleDown(smallestChildIndex);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// Get the input from the user
const input = document.getElementById('input').value;

// Parse the comma-separated input into an array of integers
const ropes = input.split(',').map(Number);

// Find the minimum cost of connecting the ropes
const minimumCost = findMinimumCostRopes(ropes);

// Output the result
document.getElementById('result').innerText = minimumCost;
