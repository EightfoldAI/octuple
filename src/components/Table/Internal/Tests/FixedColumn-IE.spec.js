import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import { spyElementPrototype } from './utils/domHook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isStyleSupport } from '../../../../shared/utilities';
import OcTable from '../';
import { ResizeObserver } from '../../../../shared/ResizeObserver/ResizeObserver';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../../shared/utilities', () => {
    return {
        isStyleSupport: (name, val) => val !== 'sticky',
    };
});

describe('Table.FixedColumn', () => {
    let domSpy;

    beforeAll(() => {
        domSpy = spyElementPrototype(HTMLElement, 'offsetParent', {
            get: () => ({}),
        });
    });

    afterAll(() => {
        domSpy.mockRestore();
    });

    const columns = [
        {
            title: 'title1',
            dataIndex: 'a',
            key: 'a',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'title2',
            dataIndex: 'b',
            key: 'b',
            width: 100,
            fixed: 'left',
        },
        { title: 'title3', dataIndex: 'c', key: 'c' },
        { title: 'title4', dataIndex: 'b', key: 'd' },
        { title: 'title5', dataIndex: 'b', key: 'e' },
        { title: 'title6', dataIndex: 'b', key: 'f' },
        { title: 'title7', dataIndex: 'b', key: 'g' },
        { title: 'title8', dataIndex: 'b', key: 'h' },
        { title: 'title9', dataIndex: 'b', key: 'i' },
        { title: 'title10', dataIndex: 'b', key: 'j' },
        { title: 'title11', dataIndex: 'b', key: 'k' },
        {
            title: 'title12',
            dataIndex: 'b',
            key: 'l',
            width: 100,
            fixed: 'right',
        },
    ];
    const data = [{ a: '123', b: 'xxxxxxxx', d: 3, key: '1' }];

    it('not sticky', async () => {
        jest.useFakeTimers();
        const wrapper = mount(
            <OcTable
                columns={columns}
                data={data}
                scroll={{ x: 1200 }}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        act(() => {
            wrapper
                .find(ResizeObserver.Collection)
                .first()
                .props()
                .onBatchResize([
                    {
                        data: wrapper
                            .find('table ResizeObserver')
                            .first()
                            .props().data,
                        size: { width: 93, offsetWidth: 93 },
                    },
                ]);
        });

        await act(async () => {
            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        expect(wrapper.exists('.table-cell-fix-left')).toBeFalsy();
        expect(wrapper.exists('.table-cell-fix-right')).toBeFalsy();
    });
});
