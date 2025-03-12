import React, { FC } from 'react';
import { AiAgent } from './AiAgent';
import { AiAgentVariant } from './AiAgent.types';

export const AiAgentGradient: FC = () => {
  return <AiAgent variant={AiAgentVariant.GRADIENT} />;
};
