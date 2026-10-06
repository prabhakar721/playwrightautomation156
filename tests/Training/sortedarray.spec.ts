function median(a: number[], b: number[]): number {

    let arr = [];

    for (let i = 0; i < a.length; i++) {
        arr.push(a[i]);
    }

    for (let i = 0; i < b.length; i++) {
        arr.push(b[i]);
    }

    arr.sort();

    let n = arr.length;

    if (n % 2 == 1) {
        return arr[Math.floor(n / 2)];
    }

    return (arr[n / 2 - 1] + arr[n / 2]) / 2;
}

console.log(median([1, 3], [2]));
console.log(median([1, 2], [3, 4]));