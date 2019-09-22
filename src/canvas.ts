export type Canvas = HTMLCanvasElement | OffscreenCanvas;
export type Context2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export const MAGENTA_CANVAS_4X4 = createCanvas(4, 4);
const context = MAGENTA_CANVAS_4X4.getContext('2d')!;
context.fillStyle = '#FF00FF';
context.fillRect(0, 0, 4, 4);

/**
 * Create a new html canvas.
 * @param width canvas width in pixels.
 * @param height canvas height in pixels.
 */
export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * Create a new canvas and get a 2d rendering context from it.
 * @param width canvas width in pixels.
 * @param height canvas height in pixels.
 */
export function createContext2D(width: number, height: number): CanvasRenderingContext2D {
  const canvas = createCanvas(width, height);
  return canvas.getContext('2d')!;
}
