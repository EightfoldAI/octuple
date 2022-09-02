import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import scrollIntoView from 'scroll-into-view-if-needed';
import Form from '../';
import { TextInput } from '../../Inputs';
import { sleep } from '../../../tests/Utilities';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

jest.mock('scroll-into-view-if-needed');

// TODO: Fix test bugs to access DOM
describe('Scroll Into View', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    scrollIntoView.mockImplementation(() => {});

    beforeEach(() => {
        jest.useRealTimers();
        scrollIntoView.mockReset();
    });

    afterAll(() => {
        scrollIntoView.mockRestore();
    });

    describe('scrollToField', () => {
        function testForm(name, genForm) {
            test(name, () => {
                let callGetForm;

                const Demo = () => {
                    const { props, getForm } = genForm();
                    callGetForm = getForm;

                    return (
                        <Form name="scroll" {...props}>
                            <Form.Item name="test">
                                <TextInput />
                            </Form.Item>
                        </Form>
                    );
                };

                const wrapper = mount(<Demo />, { attachTo: document.body });

                expect(scrollIntoView).not.toHaveBeenCalled();
                const form = callGetForm();
                form.scrollToField('test', {
                    block: 'start',
                });

                const inputNode = document.getElementById('scroll_test');
                expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
                    block: 'start',
                    scrollMode: 'if-needed',
                });

                wrapper.unmount();
            });
        }

        // hooks
        testForm('useForm', () => {
            const [form] = Form.useForm();
            return {
                props: { form },
                getForm: () => form,
            };
        });

        // ref
        testForm('ref', () => {
            let form;
            return {
                props: {
                    ref: (instance) => {
                        form = instance;
                    },
                },
                getForm: () => form,
            };
        });
    });

    test('scrollToFirstError', async () => {
        const onFinishFailed = jest.fn();

        const wrapper = mount(
            <Form
                scrollToFirstError={{ block: 'center' }}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="test" rules={[{ required: true }]}>
                    <TextInput />
                </Form.Item>
            </Form>,
            { attachTo: document.body }
        );

        expect(scrollIntoView).not.toHaveBeenCalled();
        wrapper.find('form').simulate('submit');
        await sleep(50);
        const inputNode = document.getElementById('test');
        expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
            block: 'center',
            scrollMode: 'if-needed',
        });
        expect(onFinishFailed).toHaveBeenCalled();

        wrapper.unmount();
    });
});
