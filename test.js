function sayHi(salutation, name) {
    console.log(`Hi ${salutation} ${name}, my name is ${this.name}!`);
}

const newContext = {
    name: 'John'
};

const modifiedSayHi = sayHi.bind(newContext);
modifiedSayHi('dear', 'Michel'); // Hi dear Michel, my name is John!
