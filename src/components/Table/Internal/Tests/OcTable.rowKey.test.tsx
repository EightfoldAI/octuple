import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OcTable from '..';

// Regression coverage for the React 19 `defaultProps` migration on
// `OcTable` (a plain function component) — see `OcTable.tsx`. Both of
// `OcTable`'s previous defaults (`rowKey: 'key'` and
// `emptyText: () => 'No data found'`) are now applied via destructuring
// defaults rather than `OcTable.defaultProps`.
describe('OcTable rowKey default prop (React 19 defaultProps migration)', () => {
  const columns = [{ title: 'Name', dataIndex: 'name', key: 'name' }];

  it('defaults rowKey to "key" when omitted', () => {
    const data = [{ key: 'row-1', name: 'Row One' }];
    const { container } = render(
      <OcTable data={data} columns={columns} expandableConfig={{}} />
    );
    expect(container.querySelector('tr[data-row-key="row-1"]')).not.toBeNull();
  });

  it('respects an explicit rowKey (not overridden by the "key" default)', () => {
    const data = [{ id: 'row-42', name: 'Row Forty-Two' }];
    const { container } = render(
      <OcTable
        data={data}
        columns={columns}
        rowKey="id"
        expandableConfig={{}}
      />
    );
    expect(container.querySelector('tr[data-row-key="row-42"]')).not.toBeNull();
  });

  it('defaults emptyText to "No data found" when omitted and there is no data', () => {
    const { container } = render(
      <OcTable data={[]} columns={columns} expandableConfig={{}} />
    );
    expect(container.textContent).toContain('No data found');
  });

  it('respects an explicit emptyText (not overridden by the default)', () => {
    const { container } = render(
      <OcTable
        data={[]}
        columns={columns}
        expandableConfig={{}}
        emptyText={() => 'Nothing here'}
      />
    );
    expect(container.textContent).toContain('Nothing here');
    expect(container.textContent).not.toContain('No data found');
  });
});
