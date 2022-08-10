import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Col, Row } from '..';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

describe('Grid.Server', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('use compatible gap logic', () => {
        const wrapper = mount(
            <Row gutter={[8, 16]}>
                <Col />
            </Row>
        );

        expect(wrapper.find('.row').props().style).toEqual(
            expect.objectContaining({
                marginLeft: -4,
                marginRight: -4,
                marginTop: -8,
                marginBottom: -8,
            })
        );

        expect(wrapper.find('.col').props().style).toEqual(
            expect.objectContaining({
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 8,
                paddingBottom: 8,
            })
        );
    });
});
