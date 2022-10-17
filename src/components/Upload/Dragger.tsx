import React, { FC, forwardRef } from 'react';
import type { UploadProps } from './Upload.types';
import Upload from './Upload';

export type DraggerProps = UploadProps & { height?: number };

const InternalDragger: React.ForwardRefRenderFunction<unknown, DraggerProps> = (
    { style, height, ...restProps },
    ref
) => (
    <Upload ref={ref} {...restProps} type="drag" style={{ ...style, height }} />
);

const Dragger = forwardRef(InternalDragger) as FC<DraggerProps>;

export default Dragger;
