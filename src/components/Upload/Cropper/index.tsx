'use client';

import { default as InternalCropper } from './Cropper';
import { CropperProps } from './Cropper.types';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { default as EasyCropper } from 'react-easy-crop';

type CompoundedComponent = ForwardRefExoticComponent<
  CropperProps & RefAttributes<EasyCropper>
>;

const Cropper = InternalCropper as CompoundedComponent;

export default Cropper;
