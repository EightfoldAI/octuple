import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SkeletonVariant } from '../../Skeleton';
import { SkillTag, SkillSize, SkillStatus, SkillAssessment } from '..';
import { Stack } from '../../Stack';
import {
  Button,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../../Button';
import { IconName } from '../../Icon';
import { List } from '../../List';
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

describe('SkillTag', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Skill tag renders', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is disabled', () => {
    const { container } = render(
      <SkillTag disabled id="testSkill" label="test skill" />
    );
    expect(container.getElementsByClassName('disabled')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is readonly', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" readonly />
    );
    expect(container.getElementsByClassName('read-only')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is closable', () => {
    const { container } = render(
      <SkillTag removable id="testSkill" label="test skill" />
    );
    expect(container.getElementsByClassName('button')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('medium')).toBeTruthy();
    expect(container.getElementsByClassName('white')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a large tag', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" size={SkillSize.Large} />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('large')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a small tag', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" size={SkillSize.Small} />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('small')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a xsmall tag', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" size={SkillSize.XSmall} />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('xsmall')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag with custom iconProps', () => {
    const { container } = render(
      <SkillTag
        iconProps={{
          path: IconName.mdiAccount,
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('icon')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag with custom suffixIconProps', () => {
    const { container } = render(
      <SkillTag
        suffixIconProps={{
          path: IconName.mdiAccount,
        }}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('suffix-icon')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag with custom inlineSvgProps', () => {
    const { container } = render(
      <SkillTag
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
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('svg')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag with custom suffixInlineSvgProps', () => {
    const { container } = render(
      <SkillTag
        suffixInlineSvgProps={{
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
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('suffix-svg')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag with endorseButtonProps', () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <SkillTag
        endorsement
        endorseButtonProps={{
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
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    const skillButtonElement = screen.getByTestId('test-endorse-button');
    fireEvent.click(skillButtonElement);
    expect(onClickMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test("Skill is a default tag that's removable", () => {
    const onRemoveMock = jest.fn();
    const { container } = render(
      <SkillTag
        removeButtonProps={{
          'data-testid': 'test-remove-button',
        }}
        removable
        onRemove={onRemoveMock}
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    const skillButtonElement = screen.getByTestId('test-remove-button');
    fireEvent.click(skillButtonElement);
    expect(onRemoveMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a highlight tag', () => {
    const { container } = render(
      <SkillTag
        id="testSkill"
        label="test skill"
        status={SkillStatus.Highlight}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('highlight')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a match tag', () => {
    const { container } = render(
      <SkillTag id="testSkill" label="test skill" status={SkillStatus.Match} />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('match')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Below}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below and upskilling assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.BelowUpskilling}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
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

  test('Skill is a exceed assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Exceed}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a exceed and upskilling assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.ExceedUpskilling}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
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

  test('Skill is a meet assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Meet}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a meet and upskilling assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.MeetUpskilling}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
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

  test('Skill is a upskilling assessment tag', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Upskilling}
        id="testSkill"
        label="test skill"
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Below}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-below-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-below-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a below and upskilling assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.BelowUpskilling}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
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

  test('Skill is a exceed assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Exceed}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-exceed-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-exceed-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a exceed and upskilling assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.ExceedUpskilling}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
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

  test('Skill is a meet assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Meet}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-meet-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-meet-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a meet and upskilling assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.MeetUpskilling}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
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

  test('Skill is a upskilling assessment tag and the icon is disabled', () => {
    const { container } = render(
      <SkillTag
        assessment={SkillAssessment.Upskilling}
        id="testSkill"
        label="test skill"
        showLabelAssessmentIcon={false}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(
      container.getElementsByClassName('skill-upskilling-background-color')
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName('skill-upskilling-icon-color')
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a required tag', () => {
    const { container } = render(
      <SkillTag
        id="testSkill"
        label="test skill"
        required
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('required')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a required tag with lineClamp and long text', () => {
    const { container } = render(
      <Stack direction="vertical" flexGap="l" style={{ width: 216 }}>
        <SkillTag
          id="testSkill"
          label="test skill with some really long text relative to its container"
          required
          lineClamp={1}
          status={SkillStatus.Default}
        />
      </Stack>
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('required')).toHaveLength(1);
    expect(container.getElementsByClassName('line-clamp')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a required tag with the required mark hidden', () => {
    const { container } = render(
      <SkillTag
        id="testSkill"
        label="test skill"
        required
        requiredMark={false}
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('required')).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill tag is bordered', () => {
    const { container } = render(
      <SkillTag
        id="testSkill"
        label="test skill"
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('bordered')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Skill tag has no border', () => {
    const { container } = render(
      <SkillTag
        id="testSkill"
        label="test skill"
        bordered={false}
        status={SkillStatus.Default}
      />
    );
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    expect(container.getElementsByClassName('bordered')).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  test('Skill is a clickable tag', () => {
    const SkillRenderer = (): JSX.Element => {
      const [total, setTotal] = useState<number>(0);
      return (
        <SkillTag
          clickable
          data-testid="skill-tag-1"
          id="testSkill"
          label={`test skill ${total}`}
          onClick={() => setTotal(12)}
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
      <SkillTag
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
      <SkillTag
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
      <SkillTag
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
      <SkillTag
        background="#333333"
        blockEndClassNames="test-block-end-class"
        blockEndStyles={{ marginTop: 20 }}
        blockStartClassNames="test-block-start-class"
        blockStartStyles={{ marginTop: 20 }}
        classNames="test-skill"
        clickable
        color="#ffffff"
        data-testid="skill-tag-5"
        fullWidth
        id="testSkill"
        label="test skill"
        removable
        status={SkillStatus.Highlight}
        title="Test Skill"
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
    expect(container.getElementsByClassName('full-width')).toBeTruthy();
    expect(
      container.getElementsByClassName('test-block-end-class')
    ).toBeTruthy();
    expect(
      container.getElementsByClassName('test-block-start-class')
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Skill is a default tag with customButtonProps', () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <SkillTag
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
    expect(container.getElementsByClassName('tag')).toHaveLength(1);
    const skillButtonElement = screen.getByTestId('test-custom-button');
    fireEvent.click(skillButtonElement);
    expect(onClickMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('Calls onKeyDown callback when a keydown event occurs', () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <SkillTag
        clickable
        id="testSkill"
        label="test skill"
        onKeyDown={onKeyDownMock}
      />
    );
    const skillTagTestElement = container.querySelector('.skill');
    fireEvent.keyDown(skillTagTestElement, { key: 'Enter' });
    expect(onKeyDownMock).toHaveBeenCalled();
  });

  test('Do not call onKeyDown callback when a keydown event occurs when readonly', () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <SkillTag
        clickable
        id="testSkill"
        label="test skill"
        onKeyDown={onKeyDownMock}
        readonly
      />
    );
    const skillTagTestElement = container.querySelector('.skill');
    fireEvent.keyDown(skillTagTestElement);
    expect(onKeyDownMock).not.toHaveBeenCalled();
  });

  test('SkillTag component uses mdiThumbUpOutline icon', () => {
    const { container } = render(
      <SkillTag
        endorseButtonProps={{
          counter: '2',
          ariaLabel: 'Endorsements',
        }}
        id="testSkill"
        label="test skill"
      />
    );
    const buttonElement = container.querySelector('.button');
    const iconElement = container.querySelector('.icon');
    expect(iconElement.innerHTML).toBe(
      '<svg viewBox="0 0 24 24" style="width: 16px; height: 16px;" role="presentation"><path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" style="fill: currentColor;"></path></svg>'
    );
    expect(buttonElement.classList.contains('round')).toBe(false);
  });

  test('Do not call endorsementButton click when SkillTag is disabled', () => {
    const endorsementButtonProps = {
      ariaLabel: 'Endorse',
      counter: '2',
      onClick: jest.fn(),
      'data-testid': 'endorsement-button-test',
    };
    const { getByTestId } = render(
      <SkillTag
        label="test skill"
        disabled
        endorseButtonProps={endorsementButtonProps}
      />
    );
    const endorsementButton = getByTestId('endorsement-button-test');
    fireEvent.click(endorsementButton);
    expect(endorsementButtonProps.onClick).toHaveBeenCalledTimes(0);
  });

  test('Do not call customButton click when SkillTag is disabled', () => {
    const customButtonProps = {
      ariaLabel: 'Custom',
      iconProps: { path: IconName.mdiAccount },
      onClick: jest.fn(),
      'data-testid': 'custom-button-test',
    };
    const { getByTestId } = render(
      <SkillTag
        label="test skill"
        disabled
        customButtonProps={customButtonProps}
      />
    );
    const customButton = getByTestId('custom-button-test');
    fireEvent.click(customButton);
    expect(customButtonProps.onClick).toHaveBeenCalledTimes(0);
  });

  test('Do not call onRemove when SkillTag is disabled', () => {
    const mockOnRemoveClick = jest.fn();
    const removeButtonProps = {
      ariaLabel: 'Remove',
      onClick: jest.fn(),
      'data-testid': 'remove-button-test',
    };
    const { getByTestId } = render(
      <SkillTag
        label="test skill"
        disabled
        onRemove={mockOnRemoveClick}
        removable
        removeButtonProps={removeButtonProps}
      />
    );
    const customButton = getByTestId('remove-button-test');
    fireEvent.click(customButton);
    expect(removeButtonProps.onClick).toHaveBeenCalledTimes(0);
    expect(mockOnRemoveClick).toHaveBeenCalledTimes(0);
  });

  test('Do not call onClick when SkillTag is disabled', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <SkillTag
        label="test skill"
        disabled
        clickable
        onClick={mockOnClick}
        data-testid="skill-tag-test"
      />
    );
    const skillTagElement = getByTestId('skill-tag-test');
    fireEvent.click(skillTagElement);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});
