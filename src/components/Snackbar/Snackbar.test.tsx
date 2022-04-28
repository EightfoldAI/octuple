import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { snack, SnackbarContainer } from './';
import {
    act,
    createEvent,
    fireEvent,
    render,
    RenderResult,
} from '@testing-library/react';
import { IconName } from '../Icon';

let matchMedia: any;

describe('Snackbar', () => {
    let wrapper: RenderResult;
    const content = 'This is a snackbar';

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    beforeEach(() => {
        wrapper = render(<SnackbarContainer />);
    });

    test('test snack.serve', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        await act(async () => {
            snack.serve({
                content,
            });
            await new Promise((r) => setTimeout(r, 300));
            expect(wrapper.queryByText(content)).not.toBe(null);
            await new Promise((r) => setTimeout(r, 3200));
            expect(wrapper.queryByText(content)).toBe(null);
        });
    });

    test('test snack.serveNeutral', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        await act(async () => {
            snack.serveNeutral({
                content,
            });
            await new Promise((r) => setTimeout(r, 300));
            expect(wrapper.queryByText(content)).not.toBe(null);
            await new Promise((r) => setTimeout(r, 3200));
            expect(wrapper.queryByText(content)).toBe(null);
        });
    });

    test('test snack.serveDisruptive', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        await act(async () => {
            snack.serveDisruptive({
                content,
            });
            await new Promise((r) => setTimeout(r, 300));
            expect(wrapper.queryByText(content)).not.toBe(null);
            await new Promise((r) => setTimeout(r, 3200));
            expect(wrapper.queryByText(content)).toBe(null);
        });
    });

    test('test snack.servePositive', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        await act(async () => {
            snack.servePositive({
                content,
            });
            await new Promise((r) => setTimeout(r, 300));
            expect(wrapper.queryByText(content)).not.toBe(null);
            await new Promise((r) => setTimeout(r, 3200));
            expect(wrapper.queryByText(content)).toBe(null);
        });
    });

    test('test snack.serveWarning', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        await act(async () => {
            snack.serveWarning({
                content,
            });
        });
    });

    test('test snack closable', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        const onClose = jest.fn();
        await act(async () => {
            snack.serveWarning({
                content,
                closable: true,
                onClose,
            });
            await new Promise((r) => setTimeout(r, 300));
            expect(wrapper.queryByText(content)).not.toBe(null);
            await new Promise((r) => setTimeout(r, 3200));
            expect(wrapper.queryByText(content)).not.toBe(null);
            const closeButton = wrapper.queryByRole('button');
            const event = createEvent.click(closeButton);
            fireEvent(closeButton, event);
            expect(wrapper.queryByText(content)).toBe(null);
        });
    });

    test('test snack icon', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        await act(async () => {
            snack.serve({
                content,
                icon: IconName.mdiHomeCity,
            });
            await new Promise((r) => setTimeout(r, 300));
            expect(wrapper.queryByText(content)).not.toBe(null);
            await new Promise((r) => setTimeout(r, 3200));
            expect(wrapper.queryByText(content)).toBe(null);
        });
    });
});
