/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import Upload, { UploadSize } from '..';
import { fireEvent, render, waitFor, act } from '../../../tests/Utilities';
import { setup, teardown } from './mock';
import MatchMediaMock from 'jest-matchmedia-mock';

let matchMedia: any;

describe('Upload.Dropzone', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  beforeEach(() => setup());

  afterEach(() => {
    teardown();
    matchMedia.clear();
  });

  test('support drop file with over style', async () => {
    jest.useFakeTimers();
    const { container: wrapper } = render(
      <Upload.Dropzone action="http://upload.com">
        <div />
      </Upload.Dropzone>
    );

    fireEvent.dragOver(wrapper.querySelector('.upload-drop-container')!, {
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
          .querySelector('.upload-drop')
          .classList.contains('upload-drop-hover')
      ).toBeTruthy();
    });

    jest.useRealTimers();
  });

  test('support onDrop when files are dropped onto upload area', async () => {
    const onDrop = jest.fn();
    const { container: wrapper } = render(
      <Upload.Dropzone onDrop={onDrop}>
        <div />
      </Upload.Dropzone>
    );

    fireEvent.drop(wrapper.querySelector('.upload-drop-container')!, {
      dataTransfer: {
        files: [new File(['foo'], 'foo.png', { type: 'image/png' })],
      },
    });

    await waitFor(() => {
      expect(onDrop).toHaveBeenCalled();
    });
  });

  test('support fullWidth when size is small', async () => {
    const onDrop = jest.fn();
    const { container: wrapper } = render(
      <Upload.Dropzone fullWidth onDrop={onDrop} size={UploadSize.Small}>
        <div />
      </Upload.Dropzone>
    );

    fireEvent.drop(wrapper.querySelector('.upload-drop-container')!, {
      dataTransfer: {
        files: [new File(['foo'], 'foo.png', { type: 'image/png' })],
      },
    });

    await waitFor(() => {
      expect(onDrop).toHaveBeenCalled();
    });

    expect(wrapper.querySelector('.upload-small')).toBeTruthy();
    expect(wrapper.querySelector('.upload-full-width')).toBeTruthy();
    expect(wrapper.querySelector('.upload-list-small')).toBeTruthy();
    expect(wrapper.querySelector('.upload-list-full-width')).toBeTruthy();
  });

  test('support fullWidth when size is medium', async () => {
    const onDrop = jest.fn();
    const { container: wrapper } = render(
      <Upload.Dropzone fullWidth onDrop={onDrop} size={UploadSize.Medium}>
        <div />
      </Upload.Dropzone>
    );

    fireEvent.drop(wrapper.querySelector('.upload-drop-container')!, {
      dataTransfer: {
        files: [new File(['foo'], 'foo.png', { type: 'image/png' })],
      },
    });

    await waitFor(() => {
      expect(onDrop).toHaveBeenCalled();
    });

    expect(wrapper.querySelector('.upload-medium')).toBeTruthy();
    expect(wrapper.querySelector('.upload-full-width')).toBeTruthy();
    expect(wrapper.querySelector('.upload-list-medium')).toBeTruthy();
    expect(wrapper.querySelector('.upload-list-full-width')).toBeTruthy();
  });
});
