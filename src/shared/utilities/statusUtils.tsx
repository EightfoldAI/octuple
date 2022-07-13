import { tuple } from './';

export type ValidateStatus =
    | ''
    | 'warning'
    | 'error'
    | 'success'
    | 'validating';

const InputStatuses = tuple('warning', 'error', '');
export type InputStatus = typeof InputStatuses[number];

export const getMergedStatus = (
    contextStatus?: ValidateStatus,
    customStatus?: InputStatus
) => customStatus || contextStatus;
