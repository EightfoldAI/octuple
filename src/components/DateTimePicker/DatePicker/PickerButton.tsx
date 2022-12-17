import React from 'react';
import type { ButtonProps } from '../../Button';
import { DefaultButton } from '../../Button';

export default function PickerButton(props: ButtonProps) {
  return <DefaultButton {...props} />;
}
