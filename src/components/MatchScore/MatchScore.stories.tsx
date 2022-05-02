import React from 'react';
import { MatchScore } from './MatchScore';

export default {
    title: 'MatchScore',
    component: MatchScore,
};

export const Default = () => (
    <div>
        <MatchScore score={0} />
        <br />
        <MatchScore score={0.5} />
        <br />
        <MatchScore score={1} />
        <br />
        <MatchScore score={1.5} />
        <br />
        <MatchScore score={2} />
        <br />
        <MatchScore score={2.5} />
        <br />
        <MatchScore score={3} />
        <br />
        <MatchScore score={3.5} />
        <br />
        <MatchScore score={4} />
        <br />
        <MatchScore score={4.5} />
        <br />
        <MatchScore score={5} />
        <br />
        <MatchScore score={20} />
    </div>
);

export const WithoutLabel = () => (
    <div>
        <MatchScore score={0} hideLabel />
        <br />
        <MatchScore score={0.5} hideLabel />
        <br />
        <MatchScore score={1} hideLabel />
        <br />
        <MatchScore score={1.5} hideLabel />
        <br />
        <MatchScore score={2} hideLabel />
        <br />
        <MatchScore score={2.5} hideLabel />
        <br />
        <MatchScore score={3} hideLabel />
        <br />
        <MatchScore score={3.5} hideLabel />
        <br />
        <MatchScore score={4} hideLabel />
        <br />
        <MatchScore score={4.5} hideLabel />
        <br />
        <MatchScore score={5} hideLabel />
        <br />
        <MatchScore score={20} hideLabel />
    </div>
);
