/* eslint-disable no-template-curly-in-string, arrow-body-style */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import type { OcFormInstance } from '../';
import Form from '../';
import InfoField, { Input } from './Common/InfoField';
import timeout from './Common/timeout';

Enzyme.configure({ adapter: new Adapter() });

describe('Form.Preserve', () => {
    const Demo = ({
        removeField,
        formPreserve,
        fieldPreserve,
        onFinish,
    }: {
        removeField: boolean;
        formPreserve?: boolean;
        fieldPreserve?: boolean;
        onFinish: (values: object) => void;
    }) => (
        <Form
            onFinish={onFinish}
            initialValues={{ keep: 233, remove: 666 }}
            preserve={formPreserve}
        >
            <InfoField name="keep" />
            {!removeField && (
                <InfoField name="remove" preserve={fieldPreserve} />
            )}
        </Form>
    );

    test('field', async () => {
        const onFinish = jest.fn();
        const wrapper = mount(
            <Demo
                removeField={false}
                onFinish={onFinish}
                fieldPreserve={false}
            />
        );

        async function matchTest(removeField: boolean, match: object) {
            onFinish.mockReset();
            wrapper.setProps({ removeField });
            wrapper.find('form').simulate('submit');
            await timeout();
            expect(onFinish).toHaveBeenCalledWith(match);
        }

        await matchTest(false, { keep: 233, remove: 666 });
        await matchTest(true, { keep: 233 });
        await matchTest(false, { keep: 233, remove: 666 });
    });

    test('form', async () => {
        const onFinish = jest.fn();
        const wrapper = mount(
            <Demo
                removeField={false}
                onFinish={onFinish}
                formPreserve={false}
            />
        );

        async function matchTest(removeField: boolean, match: object) {
            onFinish.mockReset();
            wrapper.setProps({ removeField });
            wrapper.find('form').simulate('submit');
            await timeout();
            expect(onFinish).toHaveBeenCalledWith(match);
        }

        await matchTest(false, { keep: 233, remove: 666 });
        await matchTest(true, { keep: 233 });
        await matchTest(false, { keep: 233, remove: 666 });
    });

    test('keep preserve when other field exist the name', async () => {
        const formRef = React.createRef<OcFormInstance>();

        const KeepDemo = ({
            onFinish,
            keep,
        }: {
            onFinish: (values: any) => void;
            keep: boolean;
        }) => {
            return (
                <Form
                    ref={formRef}
                    initialValues={{ test: 'mia' }}
                    onFinish={onFinish}
                >
                    <Form.OcField shouldUpdate>
                        {() => {
                            return (
                                <>
                                    {keep && (
                                        <InfoField
                                            name="test"
                                            preserve={false}
                                        />
                                    )}
                                    <InfoField name="test" />
                                </>
                            );
                        }}
                    </Form.OcField>
                </Form>
            );
        };

        const onFinish = jest.fn();
        const wrapper = mount(<KeepDemo onFinish={onFinish} keep />);

        // Change value
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'lola' } });

        formRef.current.submit();
        await timeout();
        expect(onFinish).toHaveBeenCalledWith({ test: 'lola' });
        onFinish.mockReset();

        // Remove preserve should not change the value
        wrapper.setProps({ keep: false });
        await timeout();
        formRef.current.submit();
        await timeout();
        expect(onFinish).toHaveBeenCalledWith({ test: 'lola' });
    });

    test('form preserve but field !preserve', async () => {
        const onFinish = jest.fn();
        const wrapper = mount(
            <Demo
                removeField={false}
                onFinish={onFinish}
                formPreserve={false}
                fieldPreserve
            />
        );

        async function matchTest(removeField: boolean, match: object) {
            onFinish.mockReset();
            wrapper.setProps({ removeField });
            wrapper.find('form').simulate('submit');
            await timeout();
            expect(onFinish).toHaveBeenCalledWith(match);
        }

        await matchTest(true, { keep: 233 });
        await matchTest(false, { keep: 233, remove: 666 });
    });

    describe('Form.List', () => {
        test('form preserve should not crash', async () => {
            let form: OcFormInstance;

            const wrapper = mount(
                <Form
                    initialValues={{ list: ['lola', 'mia', 'little'] }}
                    preserve={false}
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <Form.OcList name="list">
                        {(fields, { remove }) => {
                            return (
                                <div>
                                    {fields.map((field) => (
                                        <Form.OcField {...field}>
                                            <input />
                                        </Form.OcField>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            remove(0);
                                        }}
                                    />
                                </div>
                            );
                        }}
                    </Form.OcList>
                </Form>
            );

            wrapper.find('button').simulate('click');
            wrapper.update();

            expect(form.getFieldListValues()).toEqual({
                list: ['mia', 'little'],
            });
        });

        test('when Form.List use preserve', () => {
            let form: OcFormInstance;

            const wrapper = mount(
                <Form
                    ref={(instance) => {
                        form = instance;
                    }}
                    initialValues={{ list: ['mia'] }}
                >
                    <Form.OcList name="list">
                        {(fields, { remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Form.OcField {...field} preserve={false}>
                                        <input />
                                    </Form.OcField>
                                ))}
                                <button
                                    onClick={() => {
                                        remove(0);
                                    }}
                                >
                                    Remove
                                </button>
                            </>
                        )}
                    </Form.OcList>
                </Form>
            );

            // Remove should not work
            wrapper.find('button').simulate('click');
            expect(form.getFieldListValues()).toEqual({ list: [] });
        });

        test('multiple level field can use preserve', async () => {
            let form: OcFormInstance;

            const wrapper = mount(
                <Form
                    initialValues={{ list: [{ type: 'lola' }] }}
                    preserve={false}
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <Form.OcList name="list">
                        {(fields, { remove }) => {
                            return (
                                <>
                                    {fields.map((field) => (
                                        <div key={field.key}>
                                            <Form.OcField
                                                {...field}
                                                name={[field.name, 'type']}
                                            >
                                                <Input />
                                            </Form.OcField>
                                            <Form.OcField shouldUpdate>
                                                {(_, __, { getFieldValue }) =>
                                                    getFieldValue([
                                                        'list',
                                                        field.name,
                                                        'type',
                                                    ]) === 'lola' ? (
                                                        <Form.OcField
                                                            {...field}
                                                            key="lola"
                                                            preserve={false}
                                                            name={[
                                                                field.name,
                                                                'lola',
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.OcField>
                                                    ) : (
                                                        <Form.OcField
                                                            {...field}
                                                            key="mia"
                                                            preserve={false}
                                                            name={[
                                                                field.name,
                                                                'mia',
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.OcField>
                                                    )
                                                }
                                            </Form.OcField>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            remove(0);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </>
                            );
                        }}
                    </Form.OcList>
                </Form>
            );

            // Change lola value
            wrapper
                .find('input')
                .last()
                .simulate('change', { target: { value: '1128' } });

            // Change type
            wrapper
                .find('input')
                .first()
                .simulate('change', { target: { value: 'mia' } });

            // Change mia value
            wrapper
                .find('input')
                .last()
                .simulate('change', { target: { value: '903' } });

            expect(form.getFieldListValues()).toEqual({
                list: [{ type: 'mia', mia: '903' }],
            });

            // ============== Remove Test ==============
            // Remove field
            wrapper.find('button').simulate('click');
            expect(form.getFieldListValues()).toEqual({ list: [] });
        });
    });

    test('nest render props should not clean full store', () => {
        let form: OcFormInstance;

        const wrapper = mount(
            <Form
                preserve={false}
                ref={(instance) => {
                    form = instance;
                }}
            >
                <Form.OcField name="lola">
                    <input />
                </Form.OcField>
                <Form.OcField shouldUpdate>
                    {(_, __, { getFieldValue }) =>
                        getFieldValue('lola') === 'mia' ? (
                            <Form.OcField>{() => null}</Form.OcField>
                        ) : null
                    }
                </Form.OcField>
            </Form>
        );

        wrapper.find('input').simulate('change', { target: { value: 'mia' } });
        expect(form.getFieldListValues()).toEqual({ lola: 'mia' });

        wrapper
            .find('input')
            .simulate('change', { target: { value: 'little' } });
        expect(form.getFieldListValues()).toEqual({ lola: 'little' });

        wrapper.unmount();
    });

    describe('A -> B -> C should keep trigger refresh', () => {
        test('shouldUpdate', () => {
            const DepDemo = () => {
                const [form] = Form.useForm();

                return (
                    <Form form={form} preserve={false}>
                        <Form.OcField name="name">
                            <Input id="name" placeholder="Username" />
                        </Form.OcField>

                        <Form.OcField shouldUpdate>
                            {() => {
                                return form.getFieldValue('name') === '1' ? (
                                    <Form.OcField name="password">
                                        <Input
                                            id="password"
                                            placeholder="Password"
                                        />
                                    </Form.OcField>
                                ) : null;
                            }}
                        </Form.OcField>

                        <Form.OcField shouldUpdate>
                            {() => {
                                const password = form.getFieldValue('password');
                                return password ? (
                                    <Form.OcField name="password2">
                                        <Input
                                            id="password2"
                                            placeholder="Password 2"
                                        />
                                    </Form.OcField>
                                ) : null;
                            }}
                        </Form.OcField>
                    </Form>
                );
            };

            const wrapper = mount(<DepDemo />);

            // Input name to show password
            wrapper
                .find('#name')
                .last()
                .simulate('change', { target: { value: '1' } });
            expect(wrapper.exists('#password')).toBeTruthy();
            expect(wrapper.exists('#password2')).toBeFalsy();

            // Input password to show password2
            wrapper
                .find('#password')
                .last()
                .simulate('change', { target: { value: '1' } });
            expect(wrapper.exists('#password2')).toBeTruthy();

            // Change name to hide password
            wrapper
                .find('#name')
                .last()
                .simulate('change', { target: { value: '2' } });
            expect(wrapper.exists('#password')).toBeFalsy();
            expect(wrapper.exists('#password2')).toBeFalsy();
        });

        test('dependencies', () => {
            const DepDemo = () => {
                const [form] = Form.useForm();

                return (
                    <Form form={form} preserve={false}>
                        <Form.OcField name="name">
                            <Input id="name" placeholder="Username" />
                        </Form.OcField>

                        <Form.OcField dependencies={['name']}>
                            {() => {
                                return form.getFieldValue('name') === '1' ? (
                                    <Form.OcField name="password">
                                        <Input
                                            id="password"
                                            placeholder="Password"
                                        />
                                    </Form.OcField>
                                ) : null;
                            }}
                        </Form.OcField>

                        <Form.OcField dependencies={['password']}>
                            {() => {
                                const password = form.getFieldValue('password');
                                return password ? (
                                    <Form.OcField name="password2">
                                        <Input
                                            id="password2"
                                            placeholder="Password 2"
                                        />
                                    </Form.OcField>
                                ) : null;
                            }}
                        </Form.OcField>
                    </Form>
                );
            };

            const wrapper = mount(<DepDemo />);

            // Input name to show password
            wrapper
                .find('#name')
                .last()
                .simulate('change', { target: { value: '1' } });
            expect(wrapper.exists('#password')).toBeTruthy();
            expect(wrapper.exists('#password2')).toBeFalsy();

            // Input password to show password2
            wrapper
                .find('#password')
                .last()
                .simulate('change', { target: { value: '1' } });
            expect(wrapper.exists('#password2')).toBeTruthy();

            // Change name to hide password
            wrapper
                .find('#name')
                .last()
                .simulate('change', { target: { value: '2' } });
            expect(wrapper.exists('#password')).toBeFalsy();
            expect(wrapper.exists('#password2')).toBeFalsy();
        });
    });

    test('should correct calculate preserve state', () => {
        let instance: OcFormInstance;

        const VisibleDemo = ({ visible = true }: { visible?: boolean }) => {
            const [form] = Form.useForm();
            instance = form;

            return visible ? (
                <Form form={form}>
                    <Form.OcField name="name">
                        <Input />
                    </Form.OcField>
                </Form>
            ) : (
                <div />
            );
        };

        const wrapper = mount(<VisibleDemo />);

        wrapper.setProps({
            visible: false,
        });

        instance.setFieldListValues({ name: 'mia' });
        wrapper.setProps({
            visible: true,
        });

        expect(wrapper.find('input').prop('value')).toEqual('mia');
    });
});
/* eslint-enable no-template-curly-in-string */
