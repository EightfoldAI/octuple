import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { act } from 'react-dom/test-utils';
import { Col, Row } from '..';
import { responsiveObserve } from '../../../shared/utilities';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { render as libRender } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

jest.mock('../../../hooks/useBreakpoint', () => () => {
  return { xs: true, sm: false, md: false, lg: false, xl: false };
});

describe('Grid', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('should render Col', () => {
    const wrapper = render(<Col span={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Row', () => {
    const wrapper = render(<Row />);
    expect(wrapper).toMatchSnapshot();
  });

  test('when typeof gutter is object', () => {
    const { container } = libRender(<Row gutter={{ xs: 8 }} />);
    expect(container.querySelector('.row').style.marginLeft).toEqual('-4px');
    expect(container.querySelector('.row').style.marginRight).toEqual('-4px');
  });

  test('when typeof gutter is object array', () => {
    const { container } = libRender(<Row gutter={[{ xs: 8 }, { xs: 8 }]} />);
    expect(container.querySelector('.row').style.marginLeft).toEqual('-4px');
    expect(container.querySelector('.row').style.marginRight).toEqual('-4px');
  });

  test('when typeof gutter is object array in large screen', () => {
    const wrapper = render(
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 100 },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('renders wrapped Col correctly', () => {
    const MyCol = () => <Col span={12} />;
    const wrapper = render(
      <Row gutter={20}>
        <div>
          <Col span={12} />
        </div>
        <MyCol />
      </Row>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('responsiveObserve.unsubscribe should be called when unmounted', () => {
    const Unmount = jest.spyOn(responsiveObserve, 'unsubscribe');
    const wrapper = mount(<Row gutter={{ xs: 20 }} />);
    act(() => {
      wrapper.unmount();
    });
    expect(Unmount).toHaveBeenCalled();
  });

  test('should work correct when gutter is object', () => {
    const { container } = libRender(<Row gutter={{ xs: 20 }} />);
    expect(container.querySelector('.row').style.marginLeft).toEqual('-10px');
    expect(container.querySelector('.row').style.marginRight).toEqual('-10px');
  });

  test('should work current when gutter is array', () => {
    const wrapper = mount(<Row gutter={[16, 20]} />);
    expect(wrapper.find('div').prop('style')).toEqual({
      marginLeft: -8,
      marginRight: -8,
      marginTop: -10,
      marginBottom: -10,
    });
  });

  // By jsdom mock, actual jsdom not implemented matchMedia
  // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  test('should work with useBreakpoint', () => {
    const screens = useBreakpoint();
    function Demo() {
      return JSON.stringify(screens);
    }
    const wrapper = mount(<Demo />);

    expect(wrapper.text()).toEqual(
      JSON.stringify({
        xs: true,
        sm: false,
        md: false,
        lg: false,
        xl: false,
      })
    );
  });
});
