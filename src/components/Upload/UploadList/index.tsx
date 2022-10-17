import React, { useEffect } from 'react';
import ListItem from './ListItem';
import type {
    InternalUploadFile,
    UploadFile,
    UploadListProps,
} from '../Upload.types';
import { isImageUrl, previewImage } from '../Utils';
import CSSMotion, { CSSMotionList } from '../../Motion';
import type { CSSMotionListProps } from '../../Motion';
import { ButtonShape, SystemUIButton } from '../../Button';
import { ButtonProps, ButtonSize } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { useForceUpdate } from '../../../hooks/useForceUpdate';
import {
    cloneElement,
    collapseMotion,
    isValidElement,
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
        //acceptedFileTypesText,
        appendAction,
        appendActionVisible = true,
        downloadFileText,
        downloadIcon,
        //dragAndDropFileText,
        iconRender,
        isImageUrl: isImgUrl = isImageUrl,
        itemRender,
        items = [],
        listType = 'text',
        onDownload,
        onPreview,
        onRemove,
        previewFile = previewImage,
        previewFileText,
        previewIcon,
        progress = { strokeWidth: 2, showInfo: false },
        removeFileText,
        removeIcon,
        //replaceFileText,
        //selectFileText,
        showDownloadIconButton: showDownloadIconButton = false,
        showPreviewIconButton: showPreviewIconButton = true,
        showRemoveIconButton: showRemoveIconButton = true,
        uploadErrorText,
        uploadingText,
    } = props;

    const forceUpdate = useForceUpdate();
    const [motionAppear, setMotionAppear] = React.useState(false);

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

    const internalIconRender = (file: UploadFile) => {
        if (iconRender) {
            return iconRender(file, listType);
        }
        const isLoading: boolean = file.status === 'uploading';
        const fileIcon: JSX.Element =
            isImgUrl && isImgUrl(file) ? (
                <Icon path={IconName.mdiImageOutline} size={IconSize.XSmall} />
            ) : (
                <Icon
                    path={IconName.mdiFileDocumentOutline}
                    size={IconSize.XSmall}
                />
            );
        let icon: React.ReactNode = isLoading ? (
            <Icon
                path={IconName.mdiLoading}
                size={IconSize.XSmall}
                spin={400}
            />
        ) : (
            <Icon path={IconName.mdiPaperclip} size={IconSize.XSmall} />
        );
        if (listType === 'picture') {
            icon = isLoading ? (
                <Icon
                    path={IconName.mdiLoading}
                    size={IconSize.XSmall}
                    spin={400}
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
                styles.uploadListItemCardActionsBtn,
                styles.icon,
                styles.iconDownload,
            ]),
            iconProps: {
                path: IconName.mdiArrowDownThin,
                size: IconSize.XSmall,
            },
            shape: ButtonShape.Round,
            size: ButtonSize.Small,
            onClick: (_event: React.MouseEvent<HTMLElement>) => {
                callback();
            },
        };
        return <SystemUIButton {...defaultProps} {...buttonProps} />;
    };

    // Test handler
    React.useImperativeHandle(ref, () => ({
        handlePreview: onInternalPreview,
        handleDownload: onInternalDownload,
    }));

    const htmlDir: string = useCanvasDirection();

    const listClassNames: string = mergeClasses([
        styles.uploadList,
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
        <div className={listClassNames}>
            <CSSMotionList {...motionConfig} component={false}>
                {({
                    key,
                    file,
                    className: motionClassNames,
                    style: motionStyle,
                }) => (
                    <ListItem
                        actionButtonRender={actionButtonRender}
                        classNames={motionClassNames}
                        downloadFileText={downloadFileText}
                        downloadIcon={downloadIcon}
                        file={file}
                        iconRender={internalIconRender}
                        isImgUrl={isImgUrl}
                        itemRender={itemRender}
                        items={items}
                        key={key}
                        listType={listType}
                        onClose={onInternalClose}
                        onDownload={onInternalDownload}
                        onPreview={onInternalPreview}
                        previewFileText={previewFileText}
                        previewIcon={previewIcon}
                        progress={progress}
                        removeFileText={removeFileText}
                        removeIcon={removeIcon}
                        showDownloadIconButton={showDownloadIconButton}
                        showPreviewIconButton={showPreviewIconButton}
                        showRemoveIconButton={showRemoveIconButton}
                        style={motionStyle}
                        uploadErrorText={uploadErrorText}
                    />
                )}
            </CSSMotionList>

            {/* Append action */}
            {appendAction && (
                <CSSMotion
                    {...motionConfig}
                    visible={appendActionVisible}
                    forceRender
                >
                    {({ className: motionClassNames, style: motionStyle }) =>
                        cloneElement(appendAction, (oriProps) => ({
                            className: mergeClasses([
                                oriProps.className,
                                motionClassNames,
                            ]),
                            style: {
                                ...motionStyle,
                                // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
                                pointerEvents: motionClassNames
                                    ? 'none'
                                    : undefined,
                                ...oriProps.style,
                            },
                        }))
                    }
                </CSSMotion>
            )}
        </div>
    );
};

const UploadList = React.forwardRef<unknown, UploadListProps>(
    InternalUploadList
);

export default UploadList;
