import { hasWindow } from './utilities';

describe('hasWindow', () => {
    test('should return true when the function is called in the browser', () => {
        expect(hasWindow()).toBe(true);
    });
});
