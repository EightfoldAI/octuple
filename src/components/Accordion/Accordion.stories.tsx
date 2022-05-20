import React from 'react';
import { Accordion } from './';

export default {
    title: 'Accordion',
    component: Accordion,
};

export const Default = () => (
    <>
        <h2>Single Accordion</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Accordion summary={'Open Single Accordion 1'}>
                <div>
                    Body 2 text used here. Bottom bars are sticky sections that
                    can be used to highlight a few actions that are out of the
                    view to be displayed inside the view. For example, if
                    there's a very long form with Save and Cancel buttons at the
                    bottom, we can use the bottom bar to show those two buttons
                    in the view. We are making these bars to be flexible in
                    height and also allowing any component to be added inside
                    for now, to understand use cases from the team.{' '}
                </div>
            </Accordion>
        </div>
        <h2>Multiple Accordions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Accordion summary={'Multiple Accordion 1'}>
                <div>
                    Body 2 text used here. Bottom bars are sticky sections that
                    can be used to highlight a few actions that are out of the
                    view to be displayed inside the view. For example, if
                    there's a very long form with Save and Cancel buttons at the
                    bottom, we can use the bottom bar to show those two buttons
                    in the view. We are making these bars to be flexible in
                    height and also allowing any component to be added inside
                    for now, to understand use cases from the team.{' '}
                </div>
            </Accordion>
            <Accordion summary={'Multiple Accordion 2'}>
                <div>
                    Body 2 text used here. Bottom bars are sticky sections that
                    can be used to highlight a few actions that are out of the
                    view to be displayed inside the view. For example, if
                    there's a very long form with Save and Cancel buttons at the
                    bottom, we can use the bottom bar to show those two buttons
                    in the view. We are making these bars to be flexible in
                    height and also allowing any component to be added inside
                    for now, to understand use cases from the team.{' '}
                </div>
            </Accordion>
        </div>
    </>
);
