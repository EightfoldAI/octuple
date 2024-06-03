import React from 'react';
import { InfoBarsProps } from '../InfoBar';

export enum MessageBarType {
  neutral = 'neutral',
  positive = 'positive',
  warning = 'warning',
  disruptive = 'disruptive',
}

export interface MessageBarsProps extends Omit<InfoBarsProps, 'type'> {
  /**
   * Header of the MessageBar
   */
  header?: React.ReactNode;
  /**
   * Type of the MessageBar
   * @default MessageBarType.neutral
   */
  type?: MessageBarType;
}
