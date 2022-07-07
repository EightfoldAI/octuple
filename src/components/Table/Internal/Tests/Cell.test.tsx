import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcTable from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Cell', () => {
    it('shouldCellUpdate', () => {
        let reRenderTime = 0;

        const Demo = () => {
            const [, forceUpdate] = React.useState({});

            return (
                <>
                    <OcTable
                        data={[{ key: 'light' }]}
                        columns={[
                            {
                                shouldCellUpdate: (record, prevRecord) =>
                                    prevRecord.key !== record.key,
                                dataIndex: 'key',
                                render: (value) => {
                                    reRenderTime += 1;
                                    return value;
                                },
                            },
                        ]}
                        expandableConfig={{
                            expandIcon: () => <div className="expand-icon" />,
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            forceUpdate({});
                        }}
                    />
                </>
            );
        };

        const wrapper = mount(<Demo />);
        reRenderTime = 0;

        for (let i = 0; i < 100; i += 1) {
            wrapper.find('button').simulate('click');
            expect(reRenderTime).toEqual(0);
        }
    });

    it('shouldCellUpdate not block classNames', () => {
        let reRenderTime = 0;

        const getColumns = (props?: object) => [
            {
                shouldCellUpdate: (
                    record: { key: any },
                    prevRecord: { key: any }
                ) => prevRecord.key !== record.key,
                dataIndex: 'key',
                render: (value: any) => {
                    reRenderTime += 1;
                    return value;
                },
                ...props,
            },
        ];

        const wrapper = mount(
            <OcTable
                data={[{ key: 'light' }]}
                columns={getColumns()}
                expandableConfig={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        // Update className should re-render
        reRenderTime = 0;
        for (let i = 0; i < 10; i += 1) {
            wrapper.setProps({
                columns: getColumns({ classNames: 'test' }),
            });
        }

        expect(reRenderTime).toEqual(1);
    });
});
