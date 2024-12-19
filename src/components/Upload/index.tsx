'use client';

import Dropzone from './Dropzone';
import type { UploadProps } from './Upload';
import InternalUpload, { LIST_IGNORE } from './Upload';

export { DropzoneProps } from './Dropzone';
export {
  OcFile,
  UploadChangeParam,
  UploadFile,
  UploadFileStatus,
  UploadListProps,
  UploadProps,
  UploadSize,
} from './Upload.types';

type InternalUploadType = typeof InternalUpload;
interface UploadInterface<T = any> extends InternalUploadType {
  <U extends T>(
    props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>
  ): React.ReactElement;
  Dropzone: typeof Dropzone;
  LIST_IGNORE: string;
}

const Upload = InternalUpload as UploadInterface;
Upload.Dropzone = Dropzone;
Upload.LIST_IGNORE = LIST_IGNORE;

export { UploadInterface };

export default Upload;
