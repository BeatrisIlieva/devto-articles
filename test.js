const arr = [1, 2, 3, 4, 5];

function notPure(input) {
    let sum = 0;

    input.forEach(element => {
        if (element % 2 != 0) {
            sum += element;
        }
    });

    return sum;
}

console.log(notPure(arr)); // 9

function pure(input) {
    return input.reduce((acc, curr) => acc + curr);
}

console.log(pure(arr));
