import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import Form from '..';
import { PrimaryButton } from '../../Button';
import { TextInput } from '../../Inputs';

let matchMedia: any;

Enzyme.configure({ adapter: new Adapter() });

describe('Form.Ref', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    const Test = ({
        onRef,
        show,
    }: {
        onRef: (
            node: React.ReactElement,
            originRef: React.RefObject<any>
        ) => void;
        show?: boolean;
    }) => {
        const [form] = Form.useForm();
        const removeRef = React.useRef<any>();
        const testRef = React.useRef<any>();
        const listRef = React.useRef<any>();

        return (
            <Form form={form} initialValues={{ list: ['light'] }}>
                {show && (
                    <Form.Item name="remove" label="remove">
                        <TextInput ref={removeRef} />
                    </Form.Item>
                )}

                <Form.Item name="test" label="test">
                    <TextInput ref={testRef} />
                </Form.Item>

                <Form.List name="list">
                    {(fields) =>
                        fields.map((field) => (
                            <Form.Item {...field}>
                                <TextInput ref={listRef} />
                            </Form.Item>
                        ))
                    }
                </Form.List>

                <PrimaryButton
                    className="ref-item"
                    onClick={() => {
                        onRef(form.getFieldInstance('test'), testRef.current);
                    }}
                    text={'Form.Item'}
                />
                <PrimaryButton
                    className="ref-list"
                    onClick={() => {
                        onRef(
                            form.getFieldInstance(['list', 0]),
                            listRef.current
                        );
                    }}
                    text={'Form.List'}
                />
                <PrimaryButton
                    className="ref-remove"
                    onClick={() => {
                        onRef(
                            form.getFieldInstance('remove'),
                            removeRef.current
                        );
                    }}
                    text={'Removed'}
                />
            </Form>
        );
    };

    test('ref works', () => {
        const onRef = jest.fn();
        const wrapper = mount(<Test onRef={onRef} show />);

        wrapper.find('.ref-item').last().simulate('click');
        expect(onRef).toHaveBeenCalled();
        expect(onRef.mock.calls[0][0]).toBe(onRef.mock.calls[0][1]);

        onRef.mockReset();
        wrapper.find('.ref-list').last().simulate('click');
        expect(onRef).toHaveBeenCalled();
        expect(onRef.mock.calls[0][0]).toBe(onRef.mock.calls[0][1]);

        onRef.mockReset();
        wrapper.setProps({ show: false });
        wrapper.update();
        wrapper.find('.ref-remove').last().simulate('click');
        expect(onRef).toHaveBeenCalledWith(undefined, null);
    });
});
