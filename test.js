function outer() {
    let number = 1;

    return function inner() {
        console.log(number++);
    };
}

const innerFunction = outer();
innerFunction(); // 1
innerFunction(); // 2
innerFunction(); // 3

function outer2() {
    let number = 1;

    function inner() {
        console.log(number++);
    }

    inner();
}

outer2(); // 1
outer2(); // 1
outer2(); // 1
