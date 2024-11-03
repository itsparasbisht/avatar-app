import { FabricText, Gradient, Rect } from "fabric";

export function addRect(id: string, color: string) {
  const rect = new Rect({
    id: id,
    left: 0,
    top: 0,
    fill: color,
    width: 50,
    height: 50,
  });

  const gradient = new Gradient({
    type: "linear",
    coords: { x1: 0, y1: 0, x2: rect.width, y2: rect.width },
    colorStops: [
      {
        offset: 0,
        color: "red",
      },
      {
        offset: 1,
        color: "blue",
      },
    ],
  });

  // const gradient = new Gradient({
  //   type: "radial",
  //   coords: {
  //     x1: rect.width / 2, // Center of the inner circle (middle of the object)
  //     y1: rect.height / 2, // Center of the inner circle (middle of the object)
  //     r1: 10, // Inner radius (starts at a single point)
  //     x2: rect.width / 2, // Center of the outer circle (same as x1)
  //     y2: rect.height / 2, // Center of the outer circle (same as y1)
  //     r2: rect.height / 2, // Outer radius (spreads to the edge of the object)
  //   },
  //   colorStops: [
  //     {
  //       offset: 0,
  //       color: "black",
  //     },
  //     {
  //       offset: 0.5,
  //       color: "white",
  //     },
  //     {
  //       offset: 1,
  //       color: "yellow",
  //     },
  //   ],
  // });

  rect.set("fill", gradient);

  return rect;
}

export function addText(content: string) {
  const text = new FabricText(content, {
    fontWeight: "bold",
    fill: "white",
    stroke: "black",
    strokeWidth: 2,
    fontFamily: "monospace",
    backgroundColor: "red",
  });

  return text;
}

export function moveRect(rect: Rect, x: number, y: number) {
  const left = rect.left;
  const top = rect.top;

  rect.set({ left: left + x, top: top + y });
}
