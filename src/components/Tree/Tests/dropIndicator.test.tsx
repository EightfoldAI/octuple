import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import dropIndicatorRender, { offset } from '../Utils/dropIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('dropIndicatorRender', () => {
  it('work with dropPosition before (1)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: 1,
      dropLevelOffset: 0,
      indent: 24,
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.find('div').props().style!.bottom).toEqual(-3);
  });
  it('work with dropPosition inner (-0)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: 0,
      dropLevelOffset: 0,
      indent: 24,
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.find('div').props().style!.bottom).toEqual(-3);
    expect(wrapper.find('div').props().style!.left).toEqual(24 + offset);
  });
  it('work with dropPosition after (-1)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 0,
      indent: 24,
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.find('div').props().style!.top).toEqual(-3);
  });
  it('work with drop level', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 2,
      indent: 24,
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.find('div').props().style!.left).toEqual(-2 * 24 + offset);
  });
  it('work with drop level (rtl)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 2,
      indent: 24,
      direction: 'rtl',
    });
    const wrapper = mount(indicator);
    expect(wrapper.find('div').props().style!.right).toEqual(-2 * 24 + offset);
  });
});
