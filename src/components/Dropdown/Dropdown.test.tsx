import React, { useEffect, useRef, useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Dropdown } from './';
import {
  Button,
  ButtonIconAlign,
  ButtonTextAlign,
  ButtonWidth,
} from '../Button';
import { Icon, IconName } from '../Icon';
import { List } from '../List';
import { Stack } from '../Stack';
import { TextInput } from '../Inputs';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

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
      <Button
        text={item.name}
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        data-testid={item.name}
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
      <Button
        alignIcon={ButtonIconAlign.Right}
        text={'Dropdown menu test'}
        iconProps={{
          path: IconName.mdiChevronDown,
          rotate: visible ? 180 : 0,
        }}
        id="test-button-id"
        data-testid="dropdown-reference"
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
      <Button
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
        <Button
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

const filterOverlay1 = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <Button
        text={'Filter 1' + ' ' + item.name}
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

const filterOverlay2 = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <Button
        text={'Filter 2' + ' ' + item.name}
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

const filterOverlay3 = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <Button
        text={'Filter 3' + ' ' + item.name}
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

const AdvancedVisibilityToggleDropdownComponent = (): JSX.Element => {
  const [visibleQuickFilter, setVisibleQuickFilter] = useState<{
    [x: string]: boolean;
  }>({});
  const [filterOneVisible, setFilterOneVisibility] = useState(false);
  const [filterTwoVisible, setFilterTwoVisibility] = useState(false);
  const [filterThreeVisible, setFilterThreeVisibility] = useState(false);
  const [filterThreeText, setFilterThreeText] = useState('Filter three closed');

  const toggleQuickFilterVisibility = ({
    key,
    value,
  }: {
    key: string;
    value: boolean;
  }) => {
    setVisibleQuickFilter({ [key]: value });
  };

  useEffect(() => {
    if ((visibleQuickFilter as any)?.['filter one']) {
      setFilterOneVisibility(true);
      setFilterTwoVisibility(false);
      setFilterThreeVisibility(false);
    } else if ((visibleQuickFilter as any)?.['filter two']) {
      setFilterOneVisibility(false);
      setFilterTwoVisibility(true);
      setFilterThreeVisibility(false);
    } else if ((visibleQuickFilter as any)?.['filter three']) {
      setFilterOneVisibility(false);
      setFilterTwoVisibility(false);
      setFilterThreeVisibility(true);
    }

    setFilterThreeText(
      (visibleQuickFilter as any)?.['filter three']
        ? 'Filter three open'
        : 'Filter three closed'
    );
  }, [
    filterOneVisible,
    filterTwoVisible,
    filterThreeVisible,
    visibleQuickFilter,
  ]);

  return (
    <Stack direction="horizontal" flexGap="l">
      <Dropdown
        {...dropdownProps}
        closeOnDropdownClick={false}
        closeOnOutsideClick={false}
        dropdownClassNames={'my-dropdown-class-1'}
        onVisibleChange={(visible: boolean) => {
          toggleQuickFilterVisibility({
            key: 'filter one',
            value: visible,
          });
        }}
        overlay={filterOverlay1()}
        visible={filterOneVisible}
      >
        <Button
          alignIcon={ButtonIconAlign.Right}
          data-testid="test-button-one-id"
          text={'Filter one'}
          iconProps={{
            path: IconName.mdiChevronDown,
          }}
        />
      </Dropdown>
      <Dropdown
        {...dropdownProps}
        closeOnDropdownClick={false}
        closeOnOutsideClick={false}
        dropdownClassNames={'my-dropdown-class-2'}
        onVisibleChange={(visible: boolean) => {
          toggleQuickFilterVisibility({
            key: 'filter two',
            value: visible,
          });
        }}
        overlay={filterOverlay2()}
        visible={filterTwoVisible}
      >
        <Button
          alignIcon={ButtonIconAlign.Right}
          data-testid="test-button-two-id"
          text={'Filter two'}
          iconProps={{
            path: IconName.mdiChevronDown,
          }}
        />
      </Dropdown>
      <Dropdown
        {...dropdownProps}
        closeOnDropdownClick={false}
        closeOnOutsideClick={false}
        dropdownClassNames={'my-dropdown-class-3'}
        onVisibleChange={(visible: boolean) => {
          toggleQuickFilterVisibility({
            key: 'filter three',
            value: visible,
          });
        }}
        overlay={filterOverlay3()}
        visible={filterThreeVisible}
      >
        <Button
          alignIcon={ButtonIconAlign.Right}
          data-testid="test-button-three-id"
          text={filterThreeText}
          iconProps={{
            path: IconName.mdiChevronDown,
          }}
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
    expect(dropdownAriaRef.getAttribute('aria-haspopup')).toBeNull();
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

  test('Should support visible prop toggle via advanced implementation', async () => {
    const { container } = render(<AdvancedVisibilityToggleDropdownComponent />);
    const filterOneReferenceElement = screen.getByTestId('test-button-one-id');
    const filterTwoReferenceElement = screen.getByTestId('test-button-two-id');
    const filterThreeReferenceElement = screen.getByTestId(
      'test-button-three-id'
    );
    filterOneReferenceElement.click();
    await waitFor(() => screen.getByText('Filter 1 User profile 1'));
    const filterOneOption = screen.getByText('Filter 1 User profile 1');
    expect(filterOneOption).toBeTruthy();
    expect(container.querySelector('.dropdown-wrapper')?.classList).toContain(
      'my-dropdown-class-1'
    );
    expect(filterOneReferenceElement.getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(filterTwoReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    expect(filterThreeReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    filterTwoReferenceElement.click();
    await waitFor(() => screen.getByText('Filter 2 User profile 1'));
    const filterTwoOption = screen.getByText('Filter 2 User profile 1');
    expect(filterTwoOption).toBeTruthy();
    expect(container.querySelector('.dropdown-wrapper')?.classList).toContain(
      'my-dropdown-class-2'
    );
    expect(filterTwoReferenceElement.getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(filterOneReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    expect(filterThreeReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    filterThreeReferenceElement.click();
    await waitFor(() => screen.getByText('Filter 3 User profile 1'));
    const filterThreeOption = screen.getByText('Filter 3 User profile 1');
    expect(filterThreeOption).toBeTruthy();
    expect(container.querySelector('.dropdown-wrapper')?.classList).toContain(
      'my-dropdown-class-3'
    );
    expect(filterThreeReferenceElement.getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(filterOneReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    expect(filterTwoReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    filterThreeReferenceElement.click();
    await waitFor(() => screen.getByText('Filter three closed'));
    await waitFor(
      () =>
        filterThreeReferenceElement.getAttribute('aria-expanded') === 'false'
    );
    expect(filterOneReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
    expect(filterTwoReferenceElement.getAttribute('aria-expanded')).toBe(
      'false'
    );
  });

  test('Handles reference element arrow key events correctly', async () => {
    const mockEventKeys = {
      ARROWDOWN: 'ArrowDown',
      ARROWUP: 'ArrowUp',
    };
    const { container, getByTestId } = render(<DropdownComponent />);
    const referenceElement = getByTestId('dropdown-reference');
    act(() => {
      userEvent.type(referenceElement, mockEventKeys.ARROWDOWN);
    });
    await waitFor(() => screen.getByText('User profile 1'));
    const option1 = screen.getByText('User profile 1');
    expect(option1).toBeTruthy();
    act(() => {
      userEvent.type(referenceElement, mockEventKeys.ARROWUP);
    });
    await waitFor(() =>
      expect(referenceElement.getAttribute('aria-expanded')).toBe('false')
    );
    expect(container.querySelector('.dropdown-wrapper')).toBeFalsy();
  });

  test('Focuses the first focusable element when visible', async () => {
    const { getByTestId } = render(<DropdownComponent />);
    const referenceElement = getByTestId('dropdown-reference');
    act(() => {
      userEvent.click(referenceElement);
    });
    await waitFor(() => screen.getByTestId('User profile 1'));
    await waitFor(() =>
      expect(screen.getByTestId('User profile 1').matches(':focus')).toBe(true)
    );
    expect(screen.getByTestId('User profile 1').matches(':focus')).toBe(true);
  });

  test('Focuses the reference element when not visible', async () => {
    const mockEventKeys = {
      ESCAPE: 'Escape',
    };
    const { container, getByTestId } = render(<DropdownComponent />);
    const referenceElement = getByTestId('dropdown-reference');
    act(() => {
      userEvent.click(referenceElement);
    });
    await waitFor(() => screen.getByText('User profile 1'));
    const option1 = screen.getByText('User profile 1');
    act(() => {
      userEvent.type(option1, mockEventKeys.ESCAPE);
    });
    await waitFor(() =>
      expect(referenceElement.getAttribute('aria-expanded')).toBe('false')
    );
    expect(container.querySelector('.dropdown-wrapper')).toBeFalsy();
    expect(referenceElement).toHaveFocus();
  });

  test('Allows tabbing into submenu after click', async () => {
    const mockEventKeys = {
      TAB: 'Tab',
    };
    const { getByTestId } = render(<DropdownComponent />);
    const referenceElement = getByTestId('dropdown-reference');

    // Click to open dropdown
    act(() => {
      userEvent.click(referenceElement);
    });

    // Wait for menu to be visible
    await waitFor(() => screen.getByText('User profile 1'));

    // Verify first menu item is focused
    await waitFor(() =>
      expect(screen.getByTestId('User profile 1').matches(':focus')).toBe(true)
    );

    // Tab to second menu item
    act(() => {
      userEvent.type(referenceElement, mockEventKeys.TAB);
    });

    // Verify dropdown remains open
    expect(referenceElement.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('User profile 1')).toBeVisible();
  });

  // Verify that overlay container is not focusable by default
  test('Overlay container is not focusable by default', async () => {
    const { getByTestId } = render(<DropdownComponent />);
    const referenceElement = getByTestId('dropdown-reference');

    // Click to open dropdown
    act(() => {
      userEvent.click(referenceElement);
    });

    // Wait for menu to be visible
    await waitFor(() => screen.getByText('User profile 1'));

    const dropdownWrapper = document.querySelector(
      '.dropdown-wrapper'
    ) as HTMLElement;

    expect(dropdownWrapper.getAttribute('tabindex')).toBe('-1');
  });
});
