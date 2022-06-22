import { convertToKebabCase } from './convertToKebabCase';

describe('convertToKebabCase', () => {
    it('Converts to kebab case given an input', () => {
        let result = convertToKebabCase('testStringToConvert');
        expect(result).toBe('test-string-to-convert');

        result = convertToKebabCase('TestStringToConvert');
        expect(result).toBe('test-string-to-convert');
    });
});
