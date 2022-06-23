import MockDate from 'mockdate';
import type { ReactElement } from 'react';
import { StrictMode } from 'react';
import { act } from 'react-dom/test-utils';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { _rs as onLibResize } from '../shared/ResizeObserver/utils/observerUtil';

export function setMockDate(dateString = '2022-09-07T03:30:07.795'): void {
    MockDate.set(dateString);
}

export function resetMockDate(): void {
    MockDate.reset();
}

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0): Promise<void> => {
    await act(async () => {
        await new Promise((resolve) => {
            globalTimeout(resolve, timeout);
        });
    });
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: StrictMode, ...options });

export { customRender as render };

export const triggerResize = (target: Element): void => {
    const originGetBoundingClientRect: () => DOMRect =
        target.getBoundingClientRect;

    target.getBoundingClientRect = (): DOMRect =>
        ({ width: 510, height: 903 } as DOMRect);
    onLibResize([{ target } as ResizeObserverEntry]);

    target.getBoundingClientRect = originGetBoundingClientRect;
};

export * from '@testing-library/react';
