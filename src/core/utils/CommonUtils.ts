/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { PropertyPath } from 'lodash';
import _ from 'lodash';

export const delay = async <Number>(t: number): Promise<Number> =>
  await new Promise<Number>(() => setTimeout(() => {}, t));

export const safeGetNumber = (
  object: unknown,
  path: PropertyPath,
  defaultValue: number
): number => {
  let value = _.get(object, path);
  value = _.defaultTo(value, defaultValue);
  //   if (__DEV__) {
  //     if (_.isNil(value) || _.isNaN(value)) {
  //       console.warn(`safeGetNumber: value=[${value}] must be a number.`);
  //     }
  //     if (_.isString(value)) {
  //       console.warn(`safeGetNumber: value=[${value}] must be a number.`);
  //     }
  //   }
  if (_.isNumber(value)) {
    return value;
  }

  return defaultValue;
};

export const jsonParseSafe = (data: string) => {
  let result;
  try {
    result = JSON.parse(data);
  } catch (error) {
    //
  }
  return result;
};
/**
 * @deprecated Use safeGetString or safeGetNumber instead.
 */
export const safeGet = (object: unknown, path: PropertyPath, defaultValue: unknown): any => {
  const value = _.get(object, path);
  return _.defaultTo(value, defaultValue);
};

export const safeGetString = (
  object: unknown,
  path: PropertyPath,
  defaultValue: string
): string => {
  let value = _.get(object, path);
  value = _.defaultTo(value, defaultValue);
  //   if (__DEV__) {
  //     if (!_.isString(value)) {
  //       console.warn(`safeGetString: value=[${value}] must be a string.`);
  //     }
  //   }
  if (_.isString(value) && value !== '') {
    return value;
  }
  return defaultValue;
};

export const safeGetBoolean = (
  object: unknown,
  path: PropertyPath,
  defaultValue: boolean
): boolean => {
  let value = _.get(object, path);
  value = _.defaultTo(value, defaultValue);

  if (_.isBoolean(value)) {
    return value;
  }
  return defaultValue;
};
