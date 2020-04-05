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


export function num2hex(value: number): string
{
    return rgb2hex(num2rgb(value));
}

export function rgb2num(r: number, g: number, b: number, a: number = 255)
{
  return ((a << 24) | (b << 16) | (g << 8) | (r)) >>> 0;
}

export function num2rgb(value: number): [number, number, number]
{
    const r = (value >>  0) & 0xFF;
    const g = (value >>  8) & 0xFF;
    const b = (value >> 16) & 0xFF;
    
    return [r, g, b];
}

export function rgb2hex(color: [number, number, number]): string
{
    const [r, g, b] = color;
    let rs = r.toString(16);
    let gs = g.toString(16);
    let bs = b.toString(16);

    if (rs.length < 2) { rs = "0" + rs; }
    if (gs.length < 2) { gs = "0" + gs; }
    if (bs.length < 2) { bs = "0" + bs; }

    return `#${rs}${gs}${bs}`;
}

export function hex2rgb(color: string): [number, number, number]
{
    const matches = color.match(/^#([0-9a-f]{6})$/i);

    if (matches) 
    {
        const match = matches[1];

        return [
            parseInt(match.substr(0,2),16),
            parseInt(match.substr(2,2),16),
            parseInt(match.substr(4,2),16)
        ];
    }
    
    return [0, 0, 0];
}
