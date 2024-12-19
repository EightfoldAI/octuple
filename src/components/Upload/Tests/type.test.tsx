import React from 'react';
import type { UploadProps } from '..';
import Upload from '..';
import { OcFile } from '../Upload.types';
import { IconName } from '../../Icon';

describe('Upload.typescript', () => {
  test('Upload', () => {
    const upload = (
      <Upload>
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  test('onChange', () => {
    const upload = (
      <Upload<File> onChange={({ file }) => file}>
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  test('onChange params', () => {
    type IFile = {
      customFile: File;
    };

    const upload = (
      <Upload<IFile> onChange={({ file }) => file.response?.customFile}>
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  test('onChange fileList', () => {
    type IFile = {
      customFile: File;
    };

    const upload = (
      <Upload<IFile>
        onChange={({ fileList }) =>
          fileList.map((file) => file.response?.customFile)
        }
      >
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  test('onChange in UploadProps', () => {
    const uploadProps: UploadProps<File> = {
      onChange: ({ file }) => file,
    };
    const upload = (
      <Upload {...uploadProps}>
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  test('showUploadList', () => {
    const upload = (
      <Upload
        showUploadList={{
          downloadIconButtonType: 'button',
          removeIconButtonType: 'button',
          replaceButtonType: 'button',
          showPreviewIconButton: true,
          showRemoveIconButton: true,
          showReplaceButton: true,
          showDownloadIconButton: true,
          removeIcon: IconName.mdiTrashCanOutline,
          replaceIcon: IconName.mdiRepeat,
          downloadIcon: IconName.mdiArrowDown,
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  test('beforeUpload', () => {
    const upload = (
      <Upload
        beforeUpload={(file: OcFile) => {
          const { name: returnType } = file;
          if (returnType === 'boolean') {
            return true;
          }
          if (returnType === 'Promise<boolean>') {
            return Promise.resolve(false);
          }
          if (returnType === 'file') {
            return file;
          }
          if (returnType === 'Promise<file>') {
            return Promise.resolve(file);
          }
          if (returnType === 'string') {
            return Upload.LIST_IGNORE;
          }
          if (returnType === 'Promise<string>') {
            return Promise.resolve(Upload.LIST_IGNORE);
          }
          if (returnType === 'Promise<void>') {
            return Promise.resolve();
          }
          return Promise.resolve();
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  test('beforeUpload async', () => {
    const upload = (
      <Upload
        beforeUpload={async (file: OcFile) => {
          const { name: returnType } = file;
          if (returnType === 'boolean') {
            return true;
          }
          if (returnType === 'file') {
            return file;
          }
          if (returnType === 'string') {
            return Upload.LIST_IGNORE;
          }
          return Promise.resolve();
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  test('defaultFileList/fileList', () => {
    const fileList = [
      {
        uid: '-1',
        name: 'xyz.png',
        status: 'done' as const,
        url: 'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
        thumbUrl:
          'https://github.com/EightfoldAI/octuple/blob/main/public/assets/NewIssue.png',
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'error' as const,
      },
    ];
    const upload = <Upload fileList={fileList} defaultFileList={fileList} />;
    expect(upload).toBeTruthy();
  });

  test('itemRender', () => {
    const upload = (
      <Upload
        itemRender={(node, file, list, actions) => (
          <div>
            {node}
            {file.name}
            {list.length}
            <span onClick={actions.remove}>remove</span>
            <span onClick={actions.download}>download</span>
            <span onClick={actions.preview}>preview</span>
            <span onClick={actions.replace}>replace</span>
          </div>
        )}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  test('data', () => {
    const upload1 = (
      <Upload
        data={() => ({
          url: '',
        })}
      >
        <span>click to upload</span>
      </Upload>
    );
    const upload2 = (
      <Upload
        data={() =>
          Promise.resolve({
            url: '',
          })
        }
      >
        <span>click to upload</span>
      </Upload>
    );
    const upload3 = (
      <Upload
        data={{
          url: '',
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload1).toBeTruthy();
    expect(upload2).toBeTruthy();
    expect(upload3).toBeTruthy();
  });
});
