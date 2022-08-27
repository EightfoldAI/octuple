import React from 'react';
import RawAsyncValidator from 'async-validator';
import type {
    InternalOcNamePath,
    OcValidateOptions,
    OcRuleObject,
    OcStoreValue,
    OcRuleError,
} from '../OcForm.types';
import { defaultValidateMessages } from './messages';
import { setValues } from './valueUtil';

// Remove incorrect original ts define
const AsyncValidator: any = RawAsyncValidator;

/**
 * Replace with template.
 *   `I'm ${name}` + { name: 'mia' } = I'm mia
 */
function replaceMessage(template: string, kv: Record<string, string>): string {
    return template.replace(/\$\{\w+\}/g, (str: string) => {
        const key = str.slice(2, -1);
        return kv[key];
    });
}

const CODE_LOGIC_ERROR = 'CODE_LOGIC_ERROR';

async function validateRule(
    name: string,
    value: OcStoreValue,
    rule: OcRuleObject,
    options: OcValidateOptions,
    messageVariables?: Record<string, string>
): Promise<string[]> {
    if (rule.type === 'number') value = Number(value);
    const cloneRule = { ...rule };

    delete (cloneRule as any).ruleIndex;

    if (cloneRule.validator) {
        const originValidator = cloneRule.validator;
        cloneRule.validator = (...args) => {
            try {
                return originValidator(...args);
            } catch (error) {
                console.error(error);
                return Promise.reject(CODE_LOGIC_ERROR);
            }
        };
    }

    // We should special handle array validate
    let subRuleField: OcRuleObject = null;
    if (cloneRule && cloneRule.type === 'array' && cloneRule.defaultField) {
        subRuleField = cloneRule.defaultField;
        delete cloneRule.defaultField;
    }

    const validator = new AsyncValidator({
        [name]: [cloneRule],
    });

    const messages = setValues(
        {},
        defaultValidateMessages,
        options.validateMessages
    );
    validator.messages(messages);

    let result = [];

    try {
        await Promise.resolve(
            validator.validate({ [name]: value }, { ...options })
        );
    } catch (errObj) {
        if (errObj.errors) {
            result = errObj.errors.map(
                (props: { message: string }, index: number) => {
                    const mergedMessage =
                        props.message === CODE_LOGIC_ERROR
                            ? messages.default
                            : props.message;

                    return React.isValidElement(mergedMessage)
                        ? // Wrap ReactNode with `key`
                          React.cloneElement(mergedMessage, {
                              key: `error_${index}`,
                          })
                        : mergedMessage;
                }
            );
        }
    }

    if (!result.length && subRuleField) {
        const subResults: string[][] = await Promise.all(
            (value as OcStoreValue[]).map((subValue: OcStoreValue, i: number) =>
                validateRule(
                    `${name}.${i}`,
                    subValue,
                    subRuleField,
                    options,
                    messageVariables
                )
            )
        );

        return subResults.reduce((prev, errors) => [...prev, ...errors], []);
    }

    // Replace message with variables
    const kv = {
        ...(rule as Record<string, string | number>),
        name,
        enum: (rule.enum || []).join(', '),
        ...messageVariables,
    };

    const fillVariableResult = result.map((error: any) => {
        if (typeof error === 'string') {
            return replaceMessage(error, kv);
        }
        return error;
    });

    return fillVariableResult;
}

/**
 * We use `async-validator` to validate the value.
 * But only check one value in a time to avoid namePath validate issue.
 */
export function validateRules(
    namePath: InternalOcNamePath,
    value: OcStoreValue,
    rules: OcRuleObject[],
    options: OcValidateOptions,
    validateFirst: boolean | 'parallel',
    messageVariables?: Record<string, string>
) {
    const name = namePath.join('.');

    // Fill rule with context
    const filledRules: OcRuleObject[] = rules
        .map((currentRule, ruleIndex) => {
            const originValidatorFunc = currentRule.validator;
            const cloneRule = {
                ...currentRule,
                ruleIndex,
            };

            // Replace validator if needed
            if (originValidatorFunc) {
                cloneRule.validator = (
                    rule: OcRuleObject,
                    val: OcStoreValue,
                    callback: (error?: string) => void
                ) => {
                    let hasPromise = false;

                    // Wrap callback only accept when promise not provided
                    const wrappedCallback = (...args: string[]) => {
                        // Wait a tick to make sure return type is a promise
                        Promise.resolve().then(() => {
                            if (!hasPromise) {
                                callback(...args);
                            }
                        });
                    };

                    // Get promise
                    const promise = originValidatorFunc(
                        rule,
                        val,
                        wrappedCallback
                    );
                    hasPromise =
                        promise &&
                        typeof promise.then === 'function' &&
                        typeof promise.catch === 'function';

                    if (hasPromise) {
                        (promise as Promise<void>)
                            .then(() => {
                                callback();
                            })
                            .catch((err) => {
                                callback(err || ' ');
                            });
                    }
                };
            }

            return cloneRule;
        })
        .sort(
            (
                { warningOnly: w1, ruleIndex: i1 },
                { warningOnly: w2, ruleIndex: i2 }
            ) => {
                if (!!w1 === !!w2) {
                    // Keep origin order
                    return i1 - i2;
                }

                if (w1) {
                    return 1;
                }

                return -1;
            }
        );

    // Do validate rules
    let summaryPromise: Promise<OcRuleError[]>;

    if (validateFirst === true) {
        // >>>>> Validate by serialization
        summaryPromise = new Promise(async (resolve, reject) => {
            /* eslint-disable no-await-in-loop */
            for (let i = 0; i < filledRules.length; i += 1) {
                const rule = filledRules[i];
                const errors = await validateRule(
                    name,
                    value,
                    rule,
                    options,
                    messageVariables
                );
                if (errors.length) {
                    reject([{ errors, rule }]);
                    return;
                }
            }
            /* eslint-enable */

            resolve([]);
        });
    } else {
        // >>>>> Validate by parallel
        const rulePromises: Promise<OcRuleError>[] = filledRules.map((rule) =>
            validateRule(name, value, rule, options, messageVariables).then(
                (errors) => ({ errors, rule })
            )
        );

        summaryPromise = (
            validateFirst
                ? finishOnFirstFailed(rulePromises)
                : finishOnAllFailed(rulePromises)
        ).then(
            (errors: OcRuleError[]): OcRuleError[] | Promise<OcRuleError[]> => {
                // Always change to rejection for Field to catch
                return Promise.reject<OcRuleError[]>(errors);
            }
        );
    }

    // Internal catch error to avoid console error log.
    summaryPromise.catch((e) => e);

    return summaryPromise;
}

async function finishOnAllFailed(
    rulePromises: Promise<OcRuleError>[]
): Promise<OcRuleError[]> {
    return Promise.all(rulePromises).then(
        (errorsList: OcRuleError[]): OcRuleError[] | Promise<OcRuleError[]> => {
            const errors: OcRuleError[] = [].concat(...errorsList);

            return errors;
        }
    );
}

async function finishOnFirstFailed(
    rulePromises: Promise<OcRuleError>[]
): Promise<OcRuleError[]> {
    let count = 0;

    return new Promise((resolve) => {
        rulePromises.forEach((promise) => {
            promise.then((ruleError) => {
                if (ruleError.errors.length) {
                    resolve([ruleError]);
                }

                count += 1;
                if (count === rulePromises.length) {
                    resolve([]);
                }
            });
        });
    });
}
