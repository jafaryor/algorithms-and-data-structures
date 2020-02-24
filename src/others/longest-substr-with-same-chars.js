/**
 * find the longest sub string with same characters in the str
 * @param {string} str
 */
function longestSubStrWithSameChars(str) {
    // if empty string
    if (!str.length) return null;

    const matches = str.match(/(.)\1+/g);

    // if every character is single in str
    if (!matches) return null;

    // find the longest sub-string
    const longestSubStr = matches
        .reduce((longest, substr) => substr.length > longest.length ? substr : longest, '');

    return {
        subString: longestSubStr,
        index: str.indexOf(longestSubStr),
        length: longestSubStr.length
    };
}

console.log(longestSubStrWithSameChars('aabbbbbbcccddd')); // 'bbbbbb'
console.log(longestSubStrWithSameChars('abcd')); // null
console.log(longestSubStrWithSameChars('a')); // null
console.log(longestSubStrWithSameChars('')); // null
console.log(longestSubStrWithSameChars('_---==')); // '---'