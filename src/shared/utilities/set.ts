import { get } from './get';

const internalSet = <Entity = any, Output = Entity, Value = any>(
    entity: Entity,
    paths: (string | number)[],
    value: Value,
    removeIfUndefined: boolean
): Output => {
    if (!paths.length) {
        return value as unknown as Output;
    }

    const [path, ...restPath] = paths;

    let clone: Output;
    if (!entity && typeof path === 'number') {
        clone = [] as unknown as Output;
    } else if (Array.isArray(entity)) {
        clone = [...entity] as unknown as Output;
    } else {
        clone = { ...entity } as unknown as Output;
    }

    // Delete prop if `removeIfUndefined` and value is undefined
    if (removeIfUndefined && value === undefined && restPath.length === 1) {
        delete (clone as any)[path][restPath[0]];
    } else {
        (clone as any)[path] = internalSet(
            (clone as any)[path],
            restPath,
            value,
            removeIfUndefined
        );
    }

    return clone;
};

export const set = <Entity = any, Output = Entity, Value = any>(
    entity: Entity,
    paths: (string | number)[],
    value: Value,
    removeIfUndefined: boolean = false
): Output => {
    // Do nothing if `removeIfUndefined` and parent object not exist
    if (
        paths.length &&
        removeIfUndefined &&
        value === undefined &&
        !get(entity, paths.slice(0, -1))
    ) {
        return entity as unknown as Output;
    }

    return internalSet(entity, paths, value, removeIfUndefined);
};
