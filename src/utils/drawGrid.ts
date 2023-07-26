const drawGrid = (
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  lineWidth: number,
  strokeColor: string,
  numRows: number,
  numCols: number
) => {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
};

export default drawGrid;
