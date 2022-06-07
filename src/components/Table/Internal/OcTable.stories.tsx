// import React from 'react';
// import { Stories } from '@storybook/addon-docs';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { Link } from '../../Link';
// import OcTable from './index';

// interface RecordType {
//     a?: string;
//     b?: string;
//     c?: string;
// }

// export default {
//     title: 'Table',
//     parameters: {
//         docs: {
//             page: (): JSX.Element => (
//                 <main>
//                     <article>
//                         <section>
//                             <h1>Table</h1>
//                             <p>Docs</p>
//                             <h2>Best practices</h2>
//                             <h3>Layout</h3>
//                             <ul>
//                                 <li></li>
//                             </ul>
//                             <h3>Content</h3>
//                             <ul>
//                                 <li></li>
//                             </ul>
//                         </section>
//                         <section>
//                             <Stories includePrimary title="" />
//                         </section>
//                     </article>
//                 </main>
//             ),
//         },
//     },
//     argTypes: {},
// } as ComponentMeta<typeof OcTable>;

// const Basic_Story: ComponentStory<typeof OcTable> = (args) => {
//     return (
//         <div style={{ width: 900 }}>
//             <OcTable {...args} />
//         </div>
//     );
// };

// export const Basic = Basic_Story.bind({});

// const tableArgs: Object = {
//     columns: [
//         { title: 'Candidate', dataIndex: 'a', key: 'a', width: 600, fixed: 'left' },
//         { id: 'matchId', title: 'Match', dataIndex: 'b', key: 'b' },
//         { title: 'Last Contacted', dataIndex: 'c', key: 'c' },
//         { title: 'Last Application', dataIndex: 'd', key: 'd' },
//         {
//             title: 'Feedback',
//             dataIndex: 'e',
//             key: 'e',
//             render(_: any, record: RecordType) {
//                 return (
//                     <Link
//                         onClick={(e) => {
//                             e.preventDefault();
//                             console.log('Go to:', record);
//                         }}
//                         href="#"
//                     >
//                         Profile
//                     </Link>
//                 );
//             },
//         },
//         { title: 'Actions', dataIndex: 'f', key: 'f', fixed: 'right' },
//     ],
//     data: [
//         { a: 'Profile One', key: '1' },
//         { a: 'Profile Two', key: '2' },
//         { a: 'Profile Three', key: '3' },
//     ],
//     scroll: { x: 1200, y: 180 },
//     style: {
//         width: '100%',
//     },
// };

// Basic.args = {
//     ...tableArgs,
// };
