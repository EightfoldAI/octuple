import type * as React from 'react';
import type {
  Action,
  OcFile as InternalOcFile,
  OcUploadProps,
  UploadRequestOption as OcCustomRequestOptions,
  UploadRequestMethod,
} from './Internal/OcUpload.types';
import type { ProgressProps } from '../Progress';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { ButtonProps } from '../Button';
import { IconName } from '../Icon';

type UploadButtonHtmlType = 'button' | 'submit' | 'reset';

type Locale = {
  /**
   * The Upload locale.
   */
  locale: string;
  /**
   * The Upload '(doc, docx, pdf or txt)' string.
   */
  acceptedFileTypesText?: string;
  /**
   * The Upload 'Download file' string.
   */
  downloadFileText?: string;
  /**
   * The Upload 'Drag & drop file' string.
   */
  dragAndDropFileText?: string;
  /**
   * The Upload 'Drag & drop files' string.
   */
  dragAndDropMultipleFilesText?: string;
  /**
   * The Cropper Modal 'Cancel' string.
   */
  modalCancelText?: string;
  /**
   * The Cropper Modal 'Close' string.
   */
  modalCloseButtonAriaLabelText?: string;
  /**
   * The Cropper Modal 'OK' string.
   */
  modalOkText?: string;
  /**
   * The Cropper Modal 'Edit Image' string.
   */
  modalTitleText?: string;
  /**
   * The Upload 'Preview file' string.
   */
  previewFileText?: string;
  /**
   * The Upload 'Remove file' string.
   */
  removeFileText?: string;
  /**
   * The Upload remove file aria-label template.
   * Use ${filename} as placeholder for the filename.
   * @default 'Delete file ${filename}'
   */
  removeFileAriaLabelText?: string;
  /**
   * The Upload 'Replace' string.
   */
  replaceFileText?: string;
  /**
   * The Cropper 'Rotate left' string.
   */
  rotateLeftButtonAriaLabelText?: string;
  /**
   * The Cropper 'Rotate right' string.
   */
  rotateRightButtonAriaLabelText?: string;
  /**
   * The Upload 'Select file' string.
   */
  selectFileText?: string;
  /**
   * The Upload 'Select files' string.
   */
  selectMultipleFilesText?: string;
  /**
   * The Upload 'File upload failed' string.
   */
  uploadErrorText?: string;
  /**
   * The Upload 'Uploading' string.
   */
  uploadingText?: string;
  /**
   * The Cropper 'Zoom in' string.
   */
  zoomInButtonAriaLabelText?: string;
  /**
   * The Cropper 'Zoom out' string.
   */
  zoomOutButtonAriaLabelText?: string;
};

type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>;
type BeforeUploadValueType = void | boolean | string | Blob | File;

export type UploadFileStatus =
  | 'error'
  | 'success'
  | 'done'
  | 'uploading'
  | 'removed';
export type UploadType = 'drop' | 'select';
export type UploadListType = 'text' | 'picture' | 'picture-card';
export type UploadListProgressProps = Omit<ProgressProps, 'percent' | 'type'>;

export type ItemRender<T = any> = (
  originNode: React.ReactElement,
  file: UploadFile,
  fileList: Array<UploadFile<T>>,
  actions: {
    download: () => void;
    preview: () => void;
    remove: () => void;
    replace: () => void;
  }
) => React.ReactNode;

export enum UploadSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface OcFile extends InternalOcFile {
  /**
   * The Upload file last modified date.
   */
  readonly lastModifiedDate: Date;
}

export interface HttpRequestHeader {
  /**
   * The http request header key.
   */
  [key: string]: string;
}

export interface UploadFile<T = any> {
  /**
   * CORS settings attributes.
   */
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  /**
   * The Upload file error message.
   */
  error?: any;
  /**
   * The Upload file name.
   */
  fileName?: string;
  /**
   * The Upload file last modified date in milliseconds.
   */
  lastModified?: number;
  /**
   * The Upload file last modified date.
   */
  lastModifiedDate?: Date;
  /**
   * The Upload file link props.
   */
  linkProps?: any;
  /**
   * The Upload file name or the path.
   */
  name: string;
  /**
   * The Upload file object.
   */
  originFileObj?: OcFile;
  /**
   * The Upload file progress percent.
   */
  percent?: number;
  /**
   * The Upload file preview url.
   */
  preview?: string;
  /**
   * The Upload file response.
   */
  response?: T;
  /**
   * The Upload file size.
   */
  size?: number;
  /**
   * The Upload file status.
   */
  status?: UploadFileStatus;
  /**
   * The Upload file thumb url.
   */
  thumbUrl?: string;
  /**
   * The Upload file type.
   */
  type?: string;
  /**
   * The Upload file unique identifier.
   */
  uid: string;
  /**
   * The Upload file url.
   */
  url?: string;
  /**
   * The Upload file xhr header.
   */
  xhr?: T;
}

export interface InternalUploadFile<T = any> extends UploadFile<T> {
  /**
   * The Upload file object.
   */
  originFileObj: OcFile;
}

export interface UploadChangeParam<T = UploadFile> {
  /**
   * The upload change event.
   * Returns percent.
   */
  event?: { percent: number };
  /**
   * The file.
   */
  file: T;
  /**
   * The list of files.
   */
  fileList: T[];
}

export interface ShowUploadListInterface {
  /**
   * Customize the download icon button svg path.
   */
  downloadIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * The download icon button type
   * @default 'button'
   */
  downloadIconButtonType?: UploadButtonHtmlType;
  /**
   * Assigns Upload list 100% width.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Customize the preview icon button svg path.
   */
  previewIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * Customize the remove icon button svg path.
   */
  removeIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * The remove icon button type
   * @default 'button'
   */
  removeIconButtonType?: UploadButtonHtmlType;
  /**
   * The replace button type
   * @default 'button'
   */
  replaceButtonType?: UploadButtonHtmlType;
  /**
   * Customize the replace button icon svg path.
   */
  replaceIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * Whether to show the download icon button.
   */
  showDownloadIconButton?: boolean;
  /**
   * Whether to show the preview icon button.
   */
  showPreviewIconButton?: boolean;
  /**
   * Whether to show the remove icon button.
   */
  showRemoveIconButton?: boolean;
  /**
   * Whether to show the replace button.
   * Use when maxCount is 1
   */
  showReplaceButton?: boolean;
}

export interface UploadLocale {
  lang: Locale;
}

export interface UploadProps<T = any> extends Pick<OcUploadProps, 'capture'> {
  /**
   * File types that can be accepted.
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string;
  /**
   * The accepted files string.
   * @default '(doc, docx, pdf or txt)'
   */
  acceptedFileTypesText?: string;
  /**
   * Upload URL
   */
  action?: Action;

  'aria-describedby'?: string;

  'aria-labelledby'?: string;
  /**
   * Hook executed before uploading.
   * Uploading will be stopped with false or a rejected Promise returned.
   * When returned value is Upload.LIST_IGNORE, the list of files that have been uploaded will ignore it.
   * Warning：Not supported in IE9 and below.
   * @default null
   */
  beforeUpload?: (
    file: OcFile,
    FileList: OcFile[]
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  /**
   * The Upload children render.
   */
  children?: React.ReactNode;
  /**
   * The Upload component class names.
   */
  classNames?: string;
  /**
   * Configure how contextual props are consumed.
   */
  configContextProps?: ConfigContextProps;
  /**
   * Override for the default xhr behavior allowing for
   * additional customization and ability to implement your own XMLHttpRequest.
   * Provide your own XMLHttpRequest calls to interface with custom
   * backend processes or interact with AWS S3 service through the aws-sdk-js package.
   * @default null
   */
  customRequest?: (options: OcCustomRequestOptions) => void;
  /**
   * Upload extra params or function which can return uploading extra params.
   */
  data?:
    | Record<string, unknown>
    | ((
        file: UploadFile<T>
      ) => Record<string, unknown> | Promise<Record<string, unknown>>);
  /**
   * Default list of files that have been uploaded.
   */
  defaultFileList?: Array<UploadFile<T>>;
  /**
   * Upload a directory.
   * https://caniuse.com/input-file-directory
   * @default false
   */
  directory?: boolean;
  /**
   * Disables the Upload button.
   * @default false
   */
  disabled?: boolean;
  /**
   * The download file string.
   * @default 'Download file'
   */
  downloadFileText?: string;
  /**
   * The drag and drop string.
   * @default 'Drag & drop file'
   */
  dragAndDropFileText?: string;
  /**
   * The multiple drag and drop string.
   * @default 'Drag & drop files'
   */
  dragAndDropMultipleFilesText?: string;
  /**
   * List of files that have been uploaded (controlled).
   * Update fileList in the uploading cycle.
   * If it's not updated, the uploading cycle won't trigger the done cycle.
   */
  fileList?: Array<UploadFile<T>>;
  /**
   * Assigns Upload 100% width.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The Upload gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Set request headers.
   * Warning：Not supported in IE9 and below.
   */
  headers?: HttpRequestHeader;
  /**
   * The custom icon.
   */
  iconRender?: (
    file: UploadFile<T>,
    listType?: UploadListType
  ) => React.ReactNode;
  /**
   * The Upload component id.
   */
  id?: string;
  /**
   * Customize if render <img /> is in the thumbnail.
   */
  isImageUrl?: (file: UploadFile) => boolean;
  /**
   * Custom Upload list item.
   */
  itemRender?: ItemRender<T>;
  /**
   * Built-in styles.
   * Supports three types: 'text', 'picture' or 'picture-card'.
   * @default text
   */
  listType?: UploadListType;
  /**
   * The Upload component locale.
   */
  locale?: UploadLocale;
  /**
   * Limit the number of uploaded files.
   * Will replace current one when maxCount is 1
   */
  maxCount?: number;
  /**
   * The http method of the upload request.
   * @default 'post'
   */
  method?: UploadRequestMethod;
  /**
   * Whether to support multiple file upload.
   * Enables select multiple files using CTRL button when true
   * Warning：Not supported in IE9 and below.
   * @default false
   */
  multiple?: boolean;
  /**
   * The name of uploading file.
   * @default 'file'
   */
  name?: string;
  /**
   * Callback executed when uploading state is changing.
   */
  onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
  /**
   * Download file method.
   * @default 'jump to new TAB'
   */
  onDownload?: (file: UploadFile<T>) => void;
  /**
   * Callback executed when files are
   * dragged and dropped into the upload area.
   */
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  /**
   * Callback executed when file link or preview icon is clicked.
   */
  onPreview?: (file: UploadFile<T>) => void;
  /**
   * Callback executed when remove button is clicked.
   * Remove event will be prevented when return value is false
   * or a Promise is resolve(false) or rejected.
   */
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  /**
   * Callback executed when replace button is clicked.
   * Replace event will be prevented when return value is false
   * or a Promise is resolve(false) or rejected.
   */
  onReplace?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  /**
   * Click to open file dialog.
   * Useful for drop only upload
   * as it does not trigger on enter key or click event.
   * @default true
   */
  openFileDialogOnClick?: boolean;
  /**
   * Customize the preview file logic.
   */
  previewFile?: PreviewFileHandler;
  /**
   * The preview file string.
   * @default 'Preview file'
   */
  previewFileText?: string;
  /**
   * Custom progress bar.
   * @default { strokeWidth: 2, showLabels: false }
   */
  progress?: UploadListProgressProps;
  /**
   * The remove file string.
   * @default 'Remove file'
   */
  removeFileText?: string;
  /**
   * The replace string.
   * @default 'Replace'
   */
  replaceFileText?: string;
  /**
   * The select file string.
   * @default 'Select file'
   */
  selectFileText?: string;
  /**
   * The select multiple files string.
   * @default 'Select files'
   */
  selectMultipleFilesText?: string;
  /**
   * Whether to show default upload list,
   * could be an object to specify each 'downloadIconButtonType', 'removeIconButtonType',
   * 'replaceButtonType', 'showPreviewIconButton', 'showRemoveIconButton',
   * 'showDownloadIconButton', 'showReplaceButton', 'removeIcon', 'replaceIcon', and 'downloadIcon'.
   * @default true
   */
  showUploadList?: boolean | ShowUploadListInterface;
  /**
   * The Upload size.
   * @default UploadSize.Medium
   */
  size?: UploadSize;
  /**
   * The Upload component custom styles.
   */
  style?: React.CSSProperties;
  /**
   * Upload should support server render.
   * @default true
   */
  supportServerRender?: boolean;
  /**
   * Theme of Upload.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of Upload.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The Upload type.
   * @default 'select'
   */
  type?: UploadType;
  /**
   * The file upload failed string.
   * @default  'File upload failed'
   */
  uploadErrorText?: string;
  /**
   * The uploading string.
   * @default 'Uploading'
   */
  uploadingText?: string;
  /**
   * AJAX upload with cookie.
   * @default false
   */
  withCredentials?: boolean;
}

export interface UploadState<T = any> {
  /**
   * List of files that have been uploaded.
   */
  fileList: UploadFile<T>[];
  /**
   * The Upload component drop state.
   * @default 'drop'
   */
  dropState: string;
}

export interface UploadListProps<T = any> {
  /**
   * The Upload list append action render.
   */
  appendAction?: React.ReactNode;
  /**
   * Whether the append action is visible.
   */
  appendActionVisible?: boolean;
  /**
   * Configure how contextual props are consumed.
   */
  configContextProps?: ConfigContextProps;
  /**
   * The download file string.
   * @default 'Download file'
   */
  downloadFileText?: string;
  /**
   * Customize the download icon button svg path.
   */
  downloadIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * The download icon button type
   * @default 'button'
   */
  downloadIconButtonType?: UploadButtonHtmlType;
  /**
   * Assigns Upload list 100% width.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The Upload list gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The custom icon.
   */
  iconRender?: (
    file: UploadFile<T>,
    listType?: UploadListType
  ) => React.ReactNode;
  /**
   * Customize if render <img /> is in the thumbnail.
   */
  isImageUrl?: (file: UploadFile) => boolean;
  /**
   * Custom Upload list item.
   */
  itemRender?: ItemRender<T>;
  /**
   * The Upload list file array.
   */
  items?: Array<UploadFile<T>>;
  /**
   * Built-in styles.
   * Supports three types: 'text', 'picture' or 'picture-card'.
   * @default text
   */
  listType?: UploadListType;
  /**
   * Limit the number of uploaded files.
   * Will replace current one when maxCount is 1
   */
  maxCount?: number;
  /**
   * Download file method.
   * @default 'jump to new TAB'
   */
  onDownload?: (file: UploadFile<T>) => void;
  /**
   * Callback executed when file link or preview icon is clicked.
   */
  onPreview?: (file: UploadFile<T>) => void;
  /**
   * Callback executed when remove button is clicked.
   * Remove event will be prevented when return value is false
   * or a Promise is resolve(false) or rejected.
   */
  onRemove?: (file: UploadFile<T>) => void | boolean;
  /**
   * Callback executed when replace button is clicked.
   * Replace event will be prevented when return value is false
   * or a Promise is resolve(false) or rejected.
   */
  onReplace?: (file: UploadFile<T>) => void | boolean;
  /**
   * Customize the preview file logic.
   */
  previewFile?: PreviewFileHandler;
  /**
   * The preview file string.
   * @default 'Preview file'
   */
  previewFileText?: string;
  /**
   * Customize the preview icon button svg path.
   */
  previewIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * Customize progress bar.
   * @default { strokeWidth: 2, showLabels: false }
   */
  progress?: UploadListProgressProps;
  /**
   * The remove file string.
   * @default 'Remove file'
   */
  removeFileText?: string;
  /**
   * Customize the remove icon button svg path.
   */
  removeIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * The remove icon button type
   * @default 'button'
   */
  removeIconButtonType?: UploadButtonHtmlType;
  /**
   * The replace button type
   * @default 'button'
   */
  replaceButtonType?: UploadButtonHtmlType;
  /**
   * The replace string.
   * @default 'Replace'
   */
  replaceFileText?: string;
  /**
   * Customize the replace button icon svg path.
   */
  replaceIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * Whether to show the download icon button.
   */
  showDownloadIconButton?: boolean;
  /**
   * Whether to show the preview icon button.
   */
  showPreviewIconButton?: boolean;
  /**
   * Whether to show the remove icon button.
   */
  showRemoveIconButton?: boolean;
  /**
   * Whether to show the replace button.
   * Use when maxCount is 1
   */
  showReplaceButton?: boolean;
  /**
   * The Upload size.
   * @default UploadSize.Medium
   */
  size?: UploadSize;
  /**
   * Theme of Upload list.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of Upload list.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The file upload failed string.
   * @default  'File upload failed'
   */
  uploadErrorText?: string;
  /**
   * The uploading string.
   * @default 'Uploading'
   */
  uploadingText?: string;
}

export interface ListItemProps {
  /**
   * The Upload Custom action button.
   */
  actionButtonRender: (
    buttonProps: ButtonProps,
    callback: () => void
  ) => React.ReactNode;
  /**
   * The Upload list item component class names.
   */
  classNames?: string;
  /**
   * The download file string.
   * @default 'Download file'
   */
  downloadFileText?: string;
  /**
   * Customize the download icon path.
   */
  downloadIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * The download icon button type
   * @default 'button'
   */
  downloadIconButtonType?: UploadButtonHtmlType;
  /**
   * The Upload list item file.
   */
  file: UploadFile;
  /**
   * The Upload list item gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The custom icon.
   */
  iconRender: (file: UploadFile) => React.ReactNode;
  /**
   * Customize if render <img /> is in the thumbnail.
   */
  isImgUrl?: (file: UploadFile) => boolean;
  /**
   * Custom Upload list item.
   */
  itemRender?: ItemRender;
  /**
   * The Upload list item file array.
   */
  items: UploadFile[];
  /**
   * Built-in styles.
   * Supports three types: 'text', 'picture' or 'picture-card'.
   * @default text
   */
  listType?: UploadListType;
  /**
   * The parent list element ref.
   */
  listRef?: React.MutableRefObject<HTMLUListElement>;
  /**
   * Limit the number of uploaded files.
   * Will replace current one when maxCount is 1
   */
  maxCount?: number;
  /**
   * Callback executed when an Upload list item is removed.
   */
  onClose: (file: UploadFile) => void;
  /**
   * Download file method.
   * @default 'jump to new TAB'
   */
  onDownload: (file: UploadFile) => void;
  /**
   * Callback executed when file link or preview icon is clicked.
   */
  onPreview: (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * Callback executed when an Upload list item is replaced.
   */
  onReplace: (file: UploadFile) => void;
  /**
   * The preview file string.
   * @default 'Preview file'
   */
  previewFileText?: string;
  /**
   * Customize the preview icon button svg path.
   */
  previewIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * Customize progress bar.
   * @default { strokeWidth: 2, showInfo: false }
   */
  progress?: UploadListProgressProps;
  /**
   * The remove file string.
   * @default 'Remove file'
   */
  removeFileText?: string;
  /**
   * Customize the remove icon button svg path.
   */
  removeIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * The remove icon button type
   * @default 'button'
   */
  removeIconButtonType?: UploadButtonHtmlType;
  /**
   * The replace button type
   * @default 'button'
   */
  replaceButtonType?: UploadButtonHtmlType;
  /**
   * The replace string.
   * @default 'Replace'
   */
  replaceFileText?: string;
  /**
   * Customize the replace button icon svg path.
   */
  replaceIcon?: IconName | ((file: UploadFile) => IconName);
  /**
   * Whether to show the download icon button.
   */
  showDownloadIconButton?: boolean;
  /**
   * Whether to show the preview icon button.
   */
  showPreviewIconButton?: boolean;
  /**
   * Whether to show the remove icon button.
   */
  showRemoveIconButton?: boolean;
  /**
   * Whether to show the replace button.
   * Use when maxCount is 1
   */
  showReplaceButton?: boolean;
  /**
   * The Upload size.
   * @default UploadSize.Medium
   */
  size?: UploadSize;
  /**
   * The Upload list item component custom styles.
   */
  style?: React.CSSProperties;
  /**
   * The file upload failed string.
   * @default  'File upload failed'
   */
  uploadErrorText?: string;
  /**
   * The uploading string.
   * @default 'Uploading'
   */
  uploadingText?: string;
}
