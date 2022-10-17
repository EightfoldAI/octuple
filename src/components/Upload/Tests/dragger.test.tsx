/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import Upload from '..';
import { fireEvent, render, waitFor, act } from '../../../tests/Utilities';
import { setup, teardown } from './mock';
import MatchMediaMock from 'jest-matchmedia-mock';

let matchMedia: any;

describe('Upload.Dragger', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    beforeEach(() => setup());

    afterEach(() => {
        teardown();
        matchMedia.clear();
    });

    test('support drag file with over style', async () => {
        jest.useFakeTimers();
        const { container: wrapper } = render(
            <Upload.Dragger action="http://upload.com">
                <div />
            </Upload.Dragger>
        );

        fireEvent.dragOver(wrapper.querySelector('.upload-drag-container')!, {
            target: {
                files: [{ file: 'foo.png' }],
            },
        });

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(
                wrapper
                    .querySelector('.upload-drag')
                    .classList.contains('upload-drag-hover')
            ).toBeTruthy();
        });

        jest.useRealTimers();
    });

    test('support onDrop when files are dropped onto upload area', async () => {
        const onDrop = jest.fn();
        const { container: wrapper } = render(
            <Upload.Dragger onDrop={onDrop}>
                <div />
            </Upload.Dragger>
        );

        fireEvent.drop(wrapper.querySelector('.upload-drag-container')!, {
            dataTransfer: {
                files: [new File(['foo'], 'foo.png', { type: 'image/png' })],
            },
        });

        await waitFor(() => {
            expect(onDrop).toHaveBeenCalled();
        });
    });
});
