import React from 'react';
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
        jest.useFakeTimers();
        matchMedia = new MatchMediaMock();
    });

    afterAll(() => {
        jest.runAllTimers();
        jest.clearAllTimers();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    beforeEach(() => {
        wrapper = render(<SnackbarContainer />);
    });

    test('test snack.serve', () => {
        expect(wrapper.queryByText(content)).toBe(null);
        act(() => {
            snack.serve({
                content,
            });
        });
        expect(wrapper.queryByText(content)).not.toBe(null);
        act(() => {
            snack.serve({
                content,
            });
            jest.runAllTimers();
        });
        expect(wrapper.queryByText(content)).toBe(null);
    });

    test('test snack.serveNeutral', () => {
        expect(wrapper.queryByText(content)).toBe(null);
        act(() => {
            snack.serveNeutral({
                content,
            });
        });
        expect(wrapper.queryByText(content)).not.toBe(null);
        act(() => {
            snack.serveNeutral({
                content,
            });
            jest.runAllTimers();
        });
        expect(wrapper.queryByText(content)).toBe(null);
    });

    test('test snack.serveDisruptive', () => {
        expect(wrapper.queryByText(content)).toBe(null);
        act(() => {
            snack.serveDisruptive({
                content,
            });
        });
        expect(wrapper.queryByText(content)).not.toBe(null);

        act(() => {
            snack.serveDisruptive({
                content,
            });
            jest.runAllTimers();
        });
        expect(wrapper.queryByText(content)).toBe(null);
    });

    test('test snack.servePositive', async () => {
        expect(wrapper.queryByText(content)).toBe(null);
        act(() => {
            snack.servePositive({
                content,
            });
        });
        expect(wrapper.queryByText(content)).not.toBe(null);
        act(() => {
            snack.servePositive({
                content,
            });
            jest.runAllTimers();
        });
        expect(wrapper.queryByText(content)).toBe(null);
    });

    test('test snack.serveWarning', async () => {
        act(() => {
            snack.serveWarning({
                content,
            });
        });
        expect(wrapper.queryByText(content)).not.toBe(null);
        act(() => {
            snack.serveWarning({
                content,
            });
            jest.runAllTimers();
        });
        expect(wrapper.queryByText(content)).toBe(null);
    });

    test('test snack closable', () => {
        expect(wrapper.queryByText(content)).toBe(null);
        const onClose = jest.fn();
        act(() => {
            snack.serveWarning({
                content,
                closable: true,
                onClose,
            });
            jest.runAllTimers();
        });
        expect(wrapper.queryByText(content)).not.toBe(null);
        const closeButton = wrapper.queryByRole('button');
        const event = createEvent.click(closeButton);
        fireEvent(closeButton, event);
        expect(onClose).toBeCalled();
        expect(wrapper.queryByText(content)).toBe(null);
    });

    test('test snack icon', () => {
        expect(wrapper.queryByText(content)).toBe(null);
        act(() => {
            snack.serve({
                content,
                icon: IconName.mdiHomeCity,
            });
        });
        expect(wrapper.queryByText(content)).not.toBe(null);
    });

    test('test snack action', () => {
        expect(wrapper.queryByText(content)).toBe(null);
        const onClick = jest.fn();
        act(() => {
            snack.serve({
                content,
                actionButtonProps: {
                    text: 'Button',
                    onClick,
                },
            });
        });
        const actionButton = wrapper.queryByRole('button');
        const event = createEvent.click(actionButton);
        fireEvent(actionButton, event);
        expect(onClick).toBeCalled();
        expect(wrapper.queryByText(content)).toBe(null);
    });
});
