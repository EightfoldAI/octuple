import React from 'react';
import { ButtonProps } from '../Button';
import { BaseDialogProps } from './BaseDialog/BaseDialog.types';

type DialogButtonProps = Omit<ButtonProps, 'onClick'>;

export enum DialogSize {
  small = 'small',
  medium = 'medium',
}

export interface DialogProps extends BaseDialogProps {
  /**
   * Props for the cancel button
   */
  cancelButtonProps?: DialogButtonProps;
  /**
   * Props for the ok button
   */
  okButtonProps?: DialogButtonProps;
  /**
   * Callback when cancel button is clicked
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Callback when ok button is clicked
   */
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Size of the dialog
   * @default medium
   */
  size?: DialogSize;
}
