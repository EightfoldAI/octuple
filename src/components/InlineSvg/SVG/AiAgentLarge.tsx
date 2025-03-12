import React, { FC } from 'react';
import { AiAgent } from './AiAgent';
import { AiAgentSize } from './AiAgent.types';

export const AiAgentLarge: FC = () => {
  return <AiAgent size={AiAgentSize.LARGE} />;
};
