import { MenuItemTypes, MenuSize, MenuVariant } from './Menu.types';
import { ReactNode } from 'react';

export interface MenuRendererProps {
  items: MenuItemTypes[];
  size?: MenuSize;
  variant?: MenuVariant;
  children?: ReactNode;
  [key: string]: any;
}

export interface MenuRenderFunction {
  (props: MenuRendererProps): JSX.Element;
}
