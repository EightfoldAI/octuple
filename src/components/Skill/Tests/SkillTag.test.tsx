import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SkillTag, SkillSize, SkillStatus } from '..';
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
        classNames="test-skill"
        clickable
        color="#ffffff"
        data-testid="skill-tag-5"
        id="testSkill"
        label="test skill"
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
      (
        container.getElementsByClassName('skill')[0] as HTMLElement
      ).getAttribute('title')
    ).toBe('Test Skill');
    expect(container.getElementsByClassName('test-skill')).toBeTruthy();
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
});
