import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm from '../';
import InfoField, { Input } from './Common/InfoField';
import { changeValue } from './Common';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.ReactStrict', () => {
    test('should not register twice', async () => {
        const onFieldsChange = jest.fn();

        const wrapper = mount(
            <React.StrictMode>
                <OcForm name="testForm" onFieldsChange={onFieldsChange}>
                    <InfoField name="input">
                        <Input />
                    </InfoField>
                </OcForm>
            </React.StrictMode>
        );

        await changeValue(wrapper, 'bamboo');

        expect(onFieldsChange).toHaveBeenCalledTimes(1);
        expect(onFieldsChange.mock.calls[0][1]).toHaveLength(1);
    });
});
