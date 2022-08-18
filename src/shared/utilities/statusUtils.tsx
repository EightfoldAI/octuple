import { ValidateStatus } from '../../components/Form/FormItem';
import { mergeClasses, tuple } from './';

const InputStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type InputStatus = typeof InputStatuses[number];

export const getStatusClassNames = (
    status?: ValidateStatus,
    hasFeedback?: boolean
): string => {
    return mergeClasses({
        ['status-success']: status === 'success',
        ['status-warning']: status === 'warning',
        ['status-error']: status === 'error',
        ['status-validating']: status === 'validating',
        ['has-feedback']: hasFeedback,
    });
};

export const getMergedStatus = (
    contextStatus?: ValidateStatus,
    customStatus?: InputStatus
) => customStatus || contextStatus;
