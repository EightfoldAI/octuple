import { ValidateStatus } from '../../components/Form/FormItem';
import { mergeClasses, tuple } from './';

const InputStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type InputStatus = typeof InputStatuses[number];

export const getMergedStatus = (
    contextStatus?: ValidateStatus,
    customStatus?: InputStatus
) => customStatus || contextStatus;
