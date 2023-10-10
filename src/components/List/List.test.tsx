import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { List, ListProps } from './';
import { render, queryByAttribute } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

interface User {
  name: string;
  summary: string;
  img: string;
  id?: number;
}

const sampleList: User[] = [1, 2, 3, 4, 5].map((i) => ({
  name: `User ${i}`,
  summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  img: '',
}));

const listProps: ListProps<User> = {
  items: sampleList,
  footer: (
    <div style={{ paddingLeft: '16px' }}>
      <h3>Footer</h3>
    </div>
  ),
  layout: 'vertical',
  renderItem: (item: User) => (
    <div id={`${item.id}`}>
      <p>{item.name}</p>
      <div>{item.summary}</div>
    </div>
  ),
  header: (
    <div style={{ paddingLeft: '16px' }}>
      <h2>Header</h2>
    </div>
  ),
  classNames: 'my-ref-class',
  style: {},
  itemClassNames: 'my-list-item-class',
  itemStyle: { padding: '8px 16px' },
  listClassNames: 'my-list-class',
  listType: 'ul',
  role: 'list',
  'data-testid': 'test-list',
};

describe('List', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByTestId } = render(<List {...listProps} />);
    const list = getByTestId('test-list');
    expect(() => container).not.toThrowError();
    expect(list).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('List is horizontal', () => {
    const { container } = render(<List {...listProps} layout="horizontal" />);
    expect(container.querySelector('.vertical')).toBeFalsy();
    expect(container).toMatchSnapshot();
  });

  test('List uses custom props', () => {
    const { container } = render(<List {...listProps} layout="horizontal" />);
    expect(container.querySelector('.my-list-class').getAttribute('role')).toBe(
      'list'
    );
    expect(container.querySelector('.my-ref-class')).toBeTruthy();
    expect(container.querySelector('.my-list-class')).toBeTruthy();
    expect(container.querySelector('.my-list-item-class')).toBeTruthy();
  });

  test('Should call rowKey function and return a Key', () => {
    const mockRowKey = jest.fn((item) => item.id);
    const testItem: User = { id: 123, img: '', name: 'Test', summary: 'test' };
    const { container } = render(
      <List {...listProps} rowKey={mockRowKey} items={[testItem]} />
    );
    const getById = queryByAttribute.bind(null, 'id');
    expect(mockRowKey).toHaveBeenCalledWith(testItem);
    expect(getById(container, `${testItem.id}`)).toBeTruthy();
  });
});
