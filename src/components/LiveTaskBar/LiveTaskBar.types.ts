import { OcBaseProps } from '../OcBase';
import { ButtonProps } from '../Button';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { ReactNode } from 'react';
import { DropdownProps } from '../Dropdown';
import { PanelProps } from '../Panel';

export interface LiveTaskBarProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Custom header component (optional)
   * If not provided, no header will be shown
   */
  header?: ReactNode;

  /**
   * Array of task components to display in the task bar
   * If not provided, no tasks will be shown
   */
  tasks?: ReactNode[];

  /**
   * Panel props to be passed to the Panel component
   */
  panel?: Omit<PanelProps, 'ref'>;

  /**
   * Button props for the panel trigger button
   * This button will toggle the panel's visibility
   */
  panelButton?: Partial<ButtonProps>;

  /**
   * Dropdown props to be passed to the Dropdown component
   */
  dropdown?: Omit<DropdownProps, 'ref' | 'children'>;

  /**
   * Button props for the dropdown trigger button
   * This button will toggle the dropdown's visibility
   */
  dropdownButton?: Partial<ButtonProps>;

  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;

  /**
   * Theme of the LiveTaskBar
   * @default 'default'
   */
  theme?: OcThemeName | 'aiAgent';
}
