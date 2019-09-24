import { fonts } from '..';
import { decodeFont } from '../font';

test('Can decode font', () => {
    decodeFont(fonts['ascii-small']);
});
