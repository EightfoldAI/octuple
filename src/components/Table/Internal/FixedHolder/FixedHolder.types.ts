import type { HeaderProps } from '../Header/Header.types';

export interface FixedHeaderProps<RecordType> extends HeaderProps<RecordType> {
  classNames: string;
  noData: boolean;
  maxContentScroll: boolean;
  colWidths: readonly number[];
  columCount: number;
  direction: string;
  fixHeader: boolean;
  stickyTopOffset?: number;
  stickyBottomOffset?: number;
  stickyClassName?: string;
  onScroll: (info: {
    currentTarget: HTMLDivElement;
    scrollLeft?: number;
  }) => void;
  children: (info: HeaderProps<RecordType>) => React.ReactNode;
}
