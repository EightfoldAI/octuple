import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { act } from 'react-dom/test-utils';
import { SkillAssessment, SkillBlock, SkillStatus } from '..';
import { IconName } from '../../Icon';
import { MenuItemType } from '../../Menu';
import { SkeletonVariant } from '../../Skeleton';
import { Slider, SliderSize } from '../../Slider';
import { Stack } from '../../Stack';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

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

describe('SkillBlock', () => {
  let originalAddEventListener: any;
  let originalRemoveEventListener: any;
  let scrollEventHandler: any;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();

    // Mock the window.addEventListener and window.removeEventListener methods
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    // Create a mock scroll event handler
    scrollEventHandler = jest.fn();
  });

  afterAll(() => {
    // Restore the original window methods
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Skill block renders', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('white')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill block is disabled', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        disabled
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('disabled')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill block is readonly', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        readonly
      />
    );
    expect(container.getElementsByClassName('read-only')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill block uses custom props', () => {
    const highlightButtonProps = {
      ariaLabel: 'Highlight',
      classNames: 'highlight-button-test',
      onClick: jest.fn(),
      'data-testid': 'highlight-button-test',
    };
    const { container } = render(
      <SkillBlock
        animate={false}
        background="#333333"
        blockEndClassNames="test-block-end-class"
        blockEndStyles={{ marginTop: 20 }}
        blockStartClassNames="test-block-start-class"
        blockStartStyles={{ marginTop: 20 }}
        classNames="test-skill"
        clickable
        color="#ffffff"
        content={getStaticSlider()}
        contentClassNames="test-content"
        data-testid="skill-block"
        endorsement
        expandable
        expanded
        expandedContent={
          <div data-testid="test-expandable-content">Expandable content.</div>
        }
        expandedContentClassNames="test-expanded-content"
        extraContent={
          <div data-testid="test-extra-content">Extra content.</div>
        }
        extraContentClassNames="test-extra-content"
        footer={<div data-testid="test-footer-content">Footer content.</div>}
        footerClassNames="test-footer-content"
        highlightButtonProps={highlightButtonProps}
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
      (container.getElementsByClassName('skill')[0] as HTMLElement).style.width
    ).toBe('840px');
    expect(
      (container.getElementsByClassName('block-end')[0] as HTMLElement).style
        .marginTop
    ).toBe('20px');
    expect(
      (container.getElementsByClassName('block-start')[0] as HTMLElement).style
        .marginTop
    ).toBe('20px');
    expect(
      (
        container.getElementsByClassName('skill')[0] as HTMLElement
      ).getAttribute('title')
    ).toBe('Test Skill');
    expect(container.getElementsByClassName('test-skill')).toBeTruthy();
    expect(container.getElementsByClassName('test-content')).toBeTruthy();
    expect(container.getElementsByClassName('highlight')).toBeTruthy();
    expect(
      container.getElementsByClassName('test-block-end-class')
    ).toBeTruthy();
    expect(
      container.getElementsByClassName('test-block-start-class')
    ).toBeTruthy();
    expect(
      container.getElementsByClassName('test-expanded-content')
    ).toBeTruthy();
    expect(container.getElementsByClassName('test-extra-content')).toBeTruthy();
    expect(
      container.getElementsByClassName('test-footer-content')
    ).toBeTruthy();
    expect(container.getElementsByClassName('divider')).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block with custom iconProps', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        iconProps={{
          path: IconName.mdiAccount,
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('icon')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block with custom inlineSvgProps', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        inlineSvgProps={{
          height: '18px',
          hideBrokenIcon: false,
          showSkeleton: true,
          skeletonVariant: SkeletonVariant.Rounded,
          url: 'https://static.vscdn.net/images/learning-opp.svg',
          width: '18px',
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('svg')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block with endorseButtonProps', () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        endorseButtonProps={{
          iconProps: { path: IconName.mdiThumbUpOutline },
          counter: '2',
          ariaLabel: 'Endorsements',
          onClick: onClickMock,
          'data-testid': 'test-endorse-button',
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    const skillButtonElement = screen.getByTestId('test-endorse-button');
    fireEvent.click(skillButtonElement);
    expect(onClickMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block with highlightButtonProps', () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        highlightButtonProps={{
          ariaLabel: 'Highlight',
          onClick: onClickMock,
          'data-testid': 'test-highlight-button',
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    const skillButtonElement = screen.getByTestId('test-highlight-button');
    fireEvent.click(skillButtonElement);
    expect(onClickMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default block with customButtonProps', () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        customButtonProps={{
          iconProps: { path: IconName.mdiOpenInNew },
          ariaLabel: 'Open',
          onClick: onClickMock,
          'data-testid': 'test-custom-button',
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    const skillButtonElement = screen.getByTestId('test-custom-button');
    fireEvent.click(skillButtonElement);
    expect(onClickMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a highlight block', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Highlight}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('highlight')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a match block', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Match}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('match')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Below}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below and upskilling assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.BelowUpskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-icon-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a exceed assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Exceed}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a exceed and upskilling assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.ExceedUpskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-icon-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a meet assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Meet}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a meet and upskilling assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.MeetUpskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-icon-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a upskilling assessment block and the icon is enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Upskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Below}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-below-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below and upskilling assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.BelowUpskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-below-icon-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a exceed assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Exceed}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-exceed-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a exceed and upskilling assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.ExceedUpskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-exceed-icon-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a meet assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Meet}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-meet-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a meet and upskilling assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.MeetUpskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-meet-icon-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a upskilling assessment block and the icon is not enabled', () => {
    const { container } = render(
      <SkillBlock
        assessment={SkillAssessment.Upskilling}
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a required block', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        required
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('required')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a required block with lineClamp and long text', () => {
    const { container } = render(
      <Stack direction="vertical" flexGap="l" style={{ width: 216 }}>
        <SkillBlock
          content={getStaticSlider()}
          id="testSkill"
          label="test skill with some really long text relative to its container"
          required
          lineClamp={1}
          status={SkillStatus.Default}
        />
      </Stack>
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('required')).toHaveLength(1);
    expect(container.getElementsByClassName('line-clamp')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a required block with the required mark hidden', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        required
        requiredMark={false}
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('required')).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill block is bordered', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('bordered')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill block has no border', () => {
    const { container } = render(
      <SkillBlock
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
        bordered={false}
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('block')).toHaveLength(1);
    expect(container.getElementsByClassName('bordered')).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a clickable block', async () => {
    const SkillRenderer = (): JSX.Element => {
      const [total, setTotal] = useState<number>(0);
      return (
        <SkillBlock
          clickable
          content={getStaticSlider()}
          data-testid="skill-block-1"
          id="testSkill"
          label={`test skill ${total}`}
          onClick={() => {
            setTotal(12);
          }}
        />
      );
    };
    const { container } = render(<SkillRenderer />);
    expect(container.getElementsByClassName('clickable')).toHaveLength(1);
    expect(
      container.getElementsByClassName('clickable')[0].getAttribute('role')
    ).toBe('button');
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

  test('Skill block has extra content', async () => {
    const { container } = render(
      <SkillBlock
        extraContent={
          <div data-testid="test-extra-content">Expandable content.</div>
        }
        content={getStaticSlider()}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('divider')).toHaveLength(1);
    expect(container.getElementsByClassName('extra-content')).toHaveLength(1);
  });

  test('Skill is an expandable block', async () => {
    const { container } = render(
      <SkillBlock
        clickable
        expandable
        expandedContent={
          <div data-testid="test-expandable-content">Expandable content.</div>
        }
        content={getStaticSlider()}
        data-testid="skill-block-2"
        id="testSkill"
        label="test skill"
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
  });

  test('Skill closes an expandable block', async () => {
    const { container } = render(
      <SkillBlock
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
  });

  test('Skill is a hoverable, expandable block', async () => {
    const { container } = render(
      <SkillBlock
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
      />
    );

    const skillBlockTestElement: HTMLElement = getByTestId(
      container,
      'skill-block-4'
    );
    expect(skillBlockTestElement.getAttribute('role')).toBe('button');
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
  });

  test('Skill overflow item menu', async () => {
    const { container } = render(
      <SkillBlock
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

  test('Sets aria-expanded attribute correctly when expandable and variant is Block', async () => {
    const { container } = render(
      <SkillBlock
        animate={false}
        clickable
        content={getStaticSlider()}
        expandable
        id="testSkill"
        label="test skill"
        expanded={false}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    const skillBlockClickableTestElement =
      container.querySelector('.background');
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(skillBlockClickableTestElement);
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(skillBlockClickableTestElement);
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toBe('false');
  });

  test('Calls updateDimension callback when height changes', () => {
    let updateDimensionCalled = false;
    const mockUpdateDimension = (async?: boolean) => {
      updateDimensionCalled = async;
    };
    const { rerender } = render(
      <SkillBlock
        animate={false}
        clickable
        content={getStaticSlider()}
        expandable
        id="testSkill"
        label="test skill"
        updateDimension={() => mockUpdateDimension}
      />
    );
    expect(updateDimensionCalled).toBe(false);
    act(() => {
      rerender(
        <SkillBlock
          animate={false}
          clickable
          content={getStaticSlider()}
          expandable
          id="testSkill"
          label="test skill"
          updateDimension={(async = true) => mockUpdateDimension(async)}
        />
      );
    });
    expect(updateDimensionCalled).toBe(true);
  });

  test('Removes aria-expanded attribute when props are not set', () => {
    const { container } = render(
      <SkillBlock content={getStaticSlider()} label="test skill" />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    expect(skillBlockTestElement.hasAttribute('aria-expanded')).toBe(false);
  });

  test('Should remove the "aria-expanded" attribute when not expandable', () => {
    const { container } = render(
      <SkillBlock content={getStaticSlider()} expandable={false} />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    expect(skillBlockTestElement.hasAttribute('aria-expanded')).toBe(false);
  });

  test('Calls onFocus callback when a focus event occurs', () => {
    const onFocusMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onFocus={onFocusMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.focus(skillBlockTestElement);
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toBe('true');
    expect(onFocusMock).toHaveBeenCalled();
  });

  test('Do not call onFocus callback when a focus event occurs when readonly', () => {
    const onFocusMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onFocus={onFocusMock}
        readonly
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.focus(skillBlockTestElement);
    expect(onFocusMock).not.toHaveBeenCalled();
  });

  test('Calls onBlur callback when a blur event occurs', () => {
    const onBlurMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        expanded
        id="testSkill"
        label="test skill"
        onBlur={onBlurMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.blur(skillBlockTestElement);
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toBe('false');
    expect(onBlurMock).toHaveBeenCalled();
  });

  test('Do not call onBlur callback when a blur event occurs when readonly', () => {
    const onBlurMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onBlur={onBlurMock}
        readonly
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.blur(skillBlockTestElement);
    expect(onBlurMock).not.toHaveBeenCalled();
  });

  test('Calls onKeyDown callback when a keydown event occurs', () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        clickable
        content={getStaticSlider()}
        expandable
        id="testSkill"
        label="test skill"
        onKeyDown={onKeyDownMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.keyDown(skillBlockTestElement, { key: 'Enter' });
    expect(skillBlockTestElement.getAttribute('aria-expanded')).toBe('true');
    expect(onKeyDownMock).toHaveBeenCalled();
  });

  test('Do not call onKeyDown callback when a keydown event occurs when readonly', () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        clickable
        content={getStaticSlider()}
        expandable
        id="testSkill"
        label="test skill"
        onKeyDown={onKeyDownMock}
        readonly
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.keyDown(skillBlockTestElement);
    expect(onKeyDownMock).not.toHaveBeenCalled();
  });

  test('Does not scroll the window when Space key is pressed', async () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        clickable
        content={getStaticSlider()}
        expandable
        id="testSkill"
        label="test skill"
        onKeyDown={onKeyDownMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    const mockEvent = {
      key: 'Space',
    };
    fireEvent.keyDown(skillBlockTestElement, mockEvent);
    expect(onKeyDownMock).toHaveBeenCalled();
    expect(scrollEventHandler).not.toHaveBeenCalled();
    expect(window.addEventListener).not.toHaveBeenCalledWith(
      'scroll',
      scrollEventHandler
    );
  });

  test('Does not call preventDefault for other keys', () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        clickable
        content={getStaticSlider()}
        expandable
        id="testSkill"
        label="test skill"
        onKeyDown={onKeyDownMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    const mockEvent = {
      key: 'Enter',
      preventDefault: jest.fn(),
    };
    fireEvent.keyDown(skillBlockTestElement, mockEvent);
    expect(onKeyDownMock).toHaveBeenCalled();
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  test('Calls onMouseEnter callback when mouse enters the element', () => {
    const onMouseEnterMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onMouseEnter={onMouseEnterMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.mouseEnter(skillBlockTestElement);
    expect(onMouseEnterMock).toHaveBeenCalled();
  });

  test('Do not call onMouseEnter callback when mouse enters the element and readonly', () => {
    const onMouseEnterMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onMouseEnter={onMouseEnterMock}
        readonly
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.mouseEnter(skillBlockTestElement);
    expect(onMouseEnterMock).not.toHaveBeenCalled();
  });

  test('Calls onMouseLeave callback when mouse leaves the element', () => {
    const onMouseLeaveMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onMouseLeave={onMouseLeaveMock}
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.mouseLeave(skillBlockTestElement);
    expect(onMouseLeaveMock).toHaveBeenCalled();
  });

  test('Do not call onMouseLeave callback when mouse leaves the element and readonly', () => {
    const onMouseLeaveMock = jest.fn();
    const { container } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        hoverable
        expandable
        id="testSkill"
        label="test skill"
        onMouseLeave={onMouseLeaveMock}
        readonly
      />
    );
    const skillBlockTestElement = container.querySelector('.skill');
    fireEvent.mouseLeave(skillBlockTestElement);
    expect(onMouseLeaveMock).not.toHaveBeenCalled();
  });

  test('Should render menu buttons correctly when SkillBlock width is large', () => {
    const endorsementButtonProps = {
      ariaLabel: 'Endorse',
      onClick: jest.fn(),
      'data-testid': 'endorsement-button-test',
    };
    const highlightButtonProps = {
      ariaLabel: 'Highlight',
      onClick: jest.fn(),
      'data-testid': 'highlight-button-test',
    };
    const customButtonProps = {
      ariaLabel: 'Custom',
      iconProps: { path: IconName.mdiAccount },
      onClick: jest.fn(),
      'data-testid': 'custom-button-test',
    };
    const itemMenuButtonProps = {
      ariaLabel: 'Overflow',
      classNames: 'item-menu-button-test',
      onClick: jest.fn(),
      'data-testid': 'item-menu-button-test',
    };
    const { container, getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        endorsement={true}
        endorseButtonProps={endorsementButtonProps}
        highlightButtonProps={highlightButtonProps}
        customButtonProps={customButtonProps}
        status={SkillStatus.Highlight}
        itemMenuButtonProps={itemMenuButtonProps}
      />
    );
    const endorsementButton = getByTestId('endorsement-button-test');
    const highlightButton = getByTestId('highlight-button-test');
    const customButton = getByTestId('custom-button-test');
    expect(endorsementButton).toBeTruthy();
    expect(endorsementButton.getAttribute('aria-label')).toBe('Endorse');
    fireEvent.click(endorsementButton);
    expect(endorsementButtonProps.onClick).toHaveBeenCalledTimes(1);

    expect(highlightButton).toBeTruthy();
    expect(highlightButton.getAttribute('aria-label')).toBe('Highlight');
    fireEvent.click(highlightButton);
    expect(highlightButtonProps.onClick).toHaveBeenCalledTimes(1);

    expect(customButton).toBeTruthy();
    expect(customButton.getAttribute('aria-label')).toBe('Custom');
    fireEvent.click(customButton);
    expect(customButtonProps.onClick).toHaveBeenCalledTimes(1);

    expect(
      container.getElementsByClassName('item-menu-button-test')
    ).toHaveLength(0);
  });

  test('Should render menu buttons correctly when SkillBlock width is small', async () => {
    const endorsementButtonProps = {
      ariaLabel: 'Endorse',
      classNames: 'endorsement-button-test',
      onClick: jest.fn(),
      'data-testid': 'endorsement-button-test',
    };
    const highlightButtonProps = {
      ariaLabel: 'Highlight',
      classNames: 'highlight-button-test',
      onClick: jest.fn(),
      'data-testid': 'highlight-button-test',
    };
    const customButtonProps = {
      ariaLabel: 'Custom',
      classNames: 'custom-button-test',
      iconProps: { path: IconName.mdiAccount },
      onClick: jest.fn(),
      'data-testid': 'custom-button-test',
    };
    const itemMenuButtonProps = {
      ariaLabel: 'Overflow',
      classNames: 'item-menu-button-test',
      onClick: jest.fn(),
      'data-testid': 'item-menu-button-test',
    };
    const { container, getByTestId } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        contentClassNames="test-content"
        itemMenuOnly
        reflow
        label="test skill"
        labelWidth={100}
        endorsement={true}
        endorseButtonProps={endorsementButtonProps}
        highlightButtonProps={highlightButtonProps}
        customButtonProps={customButtonProps}
        status={SkillStatus.Highlight}
        itemMenuButtonProps={itemMenuButtonProps}
        maxWidth={340}
        minWidth={340}
        width={340}
      />
    );

    await waitFor(() =>
      expect(getByTestId('item-menu-button-test')).toBeTruthy()
    );

    const itemMenuButton = getByTestId('item-menu-button-test');

    expect(
      container.getElementsByClassName('block-start')[0].getAttribute('style')
    ).toContain('width: 100px');
    expect(
      container.getElementsByClassName('test-content')[0].getAttribute('style')
    ).toContain('order: 3');
    expect(
      container.getElementsByClassName('block-end')[0].getAttribute('style')
    ).toContain('order: 2');

    expect(
      container.getElementsByClassName('endorsement-button-test')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('highlight-button-test')
    ).toHaveLength(0);
    expect(container.getElementsByClassName('custom-button-test')).toHaveLength(
      0
    );

    expect(itemMenuButton).toBeTruthy();
    expect(itemMenuButton.getAttribute('aria-label')).toBe('Overflow');
    fireEvent.click(itemMenuButton);

    await waitFor(() => screen.getByText('Endorse'));

    const option1 = screen.getByText('Endorse');
    const option2 = screen.getByText('Highlight');
    const option3 = screen.getByText('Custom');
    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
    expect(option3).toBeTruthy();
  });

  test('Should render menu buttons correctly when SkillBlock width is small and has custom menu items', async () => {
    const endorsementButtonProps = {
      ariaLabel: 'Endorse',
      classNames: 'endorsement-button-test',
      onClick: jest.fn(),
      'data-testid': 'endorsement-button-test',
    };
    const highlightButtonProps = {
      ariaLabel: 'Highlight',
      classNames: 'highlight-button-test',
      onClick: jest.fn(),
      'data-testid': 'highlight-button-test',
    };
    const customButtonProps = {
      ariaLabel: 'Custom',
      classNames: 'custom-button-test',
      iconProps: { path: IconName.mdiAccount },
      onClick: jest.fn(),
      'data-testid': 'custom-button-test',
    };
    const itemMenuButtonProps = {
      ariaLabel: 'Overflow',
      classNames: 'item-menu-button-test',
      onClick: jest.fn(),
      'data-testid': 'item-menu-button-test',
    };
    const { container, getByTestId } = render(
      <SkillBlock
        animate={false}
        content={getStaticSlider()}
        contentClassNames="test-content"
        itemMenuOnly
        reflow
        label="test skill"
        labelWidth={100}
        endorsement={true}
        endorseButtonProps={endorsementButtonProps}
        highlightButtonProps={highlightButtonProps}
        customButtonProps={customButtonProps}
        status={SkillStatus.Highlight}
        itemMenuButtonProps={itemMenuButtonProps}
        maxWidth={340}
        minWidth={340}
        width={340}
        menuItems={[
          {
            'data-testid': 'menu-item',
            text: 'Button 1',
          },
          {
            'data-testid': 'menu-item',
            text: 'Button 2',
          },
          {
            'data-testid': 'menu-item',
            type: MenuItemType.link,
            text: 'Link button 3',
            href: 'https://eightfold.ai',
            target: '_blank',
          },
        ]}
      />
    );

    await waitFor(() =>
      expect(getByTestId('item-menu-button-test')).toBeTruthy()
    );

    const itemMenuButton = getByTestId('item-menu-button-test');

    expect(
      container.getElementsByClassName('endorsement-button-test')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('highlight-button-test')
    ).toHaveLength(0);
    expect(container.getElementsByClassName('custom-button-test')).toHaveLength(
      0
    );

    expect(itemMenuButton).toBeTruthy();
    expect(itemMenuButton.getAttribute('aria-label')).toBe('Overflow');
    fireEvent.click(itemMenuButton);

    await waitFor(() => screen.getByText('Endorse'));

    const option1 = screen.getByText('Endorse');
    const option2 = screen.getByText('Highlight');
    const option3 = screen.getByText('Custom');
    const option4 = screen.getByText('Button 1');
    const option5 = screen.getByText('Button 2');
    const option6 = screen.getByText('Link button 3');
    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
    expect(option3).toBeTruthy();
    expect(option4).toBeTruthy();
    expect(option5).toBeTruthy();
    expect(option6).toBeTruthy();
  });

  test('Should render endorsementMenuButton correctly', () => {
    const endorsementButtonProps = {
      ariaLabel: 'Endorse',
      onClick: jest.fn(),
      'data-testid': 'endorsement-button-test',
    };
    const { getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        endorsement={true}
        endorseButtonProps={endorsementButtonProps}
      />
    );
    const endorsementButton = getByTestId('endorsement-button-test');
    expect(endorsementButton).toBeTruthy();
    expect(endorsementButton.getAttribute('aria-label')).toBe('Endorse');
    fireEvent.click(endorsementButton);
    expect(endorsementButtonProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('Should render highlightMenuButton correctly', () => {
    const highlightButtonProps = {
      ariaLabel: 'Highlight',
      onClick: jest.fn(),
      'data-testid': 'highlight-button-test',
    };
    const { getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        status={SkillStatus.Highlight}
        highlightButtonProps={highlightButtonProps}
      />
    );
    const highlightButton = getByTestId('highlight-button-test');
    expect(highlightButton).toBeTruthy();
    expect(highlightButton.getAttribute('aria-label')).toBe('Highlight');
    expect(highlightButton.innerHTML).toBe(
      '<span class="icon icon-wrapper" role="presentation"><svg viewBox="0 0 24 24" style="width: 16px; height: 16px;" role="presentation"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" style="fill: currentColor;"></path></svg></span>'
    );
    fireEvent.click(highlightButton);
    expect(highlightButtonProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('Should render customMenuButton correctly', () => {
    const customButtonProps = {
      ariaLabel: 'Custom',
      iconProps: { path: IconName.mdiAccount },
      onClick: jest.fn(),
      'data-testid': 'custom-button-test',
    };
    const { getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        customButtonProps={customButtonProps}
      />
    );
    const customButton = getByTestId('custom-button-test');
    expect(customButton).toBeTruthy();
    expect(customButton.getAttribute('aria-label')).toBe('Custom');
    fireEvent.click(customButton);
    expect(customButtonProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('Do not call endorsementMenuButton click when SkillBlock is disabled', () => {
    const endorsementButtonProps = {
      ariaLabel: 'Endorse',
      onClick: jest.fn(),
      'data-testid': 'endorsement-button-test',
    };
    const { getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        disabled
        endorseButtonProps={endorsementButtonProps}
      />
    );
    const endorsementButton = getByTestId('endorsement-button-test');
    fireEvent.click(endorsementButton);
    expect(endorsementButtonProps.onClick).toHaveBeenCalledTimes(0);
  });

  test('Do not call highlightMenuButton click when SkillBlock is disabled', () => {
    const highlightButtonProps = {
      ariaLabel: 'Highlight',
      onClick: jest.fn(),
      'data-testid': 'highlight-button-test',
    };
    const { getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        disabled
        highlightButtonProps={highlightButtonProps}
      />
    );
    const highlightButton = getByTestId('highlight-button-test');
    fireEvent.click(highlightButton);
    expect(highlightButtonProps.onClick).toHaveBeenCalledTimes(0);
  });

  test('Do not call customMenuButton click when SkillBlock is disabled', () => {
    const customButtonProps = {
      ariaLabel: 'Custom',
      iconProps: { path: IconName.mdiAccount },
      onClick: jest.fn(),
      'data-testid': 'custom-button-test',
    };
    const { getByTestId } = render(
      <SkillBlock
        content={getStaticSlider()}
        label="test skill"
        disabled
        customButtonProps={customButtonProps}
      />
    );
    const customButton = getByTestId('custom-button-test');
    fireEvent.click(customButton);
    expect(customButtonProps.onClick).toHaveBeenCalledTimes(0);
  });
});
