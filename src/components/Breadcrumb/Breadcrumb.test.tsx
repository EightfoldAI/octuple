import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Breadcrumb } from './';
import { IconName } from '../Icon';
import { Link } from '../Link';
import { render, screen } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

const myLinks = [
  {
    title: 'Home',
    url: '#',
  },
  {
    title: 'Page 1',
    url: '#',
  },
  {
    title: 'Page 2',
    url: '#',
  },
  {
    title: 'Page 3',
    url: '#',
  },
  {
    title: 'Page 4',
    url: '#',
  },
  {
    title: 'Page 5',
    url: '#',
  },
  {
    title: 'Page 6',
    url: '#',
  },
];

const breadcrumbArgs = {
  ariaLabel: 'Breadcrumbs',
  classNames: 'my-breadcrumb-root-class',
  'data-testid': 'my-breadcrumb-testid',
  divider: {
    path: IconName.mdiChevronRight,
    ariaHidden: true,
    classNames: 'my-breadcrumb-icon',
    id: 'myBreadcrumbIcon',
    role: 'presentation',
    rotate: 0,
    spin: false,
    vertical: false,
    'data-testid': 'myBreadcrumbIconTestId',
  },
  id: 'myBreadcrumb',
  links: myLinks,
  linkClassNames: 'my-breadcrumb-links-class',
  maxDisplayedLinks: 3,
  overflowAriaLabel: 'More links',
  style: {},
};

describe('Breadcrumb', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container } = render(<Breadcrumb {...breadcrumbArgs} />);
    expect(() => container).not.toThrowError();
    expect(container.querySelector('.breadcrumb')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should accept undefined links', () => {
    const { asFragment } = render(
      <Breadcrumb {...breadcrumbArgs} links={undefined!} />
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  test('should support custom attribute', () => {
    const { asFragment } = render(
      (
        <Breadcrumb
          {...breadcrumbArgs}
          links={[
            {
              title: 'xxx',
              // @ts-ignore
              'data-custom': 'custom-item',
            },
            {
              title: 'yyy',
            },
          ]}
          data-custom="custom"
        />
      ) as React.ReactElement<any, string | React.JSXElementConstructor<any>>
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  test('Crumb should support string `0`', () => {
    const { container } = render(
      <Breadcrumb
        {...breadcrumbArgs}
        links={[
          {
            title: '0',
          },
        ]}
      />
    );
    expect(container.querySelectorAll('.breadcrumb-link')[0].textContent).toBe(
      '0'
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Crumb should use `onClick`', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <Breadcrumb {...breadcrumbArgs} links={[{ title: 'test', onClick }]} />
    );
    const crumb = await screen.findByText('test');
    crumb.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Crumb should use `classNames`', async () => {
    const { container } = render(
      <Breadcrumb
        {...breadcrumbArgs}
        links={[{ title: 'test', classNames: 'my-breadcrumb-link-class' }]}
      />
    );
    const crumb = await screen.findByText('test');
    expect(crumb.classList.contains('my-breadcrumb-links-class')).toBe(true);
    expect(crumb.classList.contains('my-breadcrumb-link-class')).toBe(true);
  });

  test('Crumb should use custom links', async () => {
    const { container } = render(
      <Breadcrumb
        {...breadcrumbArgs}
        links={[
          {
            title: 'Home',
            children: (
              <Link variant="secondary" href="#">
                Custom home
              </Link>
            ),
          },
          {
            title: 'Page 1',
            children: (
              <Link variant="disruptive" href="#">
                Custom Page 1
              </Link>
            ),
            tooltipprops: {
              content: 'A tooltip',
            },
          },
          {
            ariaCurrent: true,
            readonly: true,
            title: 'Page 2',
            url: '#',
          },
        ]}
      />
    );
    expect(container.querySelector('.breadcrumb')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should set aria-current="page" for the current breadcrumb', async () => {
    const { container } = render(
      <Breadcrumb
        {...breadcrumbArgs}
        links={[
          { title: 'Home', url: '#' },
          { title: 'Section', url: '#' },
          {
            title: 'Current Page',
            url: '#',
            ariaCurrent: true,
            readonly: true,
          },
        ]}
      />
    );
    const currentCrumb = container.querySelectorAll('.breadcrumb-link')[2];
    expect(currentCrumb.getAttribute('aria-current')).toBe('page');
  });
});
