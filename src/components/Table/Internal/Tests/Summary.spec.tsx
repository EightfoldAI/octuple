import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcTable from '../';
import { OcTableProps, DefaultRecordType } from '../OcTable.types';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Summary', () => {
    const data = [
        { key: 'key0', name: 'Lucy' },
        { key: 'key1', name: 'Jack' },
    ];
    const createTable = (
        props: JSX.IntrinsicAttributes &
            Pick<
                OcTableProps<DefaultRecordType>,
                | 'classNames'
                | 'style'
                | 'children'
                | 'data'
                | 'columns'
                | 'tableLayout'
                | 'scroll'
                | 'expandable'
                | 'indentSize'
                | 'rowClassName'
                | 'title'
                | 'footer'
                | 'summary'
                | 'id'
                | 'showHeader'
                | 'components'
                | 'onRow'
                | 'onHeaderRow'
                | 'direction'
                | 'transformColumns'
                | 'sticky'
            > &
            Partial<
                Pick<OcTableProps<DefaultRecordType>, 'rowKey' | 'emptyText'>
            > &
            Partial<Pick<{ rowKey: string; emptyText: () => string }, never>>
    ) => {
        const columns = [{ title: 'Name', dataIndex: 'name', key: 'name' }];

        return (
            <OcTable
                columns={columns}
                data={data}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
                {...props}
            />
        );
    };

    it('render correctly', () => {
        const wrapper = mount(
            createTable({
                summary: () => (
                    <tr className="summary">
                        <td>Good</td>
                    </tr>
                ),
            })
        );

        expect(wrapper.find('tfoot').text()).toEqual('Good');
    });

    it('support data type', () => {
        const wrapper = mount(
            <OcTable
                columns={[
                    { dataIndex: 'a', fixed: 'left', width: 10 },
                    { dataIndex: 'b', fixed: 'left', width: 20 },
                    { dataIndex: 'c', width: 30 },
                ]}
                data={[{ key: 1, a: 2, b: 3, c: 4 }]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
                summary={() => (
                    <OcTable.Summary.Row>
                        <OcTable.Summary.Cell colSpan={2} index={0}>
                            Light
                        </OcTable.Summary.Cell>
                        <OcTable.Summary.Cell index={2}>
                            Bamboo
                        </OcTable.Summary.Cell>
                        <OcTable.Summary.Cell index={3} align="right">
                            112.5
                        </OcTable.Summary.Cell>
                    </OcTable.Summary.Row>
                )}
            />
        );

        expect(wrapper.find('tfoot').render()).toMatchSnapshot();
    });

    describe('fixed summary', () => {
        const getSummaryTable = (fixed: boolean | 'top' | 'bottom') =>
            mount(
                <OcTable
                    columns={[
                        { dataIndex: 'a', fixed: 'left', width: 10 },
                        { dataIndex: 'b', width: 20 },
                        { dataIndex: 'c', fixed: 'right', width: 30 },
                    ]}
                    data={[{ key: 1, a: 2, b: 3, c: 4 }]}
                    expandable={{
                        expandIcon: () => <div className="expand-icon" />,
                    }}
                    scroll={{ x: 100, y: 100 }}
                    summary={() => (
                        <OcTable.Summary fixed={fixed}>
                            <OcTable.Summary.Row>
                                <OcTable.Summary.Cell index={0}>
                                    Light
                                </OcTable.Summary.Cell>
                                <OcTable.Summary.Cell index={1}>
                                    Bamboo
                                </OcTable.Summary.Cell>
                                <OcTable.Summary.Cell index={2}>
                                    Little
                                </OcTable.Summary.Cell>
                            </OcTable.Summary.Row>
                        </OcTable.Summary>
                    )}
                />
            );

        it('fixed', () => {
            const wrapper = getSummaryTable(false);

            expect(wrapper.exists('tfoot.tableSummary')).toBeTruthy();
        });

        it('fixed bottom', () => {
            const wrapper = getSummaryTable('bottom');

            expect(wrapper.exists('tfoot.tableSummary')).toBeTruthy();
        });

        it('sticky', () => {
            const wrapper = getSummaryTable(true);

            expect(wrapper.exists('div.tableSummary')).toBeTruthy();
        });

        it('fixed top', () => {
            const wrapper = getSummaryTable('top');
            expect(
                wrapper.exists('.tableHeader tfoot.tableSummary')
            ).toBeTruthy();
        });
    });
});
