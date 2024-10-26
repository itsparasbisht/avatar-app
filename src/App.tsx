import { useEffect, useRef, useState } from "react";
import { Canvas, FabricObject } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { addRect, moveRect } from "./canvasMethods.js";

function App() {
  const canvasRef = useRef<Canvas | null>(null);
  const shapesRef = useRef<FabricObject[]>([]);
  const [selectedShape, setSelectedShape] = useState<FabricObject | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = new Canvas("canvas");
      canvasRef.current = canvas;

      canvas.on("selection:created", (e) => {
        const selectedObject = e.selected?.[0];
        if (selectedObject) {
          const id = (selectedObject as any).id; // Type assertion if ID is not in fabric.Object type
          handleSelectedShape(id);
        }
      });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, []);

  function handleSelectedShape(id: string) {
    const shape = shapesRef.current.find((s) => s.id === id) || null;
    setSelectedShape(shape);
  }

  function handleAddRectangle() {
    const id = uuidv4();
    const rect = addRect(id, "yellow") as FabricObject;
    rect.set("id", id);
    canvasRef.current?.add(rect);
    shapesRef.current.push(rect);
  }

  function handleClick() {
    if (selectedShape) {
      moveRect(selectedShape, 10, 10);
      canvasRef.current?.renderAll();
    }
  }

  return (
    <div>
      <canvas id="canvas" width="800" height="800"></canvas>
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      <button onClick={handleClick}>Move Right</button>
    </div>
  );
}

export default App;
