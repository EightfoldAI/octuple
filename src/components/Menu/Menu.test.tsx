import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MenuItemType } from './MenuItem/MenuItem.types';
import { MenuSize, MenuVariant } from './Menu.types';
import { Menu } from './Menu';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import { IconName } from '../Icon';
import { RadioGroup } from '../RadioButton';
import { SelectorSize } from '../CheckBox';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const MenuOverlay = (args: any) => {
  const menuSizeToSelectorSizeSizeMap = new Map<MenuSize, SelectorSize>([
    [MenuSize.large, SelectorSize.Large],
    [MenuSize.medium, SelectorSize.Medium],
    [MenuSize.small, SelectorSize.Small],
  ]);

  return (
    <Menu
      {...args}
      items={[
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'menu 1',
          counter: '8',
        },
        {
          text: 'Disabled button',
          value: 'menu 2',
          disabled: true,
        },
        {
          type: MenuItemType.subHeader,
          text: 'Sub header',
        },
        {
          type: MenuItemType.link,
          text: 'X link',
          href: 'https://x.com',
          target: '_blank',
        },
        {
          type: MenuItemType.custom,
          render: ({ onChange, ...rest }) => (
            <RadioGroup
              {...rest}
              {...{
                ariaLabel: 'Radio Group',
                value: 'Radio1',
                items: [1, 2, 3].map((i) => ({
                  value: `Radio${i}`,
                  label: `Radio${i}`,
                  name: 'group',
                  id: `oea2exk-${i}`,
                })),
                layout: 'vertical',
              }}
              onChange={onChange}
              size={menuSizeToSelectorSizeSizeMap.get(args.size)}
            />
          ),
        },
      ]}
      onChange={(item) => {
        args.onChange(item);
      }}
    />
  );
};

const menuProps: object = {
  variant: MenuVariant.neutral,
  classNames: 'my-menu-class',
  style: {
    color: 'red',
  },
  itemClassNames: 'my-menu-item-class',
  itemStyle: {},
  listType: 'ul',
};

const MenuComponent = (): JSX.Element => {
  return (
    <Dropdown overlay={MenuOverlay(menuProps)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  );
};

const LargeMenuComponent = (): JSX.Element => {
  const _menuProps: object = {
    ...menuProps,
    size: MenuSize.large,
  };

  return (
    <Dropdown overlay={MenuOverlay(_menuProps)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  );
};

const MediumMenuComponent = (): JSX.Element => {
  const _menuProps: object = {
    ...menuProps,
    size: MenuSize.medium,
  };

  return (
    <Dropdown overlay={MenuOverlay(_menuProps)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  );
};

const SmallMenuComponent = (): JSX.Element => {
  const _menuProps: object = {
    ...menuProps,
    size: MenuSize.small,
  };

  return (
    <Dropdown overlay={MenuOverlay(_menuProps)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  );
};

const ListboxMenuComponent = (): JSX.Element => {
  const _menuProps: object = {
    ...menuProps,
    role: 'listbox',
    itemProps: {
      role: 'option',
    },
  };

  return (
    <Dropdown overlay={MenuOverlay(_menuProps)}>
      <Button text="Menu dropdown" />
    </Dropdown>
  );
};

describe('Menu', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Should render a menu button', () => {
    const { container } = render(<MenuComponent />);
    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).toBeTruthy();
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Should show the menu items when the button is clicked', async () => {
    render(<MenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Date'));
    const menuitem1 = screen.getByText('Date');
    const menuitem2 = screen.getByText('Disabled button');
    const menuitem3 = screen.getByText('X link');
    const menuitem4 = screen.getByText('Radio1');
    const menuitem5 = screen.getByText('Radio2');
    const menuitem6 = screen.getByText('Radio3');
    expect(menuitem1).toBeTruthy();
    expect(menuitem2).toBeTruthy();
    expect(menuitem3).toBeTruthy();
    expect(menuitem4).toBeTruthy();
    expect(menuitem5).toBeTruthy();
    expect(menuitem6).toBeTruthy();
  });

  test('Should support sub header', async () => {
    render(<MenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Sub header'));
    const subHeader = screen.getByText('Sub header');
    expect(subHeader).toBeTruthy();
  });

  test('Should support props such as classNames and style', async () => {
    const { container } = render(<MenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Date'));
    expect(container.querySelector('.menu-container')?.classList).toContain(
      'my-menu-class'
    );
    expect(
      (container.querySelector('.menu-container') as HTMLElement).style.color
    ).toContain('red');
  });

  test('Should support passing itemProps to menu items', async () => {
    render(<ListboxMenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Date'));
    const item = screen.getByRole('option', { name: /Date/ });
    expect(item).toBeTruthy();
  });

  test('Menu is large', async () => {
    const { container } = render(<LargeMenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Date'));
    expect(container.querySelector('.menu-container')?.classList).toContain(
      'large'
    );
    expect(container).toMatchSnapshot();
  });

  test('Menu is medium', async () => {
    const { container } = render(<MediumMenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Date'));
    expect(container.querySelector('.menu-container')?.classList).toContain(
      'medium'
    );
    expect(container).toMatchSnapshot();
  });

  test('Menu is small', async () => {
    const { container } = render(<SmallMenuComponent />);
    const dropdownButton = screen.getByRole('button');
    dropdownButton.click();
    await waitFor(() => screen.getByText('Date'));
    expect(container.querySelector('.menu-container')?.classList).toContain(
      'small'
    );
    expect(container).toMatchSnapshot();
  });

  test('Menu onChange event is triggered when item is clicked', () => {
    const handleChange = jest.fn();

    const { getByText } = render(
      <Menu
        onChange={handleChange}
        items={[
          {
            iconProps: {
              path: IconName.mdiCalendar,
            },
            text: 'Date',
            value: 'menu 0',
            counter: '8',
            secondaryButtonProps: {
              iconProps: {
                path: IconName.mdiTrashCan,
              },
              onClick: () => {
                console.log('Delete clicked');
              },
            },
          },
        ]}
      />
    );

    fireEvent.click(getByText('Date'));

    expect(handleChange).toHaveBeenCalled();
  });

  test('secondaryButtonProps onClick event is triggered when secondary button is clicked', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      <Menu
        items={[
          {
            iconProps: {
              path: IconName.mdiCalendar,
            },
            text: 'Date',
            value: 'menu 0',
            counter: '8',
            secondaryButtonProps: {
              iconProps: {
                path: IconName.mdiTrashCan,
              },
              onClick: handleClick,
            },
          },
        ]}
      />
    );

    fireEvent.click(getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('Menu onChange passes the event object to the handler', () => {
    let capturedEvent: React.MouseEvent | undefined;

    const menuChangeHandler = jest.fn((_item, e) => {
      capturedEvent = e;
    });

    const { getByText } = render(
      <Menu
        onChange={menuChangeHandler}
        items={[
          {
            text: 'Click me',
            value: 'menu-item',
          },
        ]}
      />
    );

    fireEvent.click(getByText('Click me'));

    expect(menuChangeHandler).toHaveBeenCalled();
    expect(capturedEvent).toBeDefined();
    expect(typeof capturedEvent?.stopPropagation).toBe('function');
  });

  test('Menu onChange provides event parameter that can be used to stop propagation', () => {
    const parentClickHandler = jest.fn();
    const menuChangeHandler = jest.fn((_item, e) => {
      e.stopPropagation();
      e.stopPropagation();
    });

    const { getByText } = render(
      <div onClick={parentClickHandler}>
        <Menu
          onChange={menuChangeHandler}
          items={[
            {
              text: 'Click me',
              value: 'menu-item',
            },
          ]}
        />
      </div>
    );

    fireEvent.click(getByText('Click me'));

    expect(menuChangeHandler).toHaveBeenCalled();
    expect(parentClickHandler).not.toHaveBeenCalled();
  });

  test('Menu onChange event bubbles to parent when stopPropagation is not called', () => {
    const parentClickHandler = jest.fn();
    const menuChangeHandler = jest.fn();

    const { getByText } = render(
      <div onClick={parentClickHandler}>
        <Menu
          onChange={menuChangeHandler}
          items={[
            {
              text: 'Click me',
              value: 'menu-item',
            },
          ]}
        />
      </div>
    );

    fireEvent.click(getByText('Click me'));

    expect(menuChangeHandler).toHaveBeenCalled();
    expect(parentClickHandler).toHaveBeenCalled();
  });
});
