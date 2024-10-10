function isEvenOrOdd (number : number) : string {
    if (number % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
};

console.log(isEvenOrOdd(2));
console.log(isEvenOrOdd(3));
isEvenOrOdd(329);
isEvenOrOdd(100);
isEvenOrOdd(921912);