function minimumCost(arr, n) {
  // Create a min heap to store the ropes.
  const heap = new PriorityQueue();
  for (let i = 0; i < n; i++) {
    heap.enqueue(arr[i]);
  }

  // Initialize the total cost to 0.
  let totalCost = 0;

  // While there are more than 1 ropes in the heap.
  while (heap.size() > 1) {
    // Extract the minimum and second minimum ropes from the heap.
    const rope1 = heap.dequeue();
    const rope2 = heap.dequeue();

    // Calculate the cost of connecting the two ropes.
    const cost = rope1 + rope2;

    // Add the cost to the total cost.
    totalCost += cost;

    // Insert the combined rope back into the heap.
    heap.enqueue(cost);
  }

  // Return the total cost.
  return totalCost;
}

// Get the input from the user.
const input = document.getElementById("input").value;

// Split the input into an array of integers.
const arr = input.split(",").map(Number);

// Get the number of ropes.
const n = arr.length;

// Calculate the minimum cost of the ropes.
const totalCost = minimumCost(arr, n);

// Display the result.
document.getElementById("result").innerHTML = totalCost;
