import { readFile } from '../utils/readFile.js';
import { calcSum } from '../utils/calcSum.js';

const mapInput = (input) => {
    const mappedInput = input.map((line) => line.split('   ').map(Number));
    const left = mappedInput.map((line) => line[0]).sort();
    const right = mappedInput.map((line) => line[1]).sort();

    console.assert(left.length === mappedInput.length, 'Left side broken');
    console.assert(right.length === mappedInput.length, 'Right side broken');

    return { left, right };
};

const solve = (input) => {
    const {left, right} = mapInput(input);

    let index = 0;
    const distances = [];
    while (index < left.length) {
        const leftValue = left[index];
        const rightValue = right[index];
        const distance = Math.abs(leftValue - rightValue);
        distances.push(distance);
        index++;
    }

    return calcSum(distances);
};

const solvePart2 = (input) => {
    const {left, right} = mapInput(input);

    const calculatedAccurances = {};
    const allComplecities = [];

    left.forEach((leftValue) => {
        if (calculatedAccurances[leftValue]) {
            allComplecities.push(calculatedAccurances[leftValue]);
            return;
        }

        const complexityNumber = right.filter((rightValue) => rightValue === leftValue).length;
        const calc = complexityNumber * leftValue;
        calculatedAccurances[leftValue] = calc;
        allComplecities.push(calc);
    });

    return calcSum(allComplecities);
};

const day1Test = async () => {
    const input = await readFile('./01/test-input.txt');
    return solve(input);
};

const testResult = await day1Test();
console.assert( testResult === 11, testResult);

const day1 = async () => {
    const input = await readFile('./01/input.txt');
    return solve(input);
};

const result = await day1();
console.log('Part one answer: ',result);

const day1Part2Test = async () => {
    const input = await readFile('./01/test-input.txt');
    return solvePart2(input);
};

const testPart2Result = await day1Part2Test();
console.assert( testPart2Result === 31, testPart2Result);

const day1Part2 = async () => {
    const input = await readFile('./01/input.txt');
    return solvePart2(input);
};

const part2Result = await day1Part2();
console.log('Part two answer: ',part2Result);