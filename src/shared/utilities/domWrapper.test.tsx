import React from 'react';
import { render } from '@testing-library/react';

describe('DomWrapper (legacy findDOMNode present)', () => {
  const { DomWrapper } = require('./domWrapper');

  it('renders children only, with no marker node', () => {
    const { container } = render(
      <DomWrapper>
        <div className="child" />
      </DomWrapper>
    );
    expect(container.querySelector('.child')).toBeTruthy();
    expect(container.querySelector('span[hidden]')).toBeNull();
    expect(container.childNodes).toHaveLength(1);
  });

  it('getDOMNode resolves the child DOM node', () => {
    const ref = React.createRef<any>();
    const { container } = render(
      <DomWrapper ref={ref}>
        <div className="child" />
      </DomWrapper>
    );
    expect(ref.current.getDOMNode()).toBe(container.querySelector('.child'));
  });
});

describe('DomWrapper (legacy findDOMNode absent)', () => {
  let DomWrapperFresh: any;

  beforeAll(() => {
    jest.resetModules();
    jest.doMock('react-dom', () => {
      const actual = jest.requireActual('react-dom');
      return { ...actual, findDOMNode: undefined };
    });
    ({ DomWrapper: DomWrapperFresh } = require('./domWrapper'));
  });

  afterAll(() => {
    jest.dontMock('react-dom');
    jest.resetModules();
  });

  it('renders a trailing hidden marker after children', () => {
    const { container } = render(
      <DomWrapperFresh>
        <div className="child" />
      </DomWrapperFresh>
    );
    const marker = container.querySelector('span[hidden]');
    expect(marker).toBeTruthy();
    expect(container.firstChild).toBe(container.querySelector('.child'));
    expect(marker.previousSibling).toBe(container.querySelector('.child'));
  });

  it('getDOMNode resolves via the marker previousSibling', () => {
    const ref = React.createRef<any>();
    const { container } = render(
      <DomWrapperFresh ref={ref}>
        <div className="child" />
      </DomWrapperFresh>
    );
    expect(ref.current.getDOMNode()).toBe(container.querySelector('.child'));
  });

  it('renders no marker when renderMarker is false', () => {
    const { container } = render(
      <DomWrapperFresh renderMarker={false}>
        <div className="child" />
      </DomWrapperFresh>
    );
    expect(container.querySelector('span[hidden]')).toBeNull();
  });

  it('keeps table row nesting valid for measure cells', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DomWrapperFresh renderMarker={false}>
              <td className="cell" />
            </DomWrapperFresh>
          </tr>
        </tbody>
      </table>
    );
    expect(container.querySelector('tr > span')).toBeNull();
    expect(container.querySelector('tr > td.cell')).toBeTruthy();
  });

  it('getDOMNode returns null when children render nothing', () => {
    const ref = React.createRef<any>();
    render(<DomWrapperFresh ref={ref}>{null}</DomWrapperFresh>);
    expect(ref.current.getDOMNode()).toBeNull();
  });
});
