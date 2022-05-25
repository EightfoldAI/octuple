import React, { useRef } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Portal } from './';

export default {
    title: 'Portal',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Portal</h1>
                            <p>
                                A Portal allows to render children outside of
                                their parent.
                            </p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Portal>;

export const Default: ComponentStory<typeof Portal> = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <h1>Portal</h1>
            <div ref={containerRef}></div>
            <Portal getContainer={() => containerRef.current}>
                Hello i was portaled
            </Portal>
        </>
    );
};
