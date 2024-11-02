import { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, FabricObject, loadSVGFromURL } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { addRect, moveRect } from "./canvasMethods.js";

function App() {
  const canvasRef = useRef<Canvas | null>(null);
  const shapesRef = useRef<FabricObject[]>([]);
  const [selectedShape, setSelectedShape] = useState<FabricObject | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = new Canvas("canvas", {
        backgroundColor: "grey",
      });
      canvasRef.current = canvas;

      canvas.on("selection:created", (e) => {
        const selectedObject = e.selected?.[0];
        if (selectedObject) {
          const shape = shapesRef.current.find((s) => s === selectedObject);
          setSelectedShape(shape || null);
        }
      });

      canvas.on("selection:updated", (e) => {
        const selectedObject = e.selected?.[0];
        if (selectedObject) {
          const shape = shapesRef.current.find((s) => s === selectedObject);
          setSelectedShape(shape || null);
        }
      });

      canvas.on("selection:cleared", (e) => {
        setSelectedShape(null);
      });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, []);

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
      selectedShape.setCoords();
      canvasRef.current?.renderAll();
    }
  }

  async function addImage() {
    const oImg = await FabricImage.fromURL(
      "https://fastly.picsum.photos/id/509/200/200.jpg?hmac=F3VucjvZ_2eEx_ObPM7NJ_Ymq5jESSGCuXo_8japTZc"
    );
    canvasRef.current?.add(oImg);
    shapesRef.current.push(oImg);
  }

  return (
    <div>
      <canvas id="canvas" width="800" height="800"></canvas>
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      <button onClick={handleClick}>Move Right</button>
      <button onClick={addImage}>Add Image</button>
    </div>
  );
}

export default App;
