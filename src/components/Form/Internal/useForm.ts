import React from 'react';
import { HOOK_MARK } from './OcFieldContext';
import type {
    OcCallbacks,
    OcFieldData,
    OcFieldEntity,
    OcFieldError,
    OcFormInstance,
    InternalOcFieldData,
    InternalOcFormInstance,
    InternalOcHooks,
    InternalOcNamePath,
    InternalOcValidateFields,
    OcMeta,
    OcNamePath,
    OcNotifyInfo,
    OcRuleError,
    OcStore,
    OcStoreValue,
    OcValidateErrorEntity,
    ValidateMessages,
    OcValidateOptions,
    OcValuedNotifyInfo,
    WatchOcCallBack,
} from './OcForm.types';
import { allPromiseFinish } from './Utils/asyncUtil';
import cloneDeep from './Utils/cloneDeep';
import { defaultValidateMessages } from './Utils/messages';
import NameMap from './Utils/NameMap';
import {
    cloneByNamePathList,
    containsNamePath,
    getNamePath,
    getValue,
    matchNamePath,
    setValue,
    setValues,
} from './Utils/valueUtil';

type InvalidateFieldEntity = { INVALIDATE_NAME_PATH: InternalOcNamePath };

interface UpdateAction {
    type: 'updateValue';
    namePath: InternalOcNamePath;
    value: OcStoreValue;
}

interface ValidateAction {
    type: 'validateField';
    namePath: InternalOcNamePath;
    triggerName: string;
}

export type ReducerAction = UpdateAction | ValidateAction;

export class FormStore {
    private formHooked: boolean = false;

    private forceRootUpdate: () => void;

    private subscribable: boolean = true;

    private store: OcStore = {};

    private fieldEntities: OcFieldEntity[] = [];

    private initialValues: OcStore = {};

    private callbacks: OcCallbacks = {};

    private validateMessages: ValidateMessages = null;

    private preserve?: boolean = null;

    private lastValidatePromise: Promise<OcFieldError[]> = null;

    constructor(forceRootUpdate: () => void) {
        this.forceRootUpdate = forceRootUpdate;
    }

    public getForm = (): InternalOcFormInstance => ({
        getFieldValue: this.getFieldValue,
        getFieldListValues: this.getFieldListValues,
        getFieldError: this.getFieldError,
        getFieldWarning: this.getFieldWarning,
        getFieldListErrors: this.getFieldListErrors,
        isListTouched: this.isListTouched,
        isTouched: this.isTouched,
        isValidating: this.isValidating,
        isListValidating: this.isListValidating,
        resetFields: this.resetFields,
        setFields: this.setFields,
        setFieldValue: this.setFieldValue,
        setFieldListValues: this.setFieldListValues,
        validateFields: this.validateFields,
        submit: this.submit,
        _init: true,

        getInternalHooks: this.getInternalHooks,
    });

    // ======================== Internal Hooks ========================
    private getInternalHooks = (key: string): InternalOcHooks | null => {
        if (key === HOOK_MARK) {
            this.formHooked = true;

            return {
                dispatch: this.dispatch,
                initEntityValue: this.initEntityValue,
                registerField: this.registerField,
                useSubscribe: this.useSubscribe,
                setInitialValues: this.setInitialValues,
                destroyForm: this.destroyForm,
                setCallbacks: this.setCallbacks,
                setValidateMessages: this.setValidateMessages,
                getFields: this.getFields,
                setPreserve: this.setPreserve,
                getInitialValue: this.getInitialValue,
                registerWatch: this.registerWatch,
            };
        }

        return null;
    };

    private useSubscribe = (subscribable: boolean) => {
        this.subscribable = subscribable;
    };

    /**
     * Record prev Form unmount fieldEntities which config preserve false.
     * This need to be refill with initialValues instead of store value.
     */
    private prevWithoutPreserves: NameMap<boolean> | null = null;

    /**
     * First time `setInitialValues` should update store with initial value
     */
    private setInitialValues = (initialValues: OcStore, init: boolean) => {
        this.initialValues = initialValues || {};
        if (init) {
            let nextStore = setValues({}, initialValues, this.store);

            // We will take consider prev form unmount fields.
            // When the field is not `preserve`, we need fill this with initialValues instead of store.
            // eslint-disable-next-line array-callback-return
            this.prevWithoutPreserves?.map(({ key: namePath }) => {
                nextStore = setValue(
                    nextStore,
                    namePath,
                    getValue(initialValues, namePath)
                );
            });
            this.prevWithoutPreserves = null;

            this.updateStore(nextStore);
        }
    };

    private destroyForm = () => {
        const prevWithoutPreserves = new NameMap<boolean>();
        this.getFieldEntities(true).forEach((entity) => {
            if (!this.isMergedPreserve(entity.isPreserve())) {
                prevWithoutPreserves.set(entity.getNamePath(), true);
            }
        });

        this.prevWithoutPreserves = prevWithoutPreserves;
    };

    private getInitialValue = (namePath: InternalOcNamePath) => {
        const initValue = getValue(this.initialValues, namePath);

        // Not cloneDeep when without `namePath`
        return namePath.length ? cloneDeep(initValue) : initValue;
    };

    private setCallbacks = (callbacks: OcCallbacks) => {
        this.callbacks = callbacks;
    };

    private setValidateMessages = (validateMessages: ValidateMessages) => {
        this.validateMessages = validateMessages;
    };

    private setPreserve = (preserve?: boolean) => {
        this.preserve = preserve;
    };

    // ============================= Watch ============================
    private watchList: WatchOcCallBack[] = [];

    private registerWatch: InternalOcHooks['registerWatch'] = (callback) => {
        this.watchList.push(callback);

        return () => {
            this.watchList = this.watchList.filter((fn) => fn !== callback);
        };
    };

    private notifyWatch = (namePath: InternalOcNamePath[] = []) => {
        // No need to cost perf when nothing need to watch
        if (this.watchList.length) {
            const values = this.getFieldListValues();

            this.watchList.forEach((callback) => {
                callback(values, namePath);
            });
        }
    };

    // ============================ Store =============================
    private updateStore = (nextStore: OcStore) => {
        this.store = nextStore;
    };

    // ============================ Fields ============================
    /**
     * Get registered field entities.
     * @param pure Only return field which has a `name`. Default: false
     */
    private getFieldEntities = (pure: boolean = false) => {
        if (!pure) {
            return this.fieldEntities;
        }

        return this.fieldEntities.filter((field) => field.getNamePath().length);
    };

    private getFieldsMap = (pure: boolean = false) => {
        const cache: NameMap<OcFieldEntity> = new NameMap();
        this.getFieldEntities(pure).forEach((field) => {
            const namePath = field.getNamePath();
            cache.set(namePath, field);
        });
        return cache;
    };

    private getFieldEntitiesForNamePathList = (
        nameList?: OcNamePath[]
    ): (OcFieldEntity | InvalidateFieldEntity)[] => {
        if (!nameList) {
            return this.getFieldEntities(true);
        }
        const cache = this.getFieldsMap(true);
        return nameList.map((name) => {
            const namePath = getNamePath(name);
            return (
                cache.get(namePath) || {
                    INVALIDATE_NAME_PATH: getNamePath(name),
                }
            );
        });
    };

    private getFieldListValues = (
        nameList?: OcNamePath[] | true,
        filterFunc?: (meta: OcMeta) => boolean
    ) => {
        if (nameList === true && !filterFunc) {
            return this.store;
        }

        const fieldEntities = this.getFieldEntitiesForNamePathList(
            Array.isArray(nameList) ? nameList : null
        );

        const filteredNameList: OcNamePath[] = [];
        fieldEntities.forEach(
            (entity: OcFieldEntity | InvalidateFieldEntity) => {
                const namePath =
                    'INVALIDATE_NAME_PATH' in entity
                        ? entity.INVALIDATE_NAME_PATH
                        : entity.getNamePath();

                // Ignore when it's a list item and not specific the namePath,
                // since parent field is already take in count
                if (!nameList && (entity as OcFieldEntity).isListField?.()) {
                    return;
                }

                if (!filterFunc) {
                    filteredNameList.push(namePath);
                } else {
                    const meta: OcMeta =
                        'getMeta' in entity ? entity.getMeta() : null;
                    if (filterFunc(meta)) {
                        filteredNameList.push(namePath);
                    }
                }
            }
        );

        return cloneByNamePathList(
            this.store,
            filteredNameList.map(getNamePath)
        );
    };

    private getFieldValue = (name: OcNamePath) => {
        const namePath: InternalOcNamePath = getNamePath(name);
        return getValue(this.store, namePath);
    };

    private getFieldListErrors = (nameList?: OcNamePath[]) => {
        const fieldEntities = this.getFieldEntitiesForNamePathList(nameList);

        return fieldEntities.map((entity, index) => {
            if (entity && !('INVALIDATE_NAME_PATH' in entity)) {
                return {
                    name: entity.getNamePath(),
                    errors: entity.getErrors(),
                    warnings: entity.getWarnings(),
                };
            }

            return {
                name: getNamePath(nameList[index]),
                errors: [],
                warnings: [],
            };
        });
    };

    private getFieldError = (name: OcNamePath): string[] => {
        const namePath = getNamePath(name);
        const fieldError = this.getFieldListErrors([namePath])[0];
        return fieldError.errors;
    };

    private getFieldWarning = (name: OcNamePath): string[] => {
        const namePath = getNamePath(name);
        const fieldError = this.getFieldListErrors([namePath])[0];
        return fieldError.warnings;
    };

    private isListTouched = (...args: any[]) => {
        const [arg0, arg1] = args;
        let namePathList: InternalOcNamePath[] | null;
        let isAllFieldsTouched = false;

        if (args.length === 0) {
            namePathList = null;
        } else if (args.length === 1) {
            if (Array.isArray(arg0)) {
                namePathList = arg0.map(getNamePath);
                isAllFieldsTouched = false;
            } else {
                namePathList = null;
                isAllFieldsTouched = arg0;
            }
        } else {
            namePathList = arg0.map(getNamePath);
            isAllFieldsTouched = arg1;
        }

        const fieldEntities = this.getFieldEntities(true);
        const isTouched = (field: OcFieldEntity) => field.isTouched();

        // ===== Will get fully compare when not config namePathList =====
        if (!namePathList) {
            return isAllFieldsTouched
                ? fieldEntities.every(isTouched)
                : fieldEntities.some(isTouched);
        }

        // Generate a nest tree for validate
        const map = new NameMap<OcFieldEntity[]>();
        namePathList.forEach((shortNamePath) => {
            map.set(shortNamePath, []);
        });

        fieldEntities.forEach((field) => {
            const fieldNamePath = field.getNamePath();

            // Find matched entity and put into list
            namePathList.forEach((shortNamePath) => {
                if (
                    shortNamePath.every(
                        (nameUnit, i) => fieldNamePath[i] === nameUnit
                    )
                ) {
                    map.update(shortNamePath, (list) => [...list, field]);
                }
            });
        });

        // Check if NameMap value is touched
        const isNamePathListTouched = (entities: OcFieldEntity[]) =>
            entities.some(isTouched);

        const namePathListEntities = map.map(({ value }) => value);

        return isAllFieldsTouched
            ? namePathListEntities.every(isNamePathListTouched)
            : namePathListEntities.some(isNamePathListTouched);
    };

    private isTouched = (name: OcNamePath) => {
        return this.isListTouched([name]);
    };

    private isListValidating = (nameList?: OcNamePath[]) => {
        const fieldEntities = this.getFieldEntities();
        if (!nameList) {
            return fieldEntities.some((testField) => testField.isValidating());
        }

        const namePathList: InternalOcNamePath[] = nameList.map(getNamePath);
        return fieldEntities.some((testField) => {
            const fieldNamePath = testField.getNamePath();
            return (
                containsNamePath(namePathList, fieldNamePath) &&
                testField.isValidating()
            );
        });
    };

    private isValidating = (name: OcNamePath) => {
        return this.isListValidating([name]);
    };

    /**
     * Reset Field with field `initialValue` prop.
     * Can pass `entities` or `namePathList` or just nothing.
     */
    private resetWithFieldInitialValue = (
        info: {
            entities?: OcFieldEntity[];
            namePathList?: InternalOcNamePath[];
            /** Skip reset if store exist value. This is only used for field register reset */
            skipExist?: boolean;
        } = {}
    ) => {
        // Create cache
        const cache: NameMap<Set<{ entity: OcFieldEntity; value: any }>> =
            new NameMap();

        const fieldEntities = this.getFieldEntities(true);
        fieldEntities.forEach((field) => {
            const { initialValue } = field.props;
            const namePath = field.getNamePath();

            // Record only if has `initialValue`
            if (initialValue !== undefined) {
                const records = cache.get(namePath) || new Set();
                records.add({ entity: field, value: initialValue });

                cache.set(namePath, records);
            }
        });

        // Reset
        const resetWithFields = (entities: OcFieldEntity[]) => {
            entities.forEach((field) => {
                const { initialValue } = field.props;

                if (initialValue !== undefined) {
                    const namePath = field.getNamePath();
                    const records = cache.get(namePath);

                    if (records) {
                        const originValue = this.getFieldValue(namePath);
                        // Set `initialValue`
                        if (!info.skipExist || originValue === undefined) {
                            this.updateStore(
                                setValue(
                                    this.store,
                                    namePath,
                                    [...records][0].value
                                )
                            );
                        }
                    }
                }
            });
        };

        let requiredFieldEntities: OcFieldEntity[];
        if (info.entities) {
            requiredFieldEntities = info.entities;
        } else if (info.namePathList) {
            requiredFieldEntities = [];

            info.namePathList.forEach((namePath) => {
                const records = cache.get(namePath);
                if (records) {
                    requiredFieldEntities.push(
                        ...[...records].map((r) => r.entity)
                    );
                }
            });
        } else {
            requiredFieldEntities = fieldEntities;
        }

        resetWithFields(requiredFieldEntities);
    };

    private resetFields = (nameList?: OcNamePath[]) => {
        const prevStore = this.store;
        if (!nameList) {
            this.updateStore(setValues({}, this.initialValues));
            this.resetWithFieldInitialValue();
            this.notifyObservers(prevStore, null, { type: 'reset' });
            this.notifyWatch();
            return;
        }

        // Reset by `nameList`
        const namePathList: InternalOcNamePath[] = nameList.map(getNamePath);
        namePathList.forEach((namePath) => {
            const initialValue = this.getInitialValue(namePath);
            this.updateStore(setValue(this.store, namePath, initialValue));
        });
        this.resetWithFieldInitialValue({ namePathList });
        this.notifyObservers(prevStore, namePathList, { type: 'reset' });
        this.notifyWatch(namePathList);
    };

    private setFields = (fields: OcFieldData[]) => {
        const prevStore = this.store;

        const namePathList: InternalOcNamePath[] = [];

        fields.forEach((fieldData: OcFieldData) => {
            const { name, errors, ...data } = fieldData;
            const namePath = getNamePath(name);
            namePathList.push(namePath);

            // Value
            if ('value' in data) {
                this.updateStore(setValue(this.store, namePath, data.value));
            }

            this.notifyObservers(prevStore, [namePath], {
                type: 'setField',
                data: fieldData,
            });
        });

        this.notifyWatch(namePathList);
    };

    private getFields = (): InternalOcFieldData[] => {
        const entities = this.getFieldEntities(true);

        const fields = entities.map(
            (field: OcFieldEntity): InternalOcFieldData => {
                const namePath = field.getNamePath();
                const meta = field.getMeta();
                const fieldData = {
                    ...meta,
                    name: namePath,
                    value: this.getFieldValue(namePath),
                };

                Object.defineProperty(fieldData, 'originOcField', {
                    value: true,
                });

                return fieldData;
            }
        );

        return fields;
    };

    // =========================== Observer ===========================
    /**
     * This only trigger when a field is on constructor to avoid we get initialValue too late
     */
    private initEntityValue = (entity: OcFieldEntity) => {
        const { initialValue } = entity.props;

        if (initialValue !== undefined) {
            const namePath = entity.getNamePath();
            const prevValue = getValue(this.store, namePath);

            if (prevValue === undefined) {
                this.updateStore(setValue(this.store, namePath, initialValue));
            }
        }
    };

    private isMergedPreserve = (fieldPreserve?: boolean) => {
        const mergedPreserve =
            fieldPreserve !== undefined ? fieldPreserve : this.preserve;
        return mergedPreserve ?? true;
    };

    private registerField = (entity: OcFieldEntity) => {
        this.fieldEntities.push(entity);
        const namePath = entity.getNamePath();
        this.notifyWatch([namePath]);

        // Set initial values
        if (entity.props.initialValue !== undefined) {
            const prevStore = this.store;
            this.resetWithFieldInitialValue({
                entities: [entity],
                skipExist: true,
            });
            this.notifyObservers(prevStore, [entity.getNamePath()], {
                type: 'valueUpdate',
                source: 'internal',
            });
        }

        // un-register field callback
        return (
            isListField?: boolean,
            preserve?: boolean,
            subNamePath: InternalOcNamePath = []
        ) => {
            this.fieldEntities = this.fieldEntities.filter(
                (item) => item !== entity
            );

            // Clean up store value if not preserve
            if (
                !this.isMergedPreserve(preserve) &&
                (!isListField || subNamePath.length > 1)
            ) {
                const defaultValue = isListField
                    ? undefined
                    : this.getInitialValue(namePath);

                if (
                    namePath.length &&
                    this.getFieldValue(namePath) !== defaultValue &&
                    this.fieldEntities.every(
                        (field) =>
                            // Only reset when no namePath exist
                            !matchNamePath(field.getNamePath(), namePath)
                    )
                ) {
                    const prevStore = this.store;
                    this.updateStore(
                        setValue(prevStore, namePath, defaultValue, true)
                    );

                    // Notify that field is unmount
                    this.notifyObservers(prevStore, [namePath], {
                        type: 'remove',
                    });

                    // Dependencies update
                    this.triggerDependenciesUpdate(prevStore, namePath);
                }
            }

            this.notifyWatch([namePath]);
        };
    };

    private dispatch = (action: ReducerAction) => {
        switch (action.type) {
            case 'updateValue': {
                const { namePath, value } = action;
                this.updateValue(namePath, value);
                break;
            }
            case 'validateField': {
                const { namePath, triggerName } = action;
                this.validateFields([namePath], { triggerName });
                break;
            }
            default:
            // Currently we don't have other action. Do nothing.
        }
    };

    private notifyObservers = (
        prevStore: OcStore,
        namePathList: InternalOcNamePath[] | null,
        info: OcNotifyInfo
    ) => {
        if (this.subscribable) {
            const mergedInfo: OcValuedNotifyInfo = {
                ...info,
                store: this.getFieldListValues(true),
            };
            this.getFieldEntities().forEach(({ onStoreChange }) => {
                onStoreChange(prevStore, namePathList, mergedInfo);
            });
        } else {
            this.forceRootUpdate();
        }
    };

    /**
     * Notify dependencies children with parent update
     * We need delay to trigger validate in case Field is under render props
     */
    private triggerDependenciesUpdate = (
        prevStore: OcStore,
        namePath: InternalOcNamePath
    ) => {
        const childrenFields = this.getDependencyChildrenFields(namePath);
        if (childrenFields.length) {
            this.validateFields(childrenFields);
        }

        this.notifyObservers(prevStore, childrenFields, {
            type: 'dependenciesUpdate',
            relatedFields: [namePath, ...childrenFields],
        });

        return childrenFields;
    };

    private updateValue = (name: OcNamePath, value: OcStoreValue) => {
        const namePath = getNamePath(name);
        const prevStore = this.store;
        this.updateStore(setValue(this.store, namePath, value));

        this.notifyObservers(prevStore, [namePath], {
            type: 'valueUpdate',
            source: 'internal',
        });
        this.notifyWatch([namePath]);

        // Dependencies update
        const childrenFields = this.triggerDependenciesUpdate(
            prevStore,
            namePath
        );

        // trigger callback function
        const { onValuesChange } = this.callbacks;

        if (onValuesChange) {
            const changedValues = cloneByNamePathList(this.store, [namePath]);
            onValuesChange(changedValues, this.getFieldListValues());
        }

        this.triggerOnFieldsChange([namePath, ...childrenFields]);
    };

    // Let all child Field get update.
    private setFieldListValues = (store: OcStore) => {
        const prevStore = this.store;

        if (store) {
            const nextStore = setValues(this.store, store);
            this.updateStore(nextStore);
        }

        this.notifyObservers(prevStore, null, {
            type: 'valueUpdate',
            source: 'external',
        });
        this.notifyWatch();
    };

    private setFieldValue = (name: OcNamePath, value: any) => {
        this.setFields([
            {
                name,
                value,
            },
        ]);
    };

    private getDependencyChildrenFields = (
        rootNamePath: InternalOcNamePath
    ): InternalOcNamePath[] => {
        const children: Set<OcFieldEntity> = new Set();
        const childrenFields: InternalOcNamePath[] = [];

        const dependencies2fields: NameMap<Set<OcFieldEntity>> = new NameMap();

        /**
         * Generate maps
         * Can use cache to save perf if user report performance issue with this
         */
        this.getFieldEntities().forEach((field) => {
            const { dependencies } = field.props;
            (dependencies || []).forEach((dependency) => {
                const dependencyNamePath = getNamePath(dependency);
                dependencies2fields.update(
                    dependencyNamePath,
                    (fields = new Set()) => {
                        fields.add(field);
                        return fields;
                    }
                );
            });
        });

        const fillChildren = (namePath: InternalOcNamePath) => {
            const fields = dependencies2fields.get(namePath) || new Set();
            fields.forEach((field) => {
                if (!children.has(field)) {
                    children.add(field);

                    const fieldNamePath = field.getNamePath();
                    if (field.isDirty() && fieldNamePath.length) {
                        childrenFields.push(fieldNamePath);
                        fillChildren(fieldNamePath);
                    }
                }
            });
        };

        fillChildren(rootNamePath);

        return childrenFields;
    };

    private triggerOnFieldsChange = (
        namePathList: InternalOcNamePath[],
        filedErrors?: OcFieldError[]
    ) => {
        const { onFieldsChange } = this.callbacks;

        if (onFieldsChange) {
            const fields = this.getFields();

            /**
             * Fill errors since `fields` may be replaced by controlled fields
             */
            if (filedErrors) {
                const cache = new NameMap<string[]>();
                filedErrors.forEach(({ name, errors }) => {
                    cache.set(name, errors);
                });

                fields.forEach((field) => {
                    // eslint-disable-next-line no-param-reassign
                    field.errors = cache.get(field.name) || field.errors;
                });
            }

            const changedFields = fields.filter(({ name: fieldName }) =>
                containsNamePath(namePathList, fieldName as InternalOcNamePath)
            );
            onFieldsChange(changedFields, fields);
        }
    };

    private validateFields: InternalOcValidateFields = (
        nameList?: OcNamePath[],
        options?: OcValidateOptions
    ) => {
        const provideNameList = !!nameList;
        const namePathList: InternalOcNamePath[] | undefined = provideNameList
            ? nameList.map(getNamePath)
            : [];

        // Collect result in promise list
        const promiseList: Promise<OcFieldError>[] = [];

        this.getFieldEntities(true).forEach((field: OcFieldEntity) => {
            // Add field if not provide `nameList`
            if (!provideNameList) {
                namePathList.push(field.getNamePath());
            }

            /**
             * Recursive validate if configured.
             */
            if (options?.recursive && provideNameList) {
                const namePath = field.getNamePath();
                if (
                    // nameList[i] === undefined 说明是以 nameList 开头的
                    // ['name'] -> ['name','list']
                    namePath.every(
                        (nameUnit, i) =>
                            nameList[i] === nameUnit ||
                            nameList[i] === undefined
                    )
                ) {
                    namePathList.push(namePath);
                }
            }

            // Skip if without rule
            if (!field.props.rules || !field.props.rules.length) {
                return;
            }

            const fieldNamePath = field.getNamePath();
            // Add field validate rule in to promise list
            if (
                !provideNameList ||
                containsNamePath(namePathList, fieldNamePath)
            ) {
                const promise = field.validateRules({
                    validateMessages: {
                        ...defaultValidateMessages,
                        ...this.validateMessages,
                    },
                    ...options,
                });

                // Wrap promise with field
                promiseList.push(
                    promise
                        .then<any, OcRuleError>(() => ({
                            name: fieldNamePath,
                            errors: [],
                            warnings: [],
                        }))
                        .catch((ruleErrors: OcRuleError[]) => {
                            const mergedErrors: string[] = [];
                            const mergedWarnings: string[] = [];

                            ruleErrors.forEach?.(
                                ({ rule: { warningOnly }, errors }) => {
                                    if (warningOnly) {
                                        mergedWarnings.push(...errors);
                                    } else {
                                        mergedErrors.push(...errors);
                                    }
                                }
                            );

                            if (mergedErrors.length) {
                                return Promise.reject({
                                    name: fieldNamePath,
                                    errors: mergedErrors,
                                    warnings: mergedWarnings,
                                });
                            }

                            return {
                                name: fieldNamePath,
                                errors: mergedErrors,
                                warnings: mergedWarnings,
                            };
                        })
                );
            }
        });

        const summaryPromise = allPromiseFinish(promiseList);
        this.lastValidatePromise = summaryPromise;

        // Notify fields with rule that validate has finished and need update
        summaryPromise
            .catch((results) => results)
            .then((results: OcFieldError[]) => {
                const resultNamePathList: InternalOcNamePath[] = results.map(
                    ({ name }) => name
                );
                this.notifyObservers(this.store, resultNamePathList, {
                    type: 'validateFinish',
                });
                this.triggerOnFieldsChange(resultNamePathList, results);
            });

        const returnPromise: Promise<
            OcStore | OcValidateErrorEntity | string[]
        > = summaryPromise
            .then((): Promise<OcStore | string[]> => {
                if (this.lastValidatePromise === summaryPromise) {
                    return Promise.resolve(
                        this.getFieldListValues(namePathList)
                    );
                }
                return Promise.reject<string[]>([]);
            })
            .catch(
                (results: { name: InternalOcNamePath; errors: string[] }[]) => {
                    const errorList = results.filter(
                        (result) => result && result.errors.length
                    );
                    return Promise.reject({
                        values: this.getFieldListValues(namePathList),
                        errorFields: errorList,
                        outOfDate: this.lastValidatePromise !== summaryPromise,
                    });
                }
            );

        // Do not throw in console
        returnPromise.catch<OcValidateErrorEntity>((e) => e);

        return returnPromise as Promise<OcStore>;
    };

    private submit = () => {
        this.validateFields()
            .then((values) => {
                const { onFinish } = this.callbacks;
                if (onFinish) {
                    try {
                        onFinish(values);
                    } catch (err) {
                        // Should print error if user `onFinish` callback failed
                        console.error(err);
                    }
                }
            })
            .catch((e) => {
                const { onFinishFailed } = this.callbacks;
                if (onFinishFailed) {
                    onFinishFailed(e);
                }
            });
    };
}

function useForm<Values = any>(
    form?: OcFormInstance<Values>
): [OcFormInstance<Values>] {
    const formRef = React.useRef<OcFormInstance>();
    const [, forceUpdate] = React.useState({});

    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            // Create a new FormStore if not provided
            const forceReRender = () => {
                forceUpdate({});
            };

            const formStore: FormStore = new FormStore(forceReRender);

            formRef.current = formStore.getForm();
        }
    }

    return [formRef.current];
}

export default useForm;
