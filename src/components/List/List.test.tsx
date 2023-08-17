import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { List, ListProps } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

interface User {
  name: string;
  summary: string;
  img: string;
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
    <div>
      <p>{item.name}</p>
      <div>{item.summary}</div>
    </div>
  ),
  header: (
    <div style={{ paddingLeft: '16px' }}>
      <h2>Header</h2>
    </div>
  ),
  classNames: 'my-list-class',
  style: {},
  itemClassNames: 'my-list-item-class',
  itemStyle: { padding: '8px 16px' },
  listType: 'ul',
  role: '',
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
    const { container, getByTestId } = render(
      <List {...listProps} layout="horizontal" />
    );
    expect(container.querySelector('.vertical')).toBeFalsy();
    expect(container).toMatchSnapshot();
  });
});
