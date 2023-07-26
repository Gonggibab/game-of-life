import { Dispatch, SetStateAction } from "react";

const countLiveNeighbor = (
  grid: boolean[][],
  x: number,
  y: number,
  i: number,
  j: number
): number => {
  const dp = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let count = 0;
  for (const d of dp) {
    const di = d[0] + i,
      dj = d[1] + j;

    if (di < 0 || di >= x || dj < 0 || dj >= y) continue;

    if (grid[di][dj]) count += 1;
  }

  return count;
};

const startLife = (setGrid: Dispatch<SetStateAction<boolean[][]>>) => {
  setGrid((grid) => {
    const x = grid.length;
    const y = grid[0].length;

    const newArr = grid.map((row) => [...row]);

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const live = countLiveNeighbor(grid, x, y, i, j);

        if (grid[i][j]) {
          // 세포가 살아 있을 때
          if (live < 2 || live > 3) newArr[i][j] = false;
        } else {
          // 세포가 죽었을 때
          if (live === 3) newArr[i][j] = true;
        }
      }
    }

    return newArr;
  });
};

export default startLife;
