import { imageToContext } from '../image';

test("Can call imageToContext", () => {
    const image = new Image(32, 32);
    imageToContext(image);
});
