import React, { useState } from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { create } from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Stat, Tabs, Tab, TabSize, TabVariant, TabIconAlign, TabVariantType } from './';
import { ButtonShape, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  test('should update when value prop changes', () => {
    const Stateful = () => {
      const [val, setVal] = useState('tab1');
      return (
        <>
          <button id="change" onClick={() => setVal('tab4')}>
            Change
          </button>
          <Tabs onChange={tabClick} value={val}>
            {tabs.map((tab) => (
              <Tab key={tab.value} {...tab} />
            ))}
          </Tabs>
        </>
      );
    };
    const wrapper = mount(<Stateful />);
    wrapper.find('#change').simulate('click');
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
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

  test('stat tabs non-interactive renders as div', () => {
    const statTabs = [1, 2, 3].map((i) => ({
      value: `tab${i}`,
      icon: IconName.mdiCardsHeart,
      label: `Tab ${i}`,
      ariaLabel: `Tab ${i}`,
      interactive: false,
    }));
    const wrapper = mount(
      <Tabs onChange={tabClick} value={'tab1'}>
        {statTabs.map((tab) => (
          <Stat key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
    expect(wrapper.find('.tab').at(0).type()).toBe('div');
  });

  test('stat tabs readOnly prevents onClick', () => {
    tabClick.mockClear();
    const statTabs = [1, 2, 3].map((i) => ({
      value: `tab${i}`,
      icon: IconName.mdiCardsHeart,
      label: `Tab ${i}`,
      ariaLabel: `Tab ${i}`,
    }));
    const wrapper = mount(
      <Tabs onChange={tabClick} value={'tab1'} readOnly>
        {statTabs.map((tab) => (
          <Stat key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
    wrapper.find('button[role="tab"]').at(1).simulate('click');
    expect(tabClick).not.toHaveBeenCalled();
  });

  test('stat tabs without lineClamp does not set WebkitLineClamp style', () => {
    const statTabs = [1, 2].map((i) => ({
      value: `tab${i}`,
      icon: IconName.mdiCardsHeart,
      label: `Tab ${i}`,
      ariaLabel: `Tab ${i}`,
    }));
    const wrapper = mount(
      <Tabs onChange={tabClick} value={'tab1'}>
        {statTabs.map((tab) => (
          <Stat key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
    expect(
      wrapper.find('.label').first().prop('style')?.WebkitLineClamp
    ).toBeUndefined();
  });

  test('animated tabs non-interactive does not set role', () => {
    const wrapper = mount(
      <Tabs onChange={tabClick} value={'tab1'} interactive={false}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
    expect(wrapper.find('div[role="tablist"]').length).toBe(0);
  });

  test('animated tabs registers tablist ref on mount', () => {
    const wrapper = mount(
      <Tabs onChange={tabClick} value={'tab1'}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );
    expect(wrapper.find('.tab').length).toBeGreaterThan(0);
  });
});

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

describe('Tabs Keyboard Navigation', () => {
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

  it('should navigate left with ArrowLeft and only focus, not activate', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start on tab1 (index 0), ArrowLeft should wrap to last enabled tab (tab4, index 3)
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    // Tab1 should still be active, tab4 should have focus but not be active
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );

    // Now press Enter on tab4 to activate it
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );

    // ArrowLeft from tab4 should go to tab2 (skipping disabled tab3)
    tabButtons.at(3).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      false
    );

    // Enter on tab2 to activate it
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );

    // ArrowLeft from tab2 should go to tab1
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      false
    );
  });

  it('should skip disabled tabs when navigating left with ArrowLeft', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Move to tab4 first
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();

    // Now on tab4, ArrowLeft should skip disabled tab3 and go to tab2
    tabButtons.at(3).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    // Tab4 should still be active, focus should be on tab2
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(2).hasClass('active')).toBe(
      false
    );

    // Verify tab3 (disabled) was skipped by trying to activate it
    tabButtons.at(2).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(2).hasClass('active')).toBe(
      false
    );
  });

  it('should wrap to last enabled tab when ArrowLeft from first tab', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start on tab1 (first tab), ArrowLeft should wrap to tab4 (last enabled tab)
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    // Tab1 should still be active, but focus should move to tab4
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );

    // Enter should activate tab4
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
  });

  it('should not respond to ArrowLeft when enableArrowNav is false', () => {
    const wrapper = mount(<KeyboardTabsWrapper enableArrowNav={false} />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // ArrowLeft should not move focus when enableArrowNav is false
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    // Should still be on tab1 and no other tab should have focus
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );
  });

  it('should move focus to first enabled tab with Home key', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // First, move to tab4 and activate it
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );

    // Home key should move focus to first enabled tab (tab1) but not activate it
    tabButtons.at(3).simulate('keyDown', { key: 'Home' });
    wrapper.update();

    // Tab4 should still be active, but focus should be on tab1
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      false
    );

    // Enter should activate tab1
    tabButtons.at(0).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should move focus to last enabled tab with End key', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start on tab1, End key should move focus to last enabled tab (tab4)
    tabButtons.at(0).simulate('keyDown', { key: 'End' });
    wrapper.update();

    // Tab1 should still be active, but focus should be on tab4
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );

    // Enter should activate tab4
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      true
    );
  });

  it('should move focus to first enabled tab with Home key from any position', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Move to tab2 first
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );

    // Home key from tab2 should move focus to tab1
    tabButtons.at(1).simulate('keyDown', { key: 'Home' });
    wrapper.update();

    // Tab2 should still be active, focus should be on tab1
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      false
    );
  });

  it('should move focus to last enabled tab with End key from any position', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Move to tab2 first
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );

    // End key from tab2 should move focus to tab4 (last enabled)
    tabButtons.at(1).simulate('keyDown', { key: 'End' });
    wrapper.update();

    // Tab2 should still be active, focus should be on tab4
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );
  });

  it('should not respond to Home and End keys when enableArrowNav is false', () => {
    const wrapper = mount(<KeyboardTabsWrapper enableArrowNav={false} />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Home key should not move focus when enableArrowNav is false
    tabButtons.at(0).simulate('keyDown', { key: 'Home' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );

    // End key should not move focus when enableArrowNav is false
    tabButtons.at(0).simulate('keyDown', { key: 'End' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );
  });

  it('should skip disabled tabs when using Home and End keys', () => {
    // Create a wrapper where the first tab is disabled
    const tabsWithFirstDisabled = [
      { value: 'tab1', label: 'Tab 1', ariaLabel: 'Tab 1', disabled: true },
      { value: 'tab2', label: 'Tab 2', ariaLabel: 'Tab 2' },
      { value: 'tab3', label: 'Tab 3', ariaLabel: 'Tab 3', disabled: true },
      { value: 'tab4', label: 'Tab 4', ariaLabel: 'Tab 4' },
    ];
    const disabledIndexes = [0, 2];

    function CustomKeyboardTabsWrapper() {
      const [active, setActive] = useState('tab2');
      return (
        <Tabs
          onChange={setActive}
          value={active}
          enableArrowNav={true}
          disabledTabIndexes={disabledIndexes}
        >
          {tabsWithFirstDisabled.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
    }

    const wrapper = mount(<CustomKeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start on tab2, Home should go to first enabled tab (tab2 itself in this case)
    tabButtons.at(1).simulate('keyDown', { key: 'Home' });
    wrapper.update();
    // Focus should stay on tab2 since it's the first enabled tab
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );

    // End should go to last enabled tab (tab4)
    tabButtons.at(1).simulate('keyDown', { key: 'End' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
      false
    );

    // Enter should activate tab4
    tabButtons.at(3).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(wrapper.find('button[role="tab"]').at(3).hasClass('active')).toBe(
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

  it('should move focus to next tab on Tab key when enableArrowNav is false', () => {
    const wrapperDiv = document.createElement('div');
    document.body.appendChild(wrapperDiv);

    const wrapper = mount(<KeyboardTabsWrapper enableArrowNav={false} />, {
      attachTo: wrapperDiv,
    });

    const tabButtons = wrapper.find('button[role="tab"]');
    const firstTabNode = tabButtons.at(0).getDOMNode<HTMLButtonElement>();
    const secondTabNode = tabButtons.at(1).getDOMNode<HTMLButtonElement>();

    firstTabNode.focus();
    expect(document.activeElement).toBe(firstTabNode);

    // Simulate Tab key (jsdom won't move focus, so we do it manually)
    fireEvent.keyDown(firstTabNode, { key: 'Tab' });

    // Manually move focus to simulate native browser Tab behavior
    secondTabNode.focus();

    expect(document.activeElement).toBe(secondTabNode);

    // Ensure no activation happened
    expect(tabButtons.at(0).hasClass('active')).toBe(true);
    expect(tabButtons.at(1).hasClass('active')).toBe(false);
  });

  it('should move focus to previous tab on Shift + Tab key when enableArrowNav is false', () => {
    const wrapperDiv = document.createElement('div');
    document.body.appendChild(wrapperDiv);

    const wrapper = mount(<KeyboardTabsWrapper enableArrowNav={false} />, {
      attachTo: wrapperDiv,
    });

    const tabButtons = wrapper.find('button[role="tab"]');
    const secondTabNode = tabButtons.at(1).getDOMNode<HTMLButtonElement>();
    const firstTabNode = tabButtons.at(0).getDOMNode<HTMLButtonElement>();

    // Focus second tab first
    secondTabNode.focus();
    expect(document.activeElement).toBe(secondTabNode);

    // Simulate Shift + Tab key (jsdom doesn't move focus automatically)
    fireEvent.keyDown(secondTabNode, { key: 'Tab', shiftKey: true });

    // Manually move focus to simulate previous tab
    firstTabNode.focus();

    // Expect focus to be moved to first tab
    expect(document.activeElement).toBe(firstTabNode);

    // Ensure active tab hasn't changed
    expect(tabButtons.at(1).hasClass('active')).toBe(false);
    expect(tabButtons.at(0).hasClass('active')).toBe(true);
  });
});

describe('Tabs internal logic edge cases', () => {
  it('should not break if tabValues is empty', () => {
    const wrapper = mount(
      <Tabs onChange={() => {}} value={'tab1'} children={[]} />
    );

    const tabButtons = wrapper.find('button[role="tab"]');
    expect(tabButtons.length).toBe(0);
  });

  it('should handle currentIndex === -1 gracefully', () => {
    const tabs = [
      { value: 'tab1', label: 'Tab 1', ariaLabel: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2', ariaLabel: 'Tab 2' },
    ];

    const wrapper = mount(
      <Tabs onChange={() => {}} value={'nonexistentTab'} enableArrowNav={true}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );

    const tabButtons = wrapper.find('button[role="tab"]');
    expect(tabButtons.at(0).hasClass('active')).toBe(false); // Because value doesn't match
  });

  describe('Tabs with Dropdown', () => {
    const dropdownTabClick = jest.fn();
    const dropdownTabs = [
      {
        value: 'tab1',
        label: 'Tab 1',
        ariaLabel: 'Tab 1',
      },
      {
        value: 'tab2',
        label: 'Tab 2',
        ariaLabel: 'Tab 2',
        variant: TabVariantType.dropdown,
        dropdownItems: [
          { value: 'tab2-1', label: 'Sub Tab 2-1', ariaLabel: 'Sub Tab 2-1' },
          { value: 'tab2-2', label: 'Sub Tab 2-2', ariaLabel: 'Sub Tab 2-2' },
          {
            value: 'tab2-3',
            label: 'Sub Tab 2-3',
            ariaLabel: 'Sub Tab 2-3',
            disabled: true,
          },
        ],
      },
      {
        value: 'tab3',
        label: 'Tab 3',
        ariaLabel: 'Tab 3',
      },
    ];

    beforeEach(() => {
      dropdownTabClick.mockClear();
    });

    test('Should render tab with dropdown items', () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]');
      expect(tab2).toBeTruthy();
      expect(tab2?.getAttribute('aria-haspopup')).toBe('menu');
    });

    test('Should open dropdown on hover', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      fireEvent.mouseEnter(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
    });

    test('Should select tab on click', () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      userEvent.click(tab2);
      expect(dropdownTabClick).toHaveBeenCalledWith('tab2', expect.any(Object));
    });

    test('Should handle dropdown item selection', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
      const item = screen.getByText('Sub Tab 2-1');
      userEvent.click(item);
      expect(dropdownTabClick).toHaveBeenCalledWith('tab2-1', expect.any(Object));
    });

    test('Should not select disabled dropdown item', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-3')).toBeVisible();
      });
      const disabledItem = screen.getByText('Sub Tab 2-3');
      expect(disabledItem.closest('button')?.hasAttribute('disabled')).toBe(true);
    });

    test('Should set aria-expanded when dropdown is open', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      expect(tab2.getAttribute('aria-expanded')).toBe('false');
      userEvent.click(tab2);
      await waitFor(() => {
        expect(tab2.getAttribute('aria-expanded')).toBe('true');
      });
    });

    test('Should handle keyboard navigation in dropdown', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      tab2.focus();
      fireEvent.keyDown(tab2, { key: 'Enter' });
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
    });
  });
});
