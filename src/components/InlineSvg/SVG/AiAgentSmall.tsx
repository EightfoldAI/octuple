import React, { FC } from 'react';
import { AiAgent } from './AiAgent';
import { AiAgentSize } from './AiAgent.types';

export const AiAgentSmall: FC = () => {
  return <AiAgent size={AiAgentSize.SMALL} />;
};
