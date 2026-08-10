import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../index';

// Regression coverage for the React 19 `defaultProps` migration on `Table`
// (`forwardRef(InternalTable)`) — see `Table.tsx`. React 19 no longer
// honors `defaultProps` on `forwardRef` components, so `rowKey`'s default
// ('key') is now applied via a destructuring default inside
// `InternalTable` instead. This asserts the actual resolved `rowKey`
// behavior (via the `data-row-key` attribute Table renders per row) rather
// than merely that the component renders.
describe('Table rowKey default prop (React 19 defaultProps migration)', () => {
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

  const columns = [{ title: 'Name', dataIndex: 'name', key: 'name' }];

  it('defaults rowKey to "key" when omitted', () => {
    const dataSource = [{ key: 'row-1', name: 'Row One' }];
    const { container } = render(
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    );
    expect(container.querySelector('tr[data-row-key="row-1"]')).not.toBeNull();
  });

  it('respects an explicit rowKey (not overridden by the "key" default)', () => {
    const dataSource = [{ id: 'row-42', name: 'Row Forty-Two' }];
    const { container } = render(
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    );
    expect(container.querySelector('tr[data-row-key="row-42"]')).not.toBeNull();
  });

  it('respects a rowKey function', () => {
    const dataSource = [{ id: 'row-7', name: 'Row Seven' }];
    const { container } = render(
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={(record) => `custom-${record.id}`}
      />
    );
    expect(
      container.querySelector('tr[data-row-key="custom-row-7"]')
    ).not.toBeNull();
  });
});
