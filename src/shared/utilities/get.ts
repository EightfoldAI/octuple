export const get = (
    entity: any,
    path: (string | number)[]
): ((entity: any, path: (string | number)[]) => any) => {
    let current = entity;

    for (let i = 0; i < path.length; i += 1) {
        if (current === null || current === undefined) {
            return undefined;
        }

        current = current[path[i]];
    }

    return current;
};
