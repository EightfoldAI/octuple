import React, { FC } from 'react';
import { AiAgent } from './AiAgent';
import { AiAgentVariant } from './AiAgent.types';

export const AiAgentOutline: FC = () => {
  return <AiAgent variant={AiAgentVariant.OUTLINE} />;
};
