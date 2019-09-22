import { Context2D, createContext2D } from "./canvas";

export type Image = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;

export function imageToContext(image: HTMLImageElement): Context2D
{
    const context = createContext2D(image.width, image.height);
    context.drawImage(image, 0, 0);
    return context;
}
