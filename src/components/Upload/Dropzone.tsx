import * as React from 'react';
import type { UploadProps } from './Upload.types';
import Upload from './Upload';

export type DropzoneProps = UploadProps & { height?: number };

const InternalDropzone: React.ForwardRefRenderFunction<
    unknown,
    DropzoneProps
> = ({ style, height, ...rest }, ref) => (
    <Upload ref={ref} {...rest} type="drop" style={{ ...style, height }} />
);

const Dropzone = React.forwardRef(InternalDropzone) as React.FC<DropzoneProps>;

export default Dropzone;
