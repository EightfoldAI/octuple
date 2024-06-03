import React, { createContext } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ConfigProvider, useConfig } from './ConfigProvider';
import { useParentComponents } from './ParentComponentsContext';
import DisabledContext from './DisabledContext';
import GradientContext from './GradientContext';
import { IConfigContext } from './ConfigProvider.types';
import ShapeContext, { Shape } from './ShapeContext';
import SizeContext, { Size } from './SizeContext';
import esES from '../Locale/es_ES';
import iconSet from '../Icon/selection.json';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const ConfigContext: React.Context<Partial<IConfigContext>> = createContext<
  Partial<IConfigContext>
>({});

describe('ConfigProvider', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders its children', () => {
    const { getByTestId } = render(
      <ConfigProvider>
        <div data-testid="test-child" />
      </ConfigProvider>
    );
    expect(getByTestId('test-child')).toBeTruthy();
  });

  test('Provides the theme if props are provided', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider themeOptions={{ name: 'red' }}>
          {children}
        </ConfigProvider>
      ),
    });
    expect(result.current.themeOptions).toEqual({ name: 'red' });
  });

  test('Provides the no theme if no props are provided', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.themeOptions).toEqual(undefined);
  });

  test('Provides fontOptions config if provided as prop', () => {
    const fontOptions = {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontStack: 'sans-serif',
    };
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider fontOptions={{ customFont: fontOptions }}>
          {children}
        </ConfigProvider>
      ),
    });
    expect(result.current.fontOptions.customFont).toEqual(fontOptions);
  });

  test('Provides the parent component names if provided as a prop', () => {
    const { result } = renderHook(() => useParentComponents(), {
      wrapper: ({ children }) => (
        <ConfigProvider componentName="Parent1">
          <ConfigProvider componentName="Parent2">{children}</ConfigProvider>
        </ConfigProvider>
      ),
    });
    expect(result.current.length).toEqual(2);
    expect(result.current[0]).toEqual('Parent1');
    expect(result.current[1]).toEqual('Parent2');
  });

  test('Provides no parent component names if not provided as a prop', () => {
    const { result } = renderHook(() => useParentComponents(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.length).toEqual(0);
  });

  test('Provides disabled config if provided as prop', () => {
    const { getByTestId } = render(
      <ConfigProvider disabled>
        <DisabledContext.Consumer>
          {(disabled): JSX.Element => (
            <div data-testid="disabled">{disabled.toString()}</div>
          )}
        </DisabledContext.Consumer>
      </ConfigProvider>
    );
    expect(getByTestId('disabled').textContent).toBe('true');
  });

  test('Provides default disabled config if not provided as prop', () => {
    const { getByTestId } = render(
      <ConfigProvider disabled={null}>
        <DisabledContext.Consumer>
          {(disabled): JSX.Element => (
            <div data-testid="disabled">{disabled.toString()}</div>
          )}
        </DisabledContext.Consumer>
      </ConfigProvider>
    );
    expect(getByTestId('disabled').textContent).toBe('false');
  });

  test('Provides gradient config if provided as prop', () => {
    const { getByTestId } = render(
      <ConfigProvider gradient>
        <GradientContext.Consumer>
          {(gradient): JSX.Element => (
            <div data-testid="gradient">{gradient.toString()}</div>
          )}
        </GradientContext.Consumer>
      </ConfigProvider>
    );
    expect(getByTestId('gradient').textContent).toBe('true');
  });

  test('Provides default gradient config if not provided as prop', () => {
    const { getByTestId } = render(
      <ConfigProvider gradient={null}>
        <GradientContext.Consumer>
          {(gradient): JSX.Element => (
            <div data-testid="gradient">{gradient.toString()}</div>
          )}
        </GradientContext.Consumer>
      </ConfigProvider>
    );
    expect(getByTestId('gradient').textContent).toBe('false');
  });

  test('Provides focusVisibleOptions if props are provided', () => {
    const testScope = document.createElement('div'); // create a dummy element
    const focusVisibleOptions = {
      focusVisible: false,
      focusVisibleElement: testScope, // set the testScope element as the focusVisibleElement
    };
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider focusVisibleOptions={focusVisibleOptions}>
          <div>{children}</div>
        </ConfigProvider>
      ),
    });
    expect(result.current.focusVisibleOptions).toEqual(focusVisibleOptions);
  });

  test('Provides default focusVisibleOptions if no props are provided', () => {
    const defaultFocusVisibleOptions = {
      focusVisible: true,
      focusVisibleElement: document.documentElement,
    };
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.focusVisibleOptions).toEqual(
      defaultFocusVisibleOptions
    );
  });

  test('Provides shape config if provided as prop', () => {
    const shape = Shape.Underline;
    const { getByTestId } = render(
      <ConfigProvider shape={shape}>
        <ShapeContext.Consumer>
          {(shape: Shape): JSX.Element => (
            <div data-testid="shape">{shape.toString()}</div>
          )}
        </ShapeContext.Consumer>
      </ConfigProvider>
    );
    expect(getByTestId('shape').textContent).toEqual(shape);
  });

  test('Provides no shape config if not provided as prop or context', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.shape).toEqual(undefined);
  });

  test('Provides size config if provided as prop', () => {
    const size = Size.Large;
    const { getByTestId } = render(
      <ConfigProvider size={size}>
        <SizeContext.Consumer>
          {(size: Size): JSX.Element => (
            <div data-testid="size">{size.toString()}</div>
          )}
        </SizeContext.Consumer>
      </ConfigProvider>
    );
    expect(getByTestId('size').textContent).toEqual(size);
  });

  test('Provides no size config if not provided as prop or context', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.size).toEqual(undefined);
  });

  test('Provides locale config if provided as prop', () => {
    const locale = esES;
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider locale={locale}>{children}</ConfigProvider>
      ),
    });
    expect(result.current.locale).toEqual(locale);
  });

  test('Provides no locale config if not provided as prop or context', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.locale).toEqual(undefined);
  });

  test('Provides icomoon icon set if provided as prop', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider icomoonIconSet={iconSet}>{children}</ConfigProvider>
      ),
    });
    expect(result.current.icomoonIconSet).toEqual(iconSet);
  });

  test('Provides no icomoon icon set if not provided as prop or context', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.icomoonIconSet).toEqual({});
  });

  test('Provides form context values if provided as prop', () => {
    const formProps = {
      validateMessages: {
        required: 'Test is required.',
      },
      requiredMark: true,
      colon: true,
    };
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider form={formProps}>{children}</ConfigProvider>
      ),
    });
    expect(result.current.form).toEqual(formProps);
  });

  test('Provides no form context values if not provided as prop or context', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });
    expect(result.current.form).toEqual(undefined);
  });
});
