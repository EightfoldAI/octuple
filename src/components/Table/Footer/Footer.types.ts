import type { AlignType, ColumnType, StickyOffsets } from '../Table.types';

export type FlattenColumns<RecordType> = readonly (ColumnType<RecordType> & {
    scrollbar?: boolean;
})[];

export interface SummaryCellProps {
    classNames?: string;
    children?: React.ReactNode;
    index: number;
    colSpan?: number;
    rowSpan?: number;
    align?: AlignType;
}

export interface SummaryProps {
    fixed?: boolean | 'top' | 'bottom';
    children?: React.ReactNode;
}

export interface FooterRowProps {
    children?: React.ReactNode;
    classNames?: string;
    style?: React.CSSProperties;
}

export interface FooterProps<RecordType> {
    children: React.ReactNode;
    stickyOffsets: StickyOffsets;
    flattenColumns: FlattenColumns<RecordType>;
}
