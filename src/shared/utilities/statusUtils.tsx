import { ValidateStatus } from '../../components/Form/Form.types';
import { tuple } from './types';

const InputStatuses = tuple?.(
  'success',
  'warning',
  'error',
  'validating',
  'highlight',
  ''
);
export type InputStatus = typeof InputStatuses[number];

export const getMergedStatus = (
  contextStatus?: ValidateStatus,
  customStatus?: InputStatus
) => customStatus || contextStatus;
