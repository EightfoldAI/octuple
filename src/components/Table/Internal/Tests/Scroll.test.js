import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import { spyElementPrototypes } from '../../../../tests/domHook';
import OcTable from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Scroll', () => {
  const data = [
    { key: 'key0', name: 'Lucy' },
    { key: 'key1', name: 'Jack' },
  ];
  const createTable = (props) => {
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

  it('renders scroll.x is true', () => {
    const wrapper = mount(createTable({ scroll: { x: 100 } }));
    expect(wrapper.find('table').props().style.width).toEqual(100);
    expect(wrapper.find('.table-content').props().style.overflow).toEqual(
      'auto'
    );
  });

  it('renders scroll.x is a number', () => {
    const wrapper = mount(createTable({ scroll: { x: 200 } }));
    expect(wrapper.find('table').props().style.width).toEqual(200);
  });

  it('renders scroll.y is a number', () => {
    const wrapper = mount(createTable({ scroll: { y: 200 } }));
    expect(wrapper.find('.table-body').props().style.maxHeight).toEqual(200);
  });

  it('renders scroll.x and scroll.y are both true', () => {
    const wrapper = mount(createTable({ scroll: { x: 200, y: 200 } }));
    expect(wrapper.find('.table-body').props().style.overflow).toEqual('auto');
  });

  it('renders with accessibility attributes when horizontally scrollable', () => {
    const wrapper = mount(createTable({ scroll: { x: 200 } }));
    const tableContainer = wrapper.find('.table-container').at(0);

    expect(tableContainer.prop('role')).toBe('region');
    expect(tableContainer.prop('tabIndex')).toBe(0);
  });

  it('does not render accessibility attributes when not horizontally scrollable', () => {
    const wrapper = mount(createTable({ scroll: { y: 200 } }));
    const tableContainer = wrapper.find('.table-container').at(0);

    expect(tableContainer.prop('role')).toBeUndefined();
    expect(tableContainer.prop('tabIndex')).toBeUndefined();
  });

  it('does not render accessibility attributes when no scroll prop', () => {
    const wrapper = mount(createTable());
    const tableContainer = wrapper.find('.table-container').at(0);

    expect(tableContainer.prop('role')).toBeUndefined();
    expect(tableContainer.prop('tabIndex')).toBeUndefined();
  });

  it('renders with accessibility attributes when scroll.x is true', () => {
    const wrapper = mount(createTable({ scroll: { x: true } }));
    const tableContainer = wrapper.find('.table-container').at(0);

    expect(tableContainer.prop('role')).toBe('region');
    expect(tableContainer.prop('tabIndex')).toBe(0);
  });

  it('renders with accessibility attributes when both scroll.x and scroll.y are set', () => {
    const wrapper = mount(createTable({ scroll: { x: 200, y: 200 } }));
    const tableContainer = wrapper.find('.table-container').at(0);

    expect(tableContainer.prop('role')).toBe('region');
    expect(tableContainer.prop('tabIndex')).toBe(0);
  });

  it('fire scroll event', () => {
    jest.useFakeTimers();
    let scrollLeft = 0;
    let scrollTop = 0;

    const setScrollLeft = jest.fn((_, val) => {
      scrollLeft = val;
    });
    const setScrollTop = jest.fn((_, val) => {
      scrollTop = val;
    });

    const domSpy = spyElementPrototypes(HTMLDivElement, {
      scrollLeft: {
        get: () => scrollLeft,
        set: setScrollLeft,
      },
      scrollTop: {
        get: () => scrollTop,
        set: setScrollTop,
      },
      scrollWidth: {
        get: () => 200,
      },
      clientWidth: {
        get: () => 100,
      },
    });

    const newColumns = [
      {
        title: 'title1',
        dataIndex: 'a',
        key: 'a',
        width: 100,
        fixed: 'left',
      },
      { title: 'title2', dataIndex: 'b', key: 'b' },
      { title: 'title3', dataIndex: 'c', key: 'c' },
      {
        title: 'title4',
        dataIndex: 'd',
        key: 'd',
        width: 100,
        fixed: 'right',
      },
    ];
    const newData = [
      { a: '123', b: 'xxxxxxxx', c: 3, d: 'hehe', key: '1' },
      { a: 'cdd', b: 'edd12221', c: 3, d: 'haha', key: '2' },
    ];
    const wrapper = mount(
      <OcTable
        columns={newColumns}
        data={newData}
        scroll={{
          x: 200,
          y: 200,
        }}
        expandableConfig={{
          expandIcon: () => <div className="expand-icon" />,
        }}
      />
    );

    jest.runAllTimers();
    // Use `onScroll` directly since simulate not support `currentTarget`
    act(() => {
      const headerDiv = wrapper.find('.table-header').instance();

      const wheelEvent = new WheelEvent('wheel');
      Object.defineProperty(wheelEvent, 'deltaX', {
        get: () => 10,
      });

      headerDiv.dispatchEvent(wheelEvent);
      jest.runAllTimers();
    });

    expect(setScrollLeft).toHaveBeenCalledWith(undefined, 10);
    setScrollLeft.mockReset();

    act(() => {
      wrapper
        .find('.table-body')
        .props()
        .onScroll({
          currentTarget: {
            scrollLeft: 33,
            scrollWidth: 200,
            clientWidth: 100,
          },
        });
    });
    expect(setScrollLeft).toHaveBeenCalledWith(undefined, 33);
    setScrollLeft.mockReset();

    domSpy.mockRestore();
    jest.useRealTimers();
  });
});
