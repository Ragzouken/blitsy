// tslint:disable:no-bitwise
export type RGBA = { r: number; g: number; b: number; a: number };

export function colorToHex(color: number): string {
    color = (color | 0xff000000) >>> 0;
    const abgrHex = color.toString(16);
    return abgrHex.substr(6, 2) + abgrHex.substr(4, 2) + abgrHex.substr(2, 2);
}

export function colorToRgba(color: number): RGBA {
    return { r: (color >> 0) & 0xff, g: (color >> 8) & 0xff, b: (color >> 16) & 0xff, a: (color >> 24) & 0xff };
}

export function rgbaToColor(rgba: RGBA): number {
    const { r, g, b, a } = rgba;
    return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
}

export function rgbToHex(rgba: RGBA): string {
    return colorToHex(rgbaToColor(rgba));
}

export function hexToRgb(hex: string): RGBA {
    const bgrHex = hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2);
    return colorToRgba(parseInt(bgrHex, 16) | 0xff000000);
}

export function hexToColor(hex: string): number {
    return rgbaToColor(hexToRgb(hex));
}
