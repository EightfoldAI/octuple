import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Link } from '../Link';
import { List, ListProps } from './';
import { fireEvent, render, queryByAttribute } from '@testing-library/react';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

interface User {
  name: string;
  id?: string;
}

const sampleList: User[] = [1, 2, 3, 4, 5].map((i) => ({
  name: `User ${i}`,
  id: `User${i}`,
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
    <Link href="#" id={`${item.id}`} data-testid={`${item.id}`}>
      {item.name}
    </Link>
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
    const testItem: User = { id: '123', name: 'Test' };
    const { container } = render(
      <List {...listProps} rowKey={mockRowKey} items={[testItem]} />
    );
    const getById = queryByAttribute.bind(null, 'id');
    expect(mockRowKey).toHaveBeenCalledWith(testItem);
    expect(getById(container, `${testItem.id}`)).toBeTruthy();
  });

  test('handleItemKeyDown should update activeIndex correctly for vertical layout', () => {
    const { getByTestId } = render(<List {...listProps} layout="vertical" />);
    const item1 = getByTestId('User1');
    const item2 = getByTestId('User2');
    const item3 = getByTestId('User3');
    item1.focus();
    expect(item1).toHaveFocus();
    fireEvent.keyDown(item1, { key: 'ArrowDown' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowDown' });
    expect(item3).toHaveFocus();
    fireEvent.keyDown(item3, { key: 'ArrowUp' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowUp' });
    expect(item1).toHaveFocus();
  });

  test('handleItemKeyDown should update activeIndex correctly for end and home keys', () => {
    const { getByTestId } = render(<List {...listProps} layout="vertical" />);
    const item1 = getByTestId('User1');
    const item2 = getByTestId('User2');
    const item3 = getByTestId('User3');
    const item5 = getByTestId('User5');
    item1.focus();
    expect(item1).toHaveFocus();
    fireEvent.keyDown(item1, { key: 'ArrowDown' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowDown' });
    expect(item3).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'Home' });
    expect(item1).toHaveFocus();
    fireEvent.keyDown(item1, { key: 'ArrowDown' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item3, { key: 'End' });
    expect(item5).toHaveFocus();
  });

  test('handleItemKeyDown should update activeIndex correctly for horizontal layout', () => {
    const { getByTestId } = render(<List {...listProps} layout="horizontal" />);
    const item1 = getByTestId('User1');
    const item2 = getByTestId('User2');
    const item3 = getByTestId('User3');
    item1.focus();
    expect(item1).toHaveFocus();
    fireEvent.keyDown(item1, { key: 'ArrowRight' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowRight' });
    expect(item3).toHaveFocus();
    fireEvent.keyDown(item3, { key: 'ArrowLeft' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowLeft' });
    expect(item1).toHaveFocus();
  });

  test('handleItemKeyDown should update activeIndex correctly for horizontal layout in rtl canvas', () => {
    document.documentElement.dir = 'rtl';
    const { getByTestId } = render(<List {...listProps} layout="horizontal" />);
    const item1 = getByTestId('User1');
    const item2 = getByTestId('User2');
    const item3 = getByTestId('User3');
    item1.focus();
    expect(item1).toHaveFocus();
    fireEvent.keyDown(item1, { key: 'ArrowLeft' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowLeft' });
    expect(item3).toHaveFocus();
    fireEvent.keyDown(item3, { key: 'ArrowRight' });
    expect(item2).toHaveFocus();
    fireEvent.keyDown(item2, { key: 'ArrowRight' });
    expect(item1).toHaveFocus();
  });

  test('handleItemKeyDown should not update activeIndex if disableKeys is true', () => {
    const { getByTestId } = render(
      <List {...listProps} disableKeys layout="horizontal" />
    );
    const item1 = getByTestId('User1');
    const item2 = getByTestId('User2');
    item1.focus();
    expect(item1).toHaveFocus();
    fireEvent.keyDown(item1, { key: 'ArrowRight' });
    expect(item2).not.toHaveFocus();
    expect(item1).toHaveFocus();
  });
});
