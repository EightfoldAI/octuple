import React, { FC } from 'react';
import { MenuItem, MenuProps } from './Menu.types';
import { List } from '../List';
import { ButtonTextAlign, ButtonWidth, DefaultButton } from '../Button';

export const Menu: FC<MenuProps> = ({
  items,
  onChange,
  disruptive = false,
  classNames,
  style,
  itemClassNames,
  itemStyle,
  header,
  footer,
  listType,
  ...rest
}) => {
  const getDefaultButton = (item: MenuItem): JSX.Element => (
    <DefaultButton
      {...item}
      alignText={ButtonTextAlign.Left}
      buttonWidth={ButtonWidth.fill}
      disruptive={disruptive}
      onClick={() => onChange(item.value)}
    />
  );

  return (
    <List<MenuItem>
      {...rest}
      items={items}
      renderItem={getDefaultButton}
      classNames={classNames}
      style={style}
      itemClassNames={itemClassNames}
      itemStyle={itemStyle}
      header={header}
      footer={footer}
      listType={listType}
      role="menu"
      itemRole="menuitem"
    />
  );
};
