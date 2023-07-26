"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import startLife from "@/utils/startLife";
import create2DArray from "@/utils/create2DArray";
import drawGrid from "@/utils/drawGrid";

const CELL_SIZE = 20;
const LINE_WIDTH = 1;

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [render, setRender] = useState<NodeJS.Timer | null>(null);

  // 초기 canvas 그리기
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth - 32;
    canvas.height = window.innerHeight - 32;

    const numRows = Math.floor(canvas.height / CELL_SIZE);
    const numCols = Math.floor(canvas.width / CELL_SIZE);

    setGrid(create2DArray(numRows, numCols));

    drawGrid(ctx, CELL_SIZE, LINE_WIDTH, "#808080", numRows, numCols);

    return () => {
      if (render) clearInterval(render);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!canvasRef.current || grid.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const x = grid.length;
    const y = grid[0].length;

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (grid[i][j]) {
          ctx.fillStyle = "#808080";
        } else {
          ctx.fillStyle = "white";
        }

        ctx.fillRect(
          j * CELL_SIZE + LINE_WIDTH,
          i * CELL_SIZE + LINE_WIDTH,
          CELL_SIZE - LINE_WIDTH * 2,
          CELL_SIZE - LINE_WIDTH * 2
        );
      }
    }
  }, [grid]);

  const onCellClicked = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - (rect.left + LINE_WIDTH);
    const mouseY = e.clientY - (rect.top + LINE_WIDTH);

    const clickedCol = Math.floor(mouseX / CELL_SIZE);
    const clickedRow = Math.floor(mouseY / CELL_SIZE);

    const temp = [...grid];
    if (!temp[clickedRow][clickedCol]) {
      temp[clickedRow][clickedCol] = true;
    } else {
      temp[clickedRow][clickedCol] = false;
    }

    setGrid(temp);
  };

  const onButtonClicked = () => {
    if (!canvasRef.current || grid.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const numRows = grid.length;
    const numCols = grid[0].length;

    if (render) {
      drawGrid(ctx, CELL_SIZE, LINE_WIDTH, "#909090", numRows, numCols);

      clearInterval(render);
      setRender(null);
    } else {
      drawGrid(ctx, CELL_SIZE, LINE_WIDTH, "white", numRows, numCols);

      setRender(
        setInterval(() => {
          startLife(setGrid);
        }, 100)
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onButtonClicked}
        className="z-10 absolute top-0 right-0 w-full"
      >
        {render ? "종료" : "시작"}
      </button>
      <canvas
        ref={canvasRef}
        onClick={(e) => onCellClicked(e)}
        className="w-full h-full"
      ></canvas>
    </>
  );
}
