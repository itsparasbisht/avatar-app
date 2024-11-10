import { Canvas, Line } from "fabric";
import { useEffect, useRef } from "react";

function LineChart() {
  const canvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = new Canvas("canvas", {
        backgroundColor: "black",
      });

      canvasRef.current = canvas;
    }

    const canvasWidth = 800;
    const canvasHeight = 800;

    let xLineX1 = (10 / 100) * canvasWidth;
    let xLineY1 = (10 / 100) * canvasWidth;
    let xLineX2 = xLineX1;
    let xLineY2 = canvasHeight - xLineX1;

    const xLine = new Line([xLineX1, xLineY1, xLineX2, xLineY2], {
      stroke: "red",
    });

    const yLine = new Line([100, 700, 700, 700], {
      stroke: "red",
    });

    canvasRef.current.add(xLine, yLine);

    xPartition(5);
    yPartition();

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, []);

  function xPartition(len) {
    let x1 = 100,
      y1 = 695,
      x2 = 100,
      y2 = 705;

    for (let i = 0; i < len; i++) {
      const line = new Line([x1, y1, x2, y2], {
        stroke: "red",
      });

      x1 += 100;
      x2 += 100;

      canvasRef.current?.add(line);
    }
  }

  function yPartition() {
    let x1 = 95,
      y1 = 700,
      x2 = 105,
      y2 = 700;

    for (let i = 0; i < 10; i++) {
      const line = new Line([x1, y1, x2, y2], {
        stroke: "red",
      });

      y1 -= 100;
      y2 -= 100;

      canvasRef.current?.add(line);
    }
  }

  return (
    <canvas
      id="canvas"
      width="1000"
      height="800"
      style={{ border: "2px solid blue" }}
    ></canvas>
  );
}

export default LineChart;
