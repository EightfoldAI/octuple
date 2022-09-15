import initStoryshots, {
    multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

initStoryshots({
    test: multiSnapshotWithOptions(),
});
