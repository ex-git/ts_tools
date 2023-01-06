export declare const deepCloneWithoutCircularReferences: <T>(obj: T) => any;
type CacheItem = {
    original: any;
    copy: any;
};
export declare const recursiveDeepClone: <T>(obj: T, cacheList?: CacheItem[]) => T;
export {};
