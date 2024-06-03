import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import { spyElementPrototype } from '../../../../tests/domHook';
import OcTable from '..';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Expand', () => {
  const expandedRowRender = () => <p>extra data</p>;

  const sampleColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
  ];

  const sampleData = [
    { key: 0, name: 'Lucy', age: 27 },
    { key: 1, name: 'Jack', age: 28 },
  ];

  const createTable = (props) => (
    <OcTable
      columns={sampleColumns}
      data={sampleData}
      expandableConfig={{
        expandIcon: () => <div className="expand-icon" />,
      }}
      {...props}
    />
  );

  it('renders expand row correctly', () => {
    const wrapper = mount(createTable({ expandedRowRender }));
    expect(wrapper.find('tbody tr')).toHaveLength(2);
  });

  it('pass proper parameters to expandedRowRender', () => {
    const rowRender = jest.fn(() => <div>expanded row</div>);
    const expandableProps = (props) => ({
      expandableConfig: { expandedRowRender: rowRender, ...props },
    });
    const wrapper = mount(createTable(expandableProps()));
    wrapper.setProps(expandableProps({ expandedRowKeys: [0] }));
    expect(rowRender).toHaveBeenLastCalledWith(sampleData[0], 0, 1, true);
    wrapper.setProps(expandableProps({ expandedRowKeys: [] }));
    expect(rowRender).toHaveBeenLastCalledWith(sampleData[0], 0, 1, false);
  });

  it('renders tree row correctly', () => {
    const data = [
      {
        key: 0,
        name: 'Lucy',
        age: 27,
        children: [{ key: 2, name: 'Jim', age: 1 }],
      },
      { key: 1, name: 'Jack', age: 28 },
    ];
    const wrapper = mount(
      createTable({
        data,
        expandableConfig: { defaultExpandAllRows: true },
      })
    );
    expect(wrapper.find('tbody tr')).toHaveLength(3);
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.rendertree.shot'
    );
  });

  it('renders tree row correctly with different children', () => {
    const data = [
      {
        key: 0,
        name: 'Lola',
        age: 15,
        children: [{ key: 2, name: 'Mia', age: 5 }],
      },
    ];
    const wrapper = mount(createTable({ data }));
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.rendertreechildren.shot'
    );
  });

  it('not use nest when children is invalid', () => {
    const data = [
      { key: 2, name: 'Jack', age: 28, children: null },
      { key: 4, name: 'Jack', age: 28, children: undefined },
      { key: 5, name: 'Jack', age: 28, children: false },
    ];
    const wrapper = mount(createTable({ data }));
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.nonestinvalidchildren.shot'
    );
  });

  it('childrenColumnName', () => {
    const data = [
      {
        key: 0,
        name: 'Lucy',
        age: 27,
        list: [{ key: 2, name: 'Jim', age: 1 }],
      },
      { key: 1, name: 'Jack', age: 28 },
    ];
    const wrapper = mount(
      createTable({
        data,
        expandableConfig: {
          defaultExpandAllRows: true,
          childrenColumnName: 'list',
        },
      })
    );
    expect(wrapper.find('tbody tr')).toHaveLength(3);
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.childrencolname.shot'
    );
  });

  describe('renders fixed column correctly', () => {
    let domSpy;

    beforeAll(() => {
      domSpy = spyElementPrototype(HTMLDivElement, 'offsetWidth', {
        get: () => 1128,
      });
    });

    afterAll(() => {
      domSpy.mockRestore();
    });

    it('work', () => {
      const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', fixed: true },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          fixed: 'right',
        },
      ];
      const data = [{ key: 0, name: 'Lola', age: 15, gender: 'F' }];
      const wrapper = mount(
        createTable({
          columns,
          data,
          scroll: { x: 903 },
          expandableConfig: {
            expandedRowRender,
            defaultExpandAllRows: true,
          },
        })
      );
      act(() => {
        wrapper
          .find('ResizeObserver')
          .first()
          .props()
          .onResize({ width: 1128 });
      });
      wrapper.update();
      expect(wrapper.render()).toMatchSpecificSnapshot(
        './__snapshots__/ExpandRow.renderfixedcol.shot'
      );
    });
  });

  it('work in expandable fix', () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    ];
    const data = [
      { key: 0, name: 'Lucy', age: 27, gender: 'F' },
      { key: 1, name: 'Jack', age: 28, gender: 'M' },
    ];
    const wrapper = mount(
      createTable({
        columns,
        data,
        scroll: { x: 903 },
        expandableConfig: { expandedRowRender, fixed: true },
      })
    );
    const wrapper2 = mount(
      createTable({
        columns,
        data,
        scroll: { x: 903 },
        expandableConfig: {
          expandedRowRender,
          fixed: true,
          expandIconColumnIndex: 3,
        },
      })
    );
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.expandable1.shot'
    );
    expect(wrapper2.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.expandable2.shot'
    );
  });

  it('does not crash if scroll is not set', () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    ];
    const data = [
      { key: 0, name: 'Lucy', age: 27, gender: 'F' },
      { key: 1, name: 'Jack', age: 28, gender: 'M' },
    ];
    const wrapper = mount(
      createTable({
        columns,
        data,
        scroll: {},
        expandableConfig: { expandedRowRender, fixed: true },
      })
    );
    const wrapper2 = mount(
      createTable({
        columns,
        data,
        expandableConfig: { expandedRowRender, fixed: true },
      })
    );
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.scrollunset1.shot'
    );
    expect(wrapper2.render()).toMatchSpecificSnapshot(
      './__snapshots__/ExpandRow.scrollunset2.shot'
    );
  });

  it('expandable fix not when expandIconColumnIndex', () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    ];
    const data = [
      { key: 0, name: 'Lucy', age: 27, gender: 'F' },
      { key: 1, name: 'Jack', age: 28, gender: 'M' },
    ];
    const wrapper = mount(
      createTable({
        columns,
        data,
        scroll: { x: 903 },
        expandableConfig: {
          expandedRowRender,
          fixed: 'left',
          expandIconColumnIndex: 1,
        },
      })
    );
    const wrapper2 = mount(
      createTable({
        columns,
        data,
        scroll: { x: 903 },
        expandableConfig: {
          expandedRowRender,
          fixed: 'right',
          expandIconColumnIndex: 2,
        },
      })
    );
    expect(wrapper.find('.table-has-fix-left').length).toBe(1);
    expect(wrapper2.find('.table-has-fix-right').length).toBe(0);
  });

  describe('config expand column index', () => {
    it('not show EXPAND_COLUMN if expandable is false', () => {
      const wrapper = mount(
        createTable({
          columns: [...sampleColumns, OcTable.EXPAND_COLUMN],
        })
      );

      expect(wrapper.exists('.table-row-expand-icon-cell')).toBeFalsy();
    });

    it('renders expand icon to the specify column', () => {
      const wrapper = mount(
        createTable({
          expandableConfig: {
            expandedRowRender,
            expandIconColumnIndex: 1,
          },
        })
      );
      expect(wrapper.find('.table-row-expand-icon-cell').at(1)).toBeTruthy();
    });

    it('order with EXPAND_COLUMN', () => {
      const wrapper = mount(
        createTable({
          columns: [...sampleColumns, OcTable.EXPAND_COLUMN],
          expandableConfig: {
            expandedRowRender,
          },
        })
      );

      expect(wrapper.find('.table-row-expand-icon-cell').at(2)).toBeTruthy();
    });

    it('de-duplicate of EXPAND_COLUMN', () => {
      const wrapper = mount(
        createTable({
          columns: [
            OcTable.EXPAND_COLUMN,
            ...sampleColumns,
            OcTable.EXPAND_COLUMN,
          ],
          expandableConfig: {
            expandedRowRender,
          },
        })
      );

      expect(wrapper.find('.table-row-expand-icon-cell').at(0)).toBeTruthy();
      expect(wrapper.find('tbody tr').first().find('td')).toHaveLength(3);
    });
  });

  describe('hide expandColumn', () => {
    it('should not render expand icon column when expandIconColumnIndex is negative', () => {
      const wrapper = mount(
        createTable({
          expandableConfig: {
            expandedRowRender,
            expandIconColumnIndex: -1,
          },
        })
      );
      expect(wrapper.find('.table-row-expand-icon-cell').length).toBe(0);
    });

    it('showExpandColumn = false', () => {
      const wrapper = mount(
        createTable({
          expandableConfig: {
            expandedRowRender,
            showExpandColumn: false,
          },
        })
      );
      expect(wrapper.find('.table-row-expand-icon-cell').length).toBe(0);
    });
  });

  it('renders a custom icon', () => {
    function CustomExpandIcon(props) {
      return (
        <a
          className="expand-row-icon"
          onClick={(e) => props.onExpand(props.record, e)}
        >
          <i className="some-class" />
        </a>
      );
    }
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandIcon: ({ onExpand, record }) => (
            <CustomExpandIcon onExpand={onExpand} record={record} />
          ),
        },
      })
    );
    expect(wrapper.find('.expand-row-icon').length).toBeTruthy();
  });

  it('expand all rows by default', () => {
    const wrapper = mount(
      createTable({
        expandedRowRender,
        defaultExpandAllRows: true,
      })
    );
    expect(wrapper.find('tbody tr')).toHaveLength(2);
  });

  it('expand rows by defaultExpandedRowKeys', () => {
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          defaultExpandedRowKeys: [1],
        },
      })
    );
    expect(wrapper.find('tbody tr')).toHaveLength(3);
    expect(wrapper.find('.table-expanded-row').at(2)).toBeTruthy();
  });

  it('controlled by expandedRowKeys', () => {
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandedRowKeys: [0],
        },
      })
    );
    expect(wrapper.find('tbody tr')).toHaveLength(3);
    expect(wrapper.find('.table-expanded-row').at(1)).toBeTruthy();

    wrapper.setProps({ expandedRowKeys: [1] });
    expect(wrapper.find('tbody tr')).toHaveLength(3);
    expect(wrapper.find('.table-expanded-row').at(1)).toBeTruthy();
    expect(wrapper.find('.table-expanded-row').at(3)).toBeTruthy();
  });

  it('renders expend row class correctly', () => {
    const expandedRowClassName = jest
      .fn()
      .mockReturnValue('expand-row-test-class-name');
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandedRowKeys: [0],
          expandedRowClassName,
        },
      })
    );

    expect(wrapper.find('.expand-row-test-class-name').at(1)).toBeTruthy();
  });

  it('fires expand change event', () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          onExpand,
        },
      })
    );
    wrapper.find('.table-row-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(true, sampleData[0]);

    wrapper.find('.table-row-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(false, sampleData[0]);
  });

  it('fires onExpandedRowsChange event', () => {
    const onExpandedRowsChange = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          onExpandedRowsChange,
        },
      })
    );
    wrapper.find('.table-row-expand-icon').first().simulate('click');
    expect(onExpandedRowsChange).toHaveBeenCalledWith([0]);
  });

  it('expandRowByClick', () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandRowByClick: true,
          onExpand,
        },
      })
    );
    wrapper.find('tbody tr').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(true, sampleData[0]);

    wrapper.find('tbody tr').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(false, sampleData[0]);
  });

  it('some rows should not be expandable', () => {
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          rowExpandable: ({ key }) => key === 1,
        },
      })
    );

    expect(
      wrapper.find('tbody tr').first().find('.table-row-spaced')
    ).toBeTruthy();
    expect(
      wrapper.find('tbody tr').last().find('.table-row-collapsed')
    ).toBeTruthy();
  });

  it('some rows expandability should be disabled', () => {
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          rowExpandDisabled: ({ key }) => key === 1,
        },
      })
    );

    expect(
      wrapper.find('tbody tr').first().find('.table-row-spaced')
    ).toBeTruthy();
    expect(
      wrapper.find('tbody tr').last().find('.table-row-collapsed')
    ).toBeTruthy();
    expect(
      wrapper.find('tbody tr').last().find('.table-row-expand-icon-disabled')
    ).toBeTruthy();
  });

  it('`defaultExpandAllRows` with `childrenColumnName`', () => {
    const data = [
      {
        key: 0,
        sub: [{ key: 1, sub: [{ key: 2 }] }],
      },
    ];
    const wrapper = mount(
      createTable({
        data,
        childrenColumnName: 'sub',
        expandaexpandableConfigble: { defaultExpandAllRows: true },
      })
    );
    expect(wrapper.find('tbody tr')).toHaveLength(1);
  });

  it('should be collapsible when use `expandIcon` & `expandRowByClick`', () => {
    const data = [{ key: 0, name: 'Lucy', age: 27 }];
    const onExpand = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandRowByClick: true,
          onExpand,
          expandIcon: ({ onExpand: onIconExpand, record }) => (
            <span
              className="custom-expand-icon"
              onClick={() => onIconExpand(record)}
            />
          ),
        },
        data,
      })
    );
    expect(wrapper.find('.table-expanded-row').length).toBe(0);
    wrapper.find('.custom-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(true, data[0]);
    expect(onExpand).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.table-expanded-row').length).toBe(1);
    wrapper.find('.custom-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(false, data[0]);
    expect(onExpand).toHaveBeenCalledTimes(2);
    expect(wrapper.find('.table-expanded-row').length).toBe(0);
  });

  it('should be collapsible when `expandRowByClick` without custom `expandIcon`', () => {
    const data = [{ key: 0, name: 'Lucy', age: 27 }];
    const onExpand = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandRowByClick: true,
          onExpand,
        },
        data,
      })
    );
    wrapper.find('.table-row-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(true, data[0]);
    expect(onExpand).toHaveBeenCalledTimes(1);
    wrapper.find('.table-row-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(false, data[0]);
    expect(onExpand).toHaveBeenCalledTimes(2);
  });

  it('should be collapsible when `expandRowByClick` with custom `expandIcon` and event.stopPropagation', () => {
    const data = [{ key: 0, name: 'Lucy', age: 27 }];
    const onExpand = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandRowByClick: true,
          onExpand,
          expandIcon: ({ onExpand: onIconExpand, record }) => (
            <span
              className="custom-expand-icon"
              onClick={(e) => {
                e.stopPropagation();
                onIconExpand(record);
              }}
            />
          ),
        },
        data,
      })
    );
    wrapper.find('.custom-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(true, data[0]);
    expect(onExpand).toHaveBeenCalledTimes(1);
    wrapper.find('.custom-expand-icon').first().simulate('click');
    expect(onExpand).toHaveBeenCalledWith(false, data[0]);
    expect(onExpand).toHaveBeenCalledTimes(2);
  });

  it('support invalid expandIcon', () => {
    const data = [{ key: 0, name: 'Lucy', age: 27 }];
    const onExpand = jest.fn();
    const wrapper = mount(
      createTable({
        expandableConfig: {
          expandedRowRender,
          expandRowByClick: true,
          onExpand,
          expandIcon: () => null,
        },
        data,
      })
    );
    expect(wrapper.find('.table-expanded-row').length).toBe(0);
  });

  it('warning for use `expandedRowRender` and nested table in the same time', () => {
    mount(createTable({ expandedRowRender, data: [{ children: [] }] }));
  });
});
