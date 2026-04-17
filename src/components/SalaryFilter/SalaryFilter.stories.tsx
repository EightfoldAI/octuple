import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Stories } from '@storybook/addon-docs';
import { SalaryFilter } from './SalaryFilter';

export default {
  title: 'Workforce Exchange/Salary Filter',
  component: SalaryFilter,
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Salary Filter — Workforce Exchange</h1>
              <p>
                Surfaces structured, estimated, and unlisted salary data to
                jobseekers on Workforce Exchange. Supports quick-select pay
                bands, a custom minimum threshold, and opt-in visibility of
                estimated or unlisted pay jobs.
              </p>
              <h2>PRD Highlights</h2>
              <ul>
                <li>Quick filters: $15+, $18+, $20+, $25+ per hour</li>
                <li>Custom &quot;At least $X per [period]&quot; input</li>
                <li>Opt-in: include estimated pay / no pay listed</li>
                <li>
                  Job cards show structured, ~estimated, and unlisted salary
                  states
                </li>
              </ul>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
} as ComponentMeta<typeof SalaryFilter>;

const Template: ComponentStory<typeof SalaryFilter> = (args) => (
  <div style={{ padding: '24px', background: 'var(--background-color, #f9fafb)', minHeight: '100vh' }}>
    <SalaryFilter {...args} />
  </div>
);

// ── Default (no filter applied) ──────────────────────────────

export const Default = Template.bind({});
Default.storyName = 'Default — No Filter';
Default.args = {};

// ── Quick filter selected ────────────────────────────────────

export const QuickFilterSelected = Template.bind({});
QuickFilterSelected.storyName = '$20+/hr Quick Filter Active';
QuickFilterSelected.args = {};
QuickFilterSelected.decorators = [
  (Story) => (
    <div style={{ padding: '24px', background: 'var(--background-color, #f9fafb)' }}>
      <Story />
    </div>
  ),
];

// ── With estimated & unlisted jobs visible ────────────────────

export const IncludeAllJobs = Template.bind({});
IncludeAllJobs.storyName = 'Include Estimated + Unlisted';
IncludeAllJobs.args = {
  jobListings: [
    {
      id: '1',
      title: 'Warehouse Associate',
      company: 'FedEx',
      distance: '3.2 mi',
      salaryDisplay: 'structured',
      salaryMin: 19,
      salaryMax: 22,
      jobType: 'Full-time',
      tags: ['Benefits included'],
    },
    {
      id: '2',
      title: 'Delivery Driver',
      company: 'Local Company',
      distance: '5.1 mi',
      salaryDisplay: 'estimated',
      salaryMin: 18,
      salaryMax: 21,
      jobType: 'Full-time',
      tags: [],
    },
    {
      id: '3',
      title: 'Custodian',
      company: 'School District',
      distance: '2.8 mi',
      salaryDisplay: 'none',
      jobType: 'Full-time',
      tags: ['Government'],
    },
    {
      id: '4',
      title: 'Forklift Operator',
      company: 'Amazon FC',
      distance: '1.4 mi',
      salaryDisplay: 'structured',
      salaryMin: 22,
      salaryMax: 26,
      jobType: 'Full-time',
      tags: ['Benefits included'],
    },
    {
      id: '5',
      title: 'Line Cook',
      company: 'Olive Garden',
      distance: '0.8 mi',
      salaryDisplay: 'estimated',
      salaryMin: 15,
      salaryMax: 18,
      jobType: 'Part-time',
      tags: [],
    },
  ],
};

// ── No results state ──────────────────────────────────────────

export const NoResults = Template.bind({});
NoResults.storyName = 'No Results';
NoResults.args = {
  jobListings: [],
};
