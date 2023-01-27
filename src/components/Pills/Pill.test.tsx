import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Pill, PillThemeName, PillType } from '.';
import { IconName } from '../Icon';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Pill', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Pill should render normally', () => {
    const { container } = render(<Pill label="A pill" />);
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Pill should render as closable', () => {
    const { container } = render(
      <Pill label="A closable pill" type={PillType.closable} />
    );
    expect(container.getElementsByClassName('close-button')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Pill should render with icon', () => {
    const { container } = render(
      <Pill
        label="A pill with icon"
        iconProps={{
          path: IconName.mdiInformationOutline,
        }}
      />
    );
    expect(container.getElementsByClassName('icon')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Pill should render with button', () => {
    const { container } = render(
      <Pill
        label="A button pill"
        pillButtonProps={{
          iconProps: { path: IconName.mdiThumbUpOutline },
          text: '2',
          ariaLabel: 'Thumbs up',
        }}
        type={PillType.withButton}
      />
    );
    expect(container.getElementsByClassName('button')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Pill should render with a theme', () => {
    const themes: PillThemeName[] = [
      'red',
      'redOrange',
      'orange',
      'yellow',
      'yellowGreen',
      'green',
      'blueGreen',
      'blue',
      'blueViolet',
      'violet',
      'violetRed',
      'grey',
      'white',
    ];
    const { container } = render(
      <Pill label="A themed pill" theme={themes[12]} />
    );
    expect(container.getElementsByClassName('white')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
});
