import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import type { FormInstance } from '../';
import Form from '../';
import { TextInput } from '../../Inputs';

Enzyme.configure({ adapter: new Adapter() });

interface FormValues {
    username?: string;
    path1?: { path2?: number };
}

describe('Form.typescript', () => {
    test('Form.Item', () => {
        const form = (
            <Form>
                <Form.Item name="test">
                    <TextInput />
                </Form.Item>
            </Form>
        );

        expect(form).toBeTruthy();
    });

    describe('generic', () => {
        test('hooks', () => {
            const Demo = () => {
                const [form] = Form.useForm<FormValues>();

                form.setFieldListValues({ path1: { path2: 2333 } });

                return (
                    <Form
                        form={form}
                        onFinish={(values) => {
                            expect(values).toBeTruthy();
                            expect(values.username).toBeTruthy();
                            expect(values.path1?.path2).toBeTruthy();
                        }}
                    />
                );
            };

            expect(Demo).toBeTruthy();
        });

        test('ref', () => {
            class Demo extends React.Component {
                formRef = React.createRef<FormInstance<FormValues>>();

                componentDidMount() {
                    this.formRef.current?.setFieldListValues({
                        path1: { path2: 233 },
                    });
                }

                render() {
                    return (
                        <Form
                            ref={this.formRef}
                            onFinish={(values) => {
                                expect(values).toBeTruthy();
                                expect(values.username).toBeTruthy();
                                expect(values.path1?.path2).toBeTruthy();
                            }}
                        />
                    );
                }
            }

            expect(Demo).toBeTruthy();
        });
    });

    test('FormItem renderProps support generic', () => {
        const Demo = () => (
            <Form<FormValues>>
                <Form.Item<FormValues>>
                    {({ getFieldListValues }) => {
                        const values = getFieldListValues();
                        expect(values).toBeTruthy();
                        expect(values.username).toBeTruthy();
                        expect(values.path1?.path2).toBeTruthy();
                        return null;
                    }}
                </Form.Item>
            </Form>
        );

        expect(Demo).toBeTruthy();
    });

    test('useWatch', () => {
        const Demo = () => {
            const [form] = Form.useForm<FormValues>();
            const value = Form.useWatch('username', form);

            return <Form form={form}>{value}</Form>;
        };

        expect(Demo).toBeTruthy();
    });
});
