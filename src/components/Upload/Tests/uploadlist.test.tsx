import React from 'react';
import Upload from '..';
import UploadList from '../UploadList';
import type { UploadFile, UploadProps } from '..';
import type { UploadListProps } from '../Upload.types';
import { previewImage } from '../Utils';
import Form from '../../Form';
import type { FormInstance } from '../../Form';
import { IconName } from '../../Icon';
import { setup, teardown } from './mock';
import { errorRequest, successRequest } from './requests';
import {
  act,
  fireEvent,
  render,
  sleep,
  waitFor,
} from '../../../tests/Utilities';
import MatchMediaMock from 'jest-matchmedia-mock';

let matchMedia: any;

const fileList: UploadProps['fileList'] = [
  {
    uid: '-1',
    name: 'xyz.png',
    status: 'done',
    url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
    thumbUrl:
      'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
    thumbUrl:
      'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
  },
];

describe('Upload List', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  // Mock for util raf
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = (id) => window.clearTimeout(id);

  // jsdom doesn't yet support `createObjectURL`
  const originCreateObjectURL = window.URL.createObjectURL;
  window.URL.createObjectURL = jest.fn(() => '');

  // Mock dom
  let size = { width: 0, height: 0 };
  function setSize(width: number, height: number) {
    size = { width, height };
  }
  const mockWidthGet = jest.spyOn(Image.prototype, 'width', 'get');
  const mockHeightGet = jest.spyOn(Image.prototype, 'height', 'get');
  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  let drawImageCallback: jest.Mock | null = null;
  function hookDrawImageCall(callback: jest.Mock) {
    drawImageCallback = callback;
  }
  const mockGetCanvasContext = jest.spyOn(
    HTMLCanvasElement.prototype,
    'getContext'
  );
  const mockToDataURL = jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL');

  // HTMLCanvasElement.prototype

  beforeEach(() => setup());
  afterEach(() => {
    teardown();
    drawImageCallback = null;
  });

  let open: jest.MockInstance<any, any[]>;
  beforeAll(() => {
    open = jest.spyOn(window, 'open').mockImplementation(() => null);
    mockWidthGet.mockImplementation(() => size.width);
    mockHeightGet.mockImplementation(() => size.height);
    mockSrcSet.mockImplementation(function fn() {
      if (this.onload) {
        this.onload();
      }
    });

    mockGetCanvasContext.mockReturnValue({
      drawImage(...args) {
        if (drawImageCallback) {
          drawImageCallback(...args);
        }
      },
    } as RenderingContext);
    mockToDataURL.mockReturnValue('data:image/png;base64,');
  });

  afterAll(() => {
    window.URL.createObjectURL = originCreateObjectURL;
    mockWidthGet.mockRestore();
    mockHeightGet.mockRestore();
    mockSrcSet.mockRestore();
    mockGetCanvasContext.mockRestore();
    mockToDataURL.mockRestore();
    open.mockRestore();
  });

  test('should use file.thumbUrl for <img /> in priority', () => {
    const { container: wrapper, unmount } = render(
      <Upload defaultFileList={fileList} listType="picture">
        <button type="button">upload</button>
      </Upload>
    );
    fileList.forEach((file, i) => {
      const linkNode = wrapper.querySelectorAll('.upload-list-item-thumbnail')[
        i
      ];
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      )[i];
      expect(linkNode.getAttribute('href')).toBe(file.url);
      expect(imgNode.getAttribute('src')).toBe(file.thumbUrl);
    });
    unmount();
  });

  test('should remove correct item when uid is 0', async () => {
    jest.useFakeTimers();

    const list = [
      {
        uid: '0',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
      },
      {
        uid: '1',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
      },
    ];
    const { container, unmount } = render(
      <Upload defaultFileList={list as UploadProps['defaultFileList']}>
        <button type="button">upload</button>
      </Upload>
    );
    expect(container.querySelectorAll('.upload-list-item').length).toBe(2);
    fireEvent.click(
      container
        .querySelectorAll('.upload-list-item')[0]
        .querySelector('.icon-delete')!
    );

    // Upload use Promise to wait remove action. Let's wait this also.
    await act(async () => {
      for (let i = 0; i < 10; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve();
      }
    });

    // Progress motion to active
    act(() => {
      jest.runAllTimers();
    });

    // Progress motion to done
    // React 17 will reach deadline, so we need check if already done
    if (container.querySelector('.upload-animate-leave-active')) {
      fireEvent.animationEnd(
        container.querySelector('.upload-animate-leave-active')!
      );
    }
    act(() => {
      jest.runAllTimers();
    });

    expect(
      container.querySelectorAll('.upload-list-text-container')
    ).toHaveLength(1);

    unmount();

    jest.useRealTimers();
  });

  test('should be uploading when upload a file', async () => {
    jest.useFakeTimers();
    const done = jest.fn();
    let wrapper: ReturnType<typeof render>;
    let latestFileList: UploadFile<any>[] | null = null;
    const onChange: UploadProps['onChange'] = async ({
      file,
      fileList: eventFileList,
    }) => {
      expect(eventFileList === latestFileList).toBeFalsy();
      if (file.status === 'uploading') {
        await Promise.resolve();
        expect(wrapper.container.firstChild).toMatchSnapshot();
      }
      if (file.status === 'done') {
        done();
      }

      latestFileList = eventFileList;
    };
    wrapper = render(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        onChange={onChange}
        customRequest={successRequest}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.change(wrapper.container.querySelector('input')!, {
      target: { files: [{ name: 'foo.png' }] },
    });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(done).toHaveBeenCalled();

    wrapper.unmount();

    jest.useRealTimers();
  });

  test('handle error', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();

    const {
      container: wrapper,
      unmount,
      baseElement,
    } = render(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        onChange={onChange}
        customRequest={errorRequest}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.change(wrapper.querySelector('input')!, {
      target: { files: [{ name: 'foo.png' }] },
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Wait twice since `errorRequest` also use timeout for mock
    act(() => {
      jest.runAllTimers();
    });

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        file: expect.objectContaining({ status: 'error' }),
      })
    );
    if (wrapper.querySelector('.upload-animate-appear-active')) {
      fireEvent.animationEnd(
        wrapper.querySelector('.upload-animate-appear-active')!
      );
    }

    act(() => {
      jest.runAllTimers();
    });

    // Error message
    fireEvent.mouseEnter(wrapper.querySelector('.upload-list-item')!);

    act(() => {
      jest.runAllTimers();
    });

    expect(
      baseElement.querySelector('.tooltip').classList.contains('tooltip-hidden')
    ).toBeFalsy();

    jest.useRealTimers();
    unmount();
  });

  test('does concat fileList when beforeUpload returns false', async () => {
    const handleChange = jest.fn();
    const ref = React.createRef<any>();
    const { container: wrapper, unmount } = render(
      <Upload
        ref={ref}
        listType="picture"
        defaultFileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.change(wrapper.querySelector('input')!, {
      target: { files: [{ name: 'foo.png' }] },
    });

    await sleep();

    expect(ref.current.fileList.length).toBe(fileList.length + 1);
    expect(handleChange.mock.calls[0][0].fileList).toHaveLength(3);

    unmount();
  });

  test('In the case of listType=picture, the error status does not show the download.', () => {
    (global as any).testName =
      'In the case of listType=picture, the error status does not show the download.';
    const file = { status: 'error', uid: 'file' };
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture"
        fileList={[file] as UploadProps['fileList']}
        showUploadList={{ showDownloadIconButton: true }}
      >
        <button type="button">upload</button>
      </Upload>
    );

    // Has error item className
    fireEvent.mouseEnter(wrapper.querySelector('.upload-list-item-error')!);

    expect(
      wrapper.querySelectorAll('div.upload-list-item icon-download').length
    ).toBe(0);

    unmount();
  });

  test('In the case of listType=picture-card, the error status does not show the download.', () => {
    (global as any).testName =
      'In the case of listType=picture-card, the error status does not show the download.';
    const file = { status: 'error', uid: 'file' };
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture-card"
        fileList={[file] as UploadProps['fileList']}
        showUploadList={{ showDownloadIconButton: true }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    expect(
      wrapper.querySelectorAll('div.upload-list-item icon-download').length
    ).toBe(0);

    unmount();
  });

  test('In the case of listType=text, the error status does not show the download.', () => {
    const file = { status: 'error', uid: 'file' };
    const { container: wrapper, unmount } = render(
      <Upload
        listType="text"
        fileList={[file] as UploadProps['fileList']}
        showUploadList={{ showDownloadIconButton: true }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    expect(
      wrapper.querySelectorAll('div.upload-list-item icon-download').length
    ).toBe(0);

    unmount();
  });

  test('should support onPreview', () => {
    const handlePreview = jest.fn();
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture-card"
        defaultFileList={fileList}
        onPreview={handlePreview}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.click(wrapper.querySelectorAll('.icon-view')[0]);
    expect(handlePreview).toHaveBeenCalledWith(fileList[0]);
    fireEvent.click(wrapper.querySelectorAll('.icon-view')[1]);
    expect(handlePreview).toHaveBeenCalledWith(fileList[1]);

    unmount();
  });

  test('should support onRemove', async () => {
    const handleRemove = jest.fn();
    const handleChange = jest.fn();
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture-card"
        defaultFileList={fileList}
        onRemove={handleRemove}
        onChange={handleChange}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.click(wrapper.querySelectorAll('.icon-delete')[0]);
    expect(handleRemove).toHaveBeenCalledWith(fileList[0]);
    fireEvent.click(wrapper.querySelectorAll('.icon-delete')[1]);
    expect(handleRemove).toHaveBeenCalledWith(fileList[1]);
    await sleep();
    expect(handleChange.mock.calls.length).toBe(2);

    unmount();
  });

  test('should support onDownload', async () => {
    const handleDownload = jest.fn();
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture-card"
        defaultFileList={[
          {
            uid: '0',
            name: 'xyz.png',
            status: 'done',
            url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
          },
        ]}
        onDownload={handleDownload}
        showUploadList={{
          showDownloadIconButton: true,
        }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.click(wrapper.querySelectorAll('.icon-download')[0]);

    unmount();
  });

  test('should support no onDownload', async () => {
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture-card"
        defaultFileList={[
          {
            uid: '0',
            name: 'NewIssue.png',
            status: 'done',
            url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
          },
        ]}
        showUploadList={{
          showDownloadIconButton: true,
        }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.click(wrapper.querySelectorAll('.icon-download')[0]);

    unmount();
  });

  describe('should generate thumbUrl from file', () => {
    [
      { width: 100, height: 200, name: 'height large than width' },
      { width: 200, height: 100, name: 'width large than height' },
    ].forEach(({ width, height, name }) => {
      test(name, async () => {
        setSize(width, height);
        const onDrawImage = jest.fn();
        hookDrawImageCall(onDrawImage);

        const handlePreview = jest.fn();
        const newFileList: UploadProps['fileList'] = [...fileList];
        const newFile = {
          ...fileList[0],
          uid: '-3',
          originFileObj: new File([], 'xyz.png', {
            type: 'image/png',
          }),
        };
        delete newFile.thumbUrl;
        newFileList.push(newFile as UploadFile);
        const ref = React.createRef<any>();
        const { unmount } = render(
          <Upload
            ref={ref}
            listType="picture-card"
            defaultFileList={newFileList}
            onPreview={handlePreview}
          >
            <button type="button">upload</button>
          </Upload>
        );
        await sleep();

        expect(ref.current.fileList[2].thumbUrl).not.toBe(undefined);
        expect(onDrawImage).toHaveBeenCalled();

        // Offset check
        const [, offsetX, offsetY] = onDrawImage.mock.calls[0];
        expect((width > height ? offsetX : offsetY) === 0).toBeTruthy();
        unmount();
      });
    });
  });

  test('should non-image format file preview', () => {
    const list = [
      {
        name: 'not-image',
        status: 'done',
        uid: '-3',
        url: 'https://cdn.xyz.com/aaa.zip',
        thumbUrl:
          'data:application/zip;base64,UEsDBAoAAAAAADYZYkwAAAAAAAAAAAAAAAAdAAk',
        originFileObj: new File([], 'aaa.zip'),
      },
      {
        name: 'image',
        status: 'done',
        uid: '-4',
        url: 'https://cdn.xyz.com/aaa',
      },
      {
        name: 'not-image',
        status: 'done',
        uid: '-5',
        url: 'https://cdn.xyz.com/aaa.xx',
      },
      {
        name: 'not-image',
        status: 'done',
        uid: '-6',
        url: 'https://cdn.xyz.com/aaa.png/xx.xx',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-7',
        url: 'https://cdn.xyz.com/xx.xx/aaa.png',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-8',
        url: 'https://cdn.xyz.com/xx.xx/aaa.png',
        thumbUrl:
          'data:image/png;base64,UEsDBAoAAAAAADYZYkwAAAAAAAAAAAAAAAAdAAk',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-9',
        url: 'https://cdn.xyz.com/xx.xx/aaa.png?query=123',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-10',
        url: 'https://cdn.xyz.com/xx.xx/aaa.png#anchor',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-11',
        url: 'https://cdn.xyz.com/xx.xx/aaa.png?query=some.query.with.dot',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-12',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png@w_150%2ch_152',
        type: 'image/png',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture"
        defaultFileList={list as UploadProps['defaultFileList']}
      >
        <button type="button">upload</button>
      </Upload>
    );
    expect(wrapper.firstChild).toMatchSnapshot();

    unmount();
  });

  test('not crash when uploading not provides percent', async () => {
    jest.useFakeTimers();

    const { unmount } = render(
      <Upload
        listType="picture"
        defaultFileList={
          [
            { name: 'mia.png', status: 'uploading' },
          ] as UploadProps['defaultFileList']
        }
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    unmount();

    jest.useRealTimers();
  });

  test('should support showRemoveIconButton, showReplaceButton, and showPreviewIconButton', () => {
    const list = [
      {
        name: 'image',
        status: 'uploading',
        uid: '-4',
        url: 'https://cdn.xyz.com/aaa',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-5',
        url: 'https://cdn.xyz.com/aaa',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture"
        defaultFileList={list as UploadProps['defaultFileList']}
        showUploadList={{
          showRemoveIconButton: false,
          showReplaceButton: false,
          showPreviewIconButton: false,
        }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    expect(wrapper.firstChild).toMatchSnapshot();

    unmount();
  });

  test('should support custom icon', async () => {
    const handleRemove = jest.fn();
    const handleChange = jest.fn();
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture"
        defaultFileList={fileList}
        onRemove={handleRemove}
        onChange={handleChange}
        showUploadList={{
          showRemoveIconButton: true,
          removeIcon: IconName.mdiCardsHeart,
        }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireEvent.click(wrapper.querySelectorAll('.icon-delete')[0]);
    expect(handleRemove).toHaveBeenCalledWith(fileList[0]);
    fireEvent.click(wrapper.querySelectorAll('.icon-delete')[1]);
    expect(handleRemove).toHaveBeenCalledWith(fileList[1]);
    await sleep();
    expect(handleChange.mock.calls.length).toBe(2);

    unmount();
  });

  test('should support removeIcon, replaceIcon, and downloadIcon', () => {
    const list = [
      {
        name: 'image',
        status: 'uploading',
        uid: '-4',
        url: 'https://cdn.xyz.com/aaa',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-5',
        url: 'https://cdn.xyz.com/aaa',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture"
        defaultFileList={list as UploadProps['defaultFileList']}
        showUploadList={{
          showRemoveIconButton: true,
          showReplaceButton: true,
          showDownloadIconButton: true,
          showPreviewIconButton: true,
          removeIcon: IconName.mdiCardsHeart,
          replaceIcon: IconName.mdiCardsHeart,
          downloadIcon: IconName.mdiCardsHeart,
          previewIcon: IconName.mdiCardsHeart,
        }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    expect(wrapper.firstChild).toMatchSnapshot();
    unmount();

    const { container: wrapper2, unmount: unmount2 } = render(
      <Upload
        listType="picture"
        defaultFileList={list as UploadProps['defaultFileList']}
        showUploadList={{
          showRemoveIconButton: true,
          showReplaceButton: true,
          showDownloadIconButton: true,
          showPreviewIconButton: true,
          removeIcon: () => IconName.mdiCardsHeart,
          replaceIcon: () => IconName.mdiCardsHeart,
          downloadIcon: () => IconName.mdiCardsHeart,
          previewIcon: () => IconName.mdiCardsHeart,
        }}
      >
        <button type="button">upload</button>
      </Upload>
    );
    expect(wrapper2.firstChild).toMatchSnapshot();
    unmount2();
  });

  test('work with form validation', async () => {
    let formRef: FormInstance;

    const TestForm: React.FC = () => {
      const [form] = Form.useForm();
      formRef = form;

      return (
        <Form form={form}>
          <Form.Item
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                validator(_, value, callback) {
                  if (!value || value.length === 0) {
                    callback('file required');
                  } else {
                    callback();
                  }
                },
              },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <button type="button">upload</button>
            </Upload>
          </Form.Item>
        </Form>
      );
    };

    const { container, unmount } = render(<TestForm />);

    fireEvent.submit(container.querySelector('form')!);
    await sleep();
    expect(formRef!.getFieldError(['file'])).toEqual(['file required']);

    fireEvent.change(container.querySelector('input')!, {
      target: { files: [{ name: 'foo.png' }] },
    });

    fireEvent.submit(container.querySelector('form')!);
    await sleep();
    expect(formRef!.getFieldError(['file'])).toEqual([]);

    unmount();
  });

  test('return when prop onPreview not exists', () => {
    const ref = React.createRef<any>();
    const { unmount } = render(<UploadList ref={ref} />);
    expect(ref.current?.handlePreview?.()).toBe(undefined);
    unmount();
  });

  test('return when prop onDownload not exists', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const items = [{ uid: 'upload-list-item', url: '' }];
    const ref = React.createRef<any>();
    const showUploadList = {
      showUploadList: { showDownloadIconButton: true },
    };
    const { unmount } = render(
      <UploadList
        ref={ref}
        items={items as UploadListProps['items']}
        {...showUploadList}
      />
    );
    expect(ref.current?.handleDownload?.(file)).toBe(undefined);
    unmount();
  });

  test('previewFile should work correctly', async () => {
    const items = [{ uid: 'upload-list-item', url: '' }];
    const previewFunc = jest.fn(previewImage);
    const { container: wrapper, unmount } = render(
      <Upload
        fileList={items as UploadProps['fileList']}
        previewFile={previewFunc}
        listType="picture-card"
      />
    );

    fireEvent.change(wrapper.querySelector('input')!, {
      target: { files: [{ name: 'foo.png' }] },
    });

    await sleep();
    expect(
      wrapper.querySelector('.upload-list-item-thumbnail')?.getAttribute('href')
    ).toBe(null);

    unmount();
  });

  test('downloadFile should work correctly', async () => {
    const downloadFunc = jest.fn();
    const items = [
      { uid: 'upload-list-item', name: 'test', url: '', status: 'done' },
    ];
    const { container: wrapper, unmount } = render(
      <UploadList
        showDownloadIconButton
        listType="picture-card"
        items={items as UploadListProps['items']}
        onDownload={downloadFunc}
      />
    );

    // Not throw
    const btn = wrapper.querySelector('.icon-download');
    fireEvent.click(btn!);
    expect(downloadFunc).toHaveBeenCalled();

    unmount();
  });

  test('extname should work correctly when url not exists', () => {
    const items = [{ uid: 'upload-list-item', url: '' }];
    const { container: wrapper, unmount } = render(
      <UploadList
        listType="picture-card"
        items={items as UploadListProps['items']}
      />
    );
    expect(wrapper.querySelectorAll('.upload-list-item-thumbnail').length).toBe(
      1
    );
    unmount();
  });

  test('extname should work correctly when url exists', (done) => {
    const items = [
      { status: 'done', uid: 'upload-list-item', url: '/example' },
    ];
    const { container: wrapper, unmount } = render(
      <UploadList
        listType="picture"
        onDownload={(file) => {
          expect(file.url).toBe('/example');
          unmount();
          done();
        }}
        items={items as UploadListProps['items']}
        showDownloadIconButton
      />
    );
    fireEvent.click(
      wrapper.querySelector('div.upload-list-item .icon-download')!
    );
  });

  test('when picture-card is loading, icon should render correctly', () => {
    const { container: wrapper, unmount } = render(
      <Upload
        listType="picture-card"
        defaultFileList={
          [
            { name: 'mia.png', status: 'uploading' },
          ] as UploadProps['defaultFileList']
        }
      />
    );
    expect(
      wrapper.querySelectorAll('.upload-list-item-thumbnail')?.length
    ).toBe(1);
    expect(
      wrapper.querySelector('.upload-list-item-thumbnail')?.textContent
    ).toBe('Uploading');

    unmount();
  });

  test('onPreview should be called, when url exists', () => {
    const onPreview = jest.fn();
    const items = [
      { thumbUrl: 'thumbUrl', url: 'url', uid: 'upload-list-item' },
    ];
    const {
      container: wrapper,
      rerender,
      unmount,
    } = render(
      <UploadList
        listType="picture-card"
        items={items as UploadListProps['items']}
        onPreview={onPreview}
      />
    );
    fireEvent.click(wrapper.querySelector('.upload-list-item-thumbnail')!);
    expect(onPreview).toHaveBeenCalled();
    fireEvent.click(wrapper.querySelector('.upload-list-item-name')!);
    expect(onPreview).toHaveBeenCalled();
    rerender(
      <UploadList
        listType="picture-card"
        items={
          [
            { thumbUrl: 'thumbUrl', uid: 'upload-list-item' },
          ] as UploadListProps['items']
        }
        onPreview={onPreview}
      />
    );
    fireEvent.click(wrapper.querySelector('.upload-list-item-name')!);
    expect(onPreview).toHaveBeenCalled();

    unmount();
  });

  test('upload image file should be converted to the base64', async () => {
    const mockFile = new File([''], 'foo.png', {
      type: 'image/png',
    });

    const previewFunc = jest.fn(previewImage);

    const { unmount } = render(
      <Upload
        fileList={[{ originFileObj: mockFile }] as UploadProps['fileList']}
        previewFile={previewFunc}
        listType="picture-card"
      />
    );

    await waitFor(() => {
      expect(previewFunc).toHaveBeenCalled();
    });
    await previewFunc(mockFile).then((dataUrl) => {
      expect(dataUrl).toEqual('data:image/png;base64,');
    });
    unmount();
  });

  test('upload svg file with <foreignObject> should not have CORS error', async () => {
    const mockFile = new File(
      [
        '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><foreignObject x="20" y="20" width="160" height="160"><div xmlns="http://www.w3.org/1999/xhtml">Test</div></foreignObject></svg>',
      ],
      'bar.svg',
      { type: 'image/svg+xml' }
    );

    const previewFunc = jest.fn(previewImage);

    const { unmount } = render(
      <Upload
        fileList={[{ originFileObj: mockFile }] as UploadProps['fileList']}
        previewFile={previewFunc}
        listType="picture-card"
      />
    );

    await waitFor(() => {
      expect(previewFunc).toHaveBeenCalled();
    });
    await previewFunc(mockFile).then((dataUrl) => {
      expect(dataUrl).toEqual('data:image/png;base64,');
    });
    unmount();
  });

  test("upload non image file shouldn't be converted to the base64", async () => {
    const mockFile = new File([''], 'foo.7z', {
      type: 'application/x-7z-compressed',
    });
    const previewFunc = jest.fn(previewImage);

    const { unmount } = render(
      <Upload
        fileList={[{ originFileObj: mockFile }] as UploadProps['fileList']}
        previewFile={previewFunc}
        listType="picture-card"
      />
    );

    await waitFor(() => {
      expect(previewFunc).toHaveBeenCalled();
    });
    await previewFunc(mockFile).then((dataUrl) => {
      expect(dataUrl).toBe('');
    });

    unmount();
  });

  describe('customize previewFile support', () => {
    function test(name: string, renderInstance: () => File | Blob) {
      it(name, async () => {
        const mockThumbnail = 'mock-image';
        const previewFile = jest.fn(() => Promise.resolve(mockThumbnail));
        const file = {
          ...fileList?.[0],
          originFileObj: renderInstance(),
        };
        delete file.thumbUrl;
        const ref = React.createRef();
        const { container: wrapper, unmount } = render(
          <Upload
            ref={ref}
            listType="picture"
            defaultFileList={[file] as UploadProps['defaultFileList']}
            previewFile={previewFile}
          >
            <button type="button">button</button>
          </Upload>
        );
        expect(previewFile).toHaveBeenCalledWith(file.originFileObj);
        await sleep(100);

        expect(
          wrapper
            .querySelector('.upload-list-item-thumbnail img')
            ?.getAttribute('src')
        ).toBe(mockThumbnail);

        unmount();
      });
    }
    test('File', () => new File([], 'xyz.png'));
    test('Blob', () => new Blob());
  });

  describe('customize isImageUrl support', () => {
    const list = [
      ...fileList,
      {
        uid: '0',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png@!foo_style',
      },
    ];
    test('should not render <img /> when file.thumbUrl use "!" as separator', () => {
      const { container: wrapper, unmount } = render(
        <Upload
          listType="picture-card"
          fileList={list as UploadProps['fileList']}
        >
          <button type="button">button</button>
        </Upload>
      );
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      );
      expect(imgNode.length).toBe(2);

      unmount();
    });
    test('should render <img /> when custom imageUrl return true', () => {
      const isImageUrl = jest.fn(() => true);
      const { container: wrapper, unmount } = render(
        <Upload
          listType="picture-card"
          fileList={list as UploadProps['fileList']}
          isImageUrl={isImageUrl}
        >
          <button type="button">button</button>
        </Upload>
      );
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      );
      expect(isImageUrl).toHaveBeenCalled();
      expect(imgNode.length).toBe(3);

      unmount();
    });
    test('should not render <img /> when custom imageUrl return false', () => {
      const isImageUrl = jest.fn(() => false);
      const { container: wrapper, unmount } = render(
        <Upload
          listType="picture-card"
          fileList={list as UploadProps['fileList']}
          isImageUrl={isImageUrl}
        >
          <button type="button">button</button>
        </Upload>
      );
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      );
      expect(isImageUrl).toHaveBeenCalled();
      expect(imgNode.length).toBe(0);

      unmount();
    });
  });

  describe('thumbUrl support for non-image', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    const nonImageFile = new File([''], 'foo.7z', {
      type: 'application/x-7z-compressed',
    });

    /** Wait for a long promise since `rc-util` internal has at least 3 promise wait */
    async function waitPromise() {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < 10; i += 1) {
        await Promise.resolve();
      }
      /* eslint-enable */
    }

    test('should render <img /> when upload non-image file and configure thumbUrl in onChange', async () => {
      const thumbUrl =
        'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png';
      let wrapper: ReturnType<typeof render>;
      const onChange = jest.fn<
        void,
        Record<'fileList', UploadProps['fileList']>[]
      >(({ fileList: files }) => {
        const newFileList = files?.map<UploadFile<any>>((item) => ({
          ...item,
          thumbUrl,
        }));

        wrapper.rerender(
          <Upload
            action="http://jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={newFileList}
            onChange={onChange}
            customRequest={successRequest}
          >
            <button type="button">upload</button>
          </Upload>
        );
      });

      wrapper = render(
        <Upload
          action="http://jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={[]}
          onChange={onChange}
          customRequest={successRequest}
        >
          <button type="button">upload</button>
        </Upload>
      );
      const imgNode = wrapper.container.querySelectorAll(
        '.upload-list-item-thumbnail img'
      );
      expect(imgNode.length).toBe(0);

      // Simulate change is a timeout change
      fireEvent.change(wrapper.container.querySelector('input')!, {
        target: { files: [nonImageFile] },
      });

      // Wait for `rc-upload` process file
      await waitPromise();

      // Wait for mock request finish request
      act(() => {
        jest.runAllTimers();
      });

      // Basic called times
      expect(onChange).toHaveBeenCalled();

      // Check for images
      act(() => {
        jest.runAllTimers();
      });
      const afterImgNode = wrapper.container.querySelectorAll(
        '.upload-list-item-thumbnail img'
      );
      expect(afterImgNode.length).toBeTruthy();

      wrapper.unmount();
    });

    test('should not render <img /> when upload non-image file without thumbUrl in onChange', (done) => {
      (global as any).testName =
        'should not render <img /> when upload non-image file without thumbUrl in onChange';
      let wrapper: ReturnType<typeof render>;
      const onChange: UploadProps['onChange'] = async ({ fileList: files }) => {
        wrapper.rerender(
          <Upload
            action="http://jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={files}
            onChange={onChange}
            customRequest={successRequest}
          >
            <button type="button">upload</button>
          </Upload>
        );

        await sleep();
        const imgNode = wrapper.container.querySelectorAll(
          '.upload-list-item-thumbnail img'
        );
        expect(imgNode.length).toBe(0);

        done();
      };
      wrapper = render(
        <Upload
          action="http://jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={[]}
          onChange={onChange}
          customRequest={successRequest}
        >
          <button type="button">upload</button>
        </Upload>
      );
      const imgNode = wrapper.container.querySelectorAll(
        '.upload-list-item-thumbnail img'
      );
      expect(imgNode.length).toBe(0);
      fireEvent.change(wrapper.container.querySelector('input')!, {
        target: { files: [nonImageFile] },
      });
    });
  });

  test('should render button inside UploadList when listStyle is picture-card', () => {
    const {
      container: wrapper,
      rerender,
      unmount,
    } = render(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        listType="picture-card"
        fileList={[
          {
            uid: '0',
            name: 'xyz.png',
          },
        ]}
        showUploadList
      >
        <button className="trigger" type="button">
          upload
        </button>
      </Upload>
    );
    expect(
      wrapper.querySelectorAll('.upload-list button.trigger').length
    ).toBeGreaterThan(0);
    rerender(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        listType="picture-card"
        fileList={[
          {
            uid: '0',
            name: 'xyz.png',
          },
        ]}
        showUploadList={false}
      >
        <button className="trigger" type="button">
          upload
        </button>
      </Upload>
    );
    expect(wrapper.querySelectorAll('.upload-list button.trigger').length).toBe(
      0
    );

    unmount();
  });

  test('multiple file upload should keep the internal fileList async', async () => {
    jest.useFakeTimers();

    const uploadRef = React.createRef<any>();

    const MyUpload: React.FC = () => {
      const [testFileList, setTestFileList] = React.useState<UploadFile[]>([]);

      return (
        <Upload
          ref={uploadRef}
          fileList={testFileList}
          action="http://run.mocky.io/v3/35a4936d-4e32-4088-b9d1-47cd1002fefd"
          multiple
          onChange={(info) => {
            setTestFileList([...info.fileList]);
          }}
        >
          <button type="button">Upload</button>
        </Upload>
      );
    };

    const { unmount } = render(<MyUpload />);

    // Mock async update in a frame
    const fileNames = ['lola', 'mia', 'little'];

    await act(() => {
      uploadRef.current.onBatchStart(
        fileNames.map((fileName) => {
          const file = new File([], fileName);
          (file as any).uid = fileName;
          return { file, parsedFile: file };
        })
      );
    });

    expect(uploadRef.current.fileList).toHaveLength(fileNames.length);

    act(() => {
      jest.runAllTimers();
    });
    expect(uploadRef.current.fileList).toHaveLength(fileNames.length);

    unmount();

    jest.useRealTimers();
  });

  test('itemRender', () => {
    const onDownload = jest.fn();
    const onRemove = jest.fn();
    const onReplace = jest.fn();
    const onPreview = jest.fn();
    const itemRender: UploadListProps['itemRender'] = (
      _,
      file,
      currFileList,
      actions
    ) => {
      const { name, status, uid, url } = file;
      const index = currFileList.indexOf(file);
      return (
        <div className="custom-item-render">
          <span>
            {`uid:${uid} name: ${name} status: ${status} url: ${url}  ${
              index + 1
            }/${currFileList.length}`}
          </span>
          <span
            onClick={actions.remove}
            className="custom-item-render-action-remove"
          >
            remove
          </span>
          <span
            onClick={actions.replace}
            className="custom-item-render-action-replace"
          >
            replace
          </span>
          <span
            onClick={actions.download}
            className="custom-item-render-action-download"
          >
            download
          </span>
          <span
            onClick={actions.preview}
            className="custom-item-render-action-preview"
          >
            preview
          </span>
        </div>
      );
    };
    const { container: wrapper, unmount } = render(
      <UploadList
        onDownload={onDownload}
        onPreview={onPreview}
        onRemove={onRemove}
        onReplace={onReplace}
        items={fileList}
        itemRender={itemRender}
      />
    );
    expect(wrapper.firstChild).toMatchSnapshot();

    fireEvent.click(
      wrapper.querySelectorAll('.custom-item-render-action-remove')[0]
    );
    expect(onRemove.mock.calls[0][0]).toEqual(fileList[0]);

    fireEvent.click(
      wrapper.querySelectorAll('.custom-item-render-action-replace')[0]
    );
    expect(onReplace.mock.calls[0][0]).toEqual(fileList[0]);

    fireEvent.click(
      wrapper.querySelectorAll('.custom-item-render-action-download')[0]
    );
    expect(onDownload.mock.calls[0][0]).toEqual(fileList[0]);

    fireEvent.click(
      wrapper.querySelectorAll('.custom-item-render-action-preview')[0]
    );
    expect(onPreview.mock.calls[0][0]).toEqual(fileList[0]);

    unmount();
  });

  test('LIST_IGNORE should not add in list', async () => {
    const beforeUpload = jest.fn(() => Upload.LIST_IGNORE);
    const { container: wrapper, unmount } = render(
      <Upload beforeUpload={beforeUpload} />
    );

    await act(() => {
      fireEvent.change(wrapper.querySelector('input')!, {
        target: { files: [{ file: 'foo.png' }] },
      });
    });

    await sleep();

    expect(beforeUpload).toHaveBeenCalled();
    expect(
      wrapper.querySelectorAll('.upload-list-text-container')
    ).toHaveLength(0);

    unmount();
  });

  test('Not crash when fileList is null', () => {
    const defaultWrapper = render(
      <Upload
        defaultFileList={null as unknown as UploadProps['defaultFileList']}
      />
    );
    defaultWrapper.unmount();

    const wrapper = render(
      <Upload fileList={null as unknown as UploadProps['defaultFileList']} />
    );
    wrapper.unmount();
  });

  test('should not exist crossorigin attribute when does not set file.crossorigin in case of listType="picture"', () => {
    const list = [
      {
        uid: '0',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload fileList={list as UploadProps['fileList']} listType="picture">
        <button type="button">upload</button>
      </Upload>
    );
    list.forEach((_, i) => {
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      )[i];
      expect(imgNode.getAttribute('crossOrigin')).toBe(null);
    });
    unmount();
  });

  test('should exist crossorigin attribute when set file.crossorigin in case of listType="picture"', () => {
    const list = [
      {
        uid: '0',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        crossOrigin: '',
      },
      {
        uid: '1',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        crossOrigin: 'anonymous',
      },
      {
        uid: '2',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        crossOrigin: 'use-credentials',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload fileList={list as UploadProps['fileList']} listType="picture">
        <button type="button">upload</button>
      </Upload>
    );
    list.forEach((file, i) => {
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      )[i];
      expect(imgNode.getAttribute('crossOrigin')).not.toBe(undefined);
      expect(imgNode.getAttribute('crossOrigin')).toBe(file.crossOrigin);
    });
    unmount();
  });

  test('should not exist crossorigin attribute when does not set file.crossorigin in case of listType="picture-card"', () => {
    const list = [
      {
        uid: '0',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload fileList={list as UploadProps['fileList']} listType="picture">
        <button type="button">upload</button>
      </Upload>
    );
    list.forEach((_, i) => {
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      )[i];
      expect(imgNode.getAttribute('crossOrigin')).toBe(null);
    });
    unmount();
  });

  test('should exist crossorigin attribute when set file.crossorigin in case of listType="picture-card"', () => {
    const list = [
      {
        uid: '0',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        crossOrigin: '',
      },
      {
        uid: '1',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        crossOrigin: 'anonymous',
      },
      {
        uid: '2',
        name: 'xyz.png',
        status: 'done',
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        crossOrigin: 'use-credentials',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload fileList={list as UploadProps['fileList']} listType="picture">
        <button type="button">upload</button>
      </Upload>
    );
    list.forEach((file, i) => {
      const imgNode = wrapper.querySelectorAll(
        '.upload-list-item-thumbnail img'
      )[i];
      expect(imgNode.getAttribute('crossOrigin')).not.toBe(undefined);
      expect(imgNode.getAttribute('crossOrigin')).toBe(file.crossOrigin);
    });
    unmount();
  });

  describe('should not display upload file-select button when listType is picture-card and children is empty', () => {
    test('when showUploadList is true', () => {
      const list = [
        {
          uid: '0',
          name: 'xyz.png',
          status: 'done',
          url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
          thumbUrl:
            'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        },
      ];
      const { container: wrapper, unmount } = render(
        <Upload
          fileList={list as UploadProps['defaultFileList']}
          listType="picture-card"
        />
      );
      expect(wrapper.querySelectorAll('.upload-select').length).toBe(1);
      expect(
        wrapper.querySelectorAll<HTMLDivElement>('.upload-select')[0]?.style
          .display
      ).toBe('none');
      unmount();
    });

    test('when showUploadList is false', () => {
      const list = [
        {
          uid: '0',
          name: 'xyz.png',
          status: 'done',
          url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
          thumbUrl:
            'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        },
      ];
      const { container: wrapper, unmount } = render(
        <Upload
          fileList={list as UploadProps['fileList']}
          showUploadList={false}
          listType="picture-card"
        />
      );
      expect(wrapper.querySelectorAll('.upload-select').length).toBe(1);
      expect(
        wrapper.querySelectorAll<HTMLDivElement>('.upload-select')[0]?.style
          .display
      ).toBe('none');
      unmount();
    });
  });

  test('remove should keep origin className', async () => {
    jest.useFakeTimers();

    const onChange = jest.fn();
    const list = [
      {
        uid: '0',
        name: 'xyz.png',
        status: 'error',
      },
    ];
    const { container } = render(
      <Upload
        fileList={list as UploadProps['fileList']}
        listType="picture-card"
        onChange={onChange}
      />
    );

    fireEvent.click(container.querySelector('.icon-delete')!);

    // Wait for Upload sync
    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.resolve();
    }

    act(() => {
      jest.runAllTimers();
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.objectContaining({ status: 'removed' }),
      })
    );

    expect(container.querySelector('.upload-list-item-error')).toBeTruthy();

    jest.useRealTimers();
  });

  test('remove button should have aria-label with filename', () => {
    const list = [
      {
        uid: '-1',
        name: 'example.pdf',
        status: 'done',
        url: 'https://example.com/file.pdf',
      },
      {
        uid: '-2',
        name: 'test-image.png',
        status: 'done',
        url: 'https://example.com/image.png',
      },
    ];

    const { container: wrapper, unmount } = render(
      <Upload
        defaultFileList={list as UploadProps['defaultFileList']}
        listType="text"
      >
        <button type="button">upload</button>
      </Upload>
    );

    const removeButtons = wrapper.querySelectorAll('.icon-delete');
    expect(removeButtons.length).toBe(2);

    // Check first file
    const firstButton = removeButtons[0] as HTMLElement;
    expect(firstButton.getAttribute('aria-label')).toBe(
      'Delete file example.pdf'
    );

    // Check second file
    const secondButton = removeButtons[1] as HTMLElement;
    expect(secondButton.getAttribute('aria-label')).toBe(
      'Delete file test-image.png'
    );

    unmount();
  });
});
