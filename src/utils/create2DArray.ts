const create2DArray = (rows: number, cols: number) => {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols).fill(false);
  }
  return arr;
};

export default create2DArray;
