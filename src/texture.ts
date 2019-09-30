import { base64ToUint8, uint8ToBase64 } from './base64';
import { createContext2D } from './canvas';

export type TextureData = {
    _type: 'texture';
    format: string;
    width: number;
    height: number;
    data: string;
};

export type PixelFormat = { decode: PixelDecoder; encode: PixelEncoder };
export type PixelDecoder = (data: Uint8ClampedArray, pixels: Uint8ClampedArray) => void;
export type PixelEncoder = (pixels: Uint8ClampedArray) => Uint8ClampedArray;

export const decodeRGBA8: PixelDecoder = (data, pixels) => pixels.set(data);
export const encodeRGBA8: PixelEncoder = pixels => pixels;

export const decodeR8: PixelDecoder = (data, pixels) => {
    for (let i = 0; i < data.length; ++i) {
        pixels[i * 4] = data[i];
    }
};

export const encodeR8: PixelEncoder = pixels => {
    const data = new Uint8ClampedArray(pixels.length / 4);
    for (let i = 0; i < data.length; ++i) {
        data[i] = pixels[i * 4];
    }
    return data;
};

export const decodeR4: PixelDecoder = (data, pixels) => {
    for (let i = 0; i < data.length; ++i) {
        // tslint:disable-next-line:no-bitwise
        pixels[i * 8 + 0] = (data[i] >>> 4) * 16;
        // tslint:disable-next-line:no-bitwise
        pixels[i * 8 + 4] = (data[i] & 0b1111) * 16;
    }
};

export const encodeR4: PixelEncoder = pixels => {
    const data = new Uint8ClampedArray(pixels.length / 8);
    for (let i = 0; i < data.length; ++i) {
        data[i] =
            // tslint:disable-next-line:no-bitwise
            ((pixels[i * 8 + 0] / 16) << 4) |
            // tslint:disable-next-line:no-bitwise
            ((pixels[i * 8 + 4] / 16) & 0b1111);
    }
    return data;
};

const white = 0xffffffff;
const clear = 0x00000000;

export const decodeM1: PixelDecoder = (data, pixels) => {
    const pixels32 = new Uint32Array(pixels.buffer);
    for (let i = 0; i < data.length; ++i) {
        for (let bit = 0; bit < 8; ++bit) {
            if (i * 8 + bit < pixels32.length) {
                // tslint:disable-next-line:no-bitwise
                const on = (data[i] >> bit) & 1;
                pixels32[i * 8 + bit] = on ? white : clear;
            }
        }
    }
};

export const encodeM1: PixelEncoder = pixels => {
    const pixels32 = new Uint32Array(pixels.buffer);
    const data = new Uint8ClampedArray(Math.ceil(pixels32.length / 8));
    for (let i = 0; i < data.length; ++i) {
        let byte = 0;
        for (let bit = 0; bit < 8; ++bit) {
            // tslint:disable-next-line:no-bitwise
            byte <<= 1;
            // tslint:disable-next-line:no-bitwise
            byte |= pixels32[i * 8 + (7 - bit)] > 0 ? 1 : 0;
        }
        data[i] = byte;
    }

    return data;
};

export const formats: { [id: string]: PixelFormat } = {
    RGBA8: { decode: decodeRGBA8, encode: encodeRGBA8 },
    R8: { decode: decodeR8, encode: encodeR8 },
    R4: { decode: decodeR4, encode: encodeR4 },
    M1: { decode: decodeM1, encode: encodeM1 },
};

export function encodeTexture(context: CanvasRenderingContext2D, format: string): TextureData {
    const encoder = formats[format].encode;
    const [width, height] = [context.canvas.width, context.canvas.height];
    const pixels = context.getImageData(0, 0, width, height).data;
    const data = uint8ToBase64(encoder(pixels));

    return { _type: 'texture', format, width, height, data };
}

export function decodeTexture(texture: TextureData): CanvasRenderingContext2D {
    const decoder = formats[texture.format].decode;
    const context = createContext2D(texture.width, texture.height);
    context.clearRect(0, 0, texture.width, texture.height);
    const image = context.getImageData(0, 0, texture.width, texture.height);
    decoder(base64ToUint8(texture.data), image.data);
    context.putImageData(image, 0, 0);

    return context;
}

export function decodeAsciiTexture(ascii: string, solid = '1'): CanvasRenderingContext2D {
    ascii = ascii.trim();
    const rows = ascii.split('\n');
    ascii = ascii.replace(/\n/g, '');

    const [width, height] = [rows[0].length, rows.length];
    const context = createContext2D(width, height);
    const image = context.createImageData(width, height);
    const colors = new Uint32Array(image.data.buffer);
    colors.set(Array.from(ascii).map(c => (c === solid ? white : clear)));
    context.putImageData(image, 0, 0);

    return context;
}
