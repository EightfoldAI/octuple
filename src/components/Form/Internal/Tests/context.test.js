import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm, { OcFormProvider } from '../';
import InfoField from './Common/InfoField';
import { changeValue, matchError, getField } from './Common';
import timeout from './Common/timeout';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.Context', () => {
    test('validateMessages', async () => {
        const wrapper = mount(
            <OcFormProvider validateMessages={{ required: "I'm global" }}>
                <OcForm>
                    <InfoField name="username" rules={[{ required: true }]} />
                </OcForm>
            </OcFormProvider>
        );

        await changeValue(wrapper, '');
        matchError(wrapper, "I'm global");
    });

    test('change event', async () => {
        const onFormChange = jest.fn();

        const wrapper = mount(
            <OcFormProvider onFormChange={onFormChange}>
                <OcForm name="form1">
                    <InfoField name="username" rules={[{ required: true }]} />
                </OcForm>
            </OcFormProvider>
        );

        await changeValue(getField(wrapper), 'Light');
        expect(onFormChange).toHaveBeenCalledWith(
            'form1',
            expect.objectContaining({
                changedFields: [
                    {
                        errors: [],
                        warnings: [],
                        name: ['username'],
                        touched: true,
                        validating: false,
                        value: 'Light',
                    },
                ],
                forms: {
                    form1: expect.objectContaining({}),
                },
            })
        );
    });

    describe('adjust sub form', () => {
        test('basic', async () => {
            const onFormChange = jest.fn();

            const wrapper = mount(
                <OcFormProvider onFormChange={onFormChange}>
                    <OcForm name="form1" />
                </OcFormProvider>
            );

            wrapper.setProps({
                children: (
                    <OcForm name="form2">
                        <InfoField name="test" />
                    </OcForm>
                ),
            });

            await changeValue(getField(wrapper), 'Bamboo');
            const { forms } = onFormChange.mock.calls[0][1];
            expect(Object.keys(forms)).toEqual(['form2']);
        });

        test('multiple context', async () => {
            const onFormChange = jest.fn();

            const Demo = (changed) => (
                <OcFormProvider onFormChange={onFormChange}>
                    <OcFormProvider>
                        {!changed ? (
                            <OcForm name="form1" />
                        ) : (
                            <OcForm name="form2">
                                <InfoField name="test" />
                            </OcForm>
                        )}
                    </OcFormProvider>
                </OcFormProvider>
            );

            const wrapper = mount(<Demo />);

            wrapper.setProps({
                changed: true,
            });

            await changeValue(getField(wrapper), 'Bamboo');
            const { forms } = onFormChange.mock.calls[0][1];
            expect(Object.keys(forms)).toEqual(['form2']);
        });
    });

    test('submit', async () => {
        const onFormFinish = jest.fn();
        let form1;

        const wrapper = mount(
            <div>
                <OcFormProvider onFormFinish={onFormFinish}>
                    <OcForm
                        name="form1"
                        ref={(instance) => {
                            form1 = instance;
                        }}
                    >
                        <InfoField name="name" rules={[{ required: true }]} />
                    </OcForm>
                    <OcForm name="form2" />
                </OcFormProvider>
            </div>
        );

        await changeValue(getField(wrapper), '');
        form1.submit();
        await timeout();
        expect(onFormFinish).not.toHaveBeenCalled();

        await changeValue(getField(wrapper), 'Light');
        form1.submit();
        await timeout();
        expect(onFormFinish).toHaveBeenCalled();

        expect(onFormFinish.mock.calls[0][0]).toEqual('form1');
        const info = onFormFinish.mock.calls[0][1];
        expect(info.values).toEqual({ name: 'Light' });
        expect(Object.keys(info.forms).sort()).toEqual(
            ['form1', 'form2'].sort()
        );
    });

    test('do nothing if no Provider in use', () => {
        const wrapper = mount(
            <div>
                <OcForm name="no" />
            </div>
        );

        wrapper.setProps({
            children: null,
        });
    });
});
