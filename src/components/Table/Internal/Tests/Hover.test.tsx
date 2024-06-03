import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcTable from '..';
import type { OcTableProps } from '../OcTable.types';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Hover', () => {
  const data = [
    { key: 'key0', name: 'Lucy' },
    { key: 'key1', name: 'Jack' },
  ];
  const createTable = (props?: OcTableProps) => {
    const columns = [{ title: 'Name', dataIndex: 'name', key: 'name' }];

    return (
      <OcTable
        columns={columns}
        data={data}
        expandableConfig={{
          expandIcon: () => <div className="expand-icon" />,
        }}
        {...props}
      />
    );
  };

  it('basic', () => {
    const wrapper = mount(createTable());
    wrapper.find('tbody td').first().simulate('mouseEnter');
    expect(wrapper.exists('.table-cell-row-hover')).toBeTruthy();

    wrapper.find('tbody td').first().simulate('mouseLeave');
    expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();
  });

  it('works on shouldCellUpdate', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            shouldCellUpdate: () => false,
          },
        ],
      })
    );

    wrapper.find('tbody td').first().simulate('mouseEnter');
    expect(wrapper.exists('.table-cell-row-hover')).toBeTruthy();

    wrapper.find('tbody td').first().simulate('mouseLeave');
    expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();
  });

  it('onCell should work', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            dataIndex: 'name',
            onCell: (_, index) => {
              if (index === 0) {
                return {
                  rowSpan: 2,
                };
              }
              return { rowSpan: 0 };
            },
          },
          {
            dataIndex: 'key',
          },
        ],
      })
    );

    // Merge row check
    expect(wrapper.find('tbody td')).toHaveLength(3);

    // Hover 0-0
    wrapper.find('tbody td').at(0).simulate('mouseEnter');
    expect(wrapper.find('.table-cell-row-hover')).toHaveLength(3);

    // Hover 0-1
    wrapper.find('tbody td').at(1).simulate('mouseEnter');
    expect(wrapper.find('.table-cell-row-hover')).toHaveLength(2);

    // Mouse leave
    wrapper.find('tbody td').at(1).simulate('mouseLeave');
    expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();
  });

  describe('perf', () => {
    it('legacy mode should render every time', () => {
      let renderTimes = 0;

      const wrapper = mount(
        createTable({
          columns: [
            {
              render: () => {
                renderTimes += 1;
                return {
                  children: null,
                };
              },
            },
          ],
        })
      );

      expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();

      // Hover 0-0
      renderTimes = 0;
      wrapper.find('tbody td').at(0).simulate('mouseEnter');
      expect(wrapper.find('.table-cell-row-hover')).toHaveLength(1);
      expect(renderTimes).toBe(1);

      // Hover 0-1
      renderTimes = 0;
      wrapper.find('tbody td').at(1).simulate('mouseEnter');
      expect(wrapper.find('.table-cell-row-hover')).toHaveLength(1);
      expect(renderTimes).toBe(2);

      // Mouse leave
      renderTimes = 0;
      wrapper.find('tbody td').at(1).simulate('mouseLeave');
      expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();
      expect(renderTimes).toBe(1);
    });

    it('perf mode to save render times', () => {
      let renderTimes = 0;

      const wrapper = mount(
        createTable({
          columns: [
            {
              render: () => {
                renderTimes += 1;
                return null;
              },
            },
          ],
        })
      );

      expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();

      // Hover 0-0
      renderTimes = 0;
      wrapper.find('tbody td').at(0).simulate('mouseEnter');
      expect(wrapper.find('.table-cell-row-hover')).toHaveLength(1);
      expect(renderTimes).toBe(0);

      // Hover 0-1
      renderTimes = 0;
      wrapper.find('tbody td').at(1).simulate('mouseEnter');
      expect(wrapper.find('.table-cell-row-hover')).toHaveLength(1);
      expect(renderTimes).toBe(0);

      // Mouse leave
      renderTimes = 0;
      wrapper.find('tbody td').at(1).simulate('mouseLeave');
      expect(wrapper.exists('.table-cell-row-hover')).toBeFalsy();
      expect(renderTimes).toBe(0);
    });
  });
});
