/* eslint-disable no-restricted-syntax */
import {
    isObject, newCopyHelper, deepCloneWithoutCircularReferences, deepClone,
} from ".";

describe('deepCloneWithoutCircularReferences - object', () => {
    const foo = {
        foo: 'Foo',
        bar: {
            bar: 'Bar',
        },
    };
    const expectedResult = JSON.stringify(foo);
    test(`${expectedResult} without circular reference`, () => {
        const resultObj = JSON.stringify(deepCloneWithoutCircularReferences(foo));
        expect(expectedResult).toBe(resultObj);
    });
    test(`${expectedResult} with circular reference`, () => {
        foo.bar.baz = foo; // circular reference!
        foo.baz = foo; // circular reference!
        const resultObj = JSON.stringify(deepCloneWithoutCircularReferences(foo));
        expect(expectedResult).toBe(resultObj);
    });
});

describe('deepCloneWithoutCircularReferences - array', () => {
    const foo = [1, 2, 3];
    test(`[${foo.toString()}] without circular reference`, () => {
        const expectedResult = JSON.stringify(foo);
        const resultObj = JSON.stringify(deepCloneWithoutCircularReferences(foo));
        expect(expectedResult).toBe(resultObj);
    });
    test(`[${foo.toString()}] with circular reference`, () => {
        foo[3] = foo; // circular reference!
        const resultObj = deepCloneWithoutCircularReferences(foo);
        expect(resultObj[3]).toBe(null);
    });
});

describe('deepClone test - object', () => {
    const foo = {
        foo: 'Foo',
        bar: {
            bar: 'Bar',
        },
    };
    test('deepClone test - without circular reference', () => {
        const resultObj = deepClone(foo);
        expect(resultObj).toMatchObject(foo);
        expect(JSON.stringify(resultObj)).toBe(JSON.stringify(foo));
    });

    const foo2 = {
        foo: 'Foo',
        bar: {
            bar: 'Bar',
        },
    };
    foo2.bar.baz = foo2; // circular reference!
    foo2.baz = foo2; // circular reference!
    test('deepClone test - w circular reference', () => {
        const refObj = { ...foo2 };
        const resultObj = deepClone(foo2);
        expect(foo2.baz).toMatchObject(refObj.baz);
        expect(foo2.baz).toMatchObject(resultObj.baz);

        // refObj.bar.baz is referencing foo2
        // resultObj.bar.baz is no longer referencing foo2
        foo2.bar.baz = 'test';
        expect(foo2.bar.baz).not.toEqual(resultObj.bar.baz);
        expect(foo2.bar.baz).toEqual(refObj.bar.baz);
        resultObj.bar.baz = 'test2';
        expect(foo2.bar.baz).toEqual('test');
        expect(refObj.bar.baz).toEqual('test');
        expect(foo2.bar.baz).not.toEqual(resultObj.bar.baz);

        // change to refObj.bar.baz will also mutate origibal object foo2
        refObj.bar.baz = 'test3';
        expect(foo2.bar.baz).toEqual('test3');
        expect(refObj.bar.baz).toEqual('test3');
        expect(foo2.bar.baz).not.toEqual(resultObj.bar.baz);
    });
});


describe('deepClone test - array', () => {
    const foo = [1, 2, 3];
    const foo2 = [1, 2, 3]
    const resultObj = deepClone(foo);
    foo2[3] = foo
    foo[1] = 1.1
    test('deepClone test - w circular reference', () => {
        expect(resultObj.toString()).not.toEqual(foo2.toString());
        expect(foo.toString()).toEqual(foo2[3].toString());
    });
});

describe('is object test', () => {
    const testObj = [
        {
            input: { a: 4 },
            result: true,
        },
        {
            input: {},
            result: true,
        },
        {
            input: [1, 2, 3],
            result: false,
        },
        {
            input: new ReferenceError(),
            result: false,
        },
        {
            input: new Date(),
            result: false,
        },
        {
            input: /a-z/,
            result: false,
        },
        {
            input: JSON,
            result: false,
        },
        {
            input: 4,
            result: false,
        },
        {
            input: new Number(4),
            result: false,
        },
        {
            input: new String('string'),
            result: false,
        },
        {
            input: 'string',
            result: false,
        },
        {
            input: false,
            result: false,
        },
        {
            input: new Boolean(true),
            result: false,
        },
        {
            input: undefined,
            result: false,
        },
        {
            input: null,
            result: false,
        },
    ];
    testObj.forEach((testCase) => {
        test(`${JSON.stringify(testCase.input)} => ${JSON.stringify(testCase.result)}`, () => {
            const result = JSON.stringify(isObject(testCase.input));
            const expectedResult = JSON.stringify(testCase.result);
            expect(result).toBe(expectedResult);
        });
    });
});



describe('newCopyHelper test', () => {
    const testObj = [
        {
            input: { a: 4 },
            result: {},
        },
        {
            input: {},
            result: {},
        },
        {
            input: [1, 2, 3],
            result: [],
        },
        {
            input: null,
            result: {},
        },
        {
            input: new Date(),
            result: {},
        },
        {
            input: /a-z/,
            result: {},
        },
        {
            input: JSON,
            result: {},
        },
        {
            input: 4,
            result: {},
        },
        {
            input: new Number(4),
            result: {},
        },
        {
            input: new String('string'),
            result: {},
        },
        {
            input: 'string',
            result: {},
        },
        {
            input: false,
            result: {},
        },
        {
            input: [new Boolean(true)],
            result: [],
        },
        {
            input: undefined,
            result: {},
        },
        {
            input: null,
            result: {},
        },
    ];
    testObj.forEach((testCase) => {
        test(`${JSON.stringify(testCase.input)} => ${JSON.stringify(testCase.result)}`, () => {
            const result = JSON.stringify(newCopyHelper(testCase.input));
            const expectedResult = JSON.stringify(testCase.result);
            expect(result).toBe(expectedResult);
        });
    });
});

