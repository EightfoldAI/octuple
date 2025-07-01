import React, { useState } from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { create } from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Stat, Tabs, Tab, TabSize, TabVariant, TabIconAlign } from './';
import { ButtonShape, ButtonVariant } from '../Button';
import { IconName } from '../Icon';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Tabs', () => {
  let wrapper: ReactWrapper;

  const tabs = [1, 2, 3, 4].map((i) => ({
    value: `tab${i}`,
    icon: IconName.mdiCardsHeart,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
    ...(i === 4 ? { disabled: true } : {}),
  }));
  const tabsWithBadgeContent = [1, 2, 3, 4].map((i) => ({
    value: `tab${i}`,
    icon: IconName.mdiCardsHeart,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
    badgeContent: i,
    ...(i === 4 ? { disabled: true } : {}),
  }));
  const tabsWithButtons = [1, 2, 3, 4].map((i) => ({
    buttonProps: {
      ariaLabel: 'Send reminder',
      iconProps: { path: IconName.mdiBellOutline },
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('clicked');
      },
      shape: ButtonShape.Round,
      variant: ButtonVariant.Neutral,
    },
    value: `tab${i}`,
    icon: IconName.mdiCardsHeart,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
    ...(i === 4 ? { disabled: true } : {}),
  }));
  const tabClick = jest.fn();

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  beforeEach(() => {
    wrapper = mount(
      <Tabs onChange={tabClick} value={'tab1'}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
  });

  test('tabs snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} value={'tab1'}>
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('tabs mount', () => {
    expect(wrapper.find('.tab').at(0).hasClass('active')).toEqual(true);
  });

  test('tabs click', () => {
    wrapper.find('.tab').at(2).simulate('click');
    expect(tabClick).toHaveBeenCalledTimes(1);
    expect(tabClick).toHaveBeenCalledWith('tab3', expect.any(Object));
  });

  test('setting value changes tab', async () => {
    wrapper = mount(
      <Tabs onChange={tabClick} value={'tab3'}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
    expect(wrapper.find('.tab').at(2).hasClass('active')).toEqual(true);
  });

  test('tabs badgeContent', () => {
    expect(
      create(
        <Tabs
          alignIcon={TabIconAlign.Start}
          onChange={tabClick}
          value={'tab1'}
          variant={TabVariant.pill}
        >
          {tabsWithBadgeContent.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('tabs alignIcon start', () => {
    expect(
      create(
        <Tabs
          alignIcon={TabIconAlign.Start}
          onChange={tabClick}
          value={'tab1'}
          variant={TabVariant.pill}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('tabs alignIcon end', () => {
    expect(
      create(
        <Tabs
          alignIcon={TabIconAlign.End}
          onChange={tabClick}
          value={'tab1'}
          variant={TabVariant.pill}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('pill tabs large snapshot', () => {
    expect(
      create(
        <Tabs
          onChange={tabClick}
          size={TabSize.Large}
          value={'tab1'}
          variant={TabVariant.pill}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('pill tabs medium (default) snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} value={'tab1'} variant={TabVariant.pill}>
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('pill tabs medium (set) snapshot', () => {
    expect(
      create(
        <Tabs
          onChange={tabClick}
          size={TabSize.Medium}
          value={'tab1'}
          variant={TabVariant.pill}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('pill tabs small snapshot', () => {
    expect(
      create(
        <Tabs
          onChange={tabClick}
          size={TabSize.Small}
          value={'tab1'}
          variant={TabVariant.pill}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs medium snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} value={'tab1'}>
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs small snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} size={TabSize.Small} value={'tab1'}>
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs xsmall snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} size={TabSize.XSmall} value={'tab1'}>
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs medium vertical fullWidth snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} value={'tab1'} direction="vertical" fullWidth>
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs medium horizontal maxWidth lineClamp snapshot', () => {
    expect(
      create(
        <Tabs
          onChange={tabClick}
          value={'tab1'}
          direction="vertical"
          maxWidth={240}
          lineClamp={2}
        >
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs medium vertical snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} value={'tab1'} direction="vertical">
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs small vertical snapshot', () => {
    expect(
      create(
        <Tabs
          onChange={tabClick}
          size={TabSize.Small}
          value={'tab1'}
          direction="vertical"
        >
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs xsmall vertical snapshot', () => {
    expect(
      create(
        <Tabs
          onChange={tabClick}
          size={TabSize.XSmall}
          value={'tab1'}
          direction="vertical"
        >
          {tabs.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });

  test('stat tabs with buttons snapshot', () => {
    expect(
      create(
        <Tabs onChange={tabClick} size={TabSize.XSmall} value={'tab1'}>
          {tabsWithButtons.map((tab) => (
            <Stat key={tab.value} {...tab} />
          ))}
        </Tabs>
      ).toJSON()
    ).toMatchSnapshot();
  });
});

describe('Tabs Keyboard Navigation', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', ariaLabel: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2', ariaLabel: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3', ariaLabel: 'Tab 3', disabled: true },
    { value: 'tab4', label: 'Tab 4', ariaLabel: 'Tab 4' },
  ];
  const disabledTabIndexes = [2];

  function KeyboardTabsWrapper(props: any) {
    const [active, setActive] = useState('tab1');
    return (
      <Tabs
        onChange={setActive}
        value={active}
        enableArrowNav={true}
        disabledTabIndexes={disabledTabIndexes}
        {...props}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
  }

  it('should not activate tab on Arrow navigation, only on Enter', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');
    // Start on tab1, ArrowRight should NOT activate tab2
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      false
    );
    // Now press Enter on tab2
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
    // ArrowRight again (should skip disabled tab3 and go to tab4, but not activate)
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );
    // Now press Enter on tab4
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
    // ArrowRight again should wrap to tab1, but not activate
    tabButtons.at(3).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      false
    );
    // Now press Enter on tab1
    tabButtons.at(0).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should not allow navigation if enableArrowNav is false', () => {
    const wrapper = mount(<KeyboardTabsWrapper enableArrowNav={false} />);
    const tabButtons = wrapper.find('button[role="tab"]');
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
    // Should still be on tab1
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    // Even Enter should only work on the currently active tab
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should not activate disabled tabs', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');
    // Move to tab2
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
    // ArrowRight should skip tab3 and go to tab4, but not activate
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );
    // Try to activate disabled tab3 (should not work)
    tabButtons.at(2).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(2).hasClass('active')).toBe(
      false
    );
  });
});
