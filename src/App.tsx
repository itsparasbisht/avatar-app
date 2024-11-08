import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  FabricImage,
  FabricObject,
  FabricText,
  Group,
  PencilBrush,
  Rect,
  util,
} from "fabric";
import { v4 as uuidv4 } from "uuid";
import { addRect, addText, moveRect } from "./canvasMethods.js";

function App() {
  const canvasRef = useRef<Canvas | null>(null);
  const shapesRef = useRef<FabricObject[]>([]);
  const [selectedShape, setSelectedShape] = useState<FabricObject | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = new Canvas("canvas", {
        backgroundColor: "black",
      });
      canvasRef.current = canvas;

      canvas.isDrawingMode = true;

      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = "red";

      // Event listeners
      canvas.on("path:created", (event) => {
        console.log("New path drawn:", event.path);
      });

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
      selectedShape.setCoords(); // to update the selection
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

  function animateObject() {
    selectedShape?.animate(
      {
        left: 750,
      },
      {
        duration: 2000,
        onChange: canvasRef?.current?.renderAll.bind(canvasRef?.current),
        easing: util.ease.easeOutBounce,
        onComplete: () => console.log("Animation completed!"),
      }
    );
  }

  function handleAddText() {
    const id = uuidv4();
    const text = addText("yellow srd fs\nsfdgsdfg\nbjhbi") as FabricObject;
    text.set("id", id);
    canvasRef.current?.add(text);
    shapesRef.current.push(text);
  }

  function createGroup() {
    const rect = new Rect({
      fill: "red",
      width: 100,
      height: 100,
      originX: "center",
      originY: "center",
    });

    const text = new FabricText("op kpkpok fsdg", {
      fontWeight: "bold",
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      fontFamily: "monospace",
      textAlign: "center",
      originX: "center",
      originY: "center",
    });

    var group = new Group([rect, text], {
      left: 100,
      top: 100,
      angle: 0,
      originX: "center",
      originY: "center",
    });

    canvasRef.current?.add(group);
  }

  function draw() {
    if (canvasRef.current) {
      canvasRef.current.isDrawingMode = !canvasRef.current?.isDrawingMode;
    }
  }

  return (
    <div>
      <canvas id="canvas" width="800" height="800"></canvas>
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      <button onClick={handleClick}>Move Right</button>
      <button onClick={addImage}>Add Image</button>
      <button onClick={animateObject}>Animate</button>
      <button onClick={handleAddText}>Add Text</button>
      <button onClick={createGroup}>Add Group</button>
      <button onClick={draw}>Toggle draw</button>
    </div>
  );
}

export default App;
