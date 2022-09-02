/* eslint-disable import/no-extraneous-dependencies */

import { act } from 'react-dom/test-utils';
import type { ReactWrapper } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import timeout from './timeout';
import { OcField } from '../../';
import { getNamePath, matchNamePath } from '../../Utils/valueUtil';

Enzyme.configure({ adapter: new Adapter() });

export async function changeValue(wrapper: any, value: string | string[]) {
    wrapper.find('input').simulate('change', { target: { value } });
    await act(async () => {
        await timeout();
    });
    wrapper.update();
}

export function matchError(
    wrapper: ReactWrapper,
    error?: boolean | string,
    warning?: boolean | string
) {
    // Error
    if (error) {
        expect(wrapper.find('.errors li').length).toBeTruthy();
    } else {
        expect(wrapper.find('.errors li').length).toBeFalsy();
    }

    if (error && typeof error !== 'boolean') {
        expect(wrapper.find('.errors li').text()).toBe(error);
    }

    // Warning
    if (warning) {
        expect(wrapper.find('.warnings li').length).toBeTruthy();
    } else {
        expect(wrapper.find('.warnings li').length).toBeFalsy();
    }

    if (warning && typeof warning !== 'boolean') {
        expect(wrapper.find('.warnings li').text()).toBe(warning);
    }
}

export function getField(wrapper: any, index: string | number = 0) {
    if (typeof index === 'number') {
        return wrapper.find(OcField).at(index);
    }

    const name = getNamePath(index);
    const fields = wrapper.find(OcField);
    for (let i = 0; i < fields.length; i += 1) {
        const field = fields.at(i);
        const fieldName = getNamePath(field.props().name);

        if (matchNamePath(name, fieldName)) {
            return field;
        }
    }
    return null;
}

/* eslint-enable import/no-extraneous-dependencies */
