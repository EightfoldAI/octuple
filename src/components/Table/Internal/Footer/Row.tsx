import React from 'react';
import { FooterRowProps } from './Footer.types';

export default function FooterRow({ children, ...props }: FooterRowProps) {
  return <tr {...props}>{children}</tr>;
}
