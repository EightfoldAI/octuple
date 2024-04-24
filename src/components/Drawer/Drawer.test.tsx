import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Drawer, DrawerVariant } from './';
import { Button, ButtonVariant, ButtonWidth } from '../Button';
import { IconName } from '../Icon';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

type DrawerTestProps = {
  onClose?: () => void;
  onDraggerClick?: () => void;
  onDraggerKeyDown?: () => void;
  variant?: DrawerVariant;
};

const DrawerTest: React.FC<DrawerTestProps> = ({
  onClose = () => {},
  onDraggerClick = () => {},
  onDraggerKeyDown = () => {},
  variant = DrawerVariant.Default,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const _onClose = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (!visible) {
      return;
    }
    setVisible(false);
  };
  const _onOpen = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (visible) {
      return;
    }
    setVisible(true);
  };
  return (
    <>
      <Button
        onClick={visible ? (e) => _onClose(e) : (e) => _onOpen(e)}
        text={visible ? 'Close drawer' : 'Open drawer'}
        variant={ButtonVariant.Primary}
      />
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        footer={
          <div>
            <Button
              buttonWidth={ButtonWidth.fill}
              onClick={(e) => _onClose(e)}
              text="Close"
              variant={ButtonVariant.Primary}
            />
          </div>
        }
        variant={variant}
        visible={visible}
        overlay={visible}
        maskClosable={visible}
        onVisibleChange={(v) => setVisible(v)}
        onClose={onClose}
        onDraggerClick={onDraggerClick}
        onDraggerKeyDown={onDraggerKeyDown}
      />
    </>
  );
};

describe('Drawer', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Drawer renders', () => {
    const { container } = render(
      <Drawer children={<div>Test drawer</div>} data-testid="testDrawer" />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Renders with default props', () => {
    const { getByTestId } = render(
      <Drawer children={<div>Test drawer</div>} data-testid="testDrawer" />
    );
    expect(getByTestId('testDrawer')).toBeTruthy();
  });

  test('Handles open and close', () => {
    const { getByText } = render(<DrawerTest />);
    fireEvent.click(getByText('Open drawer'));
    expect(getByText('Close drawer')).toBeTruthy();
    fireEvent.click(getByText('Close drawer'));
    expect(getByText('Open drawer')).toBeTruthy();
  });

  test('Handles DrawerVariant.Default', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        variant={DrawerVariant.Default}
      />
    );
    expect(
      getByTestId('testDrawer').classList.contains('modeless')
    ).toBeFalsy();
  });

  test('Handles DrawerVariant.Default modeless', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        variant={DrawerVariant.Default}
        maskClosable={false}
        overlay={false}
      />
    );
    expect(
      getByTestId('testDrawer').classList.contains('modeless')
    ).toBeTruthy();
  });

  test('Handles DrawerVariant.Hint', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        variant={DrawerVariant.Hint}
      />
    );
    expect(
      getByTestId('testDrawer').classList.contains('modeless')
    ).toBeFalsy();
  });

  test('Handles DrawerVariant.Hint modeless', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        variant={DrawerVariant.Hint}
        maskClosable={false}
        overlay={false}
      />
    );
    expect(
      getByTestId('testDrawer').classList.contains('modeless')
    ).toBeTruthy();
  });

  test('Drawer visibility', () => {
    const { getByTestId, rerender } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(getByTestId('testDrawer').classList.contains('visible')).toBe(true);
    rerender(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        variant={DrawerVariant.Default}
        visible={false}
      />
    );
    expect(getByTestId('testDrawer').classList.contains('visible')).toBe(false);
  });

  test('Drawer content', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer content</div>}
        title={<h1>Test drawer header</h1>}
        data-testid="testDrawer"
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName('body')[0].innerHTML
    ).toBe('<div>Test drawer content</div>');
    expect(
      getByTestId('testDrawer').getElementsByClassName('header-title')[0]
        .innerHTML
    ).toBe('<h1>Test drawer header</h1>');
  });

  test('Drawer onClose action', () => {
    const onEvent = jest.fn();
    const { container, getByTestId } = render(
      <Drawer
        children={<div>Test drawer content</div>}
        title={<h1>Test drawer header</h1>}
        data-testid="testDrawer"
        onClose={onEvent}
        variant={DrawerVariant.Hint}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName('body')[0].innerHTML
    ).toBe('<div>Test drawer content</div>');
    act(() => {
      fireEvent.click(
        getByTestId('testDrawer').getElementsByClassName('dragger')[0]
      );
    });
    expect(onEvent).toHaveBeenCalled();
  });

  test('Drawer onDraggerClick action', () => {
    const onEvent = jest.fn();
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer content</div>}
        title={<h1>Test drawer header</h1>}
        data-testid="testDrawer"
        onDraggerClick={onEvent}
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName('body')[0].innerHTML
    ).toBe('<div>Test drawer content</div>');
    act(() => {
      fireEvent.click(
        getByTestId('testDrawer').getElementsByClassName('dragger')[0]
      );
    });
    expect(onEvent).toHaveBeenCalled();
  });

  test('Drawer onDraggerKeyDown action', () => {
    const onEvent = jest.fn();
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer content</div>}
        title={<h1>Test drawer header</h1>}
        data-testid="testDrawer"
        onDraggerKeyDown={onEvent}
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName('body')[0].innerHTML
    ).toBe('<div>Test drawer content</div>');
    act(() => {
      fireEvent.keyDown(
        getByTestId('testDrawer').getElementsByClassName('dragger')[0],
        { key: 'Enter', code: 'Enter' }
      );
    });
    expect(onEvent).toHaveBeenCalled();
  });

  test('Drawer header actions exist', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        actionButtonOneProps={{
          classNames: 'header-action-button-1',
          iconProps: { path: IconName.mdiCogOutline },
        }}
        actionButtonTwoProps={{
          classNames: 'header-action-button-2',
          iconProps: { path: IconName.mdiHistory },
        }}
        actionButtonThreeProps={{
          classNames: 'header-action-button-3',
          iconProps: { path: IconName.mdiDatabaseArrowDownOutline },
        }}
        variant={DrawerVariant.Hint}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName(
        'header-action-button-1'
      )[0]
    ).toBeTruthy();
    expect(
      getByTestId('testDrawer').getElementsByClassName(
        'header-action-button-2'
      )[0]
    ).toBeTruthy();
    expect(
      getByTestId('testDrawer').getElementsByClassName(
        'header-action-button-3'
      )[0]
    ).toBeTruthy();
  });

  test('Drawer no body padding', () => {
    const { container, getByTestId } = render(
      <Drawer
        children={<div>Test drawer</div>}
        data-testid="testDrawer"
        bodyPadding={false}
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName('no-body-padding')[0]
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Drawer no header padding', () => {
    const { container, getByTestId } = render(
      <Drawer
        children={<div>Test drawer content</div>}
        title={<h1>Test drawer header</h1>}
        data-testid="testDrawer"
        headerPadding={false}
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').getElementsByClassName('no-header-padding')[0]
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Drawer overlay is hidden', () => {
    const { getByTestId } = render(
      <Drawer
        children={<div>Test drawer content</div>}
        title={<h1>Test drawer header</h1>}
        data-testid="testDrawer"
        overlay={false}
        variant={DrawerVariant.Default}
        visible
      />
    );
    expect(
      getByTestId('testDrawer').classList.contains('modeless')
    ).toBeTruthy();
  });

  test('Drawer footer', () => {
    const { getByTestId } = render(<DrawerTest />);
    expect(
      getByTestId('testDrawer').getElementsByClassName('footer')[0]
    ).toBeTruthy();
    expect(
      getByTestId('testDrawer').getElementsByClassName('button-primary')[0]
    ).toBeTruthy();
  });

  test('Should render content when renderContentAlways is true', () => {
    const { getByText } = render(
      <Drawer
        children={<div>Content is always rendered</div>}
        data-testid="testDrawer"
        renderContentAlways
        variant={DrawerVariant.Default}
      />
    );
    expect(getByText('Content is always rendered')).toBeTruthy();
  });

  test('Should not render content when renderContentAlways is false', () => {
    const { queryByText } = render(
      <Drawer
        children={<div>Content is not always rendered</div>}
        data-testid="testDrawer"
        renderContentAlways={false}
        variant={DrawerVariant.Default}
      />
    );
    expect(queryByText('Content is not always rendered')).toBeNull();
  });
});
