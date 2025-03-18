// here the context of the arrow function is the global because it is created in the global context
const sayHiOuterArrow = () => {
    console.log(`Hi, my name is ${this.name}!`);
};

const person = {
    name: 'John',
    greet() {
        function sayHi() {
            console.log(`Hi, my name is ${this.name}!`);
        }

        const sayHiArrow = () => {
            console.log(`Hi, my name is ${this.name}!`);
        };

        console.log(this.name); // John

        sayHi(); // Hi, my names is undefined!

        sayHiArrow(); // 'Hi, my name is John!'

        sayHiOuterArrow(); // 'Hi, my name is undefined!'
    }
};

person.greet();
