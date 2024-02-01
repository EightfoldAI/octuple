import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import ReactDOMServer from 'react-dom/server';
import { Col, Row } from '..';
import { render, screen } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

describe('Grid.Gap', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('should not have `row-gap: 0px` style', () => {
    render(
      <Row role="row">
        <Col />
      </Row>
    );

    expect(screen.getByRole('row').style.rowGap).toBe('');
  });

  test('should use gap', () => {
    const { container } = render(
      <Row gutter={[16, 8]}>
        <Col />
      </Row>
    );

    expect(container.querySelector('.row').style.marginLeft).toEqual('-8px');
    expect(container.querySelector('.row').style.marginRight).toEqual('-8px');
  });

  test('not break ssr', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Demo = () => (
      <Row gutter={[16, 8]}>
        <Col />
      </Row>
    );

    const div = document.createElement('div');

    const ssrTxt = ReactDOMServer.renderToString(<Demo />);
    div.innerHTML = ssrTxt;

    const { unmount } = render(<Demo />, { container: div, hydrate: true });

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();

    unmount();
  });
});
