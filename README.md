# Blitsy
Pixel manipulation utilities for bitsylike tools and game engines.

# Texture Encoding
Convert a canvas context 2d into a compact structure of base64 encoded pixels and metadata:
`const data = encodeTexture(context2d, 'RGBA8');`

Convert back to a canvas context 2d:
`const context2d = decodeTexture(data);`

Available formats:

- `RGBA8` each pixel has one byte per channel, same as canvas imagedata.
- `R8` encodes only the red channel, using one byte per pixel.
- `R4` encodes only the red channel, using 4 bits per pixel.
- `M1` encodes only on/off pixel transparency, using 1 bit per pixel.

# Font Encoding
Load the ascii small font (from bitsy):
`const asciiSmall = decodeFont(fonts['ascii-small'])`

Fetch glyphs from the font:
`const g = asciiSmall.get('g'.codePointAt(0));`

Draw glyph:
`drawSprite(context2d, g.sprite, 0, 0);`
