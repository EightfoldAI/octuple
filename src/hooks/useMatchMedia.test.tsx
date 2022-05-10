import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Breakpoints, useMatchMedia } from './useMatchMedia';

let matchMedia: any;

describe('useMatchMedia', () => {
    afterEach(() => {
        matchMedia.clear();
    });
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    it('is large screen', () => {
        window.resizeTo(1920, 1080);
        const { result } = renderHook(() => useMatchMedia(Breakpoints.Large));
        const largeMq = result.current;
        expect(largeMq).toBe(true);
    });

    it('is medium screen', () => {
        window.resizeTo(1024, 768);
        const { result } = renderHook(() => useMatchMedia(Breakpoints.Medium));
        const mediumMq = result.current;
        expect(mediumMq).toBe(true);
    });

    it('is small screen', () => {
        window.resizeTo(640, 480);
        const { result } = renderHook(() => useMatchMedia(Breakpoints.Small));
        const smallMq = result.current;
        expect(smallMq).toBe(true);
    });

    it('is extra small screen', () => {
        window.resizeTo(320, 480);
        const { result } = renderHook(() => useMatchMedia(Breakpoints.XSmall));
        const xSmallMq = result.current;
        expect(xSmallMq).toBe(true);
    });
});
