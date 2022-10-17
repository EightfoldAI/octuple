import React, { useEffect, useState } from 'react';
import { ListItemProps } from '../Upload.types';
import { Icon, IconName, IconSize } from '../../Icon';
import CSSMotion from '../../Motion';
import Progress from '../../Progress';
import { Tooltip } from '../../Tooltip';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../upload.module.scss';

const ListItem = React.forwardRef(
    (
        {
            actionButtonRender,
            classNames,
            downloadFileText,
            downloadIcon: customDownloadIcon,
            file,
            iconRender,
            isImgUrl,
            itemRender,
            items,
            listType,
            onClose,
            onDownload,
            onPreview,
            previewFileText,
            previewIcon: customPreviewIcon,
            progress: progressProps,
            removeFileText,
            removeIcon: customRemoveIcon,
            showDownloadIconButton: showDownloadIconButton,
            showPreviewIconButton: showPreviewIconButton,
            showRemoveIconButton: showRemoveIconButton,
            style,
            uploadErrorText,
        }: ListItemProps,
        ref: React.Ref<HTMLDivElement>
    ) => {
        // Status: ignore `removed` status
        const { status } = file;
        const [mergedStatus, setMergedStatus] = useState(status);

        useEffect(() => {
            if (status !== 'removed') {
                setMergedStatus(status);
            }
        }, [status]);

        // Delay to show the progress bar
        const [showProgress, setShowProgress] = useState(false);
        const progressRafRef = React.useRef<any>();

        useEffect(() => {
            progressRafRef.current = setTimeout(() => {
                setShowProgress(true);
            }, 300);

            return () => {
                window.clearTimeout(progressRafRef.current);
            };
        }, []);

        const iconNode: React.ReactNode = iconRender(file);

        let icon: JSX.Element = (
            <div className={styles.uploadTextIcon}>{iconNode}</div>
        );

        if (listType === 'picture' || listType === 'picture-card') {
            if (mergedStatus === 'uploading' || (!file.thumbUrl && !file.url)) {
                const uploadingClassNames: string = mergeClasses([
                    styles.uploadListItemThumbnail,
                    {
                        [styles.uploadListItemFile]:
                            mergedStatus !== 'uploading',
                    },
                ]);
                icon = <div className={uploadingClassNames}>{iconNode}</div>;
            } else {
                const thumbnail: React.ReactNode = isImgUrl?.(file) ? (
                    <img
                        src={file.thumbUrl || file.url}
                        alt={file.name}
                        className={styles.uploadListItemImage}
                        crossOrigin={file.crossOrigin}
                    />
                ) : (
                    iconNode
                );
                const linkClassNames: string = mergeClasses([
                    styles.uploadListItemThumbnail,
                    {
                        [styles.uploadListItemFile]:
                            isImgUrl && !isImgUrl(file),
                    },
                ]);
                icon = (
                    <a
                        className={linkClassNames}
                        onClick={(e) => onPreview(file, e)}
                        href={file.url || file.thumbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {thumbnail}
                    </a>
                );
            }
        }

        const infoUploadingClassNames: string = mergeClasses([
            styles.uploadListItem,
            (styles as any)[`upload-list-item-${mergedStatus}`],
            (styles as any)[`upload-list-item-list-type-${listType}`],
        ]);
        const linkProps =
            typeof file.linkProps === 'string'
                ? JSON.parse(file.linkProps)
                : file.linkProps;

        const removeIconButton: React.ReactNode = showRemoveIconButton
            ? actionButtonRender(
                  {
                      ariaLabel: removeFileText,
                      classNames: mergeClasses([
                          styles.icon,
                          styles.iconDelete,
                      ]),
                      iconProps: {
                          path:
                              typeof customRemoveIcon === 'function'
                                  ? customRemoveIcon(file)
                                  : customRemoveIcon ||
                                    IconName.mdiDeleteOutline,
                      },
                  },
                  () => onClose(file)
              )
            : null;

        const downloadIconButton: React.ReactNode =
            showDownloadIconButton && mergedStatus === 'done'
                ? actionButtonRender(
                      {
                          ariaLabel: downloadFileText,
                          classNames: mergeClasses([
                              styles.icon,
                              styles.iconDownload,
                          ]),
                          iconProps: {
                              path:
                                  typeof customDownloadIcon === 'function'
                                      ? customDownloadIcon(file)
                                      : customDownloadIcon ||
                                        IconName.mdiArrowDownThin,
                          },
                      },
                      () => onDownload(file)
                  )
                : null;
        const downloadOrDelete: JSX.Element = listType !== 'picture-card' && (
            <span
                key="download-delete"
                className={mergeClasses([
                    styles.uploadListItemCardActions,
                    {
                        [styles.picture]: listType === 'picture',
                    },
                ])}
            >
                {downloadIconButton}
                {removeIconButton}
            </span>
        );
        const listItemNameClassName: string = styles.uploadListItemName;
        const preview: JSX.Element[] = file.url
            ? [
                  <a
                      key="view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={listItemNameClassName}
                      title={file.name}
                      {...linkProps}
                      href={file.url}
                      onClick={(e) => onPreview(file, e)}
                  >
                      {file.name}
                  </a>,
                  downloadOrDelete,
              ]
            : [
                  <span
                      key="view"
                      className={listItemNameClassName}
                      onClick={(e) => onPreview(file, e)}
                      title={file.name}
                  >
                      {file.name}
                  </span>,
                  downloadOrDelete,
              ];
        const previewStyle: React.CSSProperties = {
            pointerEvents: 'none',
            opacity: 0.5,
        };
        const previewIconButton: JSX.Element = showPreviewIconButton ? (
            <a
                href={file.url || file.thumbUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={file.url || file.thumbUrl ? undefined : previewStyle}
                onClick={(e) => onPreview(file, e)}
                title={previewFileText}
            >
                {typeof customPreviewIcon === 'function'
                    ? customPreviewIcon(file)
                    : customPreviewIcon || (
                          <Icon
                              path={IconName.mdiEyeOutline}
                              size={IconSize.XSmall}
                              classNames={mergeClasses([
                                  styles.icon,
                                  styles.iconView,
                              ])}
                          />
                      )}
            </a>
        ) : null;

        const actions: JSX.Element = listType === 'picture-card' &&
            mergedStatus !== 'uploading' && (
                <span className={styles.uploadListItemActions}>
                    {previewIconButton}
                    {mergedStatus === 'done' && downloadIconButton}
                    {removeIconButton}
                </span>
            );

        let message: string;

        if (file.response && typeof file.response === 'string') {
            message = file.response;
        } else {
            message =
                file.error?.statusText ||
                file.error?.message ||
                uploadErrorText;
        }

        const iconAndPreview: JSX.Element = (
            <span className={styles.uploadSpan}>
                {icon}
                {preview}
            </span>
        );

        const dom: JSX.Element = (
            <div className={infoUploadingClassNames}>
                <div className={styles.uploadListItemInfo}>
                    {iconAndPreview}
                </div>
                {actions}
                {showProgress && (
                    <CSSMotion
                        motionDeadline={2000}
                        motionName={'upload-fade'}
                        visible={mergedStatus === 'uploading'}
                    >
                        {({ className: motionClassNames }) => {
                            // show loading icon if upload progress listener is disabled
                            const loadingProgress =
                                'percent' in file ? (
                                    <Progress
                                        {...progressProps}
                                        type="line"
                                        percent={file.percent}
                                    />
                                ) : null;

                            return (
                                <div
                                    className={mergeClasses([
                                        styles.uploadListItemProgress,
                                        motionClassNames,
                                    ])}
                                >
                                    {loadingProgress}
                                </div>
                            );
                        }}
                    </CSSMotion>
                )}
            </div>
        );
        const listContainerNameClassNames: string = mergeClasses([
            (styles as any)[`upload-list-${listType}-container`],
            classNames,
        ]);
        const item: JSX.Element =
            mergedStatus === 'error' ? (
                <Tooltip content={message}>{dom}</Tooltip>
            ) : (
                dom
            );

        return (
            <div
                ref={ref}
                className={listContainerNameClassNames}
                style={style}
            >
                {itemRender
                    ? itemRender(item, file, items, {
                          download: onDownload.bind(null, file),
                          preview: onPreview.bind(null, file),
                          remove: onClose.bind(null, file),
                      })
                    : item}
            </div>
        );
    }
);

export default ListItem;
