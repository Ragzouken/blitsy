import { decodeTexture, encodeTexture, formats, TextureData } from '../index';
import { createContext2D } from '../canvas';

const arrowM1: TextureData = { _type: 'texture', format: 'M1', width: 11, height: 6, data: 'APAff/ABBxAA' };
const squareM1: TextureData = { _type: 'texture', format: 'M1', width: 11, height: 6, data: '/OAHP/jBD34A' };

const textures = [arrowM1, squareM1];

const white = 0xffffffff;
const clear = 0x00000000;
const check7x11 = asciiToRgba(`
_XXX_X_
____X_X
_X_X___
__XXX_X
_____X_
X_X_XX_
X__X_X_
X__X__X
_X_X_X_
____X_X
_XXXXX_`);

function asciiToRgba(ascii: string): Uint8ClampedArray {
    ascii = ascii.trim().replace(/\n/g, '');
    const colors = new Uint32Array(Array.from(ascii).map(c => (c === 'X' ? white : clear)));
    return new Uint8ClampedArray(colors.buffer);
}

function rgbaToAscii(rgba: Uint8ClampedArray, width = 0): string {
    width = width !== 0 ? width : rgba.length;
    const colors = new Uint32Array(rgba.buffer);
    const chars = Array.from(colors).map(c => (c > 0 ? 'X' : '_'));
    const lines: string[] = [];
    for (let i = 0; i < chars.length / width; ++i) {
        lines.push(chars.slice(i * width, (i + 1) * width).join(''));
    }

    return lines.join('\n');
}

function encodeDecode(data: Uint8ClampedArray, format: string, width: number, height: number): Uint8ClampedArray {
    const encoded = formats[format].encode(data);
    const decoded = new Uint8ClampedArray(width * height * 4);
    formats[format].decode(encoded, decoded);
    return decoded;
}

test.each(['M1', 'R4', 'R8', 'RGBA8'])("Can call encode texture", format => {
    const context = createContext2D(32, 32);
    encodeTexture(context, format);
});

test('RGBA8 encode/decode', () => {
    const decoded = encodeDecode(check7x11, 'RGBA8', 7, 11);
    expect(decoded).toEqual(check7x11);
});

test.each(['M1', 'R4', 'R8'])('Channel encode/decode', format => {
    const decoded = encodeDecode(check7x11, format, 7, 11);
    expect(rgbaToAscii(decoded, 7)).toEqual(rgbaToAscii(check7x11, 7));
});

test.each(['M1'])('M* overwrites all channels with white or clear', format => {
    const encoded = formats[format].encode(check7x11);
    const decoded = new Uint8ClampedArray(7 * 11 * 4).fill(69);
    formats[format].decode(encoded, decoded);
    const colors = new Uint32Array(decoded.buffer);
    expect(Array.from(colors).every(v => v === white || v === clear));
});

test.each(['R4', 'R8'])('R* decode only writes R channel', format => {
    const check = 69;
    const encoded = formats[format].encode(check7x11);
    const decoded = new Uint8ClampedArray(7 * 11 * 4).fill(check);
    formats[format].decode(encoded, decoded);
    const GBA = Array.from(decoded).filter((_, i) => i % 4 !== 0);
    expect(GBA.every(v => v === check));
});

xtest.each(textures)('re-encodes to same data', texture => {
    const decoded = decodeTexture(texture);
    const encoded = encodeTexture(decoded, texture.format);
    expect(encoded.data).toEqual(texture.data);
});
