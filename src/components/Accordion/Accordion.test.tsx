import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Accordion, AccordionProps, AccordionShape, AccordionSize } from './';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { Badge } from '../Badge';
import { IconName } from '../Icon';
import Layout from '../Layout';
import { List } from '../List';
import { Stack } from '../Stack';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

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

const accordionProps: AccordionProps = {
  children: (
    <>
      <div style={{ height: 'auto' }}>
        Icons are optional for accordions. The body area in the expanded view is
        like a modal or a slide-in panel. You can put any smaller components
        inside to build a layout.
      </div>
    </>
  ),
  id: 'myAccordionId',
  expandIconProps: {
    path: IconName.mdiChevronDown,
  },
  summary: 'Accordion Header',
  iconProps: {
    color: 'green',
    path: IconName.mdiCheckCircleOutline,
  },
  badgeProps: {
    children: 2,
  },
  bordered: true,
  shape: AccordionShape.Pill,
  size: AccordionSize.Large,
  expanded: false,
  disabled: false,
  'data-testid': 'test-accordion',
};

const buttons = [0, 1].map((i) => ({
  ariaLabel: `Button ${i}`,
  disruptive: i === 0 ? false : true,
  icon: i === 0 ? IconName.mdiCogOutline : IconName.mdiDeleteOutline,
  variant: i === 0 ? ButtonVariant.Neutral : ButtonVariant.Secondary,
}));

describe('Accordion', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByTestId } = render(
      <Accordion {...accordionProps} />
    );
    const accordion = getByTestId('test-accordion');
    expect(() => container).not.toThrowError();
    expect(accordion).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Accordion toggle', async () => {
    const { container } = render(
      <Accordion {...accordionProps} size={AccordionSize.Large} />
    );
    const summary = container.querySelector('.accordion-summary');
    fireEvent.click(summary);
    await waitFor(() =>
      expect(
        container.getElementsByClassName('accordion-summary-expanded')
      ).toHaveLength(1)
    );
    expect(container.querySelector('.show')).toBeTruthy();
    fireEvent.click(summary);
    await waitFor(() =>
      expect(
        container.getElementsByClassName('accordion-summary-expanded')
      ).toHaveLength(0)
    );
    expect(container.querySelector('.show')).toBeFalsy();
  });

  test('Accordion is not bordered', () => {
    const { container } = render(
      <Accordion
        {...accordionProps}
        size={AccordionSize.Large}
        bordered={false}
      />
    );
    expect(container.querySelector('.accordion-border')).toBeFalsy();
    expect(container).toMatchSnapshot();
  });

  test('Accordion is large', () => {
    const { container } = render(
      <Accordion {...accordionProps} size={AccordionSize.Large} />
    );
    expect(container.querySelector('.large')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Accordion is medium', () => {
    const { container } = render(
      <Accordion {...accordionProps} size={AccordionSize.Medium} />
    );
    expect(container.querySelector('.medium')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Accordion is pill shaped', () => {
    const { container } = render(<Accordion {...accordionProps} />);
    expect(container.querySelector('.pill')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Accordion is rectangle shaped', () => {
    const { container } = render(
      <Accordion {...accordionProps} shape={AccordionShape.Rectangle} />
    );
    expect(container.querySelector('.rectangle')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Accordion renders custom content', () => {
    const { container } = render(
      <Accordion
        {...accordionProps}
        expanded={true}
        headerProps={{
          fullWidth: true,
          style: { gap: '8px' },
        }}
        size={AccordionSize.Medium}
        summary={
          <Layout octupleStyles>
            <Stack
              fullWidth
              direction="horizontal"
              flexGap="m"
              justify="space-between"
              wrap="wrap"
            >
              <Stack direction="vertical" flexGap="xxxs">
                <h4
                  className="octuple-h4"
                  style={{
                    alignSelf: 'center',
                    flexWrap: 'nowrap',
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Accordion Header <Badge style={{ margin: '0 8px' }}>2</Badge>
                </h4>
                <div
                  className="octuple-content"
                  style={{
                    color: 'var(--grey-tertiary-color)',
                    fontWeight: 400,
                  }}
                >
                  Supporting text
                </div>
              </Stack>
              <Stack
                align="center"
                direction="horizontal"
                flexGap="m"
                justify="flex-end"
                style={{ width: 'min-content' }}
              >
                <List
                  items={buttons}
                  layout="horizontal"
                  listStyle={{ display: 'flex', gap: '8px' }}
                  renderItem={(item) => (
                    <Button
                      ariaLabel={item.ariaLabel}
                      disruptive={item.disruptive}
                      iconProps={{ path: item.icon }}
                      onClick={(e) => e.preventDefault()}
                      shape={ButtonShape.Round}
                      variant={item.variant}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Layout>
        }
      />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('renders content always when renderContentAlways is true', () => {
    const { queryByText } = render(
      <Accordion {...accordionProps} renderContentAlways={true}>
        <div>Test Content</div>
      </Accordion>
    );

    expect(queryByText('Test Content')).not.toBeNull();
  });

  test('does not render content when renderContentAlways is false and expanded is false', async () => {
    const { queryByText } = render(
      <Accordion
        {...accordionProps}
        renderContentAlways={false}
        expanded={false}
      >
        <div>Test Content</div>
      </Accordion>
    );

    await waitFor(() => {
      expect(queryByText('Test Content')).not.toBeInTheDocument();
    });
  });
});
