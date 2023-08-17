import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Accordion, AccordionProps, AccordionShape, AccordionSize } from './';
import { IconName } from '../Icon';
import { fireEvent, render, waitFor } from '@testing-library/react';

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
});
