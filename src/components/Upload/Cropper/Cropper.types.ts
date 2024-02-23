import { MutableRefObject } from 'react';
import type { Dispatch, SetStateAction, ForwardedRef } from 'react';
import { default as EasyCropper } from 'react-easy-crop';
import type { CropperProps as EasyCropperProps } from 'react-easy-crop';
import type { Area } from 'react-easy-crop/types';
import { ConfigContextProps, OcThemeName } from '../../ConfigProvider';
import { UploadLocale } from '../Upload.types';

export const INIT_ZOOM: number = 1;
export const ZOOM_STEP: number = 0.1;
export const INIT_ROTATE: number = 0;
export const ROTATE_STEP: number = 1;
export const MIN_ROTATE: number = -180;
export const MAX_ROTATE: number = 180;

export type EasyCropHandle = {
  rotateVal: number;
  setZoomVal: Dispatch<SetStateAction<number>>;
  setRotateVal: Dispatch<SetStateAction<number>>;
  cropPixelsRef: MutableRefObject<Area>;
};

export interface EasyCropProps
  extends Required<
    Pick<
      CropperProps,
      | 'aspect'
      | 'configContextProps'
      | 'gradient'
      | 'shape'
      | 'theme'
      | 'themeContainerId'
      | 'grid'
      | 'zoom'
      | 'rotate'
      | 'minZoom'
      | 'maxZoom'
      | 'cropperProps'
    >
  > {
  /**
   * The EasyCropper ref.
   */
  cropperRef: ForwardedRef<EasyCropper>;
  /**
   * The image to be cropped.
   */
  image: string;
  /**
   * The Cropper Rotate left button aria label text.
   * @default 'Rotate left'
   */
  rotateLeftButtonAriaLabelText?: string;
  /**
   * The Cropper Rotate right button aria label text.
   * @default 'Rotate right'
   */
  rotateRightButtonAriaLabelText?: string;
  /**
   * The Cropper Zoom in button aria label text.
   * @default 'Zoom in'
   */
  zoomInButtonAriaLabelText?: string;
  /**
   * The Cropper Zoom out button aria label text.
   * @default 'Zoom out'
   */
  zoomOutButtonAriaLabelText?: string;
}

export interface CropperProps {
  /**
   * Aspect ratio of cropper area: `width` / `height`.
   * @default 1
   */
  aspect?: number;
  /**
   * Callback executed before Modal visible
   * if `false` Modal will not be visible.
   */
  beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /**
   * The Cropper renderer.
   */
  children: JSX.Element;
  /**
   * Configure how contextual props are consumed.
   */
  configContextProps?: ConfigContextProps;
  /**
   * `react-easy-crop` dependency props.
   * May not be overridden. See https://github.com/ricardo-ch/react-easy-crop#props
   */
  cropperProps?: Partial<EasyCropperProps>;
  /**
   * Fill color when cropped image sis maller than it canvas.
   * @default `var(--background-color)``
   */
  fillColor?: string;
  /**
   * The Cropper gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Show Cropper area grid.
   * @default false
   */
  grid?: boolean;
  /**
   * The Upload component locale.
   */
  locale?: UploadLocale;
  /**
   * Maximum zoom factor.
   * @default 3
   */
  maxZoom?: number;
  /**
   * Minimum zoom factor.
   * @default 1
   */
  minZoom?: number;
  /**
   * The Cropper Modal Cancel button text.
   * @default 'Cancel'
   */
  modalCancelText?: string;
  /**
   * The Cropper Modal Close button aria label text.
   * @default 'Close'
   */
  modalCloseButtonAriaLabelText?: string;
  /**
   * The height of the Modal.
   */
  modalHeight?: number;
  /**
   * The Cropper Modal OK button text.
   * @default 'OK'
   */
  modalOkText?: string;
  /**
   * The Modal title text.
   * @default 'Edit Image'
   */
  modalTitleText?: string;
  /**
   * Custom class for the modal wrapper.
   */
  modalWrapperClassNames?: string;
  /**
   * The Modal width.
   */
  modalWidth?: number;
  /**
   * Callback executed on Modal Cancel event.
   */
  onModalCancel?: () => void;
  /**
   * Callback executed on Modak OK event.
   */
  onModalOk?: (file: void | boolean | string | Blob | File) => void;
  /**
   * Callback executed on Upload faile event.
   */
  onUploadFail?: (err: Error) => void;
  /**
   * The image quality `0` - `1`.
   * @default 0.4
   */
  quality?: number;
  /**
   * Enables image rotate.
   * @default false
   */
  rotate?: boolean;
  /**
   * The Cropper Rotate left button aria label text.
   * @default 'Rotate left'
   */
  rotateLeftButtonAriaLabelText?: string;
  /**
   * The Cropper Rotate right button aria label text.
   * @default 'Rotate right'
   */
  rotateRightButtonAriaLabelText?: string;
  /**
   * The shape of the Cropper area.
   * @default 'rect'
   */
  shape?: 'rect' | 'round';
  /**
   * Theme of the Cropper.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the Cropper.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * Enables image zoom.
   * @default true
   */
  zoom?: boolean;
  /**
   * The Cropper Zoom in button aria label text.
   * @default 'Zoom in'
   */
  zoomInButtonAriaLabelText?: string;
  /**
   * The Cropper Zoom out button aria label text.
   * @default 'Zoom out'
   */
  zoomOutButtonAriaLabelText?: string;
}
