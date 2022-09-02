/* eslint-disable no-template-curly-in-string */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm from '../';
import InfoField, { Input } from './Common/InfoField';
import { changeValue, matchError } from './Common';
import type { OcFormInstance, OcRule } from '../OcForm.types';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.WarningValidate', () => {
    test('required', async () => {
        let form: OcFormInstance<any>;

        const wrapper = mount(
            <OcForm
                ref={(f) => {
                    form = f;
                }}
            >
                <InfoField
                    name="name"
                    rules={[
                        {
                            required: true,
                            warningOnly: true,
                        },
                    ]}
                >
                    <Input />
                </InfoField>
            </OcForm>
        );

        await changeValue(wrapper, '');
        matchError(wrapper, false, "'name' is required");
        expect(form.getFieldWarning('name')).toEqual(["'name' is required"]);
    });

    describe('validateFirst should not block error', () => {
        function testValidateFirst(
            name: string,
            validateFirst: boolean | 'parallel',
            additionalRule?: OcRule,
            errorMessage?: string
        ) {
            test(name, async () => {
                const rules = [
                    additionalRule,
                    {
                        type: 'string',
                        len: 10,
                        warningOnly: true,
                    },
                    {
                        type: 'url',
                    },
                    {
                        type: 'string',
                        len: 20,
                        warningOnly: true,
                    },
                ];

                const wrapper = mount(
                    <OcForm>
                        <InfoField
                            name="name"
                            validateFirst={validateFirst}
                            rules={rules.filter((r) => r) as any}
                        >
                            <Input />
                        </InfoField>
                    </OcForm>
                );

                await changeValue(wrapper, 'bamboo');
                matchError(
                    wrapper,
                    errorMessage || "'name' is not a valid url",
                    false
                );
            });
        }

        testValidateFirst('default', true);
        testValidateFirst(
            'default',
            true,
            {
                type: 'string',
                len: 3,
            },
            "'name' must be exactly 3 characters"
        );
        testValidateFirst('parallel', 'parallel');
    });
});
/* eslint-enable no-template-curly-in-string */
