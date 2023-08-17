import React, { useMemo, useRef } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Button } from '../Button';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const OcBaseComponent = (): JSX.Element => {
  const buttonRef: React.MutableRefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);

  useMemo(() => {
    if (buttonRef.current) {
      buttonRef.current.name = 'ref-test';
    }
  }, []);

  return (
    <Button
      classNames="ocbase-class"
      data-test-id="test-ocbase-legacy"
      data-testid="test-ocbase"
      ref={buttonRef}
    />
  );
};

describe('OcBase', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing and uses data-testid', () => {
    const { container, getByTestId } = render(<OcBaseComponent />);
    const button = getByTestId('test-ocbase');
    expect(() => container).not.toThrowError();
    expect(button).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Button accepts custom classes', () => {
    const { container } = render(<OcBaseComponent />);
    expect(container.querySelector('.ocbase-class')).toBeTruthy();
  });

  test('Button accepts legacy data-test-id', () => {
    const { container } = render(<OcBaseComponent />);
    expect(
      container
        .getElementsByClassName('ocbase-class')[0]
        .getAttribute('data-test-id')
    ).toBe('test-ocbase-legacy');
  });
});
