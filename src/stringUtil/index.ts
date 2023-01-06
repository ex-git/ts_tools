import { getType } from "../regexUtil";

export const capitalizeFirstWordInSentence = (sentence: string | any): string | any => {
    if (typeof sentence === 'string' || sentence instanceof String) {
        if (sentence.trim().length) {
            const phraseFromSentence = sentence.split('. ');
            return phraseFromSentence.map((phrase) => phrase.charAt(0).toUpperCase() + phrase.slice(1)).join('. ');
        }
        return '';
    }
    return sentence;
};

export const isNonEmptyString = (anyData: any): boolean => typeof anyData === 'string' && anyData.trim() !== '';

export const isSameText = (
    firstText: string,
    secondText: string,
    caseInsensitive = true
) => {
    if (getType(firstText) === 'string' && getType(firstText) === 'string') {
        if (caseInsensitive) {
            return firstText.toLowerCase() === secondText.toLowerCase();
        }
        return firstText === secondText;
    }
    return false;
};
