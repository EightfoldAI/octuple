import React, { useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { OcUploadProps } from './Internal';
import OcUpload from './Internal';
import {
  OcFile,
  ShowUploadListInterface,
  UploadChangeParam,
  UploadFile,
  UploadLocale,
  UploadProps,
  UploadSize,
} from './Upload.types';
import UploadList from './UploadList';
import { Icon, IconName } from '../Icon';
import { Button, ButtonVariant } from '../Button';
import { Stack } from '../Stack';
import { file2Obj, getFileItem, removeFileItem, updateFileList } from './Utils';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMergedState } from '../../hooks/useMergedState';
import { eventKeys, mergeClasses, warning } from '../../shared/utilities';
import enUS from './Locale/en_US';

import styles from './upload.module.scss';

export const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;

export { UploadProps };

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (
  props,
  ref
) => {
  const {
    accept = '',
    acceptedFileTypesText: defaultAcceptedFileTypesText,
    action = '',
    children,
    classNames,
    configContextProps = {
      noDisabledContext: false,
    },
    data = {},
    defaultFileList,
    disabled = false,
    downloadFileText: defaultDownloadFileText,
    dragAndDropFileText: defaultDragAndDropFileText,
    dragAndDropMultipleFilesText: defaultDragAndDropMultipleFilesText,
    fileList,
    fullWidth = false,
    iconRender,
    isImageUrl,
    itemRender,
    listType = 'text',
    locale = enUS,
    maxCount,
    multiple = false,
    onChange,
    onDownload,
    onDrop,
    onPreview,
    onRemove,
    onReplace,
    previewFile,
    previewFileText: defaultPreviewFileText,
    progress,
    removeFileText: defaultRemoveFileText,
    replaceFileText: defaultReplaceFileText,
    selectFileText: defaultSelectFileText,
    selectMultipleFilesText: defaultSelectMultipleFilesText,
    showUploadList = true,
    size = UploadSize.Medium,
    style,
    supportServerRender = true,
    type = 'select',
    uploadErrorText: defaultUploadErrorText,
    uploadingText: defaultUploadingText,
  } = props;

  const contextuallyDisabled: Disabled = useContext(DisabledContext);
  const mergedDisabled: boolean = configContextProps.noDisabledContext
    ? disabled
    : contextuallyDisabled || disabled;

  const htmlDir: string = useCanvasDirection();

  // ============================ Strings ===========================
  const [uploadLocale] = useLocaleReceiver('Upload');
  let mergedLocale: UploadLocale;

  if (locale) {
    mergedLocale = locale;
  } else {
    mergedLocale = uploadLocale || locale;
  }

  const [acceptedFileTypesText, setAcceptedFileTypesText] = useState<string>(
    defaultAcceptedFileTypesText
  );
  const [downloadFileText, setDownloadFileText] = useState<string>(
    defaultDownloadFileText
  );
  const [dragAndDropFileText, setDragAndDropFileText] = useState<string>(
    defaultDragAndDropFileText
  );
  const [dragAndDropMultipleFilesText, setDragAndDropMultipleFilesText] =
    useState<string>(defaultDragAndDropMultipleFilesText);
  const [previewFileText, setPreviewFileText] = useState<string>(
    defaultPreviewFileText
  );
  const [removeFileText, setRemoveFileText] = useState<string>(
    defaultRemoveFileText
  );
  const [replaceFileText, setReplaceFileText] = useState<string>(
    defaultReplaceFileText
  );
  const [selectFileText, setSelectFileText] = useState<string>(
    defaultSelectFileText
  );
  const [selectMultipleFilesText, setSelectMultipleFilesText] =
    useState<string>(defaultSelectMultipleFilesText);
  const [uploadErrorText, setUploadErrorText] = useState<string>(
    defaultUploadErrorText
  );
  const [uploadingText, setUploadingText] =
    useState<string>(defaultUploadingText);

  // Locs: if the prop isn't provided use the loc defaults.
  // If the mergedLocale is changed, update.
  useEffect(() => {
    setAcceptedFileTypesText(
      props.acceptedFileTypesText
        ? props.acceptedFileTypesText
        : mergedLocale.lang!.acceptedFileTypesText
    );
    setDownloadFileText(
      props.downloadFileText
        ? props.downloadFileText
        : mergedLocale.lang!.downloadFileText
    );
    setDragAndDropFileText(
      props.dragAndDropFileText
        ? props.dragAndDropFileText
        : mergedLocale.lang!.dragAndDropFileText
    );
    setDragAndDropMultipleFilesText(
      props.dragAndDropMultipleFilesText
        ? props.dragAndDropMultipleFilesText
        : mergedLocale.lang!.dragAndDropMultipleFilesText
    );
    setPreviewFileText(
      props.previewFileText
        ? props.previewFileText
        : mergedLocale.lang!.previewFileText
    );
    setRemoveFileText(
      props.removeFileText
        ? props.removeFileText
        : mergedLocale.lang!.removeFileText
    );
    setReplaceFileText(
      props.replaceFileText
        ? props.replaceFileText
        : mergedLocale.lang!.replaceFileText
    );
    setSelectFileText(
      props.selectFileText
        ? props.selectFileText
        : mergedLocale.lang!.selectFileText
    );
    setSelectMultipleFilesText(
      props.selectMultipleFilesText
        ? props.selectMultipleFilesText
        : mergedLocale.lang!.selectMultipleFilesText
    );
    setUploadErrorText(
      props.uploadErrorText
        ? props.uploadErrorText
        : mergedLocale.lang!.uploadErrorText
    );
    setUploadingText(
      props.uploadingText
        ? props.uploadingText
        : mergedLocale.lang!.uploadingText
    );
  }, [mergedLocale]);

  const [mergedFileList, setMergedFileList] = useMergedState(
    defaultFileList || [],
    {
      value: fileList,
      postState: (list) => list ?? [],
    }
  );

  const [dropState, setDropState] = React.useState<string>('drop');

  const upload: React.MutableRefObject<any> = React.useRef<any>();

  warning(
    'fileList' in props || !('value' in props),
    '`value` is not a valid prop, do you mean `fileList`?'
  );

  // Control mode will auto fill file uid if not provided
  useMemo(() => {
    const timestamp = Date.now();

    (fileList || []).forEach((file, index) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`;
      }
    });
  }, [fileList]);

  const onInternalChange = (
    file: UploadFile,
    changedFileList: UploadFile[],
    event?: { percent: number }
  ): void => {
    let cloneList: UploadFile<any>[] = [...changedFileList];

    // Cut to match count
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }

    // Prevent React 18 auto batch because input[upload] triggers process at the same time
    // which causes fileList closure problem.
    flushSync(() => {
      setMergedFileList(cloneList);
    });

    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: cloneList,
    };

    if (event) {
      changeInfo.event = event;
    }

    onChange?.(changeInfo);
  };

  const mergedBeforeUpload = async (
    file: OcFile,
    fileListArgs: OcFile[]
  ): Promise<false | OcFile> => {
    const { beforeUpload } = props;

    let parsedFile: File | Blob | string = file;
    if (beforeUpload) {
      const result = await beforeUpload(file, fileListArgs);

      if (result === false) {
        return false;
      }

      // LIST_IGNORE, Add additional info to remove from the list.
      delete (file as any)[LIST_IGNORE];
      if ((result as any) === LIST_IGNORE) {
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true,
        });
        return false;
      }

      if (typeof result === 'object' && result) {
        parsedFile = result as File;
      }
    }

    return parsedFile as OcFile;
  };

  const onBatchStart: OcUploadProps['onBatchStart'] = (
    batchFileInfoList
  ): void => {
    // Skip file which marked as `LIST_IGNORE`, these file will not add to file list
    const filteredFileInfoList = batchFileInfoList.filter(
      (info) => !(info.file as any)[LIST_IGNORE]
    );

    // Nothing to do since no file need upload
    if (!filteredFileInfoList.length) {
      return;
    }

    const objectFileList = filteredFileInfoList.map((info) =>
      file2Obj(info.file as OcFile)
    );

    // Concat new files with prev files
    let newFileList: UploadFile<any>[] = [...mergedFileList];

    objectFileList.forEach((fileObj) => {
      // Replace file if exist
      newFileList = updateFileList(fileObj, newFileList);
    });

    objectFileList.forEach((fileObj, index) => {
      // Repeat trigger `onChange` event for compatibility
      let triggerFileObj: UploadFile = fileObj;

      if (!filteredFileInfoList[index].parsedFile) {
        // `beforeUpload` return false
        const { originFileObj } = fileObj;
        let clone;

        try {
          clone = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type,
          }) as any as UploadFile;
        } catch (e) {
          clone = new Blob([originFileObj], {
            type: originFileObj.type,
          }) as any as UploadFile;
          clone.name = originFileObj.name;
          clone.lastModifiedDate = new Date();
          clone.lastModified = new Date().getTime();
        }

        clone.uid = fileObj.uid;
        triggerFileObj = clone;
      } else {
        // Inject `uploading` status
        fileObj.status = 'uploading';
      }

      onInternalChange(triggerFileObj, newFileList);
    });
  };

  const onSuccess = (response: any, file: OcFile, xhr: any): void => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* no op */
    }

    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    const targetItem = file2Obj(file);
    targetItem.status = 'done';
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;

    const nextFileList = updateFileList(targetItem, mergedFileList);

    onInternalChange(targetItem, nextFileList);
  };

  const onProgress = (e: { percent: number }, file: OcFile): void => {
    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    const targetItem = file2Obj(file);
    targetItem.status = 'uploading';
    targetItem.percent = e.percent;

    const nextFileList = updateFileList(targetItem, mergedFileList);

    onInternalChange(targetItem, nextFileList, e);
  };

  const onError = (error: Error, response: any, file: OcFile): void => {
    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    const targetItem = file2Obj(file);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';

    const nextFileList = updateFileList(targetItem, mergedFileList);

    onInternalChange(targetItem, nextFileList);
  };

  const handleRemove = (file: UploadFile): void => {
    let currentFile: UploadFile;
    Promise.resolve(
      typeof onRemove === 'function' ? onRemove(file) : onRemove
    ).then((ret) => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, mergedFileList);

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' };
        mergedFileList?.forEach((item) => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name';
          if (
            item[matchKey] === currentFile[matchKey] &&
            !Object.isFrozen(item)
          ) {
            item.status = 'removed';
          }
        });
        upload.current?.abort(currentFile);

        onInternalChange(currentFile, removedFileList);
      }
    });
  };

  const handleReplace = (file: UploadFile): void => {
    Promise.resolve(
      typeof onReplace === 'function' ? onReplace(file) : onReplace
    );
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    setDropState(e.type);

    if (e.type === 'drop') {
      onDrop?.(e);
    }
  };

  // Test handler
  React.useImperativeHandle(ref, () => ({
    onBatchStart,
    onSuccess,
    onProgress,
    onError,
    fileList: mergedFileList,
    upload: upload.current,
  }));

  const ocUploadProps = {
    onBatchStart,
    onError,
    onProgress,
    onSuccess,
    ...props,
    accept,
    action,
    beforeUpload: mergedBeforeUpload,
    data,
    disabled: mergedDisabled,
    multiple,
    onChange: undefined,
    supportServerRender,
  } as OcUploadProps;

  delete ocUploadProps.classNames;
  delete ocUploadProps.style;

  // Remove id to avoid open by label when trigger is hidden
  if (!children || mergedDisabled) {
    delete ocUploadProps.id;
  }

  const renderUploadList = (
    button?: React.ReactNode,
    buttonVisible?: boolean
  ) =>
    showUploadList ? (
      <LocaleReceiver componentName={'Upload'} defaultLocale={enUS}>
        {(_contextLocale: UploadLocale) => {
          const {
            downloadIcon,
            downloadIconButtonType: downloadIconButtonType,
            previewIcon,
            removeIcon,
            removeIconButtonType: removeIconButtonType,
            replaceButtonType: replaceButtonType,
            replaceIcon,
            showDownloadIconButton: showDownloadIconButton,
            showPreviewIconButton: showPreviewIconButton,
            showRemoveIconButton: showRemoveIconButton,
            showReplaceButton: showReplaceButton,
          } = typeof showUploadList === 'boolean'
            ? ({} as ShowUploadListInterface)
            : showUploadList;
          return (
            <UploadList
              appendAction={button}
              appendActionVisible={buttonVisible}
              downloadFileText={downloadFileText}
              downloadIcon={downloadIcon}
              downloadIconButtonType={downloadIconButtonType}
              iconRender={iconRender}
              isImageUrl={isImageUrl}
              itemRender={itemRender}
              items={mergedFileList}
              fullWidth={fullWidth}
              listType={listType}
              maxCount={maxCount}
              onDownload={onDownload}
              onPreview={onPreview}
              onRemove={handleRemove}
              onReplace={handleReplace}
              previewFile={previewFile}
              previewFileText={previewFileText}
              previewIcon={previewIcon}
              progress={progress}
              removeFileText={removeFileText}
              removeIcon={removeIcon}
              removeIconButtonType={removeIconButtonType}
              replaceButtonType={replaceButtonType}
              replaceFileText={replaceFileText}
              replaceIcon={replaceIcon}
              showDownloadIconButton={showDownloadIconButton}
              showPreviewIconButton={showPreviewIconButton}
              showRemoveIconButton={!mergedDisabled && showRemoveIconButton}
              showReplaceButton={!mergedDisabled && showReplaceButton}
              size={size}
              uploadErrorText={uploadErrorText}
              uploadingText={uploadingText}
            />
          );
        }}
      </LocaleReceiver>
    ) : (
      button
    );

  if (type === 'drop') {
    const renderIcon = (): JSX.Element => (
      <Icon
        classNames={styles.uploadDropIcon}
        path={IconName.mdiFileUploadOutline}
        size="48px"
      />
    );
    const renderText = (): JSX.Element => (
      <Stack direction="vertical">
        <div className={styles.uploadDropText}>
          {maxCount === 1 ? dragAndDropFileText : dragAndDropMultipleFilesText}
        </div>
        <div className={styles.uploadDropHintText}>{acceptedFileTypesText}</div>
      </Stack>
    );
    const renderButton = (): JSX.Element => (
      <Button
        classNames={styles.uploadDropButton}
        disabled={mergedDisabled}
        htmlType="button"
        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
          if (
            event?.key !== eventKeys.TAB ||
            (event?.key !== eventKeys.TAB && !event?.shiftKey)
          ) {
            event.preventDefault();
          }
        }}
        text={maxCount === 1 ? selectFileText : selectMultipleFilesText}
        variant={ButtonVariant.Primary}
      />
    );
    const renderDropzone = (): JSX.Element => {
      return (
        <>
          {size === UploadSize.Large && (
            <Stack direction="vertical" fullWidth flexGap="ml" justify="center">
              {renderIcon()}
              {renderText()}
              {renderButton()}
            </Stack>
          )}
          {size === UploadSize.Medium && (
            <Stack direction="vertical" flexGap="m">
              <Stack direction="horizontal" flexGap="xs">
                {renderIcon()}
                {renderText()}
              </Stack>
              {renderButton()}
            </Stack>
          )}
          {size === UploadSize.Small && (
            <Stack direction="horizontal" fullWidth justify="space-between">
              <Stack direction="horizontal" flexGap="s">
                {renderIcon()}
                {renderText()}
              </Stack>
              {renderButton()}
            </Stack>
          )}
        </>
      );
    };
    const dropClassNames: string = mergeClasses([
      styles.upload,
      { [styles.uploadFullWidth]: !!fullWidth },
      { [styles.uploadLarge]: size === UploadSize.Large },
      { [styles.uploadMedium]: size === UploadSize.Medium },
      { [styles.uploadSmall]: size === UploadSize.Small },
      { [styles.uploadDrop]: true },
      {
        ['upload-drop-uploading']: mergedFileList.some(
          (file) => file.status === 'uploading'
        ),
      },
      { [styles.uploadDropHover]: dropState === 'dragover' },
      { [styles.uploadDisabled]: mergedDisabled },
      { [styles.uploadRtl]: htmlDir === 'rtl' },
      classNames,
    ]);
    return (
      <>
        <div
          className={dropClassNames}
          onDrop={onFileDrop}
          onDragOver={onFileDrop}
          onDragLeave={onFileDrop}
          style={style}
        >
          <OcUpload
            {...ocUploadProps}
            ref={upload}
            className={styles.uploadButton}
          >
            <div className={styles.uploadDropContainer}>
              {!children && (
                <>
                  {!maxCount && renderDropzone()}
                  {maxCount === 1 && (
                    <>
                      {mergedFileList.length === 0 && renderDropzone()}
                      {mergedFileList.length > 0 && renderUploadList()}
                    </>
                  )}
                </>
              )}
              {!!children && children}
            </div>
          </OcUpload>
        </div>
        {!maxCount && renderUploadList()}
      </>
    );
  }

  const uploadButtonClassNames: string = mergeClasses([
    styles.upload,
    { [styles.uploadSelect]: true },
    { [styles.uploadSelectPictureCard]: listType === 'picture-card' },
    { [styles.uploadDisabled]: mergedDisabled },
    { [styles.uploadRtl]: htmlDir === 'rtl' },
  ]);

  const renderUploadButton = (
    uploadButtonStyle?: React.CSSProperties
  ): JSX.Element => (
    <div className={uploadButtonClassNames} style={uploadButtonStyle}>
      <OcUpload {...ocUploadProps} ref={upload} />
    </div>
  );

  const uploadButton: JSX.Element = renderUploadButton(
    children ? undefined : { display: 'none' }
  );

  if (listType === 'picture-card') {
    return (
      <span
        className={mergeClasses(styles.uploadPictureCardWrapper, classNames)}
      >
        {renderUploadList(uploadButton, !!children)}
      </span>
    );
  }

  return (
    <span className={classNames}>
      {uploadButton}
      {renderUploadList()}
    </span>
  );
};

const Upload = React.forwardRef<unknown, UploadProps>(InternalUpload);

export default Upload;
