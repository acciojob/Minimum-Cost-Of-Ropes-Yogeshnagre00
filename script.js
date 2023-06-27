function calculateMinCost() {
  // Calculate the cost of connecting the two ropes
const combinedCost = rope1 + rope2;

// Add the combined cost to the total cost
cost += combinedCost;

// Insert the combined rope into the heap
minHeap.insert(combinedCost);
  
  
  
}  
