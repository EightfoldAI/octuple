import React from 'react';
import { render } from '@testing-library/react';
import toArray from './toArray';

describe('toArray', () => {
    class UL extends React.Component {
        render() {
            return <ul>{this.props.children}</ul>;
        }
    }

    it('basic', () => {
        render(
            <UL>
                <li key="1">1</li>
                <li key="2">2</li>
                <li key="3">3</li>
            </UL>
        );

        Object.defineProperty(UL.prototype, 'children', {
            value: (
                <>
                    <li key="1">1</li>
                    <li key="2">2</li>
                    <li key="3">3</li>
                </>
            ),
            writable: true,
            configurable: true,
        });

        const children = toArray(UL.prototype.props.children);
        expect(children).toHaveLength(3);
        expect(children.map((c) => c.key)).toEqual(['1', '2', '3']);
    });

    it('Array', () => {
        render(
            <UL>
                <li key="1">1</li>
                {[<li key="2">2</li>, <li key="3">3</li>]}
            </UL>
        );

        Object.defineProperty(UL.prototype, 'children', {
            value: (
                <>
                    <li key="1">1</li>
                    {[<li key="2">2</li>, <li key="3">3</li>]}
                </>
            ),
            writable: true,
            configurable: true,
        });

        const children = toArray(UL.prototype.props.children);
        expect(children).toHaveLength(3);
        expect(children.map((c) => c.key)).toEqual(['1', '2', '3']);
    });

    it('Fragment', () => {
        render(
            <UL>
                <li key="1">1</li>
                <>
                    <li key="2">2</li>
                    <li key="3">3</li>
                </>
                <React.Fragment>
                    <>
                        <li key="4">4</li>
                        <li key="5">5</li>
                    </>
                </React.Fragment>
            </UL>
        );

        Object.defineProperty(UL.prototype, 'children', {
            value: (
                <>
                    <li key="1">1</li>
                    <>
                        <li key="2">2</li>
                        <li key="3">3</li>
                    </>
                    <React.Fragment>
                        <>
                            <li key="4">4</li>
                            <li key="5">5</li>
                        </>
                    </React.Fragment>
                </>
            ),
            writable: true,
            configurable: true,
        });

        const children = toArray(UL.prototype.props.children);
        expect(children).toHaveLength(5);
        expect(children.map((c) => c.key)).toEqual(['1', '2', '3', '4', '5']);
    });

    it('keep empty', () => {
        render(
            <UL>
                {null}
                <li key="1">1</li>
                <>
                    <li key="2">2</li>
                    {null}
                    <li key="3">3</li>
                </>
                <React.Fragment>
                    <>
                        <li key="4">4</li>
                        {undefined}
                        <li key="5">5</li>
                    </>
                </React.Fragment>
                {undefined}
            </UL>
        );

        Object.defineProperty(UL.prototype, 'children', {
            value: (
                <>
                    {null}
                    <li key="1">1</li>
                    <>
                        <li key="2">2</li>
                        {null}
                        <li key="3">3</li>
                    </>
                    <React.Fragment>
                        <>
                            <li key="4">4</li>
                            {undefined}
                            <li key="5">5</li>
                        </>
                    </React.Fragment>
                    {undefined}
                </>
            ),
            writable: true,
            configurable: true,
        });

        const children = toArray(UL.prototype.props.children, {
            keepEmpty: true,
        });
        expect(children).toHaveLength(9);
        expect(children.map((c) => c && c.key)).toEqual([
            null,
            '1',
            '2',
            null,
            '3',
            '4',
            null,
            '5',
            null,
        ]);
    });
});
