import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Pagination, PaginationLayoutOptions } from '.';
import { Button } from '../Button';
import { fireEvent, getByTestId, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Pagination', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Pagination should render normally', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        onCurrentChange={() => {}}
        pageSize={10}
        total={50}
      />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Pagination should render as dots', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        dots
        onCurrentChange={() => {}}
        pageSize={10}
        total={50}
      />
    );
    expect(container.getElementsByClassName('dots')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Pagination should render as simplified', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        layout={[
          PaginationLayoutOptions.Previous,
          PaginationLayoutOptions.Pager,
          PaginationLayoutOptions.Next,
          PaginationLayoutOptions.Simplified,
        ]}
        onCurrentChange={() => {}}
        pageSize={10}
        total={50}
      />
    );
    expect(container.getElementsByClassName('page-tracker')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Pagination with simplified Pager should not use list semantics', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        layout={[
          PaginationLayoutOptions.Previous,
          PaginationLayoutOptions.Pager,
          PaginationLayoutOptions.Next,
          PaginationLayoutOptions.Simplified,
        ]}
        onCurrentChange={() => {}}
        pageSize={10}
        total={50}
      />
    );
    expect(container.getElementsByClassName('pager')[0].tagName).toBe('DIV');
    expect(container).toMatchSnapshot();
  });

  test('Pagination should render with some elements', () => {
    const { container } = render(
      <Pagination
        currentPage={5}
        layout={[
          PaginationLayoutOptions.Previous,
          PaginationLayoutOptions.Pager,
          PaginationLayoutOptions.Next,
          PaginationLayoutOptions.Jumper,
        ]}
        onCurrentChange={() => {}}
        pageSize={100}
        total={1000}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('Pagination should render with all elements', () => {
    const { container } = render(
      <Pagination
        currentPage={4}
        layout={[
          PaginationLayoutOptions.Total,
          PaginationLayoutOptions.Sizes,
          PaginationLayoutOptions.Previous,
          PaginationLayoutOptions.Pager,
          PaginationLayoutOptions.Next,
          PaginationLayoutOptions.Jumper,
        ]}
        onCurrentChange={() => {}}
        pageSize={100}
        total={400}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('Pagination next and previous buttons should render as expected', () => {
    const PaginationTotalViaProps = (): JSX.Element => {
      const [total, setTotal] = useState(0);
      return (
        <>
          <Button
            data-testid="valueButton"
            onClick={() => {
              setTotal(12);
            }}
            text="Set Value"
          />
          <Pagination
            classNames="my-pagination-class"
            currentPage={1}
            onCurrentChange={() => {}}
            pageSize={10}
            total={total}
          />
        </>
      );
    };
    const { container } = render(<PaginationTotalViaProps />);
    const valueButton: HTMLElement = getByTestId(container, 'valueButton');
    expect(container.getElementsByClassName('pager')).toHaveLength(0);
    fireEvent.click(valueButton);
    expect(container.getElementsByClassName('pager')).toHaveLength(1);
    expect(
      container
        .getElementsByClassName('pagination-previous')[0]
        .hasAttribute('disabled')
    ).toBe(true);
    expect(
      container
        .getElementsByClassName('pagination-next')[0]
        .hasAttribute('disabled')
    ).toBe(false);
    fireEvent.click(container.getElementsByClassName('pagination-next')[0]);
    expect(
      container
        .getElementsByClassName('pagination-previous')[0]
        .hasAttribute('disabled')
    ).toBe(false);
    expect(
      container
        .getElementsByClassName('pagination-next')[0]
        .hasAttribute('disabled')
    ).toBe(true);
  });
});
