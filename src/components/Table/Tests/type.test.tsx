import React from 'react';
import Table from '../Table';
import type { ColumnProps } from '../index';

const { Column, ColumnGroup } = Table;

describe('Table.typescript', () => {
  it('Column', () => {
    const table = (
      <Table>
        <Column dataIndex="test" title="test" />
      </Table>
    );
    expect(table).toBeTruthy();
  });
  it('ColumnGroup', () => {
    const table = (
      <Table>
        <Column dataIndex="test" title="test" />
        <ColumnGroup>
          <Column dataIndex="test" title="test" />
        </ColumnGroup>
      </Table>
    );
    expect(table).toBeTruthy();
  });
  it('selections', () => {
    const table = (
      <Table rowSelection={{ selections: [Table.SELECTION_ALL] }} />
    );
    expect(table).toBeTruthy();
  });

  it('generic', () => {
    interface RecordType {
      key: string;
    }
    const table = <Table<RecordType> dataSource={[{ key: 'Bamboo' }]} />;
    expect(table).toBeTruthy();
  });
});

describe('Table.typescript types', () => {
  it('ColumnProps', () => {
    interface User {
      name: string;
    }

    const columns: ColumnProps<User>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
    ];

    expect(columns).toBeTruthy();
  });
});
