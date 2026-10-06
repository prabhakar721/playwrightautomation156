function longestPalindrome(s: string): string {

    let longest = "";

    for (let i = 0; i < s.length; i++) {

        for (let j = i; j < s.length; j++) {

            let word = s.substring(i, j + 1);
            let reverse = "";

            for (let k = word.length - 1; k >= 0; k--) {
                reverse = reverse + word[k];
            }

            if (word === reverse && word.length > longest.length) {
                longest = word;
            }
        }
    }

    return longest;
}

console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));