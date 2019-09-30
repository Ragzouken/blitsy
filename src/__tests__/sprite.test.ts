import { createContext2D } from '../canvas';
import { imageToSprite, drawSprite, spriteToCanvas } from '../sprite';

test('Can call spriteToCanvas', () => {
    const context = createContext2D(32, 32);
    const sprite = imageToSprite(context.canvas);
    spriteToCanvas(sprite);
});

test('Can call drawSprite', () => {
    const context = createContext2D(32, 32);
    const sprite = imageToSprite(context.canvas);
    drawSprite(context, sprite, 0, 0);
});
