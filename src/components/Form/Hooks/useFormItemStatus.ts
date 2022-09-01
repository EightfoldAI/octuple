import { useContext } from 'react';
import type { ValidateStatus } from '../Form.types';
import { FormItemInputContext } from '../Context';
import { warning } from '../../../shared/utilities';

type UseFormItemStatus = () => {
    status?: ValidateStatus;
};

const useFormItemStatus: UseFormItemStatus = () => {
    const { status } = useContext(FormItemInputContext);

    warning(
        status !== undefined,
        `Form.Item.useStatus should be used under Form.Item component. For more information: ${window.location.protocol}//${window.location.host}/components/form/#Form.Item.useStatus`
    );

    return { status };
};

export default useFormItemStatus;
