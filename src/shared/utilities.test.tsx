import { canUseDom } from './utilities';

describe('canUseDom', () => {
    test('should return true when the function is called in the browser', () => {
        expect(canUseDom()).toBe(true);
    });
});
