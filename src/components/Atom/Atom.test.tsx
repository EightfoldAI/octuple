import React, { useMemo, useRef } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Atom } from '../Atom';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const AtomComponent = (props: {
  classNames?: string;
  style?: React.CSSProperties;
}): JSX.Element => {
  const atomRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  useMemo(() => {
    if (atomRef.current) {
      atomRef.current.id = 'ref-test';
    }
  }, []);

  return (
    <Atom<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      of="div"
      ref={atomRef}
      classes={[props.classNames]}
      style={props.style}
      data-test-id="test-atom-legacy"
      data-testid="test-atom"
    >
      Test Atom component.
    </Atom>
  );
};

describe('Atom', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing and uses data-testid', () => {
    const { container, getByTestId } = render(<AtomComponent />);
    const atom = getByTestId('test-atom');
    expect(() => container).not.toThrowError();
    expect(atom).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Atom accepts custom classes', () => {
    const { container } = render(<AtomComponent classNames="atom-class" />);
    expect(container.querySelector('.atom-class')).toBeTruthy();
  });

  test('Atom accepts custom styles', () => {
    const { container, getByTestId } = render(
      <AtomComponent style={{ backgroundColor: 'red' }} />
    );
    const atom = getByTestId('test-atom');
    expect(atom.style.backgroundColor).toBe('red');
  });

  test('Atom accepts legacy data-test-id', () => {
    const { container } = render(<AtomComponent classNames="atom-class" />);
    expect(
      container
        .getElementsByClassName('atom-class')[0]
        .getAttribute('data-test-id')
    ).toBe('test-atom-legacy');
  });
});
