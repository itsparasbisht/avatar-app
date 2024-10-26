import { Rect } from "fabric";

export function addRect(id: string, color: string) {
  const rect = new Rect({
    id: id,
    left: 0,
    top: 0,
    fill: color,
    width: 50,
    height: 50,
  });
  return rect;
}

export function moveRect(rect: Rect, x: number, y: number) {
  const left = rect.left;
  const top = rect.top;

  rect.set({ left: left + x, top: top + y });
}
