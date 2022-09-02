import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm, { OcField } from '../';
import timeout from './Common/timeout';
import InfoField, { Input } from './Common/InfoField';
import { changeValue, matchError, getField } from './Common';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.Dependencies', () => {
    test('touched', async () => {
        let form = null;

        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <InfoField name="field_1" />
                    <InfoField
                        name="field_2"
                        rules={[{ required: true }]}
                        dependencies={['field_1']}
                    />
                </OcForm>
            </div>
        );

        // Not trigger if not touched
        await changeValue(getField(wrapper, 0), '');
        matchError(getField(wrapper, 1), false);

        // Trigger if touched
        form.setFields([{ name: 'field_2', touched: true }]);
        await changeValue(getField(wrapper, 0), '');
        matchError(getField(wrapper, 1), true);
    });

    describe('initialValue', () => {
        function testFn(name, formProps, fieldProps) {
            test(name, async () => {
                let validated = false;

                const wrapper = mount(
                    <div>
                        <OcForm {...formProps}>
                            <InfoField name="field_1" />
                            <InfoField
                                name="field_2"
                                rules={[
                                    {
                                        validator: async () => {
                                            validated = true;
                                        },
                                    },
                                ]}
                                dependencies={['field_1']}
                                {...fieldProps}
                            />
                        </OcForm>
                    </div>
                );

                // Not trigger if not touched
                await changeValue(getField(wrapper, 0), '');
                expect(validated).toBeTruthy();
            });
        }

        testFn('form level', { initialValues: { field_2: 'bamboo' } });
        testFn('field level', null, { initialValue: 'little' });
    });

    test('nest dependencies', async () => {
        let form = null;
        let rendered = false;

        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <OcField name="field_1">
                        <Input />
                    </OcField>
                    <OcField name="field_2" dependencies={['field_1']}>
                        <Input />
                    </OcField>
                    <OcField name="field_3" dependencies={['field_2']}>
                        {(control) => {
                            rendered = true;
                            return <Input {...control} />;
                        }}
                    </OcField>
                </OcForm>
            </div>
        );

        form.setFields([
            { name: 'field_1', touched: true },
            { name: 'field_2', touched: true },
            { name: 'field_3', touched: true },
        ]);

        rendered = false;
        await changeValue(getField(wrapper), '1');

        expect(rendered).toBeTruthy();
    });

    test('should work when field is dirty', async () => {
        let pass = false;

        const wrapper = mount(
            <OcForm>
                <InfoField
                    name="field_1"
                    rules={[
                        {
                            validator: () => {
                                if (pass) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('You should not pass');
                            },
                        },
                    ]}
                    dependencies={['field_2']}
                />

                <InfoField name="field_2" />

                <OcField shouldUpdate>
                    {(_, __, { resetFields }) => (
                        <button
                            type="button"
                            onClick={() => {
                                resetFields();
                            }}
                        />
                    )}
                </OcField>
            </OcForm>
        );

        wrapper.find('form').simulate('submit');
        await timeout();
        wrapper.update();
        matchError(getField(wrapper, 0), 'You should not pass');

        // Mock new validate
        pass = true;
        await changeValue(getField(wrapper, 1), 'bamboo');
        matchError(getField(wrapper, 0), false);

        // Should not validate after reset
        pass = false;
        wrapper.find('button').simulate('click');
        await changeValue(getField(wrapper, 1), 'lola');
        matchError(getField(wrapper, 0), false);
    });

    test('should work as a shortcut when name is not provided', async () => {
        const spy = jest.fn();
        const wrapper = mount(
            <OcForm>
                <OcField dependencies={['field_1']}>
                    {() => {
                        spy();
                        return 'gogogo';
                    }}
                </OcField>
                <OcField name="field_1">
                    <Input />
                </OcField>
                <OcField name="field_2">
                    <Input />
                </OcField>
            </OcForm>
        );
        expect(spy).toHaveBeenCalledTimes(1);
        await changeValue(getField(wrapper, 2), 'value2');
        // sync start
        //   valueUpdate -> not rerender
        //   depsUpdate  -> not rerender
        // sync end
        // async start
        //   validateFinish -> not rerender
        // async end
        expect(spy).toHaveBeenCalledTimes(1);
        await changeValue(getField(wrapper, 1), 'value1');
        // sync start
        //   valueUpdate -> not rerender
        //   depsUpdate  -> rerender by deps
        //   [ react rerender once -> 2 ]
        // sync end
        // async start
        //   validateFinish -> not rerender
        // async end
        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("shouldn't work when shouldUpdate is set", async () => {
        const spy = jest.fn();
        const wrapper = mount(
            <OcForm>
                <OcField dependencies={['field_2']} shouldUpdate={() => true}>
                    {() => {
                        spy();
                        return 'gogogo';
                    }}
                </OcField>
                <OcField name="field_1">
                    <Input />
                </OcField>
                <OcField name="field_2">
                    <Input />
                </OcField>
            </OcForm>
        );
        expect(spy).toHaveBeenCalledTimes(1);
        await changeValue(getField(wrapper, 1), 'value1');
        // sync start
        //   valueUpdate -> rerender by shouldUpdate
        //   depsUpdate  -> rerender by deps
        //   [ react rerender once -> 2 ]
        // sync end
        expect(spy).toHaveBeenCalledTimes(2);

        await changeValue(getField(wrapper, 2), 'value2');
        // sync start
        //   valueUpdate -> rerender by shouldUpdate
        //   depsUpdate  -> rerender by deps
        //   [ react rerender once -> 3 ]
        // sync end
        expect(spy).toHaveBeenCalledTimes(3);
    });
});
