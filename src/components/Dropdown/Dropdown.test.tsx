import React, { useRef, useState } from 'react';
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
import { Icon, IconName } from '../Icon';
import { List } from '../List';
import { Stack } from '../Stack';
import { TextInput } from '../Inputs';
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

const DropdownComponent = (): JSX.Element => {
  const [visible, setVisibility] = useState(false);

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

const ComplexDropdownComponent = (): JSX.Element => {
  const inputRef: React.MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [visible, setVisibility] = useState(false);

  return (
    <Dropdown
      {...dropdownProps}
      ariaRef={inputRef}
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
    >
      <div id="wrapper">
        <Stack direction="horizontal" flexGap="xl">
          <Icon path={IconName.mdiAccount} />
          <TextInput
            ref={inputRef}
            placeholder={'Select'}
            iconProps={{
              path: IconName.mdiChevronDown,
              rotate: visible ? 180 : 0,
            }}
            role="combobox"
            data-testid="test-input-id"
          />
        </Stack>
      </div>
    </Dropdown>
  );
};

const ExternalElementDropdownComponent = (): JSX.Element => {
  const [visible, setVisibility] = useState(false);

  return (
    <Stack direction="horizontal" flexGap="xxl">
      <DefaultButton
        alignIcon={ButtonIconAlign.Right}
        checked={visible}
        data-testid="test-external-button-id"
        onClick={() => setVisibility(!visible)}
        text={'External Control'}
        toggle
      />
      <Dropdown
        {...dropdownProps}
        visible={visible}
        onVisibleChange={(isVisible) => setVisibility(isVisible)}
      >
        <DefaultButton
          alignIcon={ButtonIconAlign.Right}
          text={'Dropdown menu test'}
          iconProps={{
            path: IconName.mdiChevronDown,
            rotate: visible ? 180 : 0,
          }}
          data-testid="test-button-id"
        />
      </Dropdown>
    </Stack>
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

  test('Should support ariaRef prop for complex dropdown references', async () => {
    const { container } = render(<ComplexDropdownComponent />);
    const dropdownAriaRef = screen.getByTestId('test-input-id');
    expect(dropdownAriaRef.getAttribute('aria-controls')).toBeTruthy();
    expect(dropdownAriaRef.getAttribute('aria-expanded')).toBe('false');
    expect(dropdownAriaRef.getAttribute('aria-haspopup')).toBe('true');
    expect(dropdownAriaRef.getAttribute('role')).toBe('combobox');
    dropdownAriaRef.click();
    await waitFor(() => screen.getByText('User profile 1'));
    const option1 = screen.getByText('User profile 1');
    expect(option1).toBeTruthy();
    expect(container.querySelector('.dropdown-wrapper')?.classList).toContain(
      'my-dropdown-class'
    );
    expect(dropdownAriaRef.getAttribute('aria-expanded')).toBe('true');
  });

  test('Should support visible prop toggle via external element', async () => {
    const { container } = render(<ExternalElementDropdownComponent />);
    const externalElement = screen.getByTestId('test-external-button-id');
    const referenceElement = screen.getByTestId('test-button-id');
    externalElement.click();
    await waitFor(() => screen.getByText('User profile 1'));
    const option1 = screen.getByText('User profile 1');
    expect(option1).toBeTruthy();
    expect(container.querySelector('.dropdown-wrapper')?.classList).toContain(
      'my-dropdown-class'
    );
    expect(referenceElement.getAttribute('aria-expanded')).toBe('true');
    externalElement.click();
    await waitFor(() =>
      expect(referenceElement.getAttribute('aria-expanded')).toBe('false')
    );
    expect(container.querySelector('.dropdown-wrapper')).toBeFalsy();
    externalElement.click();
    await waitFor(() => screen.getByText('User profile 1'));
    expect(option1).toBeTruthy();
  });
});
