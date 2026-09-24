import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MatchScore } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('MatchScore', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('MatchScore is default', () => {
    const { container } = render(<MatchScore score={3} total={5} />);
    expect(container.querySelector('.match-score-container')).toBeTruthy();
  });

  test('MatchScore has hidden label', () => {
    const { container } = render(<MatchScore hideLabel score={3} total={5} />);
    expect(container.querySelector('.label')).toBeFalsy();
  });

  test('MatchScore has custom label', () => {
    const { container } = render(
      <MatchScore label={'Some label'} score={3} total={5} />
    );
    expect(container.querySelector('.label').textContent).toContain(
      'Some label'
    );
  });

  test('MatchScore has custom label with hidden score', () => {
    const { container } = render(
      <MatchScore hideValues label={'Some label'} score={3} total={5} />
    );
    expect(container.querySelector('.label').textContent).toBe('Some label ');
  });

  test('MatchScore clamps a negative score instead of throwing', () => {
    const { container } = render(<MatchScore score={-1} total={5} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(0);
    expect(container.querySelectorAll('.half').length).toBe(0);
    expect(container.querySelector('.label').textContent).toContain('0/5');
  });

  test('MatchScore clamps a score above total instead of throwing', () => {
    const { container } = render(<MatchScore score={5.5} total={5} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(5);
    expect(container.querySelectorAll('.half').length).toBe(0);
    expect(container.querySelector('.label').textContent).toContain('5/5');
  });

  test('MatchScore treats a NaN score as 0 instead of throwing', () => {
    const { container } = render(<MatchScore score={NaN} total={5} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(0);
    expect(container.querySelectorAll('.half').length).toBe(0);
    expect(container.querySelector('.label').textContent).toContain('0/5');
  });

  test('MatchScore falls back to the default total when total is NaN', () => {
    const { container } = render(<MatchScore score={3} total={NaN} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(3);
    expect(container.querySelectorAll('.half').length).toBe(0);
    expect(container.querySelector('.label').textContent).toContain('3/5');
  });

  test('MatchScore truncates a fractional total instead of throwing', () => {
    const { container } = render(<MatchScore score={3} total={5.5} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(3);
    expect(container.querySelectorAll('.half').length).toBe(0);
    expect(container.querySelector('.label').textContent).toContain('3/5');
  });

  test('MatchScore renders a half circle for a half-point score', () => {
    const { container } = render(<MatchScore score={2.5} total={5} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(2);
    expect(container.querySelectorAll('.half').length).toBe(1);
    expect(container.querySelector('.label').textContent).toContain('3/5');
  });

  test('MatchScore defaults total to 5 when omitted', () => {
    const { container } = render(<MatchScore score={3} />);
    expect(container.querySelectorAll('.match-score-circle').length).toBe(5);
    expect(container.querySelectorAll('.full').length).toBe(3);
    expect(container.querySelectorAll('.half').length).toBe(0);
    expect(container.querySelector('.label').textContent).toContain('3/5');
  });

  test('MatchScore applies an explicit theme when noThemeContext is set', () => {
    const { container } = render(
      <MatchScore
        score={3}
        total={5}
        theme={'blue'}
        configContextProps={{ noThemeContext: true }}
      />
    );
    expect(
      container.querySelector('.match-score-container').classList
    ).toContain('theme');
  });
});
