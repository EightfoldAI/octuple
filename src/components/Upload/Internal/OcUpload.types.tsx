import type * as React from 'react';

export type Action = string | ((file: OcFile) => string | PromiseLike<string>);

export type BeforeUploadFileType = File | Blob | boolean | string;

export type UploadRequestHeader = Record<string, string>;

export type UploadRequestMethod =
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'post'
    | 'put'
    | 'patch';

export interface OcUploadProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'onError' | 'onProgress'
    > {
    /**
     * File types that can be accepted.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
     */
    accept?: string;
    /**
     * Upload URL
     */
    action?: Action;
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
    ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
    /**
     * The Upload component class names.
     */
    classNames?: string;
    /**
     * The Upload element
     * @default <span>
     */
    component?: React.JSXElementConstructor<any>;
    /**
     * Override for the default xhr behavior allowing for
     * additional customization and ability to implement your own XMLHttpRequest.
     * Provide your own XMLHttpRequest calls to interface with custom
     * backend processes or interact with AWS S3 service through the aws-sdk-js package.
     * @default null
     */
    customRequest?: (option: UploadRequestOption) => void;
    /**
     * Upload extra params or function which can return uploading extra params.
     */
    data?:
        | Record<string, unknown>
        | ((file: OcFile | string | Blob) => Record<string, unknown>);
    /**
     * upload a directory.
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
     * Set request headers.
     * Warning：Not supported in IE9 and below.
     */
    headers?: UploadRequestHeader;
    /**
     * The Upload component id.
     */
    id?: string;
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
     * @default file
     */
    name?: string;
    /**
     * Calback executed on file list batch upload start.
     */
    onBatchStart?: (
        fileList: {
            file: OcFile;
            parsedFile: Exclude<BeforeUploadFileType, boolean>;
        }[]
    ) => void;
    /**
     * Callback executed on click.
     */
    onClick?: (
        e:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
    ) => void;
    /**
     * Callback executed on error.
     */
    onError?: (
        error: Error,
        ret: Record<string, unknown>,
        file: OcFile
    ) => void;
    /**
     * Callback executed on mouse enter.
     */
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Callback executed on mouse leave.
     */
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Progress callback, only supported by modern browsers.
     */
    onProgress?: (event: UploadProgressEvent, file: OcFile) => void;
    /**
     * Callback executed when upload files starts.
     */
    onStart?: (file: OcFile) => void;
    /**
     * Callback executed on success.
     */
    onSuccess?: (
        response: Record<string, unknown>,
        file: OcFile,
        xhr: XMLHttpRequest
    ) => void;
    /**
     * Click to open file dialog.
     * Useful for drag only upload
     * as it does not trigger on enter key or click event.
     * @default true
     */
    openFileDialogOnClick?: boolean;
    /**
     * The Upload component custom styles.
     */
    style?: React.CSSProperties;
    /**
     * AJAX upload with cookie.
     * @default false
     */
    withCredentials?: boolean;
}

export interface UploadProgressEvent extends Partial<ProgressEvent> {
    /**
     * Percent value.
     */
    percent?: number;
}

export interface UploadRequestError extends Error {
    /**
     * The http method of the upload request.
     * @default 'post'
     */
    method?: UploadRequestMethod;
    /**
     * The http status code.
     */
    status?: number;
    /**
     * The url.
     */
    url?: string;
}

// The `customRequest` callback interface.
export interface UploadRequestOption<T = any> {
    /**
     * Upload URL
     */
    action: string;
    /**
     * Upload extra params.
     */
    data?: Record<string, unknown>;
    /**
     * The File.
     */
    file: Exclude<BeforeUploadFileType, File | boolean> | OcFile;
    /**
     * The name of uploading file.
     * @default file
     */
    filename?: string;
    /**
     * Set request headers.
     * Warning：Not supported in IE9 and below.
     */
    headers?: UploadRequestHeader;
    /**
     * The http method of the upload request.
     * @default 'post'
     */
    method: UploadRequestMethod;
    /**
     * Callback executed on error.
     */
    onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
    /**
     * Progress callback, only supported by modern browsers.
     */
    onProgress?: (event: UploadProgressEvent) => void;
    /**
     * Callback executed on success.
     */
    onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
    /**
     * AJAX upload with cookie.
     * @default false
     */
    withCredentials?: boolean;
}

export interface OcFile extends File {
    /**
     * The file unique identifier.
     */
    uid: string;
}
