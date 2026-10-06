function addTwoNumbers(l1: number[], l2: number[]): number[] {

    let result: number[] = [];
    let carry = 0;

    for (let i = 0; i < l1.length || i < l2.length; i++) {

        let num1 = 0;
        let num2 = 0;

        if (i < l1.length) {
            num1 = l1[i];
        }

        if (i < l2.length) {
            num2 = l2[i];
        }

        let sum = num1 + num2 + carry;

        result.push(sum % 10);

        carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
        result.push(carry);
    }

    return result;
}

console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));