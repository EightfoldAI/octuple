import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Skill, SkillSize, SkillStatus, SkillVariant } from '../';
import {
  Button,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../../Button';
import { IconName } from '../../Icon';
import { List } from '../../List';
import { Slider, SliderSize } from '../../Slider';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MenuItemType } from '../../Menu';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

interface User {
  name: string;
  icon: IconName;
}

const sampleList: User[] = [1, 2, 3].map((i) => ({
  name: `Button ${i}`,
  icon: IconName.mdiAccount,
}));

const Overlay = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <Button
        data-testid="menu-item"
        text={item.name}
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        size={ButtonSize.Medium}
        variant={ButtonVariant.SystemUI}
        iconProps={{
          path: item.icon,
        }}
        role="menuitem"
        style={{
          margin: '4px 0',
        }}
      />
    )}
    role="menu"
  />
);

const getStaticSlider = (disabled: boolean = false): JSX.Element => (
  <div
    style={{
      height: 'auto',
      padding: '4px 0',
      width: 320,
    }}
  >
    <Slider
      disabled={disabled}
      size={SliderSize.Medium}
      value={0}
      showMarkers
      showLabels
      tooltipContent="0"
      tooltipProps={{
        height: 24,
        offset: 20,
        portal: true,
        style: { padding: '4px 12px' },
        width: 40,
      }}
      min={0}
      max={5}
      step={0.1}
      minLabel="Assess skill level"
      minLabelStyle={{
        color: 'var(--blue-color)',
      }}
      hideMax
      hideMin
      hideValue
    />
  </div>
);

describe('Skill', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Skill tag renders', () => {
    const { container } = render(<Skill id="testSkill" label="test skill" />);
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is disabled', () => {
    const { container } = render(
      <Skill disabled id="testSkill" label="test skill" />
    );
    expect(container.getElementsByClassName('disabled')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is readonly', () => {
    const { container } = render(
      <Skill id="testSkill" label="test skill" readonly />
    );
    expect(container.getElementsByClassName('read-only')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is closable', () => {
    const { container } = render(
      <Skill closable id="testSkill" label="test skill" />
    );
    expect(container.getElementsByClassName('button')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag', () => {
    const { container } = render(
      <Skill id="testSkill" label="test skill" variant={SkillVariant.Tag} />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('medium')).toBeTruthy();
    expect(container.getElementsByClassName('white')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a large tag', () => {
    const { container } = render(
      <Skill
        id="testSkill"
        label="test skill"
        size={SkillSize.Large}
        variant={SkillVariant.Tag}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('large')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a small tag', () => {
    const { container } = render(
      <Skill
        id="testSkill"
        label="test skill"
        size={SkillSize.Small}
        variant={SkillVariant.Tag}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('small')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a xsmall tag', () => {
    const { container } = render(
      <Skill
        id="testSkill"
        label="test skill"
        size={SkillSize.XSmall}
        variant={SkillVariant.Tag}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('xsmall')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a highlight tag', () => {
    const { container } = render(
      <Skill
        id="testSkill"
        label="test skill"
        status={SkillStatus.Highlight}
        variant={SkillVariant.Tag}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('highlight')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a match tag', () => {
    const { container } = render(
      <Skill
        id="testSkill"
        label="test skill"
        status={SkillStatus.Match}
        variant={SkillVariant.Tag}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('match')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a clickable tag', () => {
    const SkillRenderer = (): JSX.Element => {
      const [total, setTotal] = useState<number>(0);
      return (
        <Skill
          clickable
          data-testid="skill-tag-1"
          id="testSkill"
          label={`test skill ${total}`}
          onClick={() => setTotal(12)}
          variant={SkillVariant.Tag}
        />
      );
    };
    const { container } = render(<SkillRenderer />);
    expect(container.getElementsByClassName('clickable')).toHaveLength(1);
    const skillTagTestElement: HTMLElement = getByTestId(
      container,
      'skill-tag-1'
    );
    expect(skillTagTestElement.innerHTML).toContain('test skill 0');
    fireEvent.click(
      skillTagTestElement.getElementsByClassName('background')[0]
    );
    expect(skillTagTestElement.innerHTML).toContain('test skill 12');
    expect(container).toMatchSnapshot();
  });

  test('Skill tag has a dropdown', async () => {
    const { container } = render(
      <Skill
        clickable
        data-testid="skill-tag-2"
        dropdownProps={{
          overlay: Overlay(),
          portal: true,
        }}
        id="testSkill"
        label="test skill"
      />
    );
    const skillTagTestElement: HTMLElement = getByTestId(
      container,
      'skill-tag-2'
    );
    fireEvent.click(skillTagTestElement);
    await waitFor(() =>
      expect(screen.getAllByTestId('menu-item')).toHaveLength(3)
    );
    expect(container).toMatchSnapshot();
  });

  test('Skill tag has a popup', async () => {
    const { container } = render(
      <Skill
        clickable
        data-testid="skill-tag-3"
        id="testSkill"
        label="test skill"
        popupProps={{
          content: 'test popup',
          'data-testid': 'test-popup',
          portal: true,
        }}
      />
    );
    const skillTagTestElement: HTMLElement = getByTestId(
      container,
      'skill-tag-3'
    );
    fireEvent.click(
      skillTagTestElement.getElementsByClassName('background')[0]
    );
    await waitFor(() => expect(screen.getByTestId('test-popup')).toBeTruthy());
    expect(container).toMatchSnapshot();
  });

  test('Skill tag has a tooltip', async () => {
    const { container } = render(
      <Skill
        clickable
        data-testid="skill-tag-4"
        id="testSkill"
        label="test skill"
        tooltipProps={{
          content: 'test tooltip',
          portal: true,
        }}
      />
    );
    const skillTagTestElement: HTMLElement = getByTestId(
      container,
      'skill-tag-4'
    );
    fireEvent.mouseEnter(skillTagTestElement);
    await waitFor(() => expect(screen.getByText('test tooltip')).toBeTruthy());
    expect(container).toMatchSnapshot();
  });

  test('Skill tag uses custom props', () => {
    const { container } = render(
      <Skill
        animate={false}
        background="#333333"
        classNames="test-skill"
        clickable
        color="#ffffff"
        contentClassNames="test-content"
        data-testid="skill-tag-5"
        expandable
        expanded
        expandedContentClassNames="test-expanded-content"
        height={80}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Highlight}
        title="Test Skill"
        width={840}
      />
    );
    expect(
      (container.getElementsByClassName('background')[0] as HTMLElement).style
        .background
    ).toBe('rgb(51, 51, 51)');
    expect(
      (container.getElementsByClassName('label')[0] as HTMLElement).style.color
    ).toBe('rgb(255, 255, 255)');
    expect(
      (container.getElementsByClassName('icon')[0] as HTMLElement).style.color
    ).toBe('rgb(255, 255, 255)');
    expect(
      (container.getElementsByClassName('skill')[0] as HTMLElement).style.height
    ).toBe('80px');
    expect(
      (container.getElementsByClassName('skill')[0] as HTMLElement).style.width
    ).toBe('840px');
    expect(
      (
        container.getElementsByClassName('skill')[0] as HTMLElement
      ).getAttribute('title')
    ).toBe('Test Skill');
    expect(container.getElementsByClassName('test-skill')).toBeTruthy();
    expect(container.getElementsByClassName('test-content')).toBeTruthy();
    expect(
      container.getElementsByClassName('test-expanded-content')
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill block renders', () => {
    const { container } = render(
      <Skill
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        variant={SkillVariant.Block}
      />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block', () => {
    const { container } = render(
      <Skill
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        variant={SkillVariant.Block}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('white')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a highlight block', () => {
    const { container } = render(
      <Skill
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Highlight}
        variant={SkillVariant.Block}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('highlight')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a match block', () => {
    const { container } = render(
      <Skill
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Match}
        variant={SkillVariant.Block}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('match')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a clickable block', async () => {
    const SkillRenderer = (): JSX.Element => {
      const [total, setTotal] = useState<number>(0);
      return (
        <Skill
          clickable
          content={getStaticSlider()}
          data-testid="skill-block-1"
          id="testSkill"
          label={`test skill ${total}`}
          onClick={() => {
            setTotal(12);
          }}
          variant={SkillVariant.Block}
        />
      );
    };
    const { container } = render(<SkillRenderer />);
    expect(container.getElementsByClassName('clickable')).toHaveLength(1);
    const skillBlockTestElement: HTMLElement = getByTestId(
      container,
      'skill-block-1'
    );
    expect(skillBlockTestElement.innerHTML).toContain('test skill 0');
    fireEvent.click(
      skillBlockTestElement.getElementsByClassName('background')[0]
    );
    await waitFor(() =>
      expect(skillBlockTestElement.innerHTML).toContain('test skill 12')
    );
    expect(container).toMatchSnapshot();
  });

  test('Skill is an expandable block', async () => {
    const { container } = render(
      <Skill
        clickable
        expandable
        expandedContent={
          <div data-testid="test-expandable-content">Expandable content.</div>
        }
        content={getStaticSlider()}
        data-testid="skill-block-2"
        id="testSkill"
        label="test skill"
        variant={SkillVariant.Block}
      />
    );
    expect(container.getElementsByClassName('clickable')).toHaveLength(1);
    const skillBlockTestElement: HTMLElement = getByTestId(
      container,
      'skill-block-2'
    );
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toContain(
      'false'
    );
    fireEvent.click(
      skillBlockTestElement.getElementsByClassName('background')[0]
    );
    await waitFor(() =>
      expect(skillBlockTestElement.getAttribute('aria-expanded')).toContain(
        'true'
      )
    );
    expect(container).toMatchSnapshot();
  });

  test('Skill closes an expandable block', async () => {
    const { container } = render(
      <Skill
        clickable
        expandable
        expanded
        animate={false}
        expandedContent={
          <div data-testid="test-expandable-content">Expandable content.</div>
        }
        content={getStaticSlider()}
        data-testid="skill-block-3"
        id="testSkill"
        label="test skill"
        variant={SkillVariant.Block}
      />
    );
    expect(container.getElementsByClassName('clickable')).toHaveLength(1);
    const skillBlockTestElement: HTMLElement = getByTestId(
      container,
      'skill-block-3'
    );
    await waitFor(() =>
      expect(skillBlockTestElement.getAttribute('aria-expanded')).toContain(
        'true'
      )
    );
    fireEvent.click(
      skillBlockTestElement.getElementsByClassName('background')[0]
    );
    await waitFor(() =>
      expect(skillBlockTestElement.getAttribute('aria-expanded')).toContain(
        'false'
      )
    );
    expect(container).toMatchSnapshot();
  });

  test('Skill is a hoverable, expandable block', async () => {
    const { container } = render(
      <Skill
        hoverable
        expandable
        expandedContent={
          <div data-testid="test-hover-content">
            Hovered expandable content.
          </div>
        }
        content={getStaticSlider()}
        data-testid="skill-block-4"
        id="testSkill"
        label="test skill"
        variant={SkillVariant.Block}
      />
    );

    const skillBlockTestElement: HTMLElement = getByTestId(
      container,
      'skill-block-4'
    );
    fireEvent.mouseEnter(skillBlockTestElement);
    await waitFor(() =>
      expect(skillBlockTestElement.getAttribute('aria-expanded')).toContain(
        'true'
      )
    );
    fireEvent.mouseLeave(skillBlockTestElement);
    await waitFor(() =>
      expect(skillBlockTestElement.getAttribute('aria-expanded')).toContain(
        'false'
      )
    );
    expect(container).toMatchSnapshot();
  });

  test('Skill overflow item menu', async () => {
    const { container } = render(
      <Skill
        clickable
        expandable
        expandedContent={
          <div data-testid="test-expandable-content">Expandable content.</div>
        }
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        itemMenuButtonProps={{
          'data-testid': 'test-item-menu',
        }}
        menuItems={[
          {
            'data-testid': 'menu-item',
            text: 'Button 1',
            value: 'menu 1',
          },
          {
            'data-testid': 'menu-item',
            text: 'Button 2',
            value: 'menu 2',
          },
          {
            'data-testid': 'menu-item',
            type: MenuItemType.link,
            text: 'Link button 3',
            href: 'https://eightfold.ai',
            target: '_blank',
            value: 'menu 3',
          },
        ]}
        variant={SkillVariant.Block}
      />
    );
    const skillItemMenuTestElement: HTMLElement = getByTestId(
      container,
      'test-item-menu'
    );
    fireEvent.click(skillItemMenuTestElement);
    await waitFor(() =>
      expect(screen.getAllByTestId('menu-item')).toHaveLength(3)
    );
    expect(container).toMatchSnapshot();
  });
});
