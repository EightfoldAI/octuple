import React, { createContext, useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Avatar } from '../Avatar';
import { ConfigProvider, useConfig } from '../ConfigProvider';
import { IConfigContext } from '../ConfigProvider/ConfigProvider.types';
import { Dropdown } from '../Dropdown';
import { Icon, IconName } from '../Icon';
import { Link } from '../Link';
import { List } from '../List';
import { Navbar, NavbarContent } from './';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const ConfigContext: React.Context<Partial<IConfigContext>> = createContext<
  Partial<IConfigContext>
>({});

const sampleList: string[] = [1, 2, 3, 4, 5].map((i) => `User ${i}`);

const Overlay = () => {
  return (
    <List
      items={sampleList}
      layout="vertical"
      renderItem={(item: string) => <div style={{ margin: '8px' }}>{item}</div>}
    />
  );
};

const ProfileDropdown = () => {
  const [visible, setVisibility] = useState(false);
  return (
    <Dropdown
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
      overlay={<Overlay />}
      dropdownStyle={{ color: '#212121' }}
    >
      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          alt="random profile image"
          type="round"
        />
        <Icon path={IconName.mdiChevronDown} rotate={visible ? 180 : 0} />
      </div>
    </Dropdown>
  );
};

describe('Navbar', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByTestId } = render(
      <ConfigProvider
        themeOptions={{
          name: 'blue',
        }}
      >
        <div style={{ height: '250px' }}>
          <Navbar data-testid="test-navbar">
            <NavbarContent>
              <Link
                href="https://eightfold.ai"
                target="_blank"
                variant="default"
                style={{ padding: '8px 20px', color: 'inherit' }}
              >
                Eightfold
              </Link>
            </NavbarContent>
            <NavbarContent>
              <ProfileDropdown />
            </NavbarContent>
          </Navbar>
        </div>
      </ConfigProvider>
    );
    const navbar = getByTestId('test-navbar');
    expect(() => container).not.toThrowError();
    expect(navbar).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Navbar theme if props are provided', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider
          themeOptions={{
            name: 'nav',
            customTheme: {
              navbarTheme: {
                background: '#3E5334',
                textColor: '#EAD7A4',
                textHoverColor: '#3E5334',
                textHoverBackground: '#8FA394',
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      ),
    });
    expect(result.current.themeOptions).toEqual({
      name: 'nav',
      customTheme: {
        navbarTheme: {
          background: '#3E5334',
          textColor: '#EAD7A4',
          textHoverColor: '#3E5334',
          textHoverBackground: '#8FA394',
        },
      },
    });
  });

  test('Navbar matches custom theme', () => {
    const { container } = render(
      <ConfigProvider
        themeOptions={{
          name: 'nav',
          customTheme: {
            navbarTheme: {
              background: '#3E5334',
              textColor: '#EAD7A4',
              textHoverColor: '#3E5334',
              textHoverBackground: '#8FA394',
            },
          },
        }}
      >
        <Navbar data-testid="test-navbar">
          <NavbarContent>
            <Link
              href="https://eightfold.ai"
              target="_blank"
              variant="primary"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--navbar-text-color)',
                padding: '8px 20px',
              }}
              data-testid="test-navbar-link"
            >
              Eightfold
            </Link>
          </NavbarContent>
          <NavbarContent>
            <ProfileDropdown />
          </NavbarContent>
        </Navbar>
      </ConfigProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
