import { Canvas, createContext2D, MAGENTA_CANVAS_4X4 } from "./canvas";
import { Image } from "./image";

export type Vector2 = { x: number, y: number };
export type Rect = { x: number, y: number, w: number, h: number };
export type Sprite = { image: Image, rect: Rect };

export const MAGENTA_SPRITE_4X4 = canvasToSprite(MAGENTA_CANVAS_4X4);

export function makeVector2(x: number, y: number): Vector2
{
    return { x, y };
}

export function makeRect(x: number, y: number, w: number, h: number): Rect
{
    return { x, y, w, h };
}

export function makeSprite(image: Image, rect: Rect): Sprite
{
    return { image, rect };
}

export function canvasToSprite(canvas: Canvas): Sprite
{
    return { image: canvas, rect: makeRect(0, 0, canvas.width, canvas.height) }
}

export function spriteToCanvas(sprite: Sprite): Canvas
{
    const context = createContext2D(sprite.rect.w, sprite.rect.h);
    drawSprite(context, sprite, 0, 0);
    return context.canvas;
}

export function drawSprite(context: CanvasDrawImage, 
                           sprite: Sprite, 
                           x: number, y: number): void
{
    const [sx, sy] = [sprite.rect.x, sprite.rect.y];
    const [sw, sh] = [sprite.rect.w, sprite.rect.h];
    context.drawImage(sprite.image, sx, sy, sw, sh, x, y, sw, sh);
}
