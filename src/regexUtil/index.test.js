import { getType } from ".";
describe('get object type test', () => {
    const testObj = [
        {
            input: { a: 4 },
            result: 'object',
        },
        {
            input: [1, 2, 3],
            result: 'array',
        },
        {
            input: new ReferenceError(),
            result: 'error',
        },
        {
            input: new Date(),
            result: 'date',
        },
        {
            input: /a-z/,
            result: 'regexp',
        },
        {
            input: JSON,
            result: 'json',
        },
        {
            input: 4,
            result: 'number',
        },
        {
            input: new Number(4),
            result: 'number',
        },
        {
            input: new String('string'),
            result: 'string',
        },
        {
            input: 'string',
            result: 'string',
        },
        {
            input: false,
            result: 'boolean',
        },
        {
            input: new Boolean(true),
            result: 'boolean',
        },
        {
            input: undefined,
            result: 'undefined',
        },
        {
            input: null,
            result: 'null',
        },
    ];
    testObj.forEach((testCase) => {
        test(`${JSON.stringify(testCase.input)} => ${JSON.stringify(testCase.result)}`, () => {
            const result = JSON.stringify(getType(testCase.input));
            const expectedResult = JSON.stringify(testCase.result);
            expect(result).toBe(expectedResult);
        });
    });
});
