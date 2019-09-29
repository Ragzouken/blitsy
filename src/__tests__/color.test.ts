import { colorToHex, colorToRgba, rgbaToColor, rgbToHex, hexToRgb, hexToColor } from '../color';

const testCases = [
    { color: 0xffff00ff, rgba: { r: 255, g: 0, b: 255, a: 255 }, hex: 'ff00ff' },
    { color: 0xffc08040, rgba: { r: 64, g: 128, b: 192, a: 255 }, hex: '4080c0' },
];

test.each(testCases)('colorToHex', testCase => {
    expect(colorToHex(testCase.color)).toEqual(testCase.hex);
});

test.each(testCases)('hexToColor', testCase => {
    expect(hexToColor(testCase.hex)).toEqual(testCase.color);
});

test.each(testCases)('colorToRgba', testCase => {
    expect(colorToRgba(testCase.color)).toEqual(testCase.rgba);
});

test.each(testCases)('rgbaToColor', testCase => {
    expect(rgbaToColor(testCase.rgba)).toEqual(testCase.color);
});

test.each(testCases)('rgbToHex', testCase => {
    expect(rgbToHex(testCase.rgba)).toEqual(testCase.hex);
});

test.each(testCases)('hexToRgb', testCase => {
    expect(hexToRgb(testCase.hex)).toEqual(testCase.rgba);
});
