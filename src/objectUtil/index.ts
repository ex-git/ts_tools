/* eslint-disable no-restricted-syntax */
import { isTestEnv } from '../envUtil';
import { getType } from '../regexUtil';
import { isSameText } from '../stringUtil';

const isObject = <T>(obj: T) => getType(obj) === 'object';

const circularReplacer = () => {
    const seen = new WeakSet();
    return (key: string, value: any) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export const deepCloneWithoutCircularReferences = <T>(obj: T) => JSON.parse(JSON.stringify(obj, circularReplacer()));

type CacheItem = {
    original: any,
    copy: any
}

// backward compatible deep copy, circular references allowed
const newCopyHelper = <T>(obj: T) => Array.isArray(obj) ? new Array() : Object.assign({});

export const recursiveDeepClone = <T>(obj: T, cacheList: CacheItem[] = []): T => {
    const inputType = getType(obj)
    // just return if obj is immutable value
    if (['object', 'array'].indexOf(inputType) === -1) {
        return obj;
    }

    // if obj is hit, it is in circular structure
    const circularStructure = cacheList.find((c) => c.original === obj);
    if (circularStructure) {
        return circularStructure.copy;
    }

    const copy = newCopyHelper(obj);
    // put the copy into cache at first
    // because we want to refer it in recursive deep copy
    cacheList.push({ original: obj, copy });

    Object.keys(obj as [] | Record<string, any>).forEach((key) => {
        const idx = parseInt(key)
        if (Number.isNaN(idx)) {
            copy[key] = recursiveDeepClone((obj as Record<string, any>)[key], cacheList);
        } else {
            copy[key] = recursiveDeepClone((obj as [])[idx], cacheList);
        }
    });

    return <T>copy;
};

// deep copy obj with circular references using JSON.parse(JSON.stringfy(obj)) will fail
// this is the better way to handle that
const deepClone = <T>(obj: T) => {
    try {
        // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
        return structuredClone(obj);
    } catch {
        // old browser or node env below v. 17 will not have structuredClone
        return recursiveDeepClone(obj);
    }
};

module.exports.isObject = isObject
module.exports.deepClone = deepClone
if (isTestEnv) {
    module.exports.newCopyHelper = newCopyHelper
}