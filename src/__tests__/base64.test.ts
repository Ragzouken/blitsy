import { base64ToUint8, uint8ToBase64 } from '../base64';

const arrow = 'APAff/ABBxAA';
const square = '/OAHP/jBD34A';
const icons = [arrow, square];

test.each(icons)('Icons from base64 and back', icon => {
    const data = base64ToUint8(icon);
    const icon2 = uint8ToBase64(data);
    expect(icon2).toEqual(icon);
});
