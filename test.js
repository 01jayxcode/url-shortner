const arr = [1, 2, 3, 4, 5, 6];

const processInBatch = (arr, batchSize) => {
  for (let i = 0; i < arr.length; i += batchSize) {
    const batch = arr.slice(i, i + batchSize);
  }
};
