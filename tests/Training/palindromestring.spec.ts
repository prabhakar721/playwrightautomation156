function longest(s: string): number {

    let max = 0;

    for (let i = 0; i < s.length; i++) {

        let count = 0;

        for (let j = i; j < s.length; j++) {

            let found = false;

            for (let k = i; k < j; k++) {

                if (s[k] === s[j]) {
                    found = true;
                }
            }

            if (found) {
                break;
            }

            count++;

            if (count > max) {
                max = count;
            }
        }
    }

    return max;
}

console.log(longest("abcabcbb"));