'use client';

/* eslint react/no-is-mounted:0,react/sort-comp:0,react/prop-types:0 */
import React, { Component } from 'react';
import type { ReactElement } from 'react';
import { eventKeys, mergeClasses, pickAttrs } from '../../../shared/utilities';
import defaultRequest from './request';
import { uid } from './uid';
import attrAccept from './attr-accept';
import traverseFileTree from './traverseFileTree';
import type {
  OcUploadProps,
  UploadProgressEvent,
  UploadRequestError,
  OcFile,
  BeforeUploadFileType,
  UploadRequestOption,
} from './OcUpload.types';

interface ParsedFileInfo {
  action: string;
  data: Record<string, unknown>;
  origin: OcFile;
  parsedFile: OcFile;
}

class AjaxUploader extends Component<OcUploadProps> {
  state = { uid: uid() };

  reqs: any = {};

  private fileInput: HTMLInputElement;

  private _isMounted: boolean;

  onChange = (_event: React.ChangeEvent<HTMLInputElement>): void => {
    const { accept, directory } = this.props;
    const { files } = _event.target;
    const acceptedFiles = [...(files as any)].filter(
      (file: OcFile) => !directory || attrAccept(file, accept)
    );
    this.uploadFiles(acceptedFiles);
    this.reset();
  };

  onClick = (
    _event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ): void => {
    const fileInputElement: HTMLInputElement = this.fileInput;
    if (!fileInputElement) {
      return;
    }
    const { children, onClick } = this.props;
    if (children && (children as ReactElement).type === 'button') {
      const parent: HTMLInputElement =
        fileInputElement.parentNode as HTMLInputElement;
      parent.focus();
      parent.querySelector('button').blur();
    }
    fileInputElement.click();
    if (onClick) {
      onClick(_event);
    }
  };

  onKeyDown = (_event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (_event.key === eventKeys.ENTER || _event.key === eventKeys.SPACE) {
      this.onClick(_event);
    }
  };

  onFileDrop = (_event: React.DragEvent<HTMLDivElement>): void => {
    const { multiple } = this.props;

    _event.preventDefault();

    if (_event.type === 'dragover') {
      return;
    }

    if (this.props.directory) {
      traverseFileTree(
        Array.prototype.slice.call(_event.dataTransfer.items),
        this.uploadFiles,
        (_file: OcFile) => attrAccept(_file, this.props.accept)
      );
    } else {
      let files = [...(_event.dataTransfer.files as any)].filter(
        (file: OcFile) => attrAccept(file, this.props.accept)
      );

      if (multiple === false) {
        files = files.slice(0, 1);
      }

      this.uploadFiles(files);
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.abort();
  }

  uploadFiles = (files: File[]): void => {
    const originFiles: OcFile[] = [...files] as OcFile[];
    const postFiles: Promise<ParsedFileInfo>[] = originFiles.map(
      (file: OcFile & { uid?: string }) => {
        // eslint-disable-next-line no-param-reassign
        file.uid = uid();
        return this.processFile(file, originFiles);
      }
    );

    // Batch upload files
    Promise.all(postFiles).then((fileList) => {
      const { onBatchStart } = this.props;

      onBatchStart?.(
        fileList.map(({ origin, parsedFile }) => ({
          file: origin,
          parsedFile,
        }))
      );

      fileList
        .filter((file) => file.parsedFile !== null)
        .forEach((file) => {
          this.post(file);
        });
    });
  };

  /**
   * Process file before upload. When all the files are ready, start upload.
   */
  processFile = async (
    file: OcFile,
    fileList: OcFile[]
  ): Promise<ParsedFileInfo> => {
    const { beforeUpload } = this.props;

    let transformedFile: BeforeUploadFileType | void = file;
    if (beforeUpload) {
      try {
        transformedFile = await beforeUpload(file, fileList);
      } catch (e) {
        // Rejection will also trade as false
        transformedFile = false;
      }
      if (transformedFile === false) {
        return {
          origin: file,
          parsedFile: null,
          action: null,
          data: null,
        };
      }
    }

    // Get latest action
    const { action } = this.props;
    let mergedAction: string;
    if (typeof action === 'function') {
      mergedAction = await action(file);
    } else {
      mergedAction = action;
    }

    // Get latest data
    const { data } = this.props;
    let mergedData: Record<string, unknown>;
    if (typeof data === 'function') {
      mergedData = await data(file);
    } else {
      mergedData = data;
    }

    const parsedData: Blob =
      typeof transformedFile === 'object' && transformedFile
        ? transformedFile
        : file;

    let parsedFile: File;
    if (parsedData instanceof File) {
      parsedFile = parsedData;
    } else {
      parsedFile = new File([parsedData], file.name, { type: file.type });
    }

    const mergedParsedFile: OcFile = parsedFile as OcFile;
    mergedParsedFile.uid = file.uid;

    return {
      origin: file,
      data: mergedData,
      parsedFile: mergedParsedFile,
      action: mergedAction,
    };
  };

  post({ data, origin, action, parsedFile }: ParsedFileInfo) {
    if (!this._isMounted) {
      return;
    }

    const { onStart, customRequest, name, headers, withCredentials, method } =
      this.props;

    const { uid } = origin;
    const request: (option: UploadRequestOption<any>) => void =
      customRequest || defaultRequest;

    const requestOption = {
      action,
      filename: name,
      data,
      file: parsedFile,
      headers,
      withCredentials,
      method: method || 'post',
      onProgress: (e: UploadProgressEvent) => {
        const { onProgress } = this.props;
        onProgress?.(e, parsedFile);
      },
      onSuccess: (ret: any, xhr: XMLHttpRequest) => {
        const { onSuccess } = this.props;
        onSuccess?.(ret, parsedFile, xhr);

        delete this.reqs[uid];
      },
      onError: (err: UploadRequestError, ret: any) => {
        const { onError } = this.props;
        onError?.(err, ret, parsedFile);

        delete this.reqs[uid];
      },
    };

    onStart(origin);
    this.reqs[uid] = request(requestOption);
  }

  reset(): void {
    this.setState({
      uid: uid(),
    });
  }

  abort(file?: any): void {
    const { reqs } = this;
    if (file) {
      const uid = file.uid ? file.uid : file;
      if (reqs[uid] && reqs[uid].abort) {
        reqs[uid].abort();
      }
      delete reqs[uid];
    } else {
      Object.keys(reqs).forEach((uid) => {
        if (reqs[uid] && reqs[uid].abort) {
          reqs[uid].abort();
        }
        delete reqs[uid];
      });
    }
  }

  saveFileInput = (node: HTMLInputElement): void => {
    this.fileInput = node;
  };

  render() {
    const {
      accept,
      capture,
      children,
      classNames,
      component: Tag,
      directory,
      disabled,
      id,
      multiple,
      onMouseEnter,
      onMouseLeave,
      openFileDialogOnClick,
      style,
      ...rest
    } = this.props;
    const uploadClasses: string = mergeClasses([
      {
        ['upload-disabled']: disabled,
        [classNames]: classNames,
      },
    ]);
    // input doesn't have directory/webkitdirectory type declaration
    const dirProps: any = directory
      ? { directory: 'directory', webkitdirectory: 'webkitdirectory' }
      : {};
    const events = disabled
      ? {}
      : {
          onClick: openFileDialogOnClick ? this.onClick : () => {},
          onKeyDown: openFileDialogOnClick ? this.onKeyDown : () => {},
          onMouseEnter,
          onMouseLeave,
          onDrop: this.onFileDrop,
          onDragOver: this.onFileDrop,
        };
    return (
      <Tag {...events} className={uploadClasses} style={style}>
        <input
          {...pickAttrs(rest, { aria: true, data: true })}
          id={id}
          type="file"
          ref={this.saveFileInput}
          onClick={(e) => e.stopPropagation()}
          key={this.state.uid}
          style={{ display: 'none' }}
          accept={accept}
          {...dirProps}
          multiple={multiple}
          onChange={this.onChange}
          {...(capture != null ? { capture } : {})}
        />
        {children}
      </Tag>
    );
  }
}

export default AjaxUploader;
