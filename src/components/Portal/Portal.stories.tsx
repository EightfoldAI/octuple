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

const Portal_Story: ComponentStory<typeof Portal> = (args) => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <div ref={containerRef}></div>
            <Portal getContainer={() => containerRef.current} {...args} />
        </>
    );
};

export const Default = Portal_Story.bind({});

Default.args = {
    children: <>Hello, I was portaled.</>,
};
