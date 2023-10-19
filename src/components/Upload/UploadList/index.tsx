import React, { useEffect, useRef } from 'react';
import ListItem from './ListItem';
import {
  InternalUploadFile,
  UploadFile,
  UploadListProps,
  UploadSize,
} from '../Upload.types';
import { isImageUrl, previewImage } from '../Utils';
import CSSMotion, { CSSMotionList } from '../../Motion';
import type { CSSMotionListProps } from '../../Motion';
import { ButtonShape, Button } from '../../Button';
import { ButtonProps } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { useForceUpdate } from '../../../hooks/useForceUpdate';
import {
  cloneElement,
  collapseMotion,
  mergeClasses,
} from '../../../shared/utilities';

import styles from '../upload.module.scss';

const listItemMotion: Partial<CSSMotionListProps> = {
  ...collapseMotion,
};

delete listItemMotion.onAppearEnd;
delete listItemMotion.onEnterEnd;
delete listItemMotion.onLeaveEnd;

const InternalUploadList: React.ForwardRefRenderFunction<
  unknown,
  UploadListProps
> = (props, ref) => {
  const {
    appendAction,
    appendActionVisible = true,
    downloadFileText,
    downloadIcon,
    downloadIconButtonType = 'button',
    fullWidth = false,
    iconRender,
    isImageUrl: isImgUrl = isImageUrl,
    itemRender,
    items = [],
    listType = 'text',
    maxCount,
    onDownload,
    onPreview,
    onRemove,
    onReplace,
    previewFile = previewImage,
    previewFileText,
    previewIcon,
    progress = { strokeWidth: 2, showLabels: false },
    removeFileText,
    removeIcon,
    removeIconButtonType = 'button',
    replaceButtonType = 'button',
    replaceFileText,
    replaceIcon,
    showDownloadIconButton: showDownloadIconButton = false,
    showPreviewIconButton: showPreviewIconButton = true,
    showRemoveIconButton: showRemoveIconButton = true,
    showReplaceButton: showReplaceButton = true,
    size,
    uploadErrorText,
    uploadingText,
  } = props;

  const forceUpdate = useForceUpdate();
  const [motionAppear, setMotionAppear] = React.useState(false);

  const listRef: React.MutableRefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach((file: InternalUploadFile) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(
          file.originFileObj instanceof File ||
          (file.originFileObj as Blob) instanceof Blob
        ) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      file.thumbUrl = '';
      if (previewFile) {
        previewFile(file.originFileObj as File).then(
          (previewDataUrl: string) => {
            // Need append '' to avoid dead loop
            file.thumbUrl = previewDataUrl || '';
            forceUpdate();
          }
        );
      }
    });
  }, [listType, items, previewFile]);

  useEffect(() => {
    setMotionAppear(true);
  }, []);

  const onInternalPreview = (
    file: UploadFile,
    e?: React.SyntheticEvent<HTMLElement>
  ): void => {
    if (!onPreview) {
      return;
    }
    e?.preventDefault();
    return onPreview(file);
  };

  const onInternalDownload = (file: UploadFile): void => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  const onInternalClose = (file: UploadFile): void => {
    onRemove?.(file);
  };

  const onInternalReplace = (file: UploadFile): void => {
    onReplace?.(file);
  };

  const internalIconRender = (file: UploadFile) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading: boolean = file.status === 'uploading';
    const dropIcon: IconName =
      file.status === 'error'
        ? IconName.mdiFileCancelOutline
        : IconName.mdiFileCheckOutline;
    const dropIconColor: string =
      file.status === 'error'
        ? 'var(--error-color)'
        : 'var(--text-tertiary-color)';
    const fileIcon: JSX.Element =
      isImgUrl && isImgUrl(file) ? (
        <Icon path={IconName.mdiImageOutline} size={'48px'} />
      ) : (
        <Icon path={dropIcon} size={'48px'} />
      );
    let icon: React.ReactNode = isLoading ? (
      <Icon
        classNames={styles.uploadSpinIcon}
        path={IconName.mdiLoading}
        size={IconSize.XSmall}
        spin={0.4}
      />
    ) : (
      <Icon
        classNames={styles.uploadDropIcon}
        color={dropIconColor}
        path={
          file.status === 'removed' ? IconName.mdiFileCancelOutline : dropIcon
        }
        size={'48px'}
      />
    );
    if (listType === 'picture') {
      icon = isLoading ? (
        <Icon
          classNames={styles.uploadSpinIcon}
          path={IconName.mdiLoading}
          size={IconSize.XSmall}
          spin={0.4}
        />
      ) : (
        fileIcon
      );
    } else if (listType === 'picture-card') {
      icon = isLoading ? uploadingText : fileIcon;
    }
    return icon;
  };

  const actionButtonRender = (
    buttonProps: ButtonProps,
    callback: () => void
  ): JSX.Element => {
    const defaultProps: ButtonProps = {
      classNames: mergeClasses([
        styles.uploadListItemCardActionsButton,
        styles.iconDownload,
      ]),
      htmlType: downloadIconButtonType,
      iconProps: {
        path: IconName.mdiArrowDownThin,
      },
      shape: ButtonShape.Round,
      onClick: (_event: React.MouseEvent<HTMLElement>) => {
        callback();
      },
    };
    return <Button {...defaultProps} {...buttonProps} />;
  };

  // Test handler
  React.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload,
  }));

  const htmlDir: string = useCanvasDirection();

  const listClassNames: string = mergeClasses([
    styles.uploadList,
    { [styles.uploadListFullWidth]: !!fullWidth },
    { [styles.uploadListLarge]: size === UploadSize.Large },
    { [styles.uploadListMedium]: size === UploadSize.Medium },
    { [styles.uploadListSmall]: size === UploadSize.Small },
    (styles as any)[`upload-list-${listType}`],
    { [styles.uploadListRtl]: htmlDir === 'rtl' },
  ]);

  const motionKeyList = [
    ...items.map((file) => ({
      key: file.uid,
      file,
    })),
  ];

  const animationDirection =
    listType === 'picture-card' ? 'animate-inline' : 'animate';

  let motionConfig: Omit<CSSMotionListProps, 'onVisibleChanged'> = {
    motionDeadline: 2000,
    motionName: `upload-${animationDirection}`,
    keys: motionKeyList,
    motionAppear,
  };

  if (listType !== 'picture-card') {
    motionConfig = {
      ...listItemMotion,
      ...motionConfig,
    };
  }

  return (
    <ul ref={listRef} className={listClassNames}>
      <CSSMotionList {...motionConfig} component={false}>
        {({ key, file, className: motionClassNames, style: motionStyle }) => (
          <ListItem
            actionButtonRender={actionButtonRender}
            classNames={motionClassNames}
            downloadFileText={downloadFileText}
            downloadIcon={downloadIcon}
            downloadIconButtonType={downloadIconButtonType}
            file={file}
            iconRender={internalIconRender}
            isImgUrl={isImgUrl}
            itemRender={itemRender}
            items={items}
            key={key}
            listType={listType}
            maxCount={maxCount}
            onClose={onInternalClose}
            onDownload={onInternalDownload}
            onPreview={onInternalPreview}
            onReplace={onInternalReplace}
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
            showRemoveIconButton={showRemoveIconButton}
            showReplaceButton={showReplaceButton}
            style={motionStyle}
            uploadErrorText={uploadErrorText}
          />
        )}
      </CSSMotionList>
      {appendAction && (
        <CSSMotion {...motionConfig} visible={appendActionVisible} forceRender>
          {({ className: motionClassNames, style: motionStyle }) =>
            cloneElement(appendAction, (oriProps) => ({
              className: mergeClasses([oriProps.className, motionClassNames]),
              style: {
                ...motionStyle,
                // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
                pointerEvents: motionClassNames ? 'none' : undefined,
                ...oriProps.style,
              },
            }))
          }
        </CSSMotion>
      )}
    </ul>
  );
};

const UploadList = React.forwardRef<unknown, UploadListProps>(
  InternalUploadList
);

export default UploadList;
