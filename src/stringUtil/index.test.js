import { capitalizeFirstWordInSentence, isNonEmptyString, isSameText } from '.';

describe('capitalizeFirstWordInSentence test', () => {
    const testItems = [
        {
            testItem: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. nibh mauris cursus mattis molestie.',
            expectedResult: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie.',
        },
        {
            testItem: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua . nibh mauris cursus mattis molestie.',
            expectedResult: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua . Nibh mauris cursus mattis molestie.',
        },
        {
            testItem: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, 1.2 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua . nibh mauris cursus mattis molestie.',
            expectedResult: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 1.2 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua . Nibh mauris cursus mattis molestie.',
        },
        {
            testItem: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, 1.1 1.2 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua . nibh mauris cursus mattis molestie.',
            expectedResult: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 1.1 1.2 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua . Nibh mauris cursus mattis molestie.',
        },
        {
            testItem: [1, 2],
            expectedResult: [1, 2],
        },
        {
            testItem: [''],
            expectedResult: [''],
        },
        {
            testItem: [],
            expectedResult: [],
        },
        {
            testItem: [undefined],
            expectedResult: [undefined],
        },
        {
            testItem: '',
            expectedResult: '',
        },
        {
            testItem: null,
            expectedResult: null,
        },
        {
            testItem: undefined,
            expectedResult: undefined,
        },
        {
            testItem: 0,
            expectedResult: 0,
        },
        {
            testItem: {},
            expectedResult: {},
        },
        {
            testItem: { 1: 2 },
            expectedResult: { 1: 2 },
        },
    ];
    testItems.forEach((testCase) => {
        test(`${JSON.stringify(testCase.testItem)} => ${JSON.stringify(testCase.expectedResult)}`, () => {
            const { expectedResult } = testCase;
            expect(JSON.stringify(capitalizeFirstWordInSentence(testCase.testItem))).toBe(JSON.stringify(expectedResult));
        });
    });
});

describe('valid string test', () => {
    const testItems = [
        {
            testItem: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. nibh mauris cursus mattis molestie.',
            expectedResult: true,
        },
        {
            testItem: ' x',
            expectedResult: true,
        },
        {
            testItem: ' ',
            expectedResult: false,
        },
        {
            testItem: '',
            expectedResult: false,
        },
        {
            testItem: '     ',
            expectedResult: false,
        },
        {
            testItem: 1,
            expectedResult: false,
        },
        {
            testItem: 0,
            expectedResult: false,
        },
        {
            testItem: undefined,
            expectedResult: false,
        },
        {
            testItem: null,
            expectedResult: false,
        },
        {
            testItem: [],
            expectedResult: false,
        },
        {
            testItem: {},
            expectedResult: false,
        },
        {
            testItem: { 1: 1 },
            expectedResult: false,
        },
    ];
    testItems.forEach((testCase) => {
        test(`${JSON.stringify(testCase.testItem)} is a non empty string? ${testCase.expectedResult + ''}`, () => {
            const { expectedResult } = testCase;
            expect(JSON.stringify(isNonEmptyString(testCase.testItem))).toBe(JSON.stringify(expectedResult));
        });
    });
});

describe('isSameText test', () => {
    const testItems = [
        {
            testItem: 'abc',
            targetText: 'abc',
            expectedResult: true,
        },
        {
            testItem: 'abc',
            targetText: 'abc',
            expectedResult: true,
        },
        {
            testItem: 'ABC',
            targetText: 'abc',
            caseInsensitive: true,
            expectedResult: true,
        },
        {
            testItem: 'ABC',
            targetText: 'abc',
            caseInsensitive: false,
            expectedResult: false,
        },
        {
            testItem: 'abc',
            targetText: 'abc ',
            expectedResult: false,
        },
        {
            testItem: ' abc',
            targetText: 'abc ',
            expectedResult: false,
        },
        {
            testItem: ' ',
            targetText: ' ',
            expectedResult: true,
        },
        {
            testItem: '',
            targetText: ' ',
            expectedResult: false,
        },
        {
            testItem: null,
            targetText: '',
            expectedResult: false,
        },
        {
            testItem: undefined,
            targetText: '',
            expectedResult: false,
        },
        {
            testItem: {},
            targetText: ' ',
            expectedResult: false,
        },
        {
            testItem: 1,
            targetText: 'abc',
            expectedResult: false,
        },
        {
            testItem: true,
            targetText: 'abc',
            expectedResult: false,
        },
        {
            testItem: false,
            targetText: 'abc',
            expectedResult: false,
        },
        {
            testItem: [true],
            targetText: 'abc',
            expectedResult: false,
        },
    ];
    testItems.forEach((testCase) => {
        test(`${JSON.stringify(testCase.testItem)} === ${JSON.stringify(testCase.targetText)} => ${JSON.stringify(testCase.expectedResult)}`, () => {
            const {
                testItem,
                targetText,
                caseInsensitive = false,
                expectedResult
            } = testCase;
            expect(isSameText(testItem, targetText, caseInsensitive)).toBe(expectedResult);
        });
    });
});