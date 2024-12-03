import { readFile } from "../utils/readFile.js";
import { calcSum } from "../utils/calcSum.js";

const inputParser = (rawInput) => {
    return rawInput.split('\n').join('');
};

const parseOperations = (input) => {
    const filter = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
    const matches = [...input.matchAll(filter)].map((item) => item[0]);
    return matches;
};

const solve = (input) => {
    const matches = parseOperations(input);
    const results = matches.map((item) => {
        const parts = item.replace('mul(', '').replace(')', '').split(',');
        return Number(parts[0]) * Number(parts[1]);
    });
    return calcSum(results);
};

const test1 = async () => {
    const input = await readFile('./03/test-input.txt', inputParser);
    return solve(input);
};

const testResult = await test1();
console.assert( testResult === 161, testResult);


const calcPart1 = async () => {
    const input = await readFile('./03/input.txt', inputParser);
    return solve(input);
};

const part1Result = await calcPart1();
console.log('Part one answer: ', part1Result);

const solvePart2 = (input) => {
    const mappedInput = input.split("do()").map((part) => part.split("don't()")).map((items) => items[0]).join('');
    return solve(mappedInput);
};

const test2 = async () => {
    const input = await readFile('./03/test-input.txt', inputParser);
    return solvePart2(input);
};

const testPart2Result = await test2();
console.assert( testPart2Result === 48, testPart2Result);


const calcPart2 = async () => {
    const input = await readFile('./03/input.txt', inputParser);
    return solvePart2(input);
};

const part2Result = await calcPart2();
console.log('Part two answer: ', part2Result);