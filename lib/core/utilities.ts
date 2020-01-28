import {
  ISet,
  IStringNumberOrNull,
  IStringOrNumber,
} from '../interfaces';

export const isNumber = (n?: any): n is number => (
  typeof n === 'number' && !isNaN(n)
);

export const isInteger = (n?: any): n is number => {
  return isNumber(n) && n % 1 === 0;
};

export const isStringOrNumber = (n?: any): n is IStringOrNumber => (
  isNumber(n) || typeof n === 'string'
);

export const isStringNumberOrNull = (n?: any): n is IStringNumberOrNull => (
  isStringOrNumber(n) || n === null
);

export const isValidArrayIndex = (n?: any): n is number => (
  isInteger(n) && n >= 0
);

export const isSet = <T>(set: any): set is T => (
  set
  && 'set' in set
  && typeof set.set === 'object'
  && Array.isArray(set.set)
);

export const aliasIsSet = <T extends ISet<any>>(set: T) => (key: any): key is string => (
  typeof key === 'string'
  && 'alias' in set
  && typeof set.alias === 'object'
  && isValidArrayIndex(set.alias[key])
);

export const getSetValueIndex = <T extends ISet<any>>(set: T) =>
(key?: IStringOrNumber): number | null => {
  if (isValidArrayIndex(key)) {
    return key;
  } else if (aliasIsSet<T>(set)(key)) {
    return set.alias![key];
  } else if (typeof key === 'undefined') {
    return isValidArrayIndex(set.default) ? set.default : 0;
  }

  return null;
}

export const toString = (n: IStringOrNumber): string => (
  isNumber(n) ? n.toString() : n
);

export const isValidArrayWithItems = <T>(n: any): n is T[] => (
  typeof n === 'object' && Array.isArray(n) && n.length > 0
);

export const memo = <T>(func: Function, cache: Map<string, T>) => (...args) => {
  const key = JSON.stringify(args);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const value = func(...args);

  cache.set(key, value);

  return value;
}