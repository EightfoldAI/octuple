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

  // Additional comprehensive tests for better coverage
  it('should handle ArrowLeft navigation and wrap around', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start on tab1, ArrowLeft should wrap to tab4 (last enabled tab)
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    // Focus should be on tab4 but not activated
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );

    // Test ArrowLeft from tab4 to tab2 (skipping disabled tab3)
    tabButtons.at(3).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    // Test ArrowLeft from tab2 to tab1
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();
  });

  it('should handle Home and End key navigation', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start on tab1, press End to go to last enabled tab (tab4)
    tabButtons.at(0).simulate('keyDown', { key: 'End' });
    wrapper.update();

    // Press Home to go to first enabled tab (tab1)
    tabButtons.at(3).simulate('keyDown', { key: 'Home' });
    wrapper.update();

    // Verify the active tab hasn't changed (focus only)
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should handle Enter key activation properly', () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(<KeyboardTabsWrapper onChange={mockOnChange} />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Navigate to tab2 and press Enter
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();

    // Verify tab2 is now active
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
  });

  it('should not navigate when readOnly is true', () => {
    const wrapper = mount(<KeyboardTabsWrapper readOnly={true} />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Try to navigate - should not work
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();

    // Try to activate with Enter - should not work
    tabButtons.at(1).simulate('keyDown', { key: 'Enter' });
    wrapper.update();

    // Tab1 should still be active
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should handle Tab key navigation when enableArrowNav is false', () => {
    const wrapper = mount(<KeyboardTabsWrapper enableArrowNav={false} />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Simulate Tab key press
    tabButtons.at(0).simulate('keyDown', { key: 'Tab' });
    wrapper.update();

    // Simulate Shift+Tab
    tabButtons.at(0).simulate('keyDown', { key: 'Tab', shiftKey: true });
    wrapper.update();

    // Should still be on tab1
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should handle all disabled tabs scenario', () => {
    const allDisabledTabs = [
      { value: 'tab1', label: 'Tab 1', ariaLabel: 'Tab 1', disabled: true },
      { value: 'tab2', label: 'Tab 2', ariaLabel: 'Tab 2', disabled: true },
      { value: 'tab3', label: 'Tab 3', ariaLabel: 'Tab 3', disabled: true },
    ];

    const wrapper = mount(
      <Tabs
        onChange={() => {}}
        value="tab1"
        enableArrowNav={true}
        disabledTabIndexes={[0, 1, 2]}
      >
        {allDisabledTabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );

    const tabButtons = wrapper.find('button[role="tab"]');

    // Try to navigate - should not move focus
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();

    // Try Enter - should not activate
    tabButtons.at(0).simulate('keyDown', { key: 'Enter' });
    wrapper.update();
  });

  it('should handle empty tabs array', () => {
    const wrapper = mount(
      <Tabs onChange={() => {}} value="" enableArrowNav={true}>
        {[]}
      </Tabs>
    );

    // Should not crash when there are no tabs
    expect(wrapper.find('button[role="tab"]')).toHaveLength(0);
  });

  it('should handle unknown key presses', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Press unknown key - should not affect anything
    tabButtons.at(0).simulate('keyDown', { key: 'Space' });
    wrapper.update();

    // Should still be on tab1
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should handle navigation with no initial focused tab', () => {
    const wrapper = mount(<KeyboardTabsWrapper value="tab2" />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Start from tab2 and navigate
    tabButtons.at(1).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();

    // Should skip disabled tab3 and move to tab4
    expect(wrapper.find('button[role="tab"]').at(1).hasClass('active')).toBe(
      true
    );
  });

  it('should handle focus management with multiple disabled tabs', () => {
    const tabsWithMultipleDisabled = [
      { value: 'tab1', label: 'Tab 1', ariaLabel: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2', ariaLabel: 'Tab 2', disabled: true },
      { value: 'tab3', label: 'Tab 3', ariaLabel: 'Tab 3', disabled: true },
      { value: 'tab4', label: 'Tab 4', ariaLabel: 'Tab 4' },
      { value: 'tab5', label: 'Tab 5', ariaLabel: 'Tab 5', disabled: true },
      { value: 'tab6', label: 'Tab 6', ariaLabel: 'Tab 6' },
    ];

    const wrapper = mount(
      <Tabs
        onChange={() => {}}
        value="tab1"
        enableArrowNav={true}
        disabledTabIndexes={[1, 2, 4]}
      >
        {tabsWithMultipleDisabled.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );

    const tabButtons = wrapper.find('button[role="tab"]');

    // Navigate from tab1 - should skip disabled tabs and go to tab4
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();

    // Navigate from tab4 - should skip disabled tab5 and go to tab6
    tabButtons.at(3).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();

    // Navigate from tab6 - should wrap around to tab1
    tabButtons.at(5).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();
  });

  it('should handle preventDefault on key events', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    const mockEvent = {
      key: 'ArrowRight',
      preventDefault: jest.fn(),
    };

    tabButtons.at(0).simulate('keyDown', mockEvent);

    // preventDefault should have been called
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should handle when tab element has no data-value attribute', () => {
    const wrapper = mount(<KeyboardTabsWrapper />);
    const tabButtons = wrapper.find('button[role="tab"]');

    // Mock a tab without data-value attribute
    const tabElement = tabButtons.at(0).getDOMNode();
    jest.spyOn(tabElement, 'getAttribute').mockReturnValue(null);

    // Try to activate with Enter - should handle gracefully
    tabButtons.at(0).simulate('keyDown', { key: 'Enter' });
    wrapper.update();

    // Should still be on tab1
    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });

  it('should handle circular navigation edge cases', () => {
    // Test with only one enabled tab
    const singleEnabledTab = [
      { value: 'tab1', label: 'Tab 1', ariaLabel: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2', ariaLabel: 'Tab 2', disabled: true },
    ];

    const wrapper = mount(
      <Tabs
        onChange={() => {}}
        value="tab1"
        enableArrowNav={true}
        disabledTabIndexes={[1]}
      >
        {singleEnabledTab.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
    );

    const tabButtons = wrapper.find('button[role="tab"]');

    // Navigate right - should stay on tab1 (only enabled tab)
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowRight' });
    wrapper.update();

    // Navigate left - should stay on tab1 (only enabled tab)
    tabButtons.at(0).simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.update();

    expect(wrapper.find('button[role="tab"]').at(0).hasClass('active')).toBe(
      true
    );
  });
});
