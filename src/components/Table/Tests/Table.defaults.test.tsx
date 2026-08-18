import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Table from '../index';
import OcTable from '../Internal';

let matchMedia: MatchMediaMock;

describe('Table defaults without defaultProps', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('defaults rowKey to "key" when not provided', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={[{ key: 'row-a', name: 'A' }]}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        rowSelection={{ onChange }}
      />
    );
    const checkbox = container.querySelector('tbody input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    fireEvent.click(checkbox);
    expect(onChange.mock.calls[0][0]).toEqual(['row-a']);
  });

  it('OcTable defaults emptyText to "No data found"', () => {
    const { getByText } = render(
      <OcTable
        data={[]}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        expandableConfig={{}}
      />
    );
    expect(getByText('No data found')).toBeTruthy();
  });

  it('exposes no function-component defaultProps anymore', () => {
    expect((Table as any).defaultProps).toBeUndefined();
    expect((OcTable as any).defaultProps).toBeUndefined();
  });
});
