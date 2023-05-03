import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Dropdown } from './';
import {
  ButtonIconAlign,
  ButtonTextAlign,
  ButtonWidth,
  DefaultButton,
} from '../Button';
import { IconName } from '../Icon';
import { List } from '../List';
import { render, screen, waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

interface User {
  name: string;
  icon: IconName;
}

const sampleList: User[] = [1, 2, 3].map((i) => ({
  name: `User profile ${i}`,
  icon: IconName.mdiAccount,
}));

const Overlay = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <DefaultButton
        text={item.name}
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        iconProps={{
          path: item.icon,
        }}
        style={{
          margin: '4px 0',
        }}
      />
    )}
  />
);

const DropdownComponent = (): JSX.Element => {
  const [visible, setVisibility] = useState(false);

  const dropdownProps: object = {
    trigger: 'click',
    classNames: 'my-dropdown-class',
    style: {},
    dropdownClassNames: 'my-dropdown-class',
    dropdownStyle: {
      color: 'red',
    },
    placement: 'bottom-start',
    overlay: Overlay(),
    offset: 0,
    positionStrategy: 'absolute',
    disabled: false,
    closeOnDropdownClick: true,
    portal: false,
  };

  return (
    <Dropdown
      {...dropdownProps}
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
    >
      <DefaultButton
        alignIcon={ButtonIconAlign.Right}
        text={'Dropdown menu test'}
        iconProps={{
          path: IconName.mdiChevronDown,
          rotate: visible ? 180 : 0,
        }}
        id="test-button-id"
      />
    </Dropdown>
  );
};

describe('Dropdown', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Should render a dropdown button', () => {
    const { container } = render(<DropdownComponent />);
    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).toBeTruthy();
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Should show the dropdown options when the button is clicked', async () => {
    render(<DropdownComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('User profile 1'));
    const option1 = screen.getByText('User profile 1');
    const option2 = screen.getByText('User profile 2');
    const option3 = screen.getByText('User profile 3');
    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
    expect(option3).toBeTruthy();
  });

  test('Should support props such as dropdownClassNames and dropdownStyle', async () => {
    const { container } = render(<DropdownComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('User profile 1'));
    expect(container.querySelector('.dropdown-wrapper')?.classList).toContain(
      'my-dropdown-class'
    );
    expect(
      (container.querySelector('.dropdown-wrapper') as HTMLElement).style.color
    ).toContain('red');
  });

  test('Should support cloned element id from its props', async () => {
    render(<DropdownComponent />);
    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton.id).toBe('test-button-id');
  });
});
