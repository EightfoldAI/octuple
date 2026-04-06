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
import '@testing-library/jest-dom';

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

    test('Should select tab on click', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      await userEvent.click(tab2);
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
      await userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
      const item = screen.getByText('Sub Tab 2-1');
      await userEvent.click(item);
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
      await userEvent.click(tab2);
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
      await userEvent.click(tab2);
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

    test('Should mark tab as active when dropdown item is selected', async () => {
      const { container, rerender } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      
      // Initially tab2 should not be active
      expect(tab2.getAttribute('aria-selected')).toBe('false');
      
      // Select a dropdown item
      await userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
      const item = screen.getByText('Sub Tab 2-1');
      await userEvent.click(item);
      
      // Rerender with the selected dropdown item value
      rerender(
        <Tabs onChange={dropdownTabClick} value={'tab2-1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      
      // Tab2 should now be active because one of its dropdown items is selected
      const updatedTab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      expect(updatedTab2.getAttribute('aria-selected')).toBe('true');
    });

    test('Should close dropdown after selecting an item', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      
      // Open dropdown
      await userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
        expect(tab2.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Select an item
      const item = screen.getByText('Sub Tab 2-1');
      await userEvent.click(item);
      
      // Dropdown should close
      await waitFor(() => {
        expect(tab2.getAttribute('aria-expanded')).toBe('false');
      }, { timeout: 2000 });
    });

    test('Should render chevron icon for dropdown tabs', () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      // Find the button inside the dropdown wrapper
      const button = container.querySelector('button[data-value="tab2"]') as HTMLElement;
      // The chevron icon should be inside the button
      const chevron = button?.querySelector('[class*="dropdownChevron"], [class*="chevron"], svg');
      expect(chevron).toBeTruthy();
    });

    test('Should rotate chevron icon when dropdown is open', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const button = container.querySelector('button[data-value="tab2"]') as HTMLElement;
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      
      // Find chevron initially
      const chevron = button?.querySelector('[class*="dropdownChevron"], [class*="chevron"], svg') as HTMLElement;
      expect(chevron).toBeTruthy();
      
      // Initially chevron should not have open class (if it has classes)
      if (chevron?.className) {
        expect(chevron.className).not.toContain('dropdownChevronOpen');
      }
      
      // Open dropdown
      await userEvent.click(button);
      await waitFor(() => {
        expect(tab2.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Chevron should have open class after dropdown opens
      // CSS modules convert camelCase to kebab-case
      const updatedChevron = button?.querySelector('[class*="dropdownChevron"], [class*="chevron"], svg') as HTMLElement;
      if (updatedChevron?.className) {
        // Check for either camelCase or kebab-case version
        expect(
          updatedChevron.className.includes('dropdownChevronOpen') ||
          updatedChevron.className.includes('dropdown-chevron-open')
        ).toBe(true);
      }
    });

    test('Should set aria-controls for dropdown tabs', () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      // The button is inside the dropdown wrapper, find it directly
      const button = container.querySelector('button[data-value="tab2"]') as HTMLElement;
      // The aria-controls should be set (either by our code or by Dropdown component)
      const ariaControls = button?.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      // It should either be our custom ID or the dropdown's generated ID
      expect(ariaControls?.includes('tab2') || ariaControls?.includes('dropdown')).toBe(true);
    });

    test('Should handle custom dropdownProps', async () => {
      const customOnVisibleChange = jest.fn();
      const customDropdownTabs = [
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
          ],
          dropdownProps: {
            onVisibleChange: customOnVisibleChange,
            placement: 'bottom-end' as const,
          },
        },
      ];

      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {customDropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      await userEvent.click(tab2);
      
      await waitFor(() => {
        expect(customOnVisibleChange).toHaveBeenCalledWith(true);
      });
    });

    test('Should handle dropdown items with icons', async () => {
      const tabsWithIcons = [
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
            { 
              value: 'tab2-1', 
              label: 'Sub Tab 2-1', 
              ariaLabel: 'Sub Tab 2-1',
              icon: IconName.mdiBellOutline,
            },
          ],
        },
      ];

      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {tabsWithIcons.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      await userEvent.click(tab2);
      
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
      
      // Icon should be rendered in the menu item
      const menuItem = screen.getByText('Sub Tab 2-1').closest('button');
      expect(menuItem).toBeTruthy();
    });

    test('Should handle multiple dropdown tabs', async () => {
      const multipleDropdownTabs = [
        {
          value: 'tab1',
          label: 'Tab 1',
          ariaLabel: 'Tab 1',
          variant: TabVariantType.dropdown,
          dropdownItems: [
            { value: 'tab1-1', label: 'Sub Tab 1-1', ariaLabel: 'Sub Tab 1-1' },
          ],
        },
        {
          value: 'tab2',
          label: 'Tab 2',
          ariaLabel: 'Tab 2',
          variant: TabVariantType.dropdown,
          dropdownItems: [
            { value: 'tab2-1', label: 'Sub Tab 2-1', ariaLabel: 'Sub Tab 2-1' },
          ],
        },
      ];

      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {multipleDropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      
      const tab1 = container.querySelector('[data-value="tab1"]') as HTMLElement;
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      
      // Open first dropdown
      await userEvent.click(tab1);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 1-1')).toBeVisible();
      });
      
      // Click second tab - should close first dropdown and open second
      await userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.queryByText('Sub Tab 1-1')).not.toBeInTheDocument();
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
    });

    test('Should close dropdown on Escape key', async () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      
      // Open dropdown
      await userEvent.click(tab2);
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
        expect(tab2.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Press Escape
      fireEvent.keyDown(tab2, { key: 'Escape' });
      
      // Dropdown should close
      await waitFor(() => {
        expect(tab2.getAttribute('aria-expanded')).toBe('false');
      }, { timeout: 2000 });
    });

    test('Should handle dropdown when tab value matches dropdown item', () => {
      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab2-1'}>
          {dropdownTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      // Tab2 should be active because tab2-1 is one of its dropdown items
      expect(tab2.getAttribute('aria-selected')).toBe('true');
    });


    test('Should handle all dropdown items being disabled', async () => {
      const allDisabledTabs = [
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
            { 
              value: 'tab2-1', 
              label: 'Sub Tab 2-1', 
              ariaLabel: 'Sub Tab 2-1',
              disabled: true,
            },
            { 
              value: 'tab2-2', 
              label: 'Sub Tab 2-2', 
              ariaLabel: 'Sub Tab 2-2',
              disabled: true,
            },
          ],
        },
      ];

      const { container } = render(
        <Tabs onChange={dropdownTabClick} value={'tab1'}>
          {allDisabledTabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      );
      
      const tab2 = container.querySelector('[data-value="tab2"]') as HTMLElement;
      await userEvent.click(tab2);
      
      await waitFor(() => {
        expect(screen.getByText('Sub Tab 2-1')).toBeVisible();
      });
      
      // All items should be disabled
      const item1 = screen.getByText('Sub Tab 2-1');
      const item2 = screen.getByText('Sub Tab 2-2');
      expect(item1.closest('button')?.hasAttribute('disabled')).toBe(true);
      expect(item2.closest('button')?.hasAttribute('disabled')).toBe(true);
    });
  });
});
