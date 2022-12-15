import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '..';
import { render } from '../../../tests/Utilities';

Enzyme.configure({ adapter: new Adapter() });

const { Column, ColumnGroup } = Table;

describe('Table', () => {
  const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    warnSpy.mockRestore();
  });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders JSX correctly', () => {
    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
      },
    ];

    const wrapper = mount(
      <Table dataSource={data} pagination={false}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        {'invalid child'}
      </Table>
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const wrapper = mount(<Table columns={columns} />);
    const newColumns = [
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
    ];
    wrapper.setProps({ columns: newColumns });

    expect(wrapper.find('th').text()).toEqual('Title');
  });

  it('renders custom components correctly when it changes', () => {
    const BodyWrapper1 = (props) => <tbody id="wrapper1" {...props} />;
    const BodyWrapper2 = (props) => <tbody id="wrapper2" {...props} />;
    const wrapper = mount(
      <Table components={{ body: { wrapper: BodyWrapper1 } }} />
    );
    wrapper.setProps({ components: { body: { wrapper: BodyWrapper2 } } });
    expect(wrapper.find('tbody').props().id).toBe('wrapper2');
  });

  it('support onHeaderCell', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Table
        columns={[{ title: 'title', onHeaderCell: () => ({ onClick }) }]}
      />
    );
    wrapper.find('th').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not crash when column children is empty', () => {
    mount(
      <Table
        columns={[
          {
            dataIndex: 'name',
            children: undefined,
          },
        ]}
        dataSource={[]}
      />
    );
  });

  it('should not crash when dataSource is array with none-object items', () => {
    mount(
      <Table
        columns={[
          {
            title: 'name',
          },
        ]}
        dataSource={['1', 2, undefined, {}, null, true, false, 0]}
      />
    );
  });

  it('prevent touch event', () => {
    const wrapper = mount(
      <Table
        columns={[
          {
            dataIndex: 'name',
            children: undefined,
          },
        ]}
        dataSource={[]}
      />
    );
    wrapper.simulate('touchmove');
  });

  it('renders ellipsis by showTitle option', () => {
    const data = [
      {
        id: '1',
        age: 32,
      },
      {
        id: '2',
        age: 42,
      },
    ];
    const columns = [
      { title: 'id', dataKey: 'id', ellipsis: { showTitle: false } },
      { title: 'age', dataKey: 'age', ellipsis: { showTitle: false } },
    ];
    const wrapper = mount(<Table columns={columns} dataSource={data} />);
    wrapper
      .find('table-tbody')
      .find('td')
      .forEach((td) => {
        expect(td.hasClass('table-cell-ellipsis')).toBeTruthy();
      });
  });

  it('not renders ellipsis origin html title', () => {
    const data = [
      {
        id: '1',
        age: 32,
      },
      {
        id: '2',
        age: 42,
      },
    ];
    const columns = [
      { title: 'id', dataKey: 'id', ellipsis: { showTitle: true } },
      { title: 'age', dataKey: 'age', ellipsis: { showTitle: true } },
    ];
    const wrapper = mount(<Table columns={columns} dataSource={data} />);

    wrapper.find('.table-thead th').forEach((td) => {
      expect(td.getDOMNode().attributes.getNamedItem('title')).toBeTruthy();
    });

    wrapper.find('.table-tbody td').forEach((td) => {
      expect(td.getDOMNode().attributes.getNamedItem('title')).toBeFalsy();
    });
  });

  it('should support ref', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const Wrapper = () => {
      const ref = React.useRef();
      return <Table ref={ref} columns={columns} />;
    };
    render(<Wrapper />);
    expect(warnSpy).not.toBeCalled();
  });
});
