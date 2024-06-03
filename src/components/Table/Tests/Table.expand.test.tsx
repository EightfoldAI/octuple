/* eslint-disable react/no-multi-comp */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../index';
import { Button, ButtonShape, ButtonVariant } from '../../Button';
import { IconName } from '../../Icon';

Enzyme.configure({ adapter: new Adapter() });

const columns = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
];

const John = {
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
};

const Jim = {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
};

const data = [
  {
    ...John,

    children: [
      {
        ...Jim,
      },
    ],
  },
];

describe('Table.expand', () => {
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

  it('click to expand', () => {
    const wrapper = mount(<Table columns={columns} dataSource={data} />);
    wrapper.find('.table-row-expand-icon').last().simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('row indent padding should be 0px when indentSize defined as 0', () => {
    const wrapper = mount(
      <Table
        indentSize={0}
        columns={columns}
        dataSource={data}
        expandableConfig={{
          expandIcon: ({
            disabled,
            expandable,
            expanded,
            onExpand,
            record,
          }: {
            disabled: boolean;
            expandable: boolean;
            expanded: boolean;
            onExpand: (record: any, e: React.MouseEvent<HTMLElement>) => void;
            record: any;
          }) => {
            return (
              <Button
                ariaLabel={expanded ? 'Collapse row' : 'Expand row'}
                classNames="expand-icon"
                disabled={disabled}
                htmlType="button"
                iconProps={{
                  path: expanded
                    ? IconName.mdiChevronUp
                    : IconName.mdiChevronDown,
                }}
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  if (disabled) {
                    return;
                  }
                  onExpand(record, e!);
                  e?.stopPropagation();
                }}
                shape={ButtonShape.Round}
                style={{
                  display: expandable ? 'flex' : 'none',
                }}
                variant={ButtonVariant.Neutral}
              />
            );
          },
        }}
      />
    );
    const button = wrapper.find('.expand-icon').at(0);
    button.simulate('click');
    expect(wrapper.find('.indent-level-1').at(0).prop('style')).toHaveProperty(
      'paddingLeft',
      '0px'
    );
  });
});
