import { decodeTexture, TextureData } from "./encoding";
import { makeRect, makeSprite, makeVector2, Sprite, Vector2 } from "./sprite";

export type FontData = FontDataUniform;
export type Font = { name: string, lineHeight: number, characters: Map<number, FontCharacter> };
export type FontCharacter = { codepoint: number, sprite: Sprite, offset: Vector2, spacing: number };

export type FontDataUniform = {
    _type: "font",
    format: "U",

    name: string,
    charWidth: number,
    charHeight: number,
    atlas: TextureData,
    index: number[],
}

export function decodeFontUniform(fontData: FontDataUniform): Font
{
    const characters = new Map<number, FontCharacter>();
    const atlas = decodeTexture(fontData.atlas);
    const width = fontData.charWidth;
    const height = fontData.charHeight;
    const offset = makeVector2(0, 0);
    const spacing = fontData.charWidth;

    fontData.index.forEach((codepoint: number, i: number) => {
        const rect = makeRect(0, i * height, width, height);
        const sprite = makeSprite(atlas.canvas, rect);
        characters.set(codepoint, { codepoint, sprite, offset, spacing });
    });

    return { name: fontData.name, lineHeight: height, characters };
}

export function decodeFont(fontData: FontData): Font
{
    return decodeFontUniform(fontData);
}
