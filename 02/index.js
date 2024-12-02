import { readFile } from "../utils/readFile.js";

const mapInput = (input) => {
    const mappedInput = input.map((line) => line.split(' ').map(Number));

    return mappedInput;
};

const isLineSafe = (line) => {
    const min = Math.min(...line);
    const max = Math.max(...line);

    if(line.includes(0)) {
        return false;
    }

    if(min < -3) {
        return false;
    }
    if(max > 3) {
        return false;
    }

    if(min < 0 && max > 0) {
        return false;
    }

    if(max > 0 && min < 0) {
        return false;
    }

    return true;
};

const countSafeLEvels = (levels) => {
    return levels.filter((level) => level).length;
};

const solve = (input) => {
    const mappedInput = mapInput(input);

    const safetys = mappedInput.map((line) => {
        const diffs = [];
        for(let i = 1; i < line.length; i++) {
            diffs.push(line[i - 1] - line[i]);
        }

        return isLineSafe(diffs);
    });

    return countSafeLEvels(safetys);
};

const solvePart2 = (input) => {
    const mappedInput = mapInput(input);

    const safetys = mappedInput.map((line) => {
        const diffs = [];
        for(let i = 1; i < line.length; i++) {
            diffs.push(line[i - 1] - line[i]);
        }

        const isFIrstSafe = isLineSafe(diffs);

        if(isFIrstSafe) {
            return true;
        }

        let safeAfterMod = false;
        let index = 0;
        console.log(line);
        while(!safeAfterMod && index <= diffs.length) {
            const tempLine = [...line];
            tempLine.splice(index, 1);
            const tempDiffs = [];
            for(let i = 1; i < tempLine.length; i++) {
                tempDiffs.push(tempLine[i - 1] - tempLine[i]);
            }
            safeAfterMod = isLineSafe(tempDiffs);
            index++;
        }

        return safeAfterMod;
    });
    return countSafeLEvels(safetys);
};

const day2Test = async () => {
    const input = await readFile('./02/test-input.txt');
    return solve(input);
};

const testResult = await day2Test();
console.assert( testResult === 2, testResult);

const day2Part1 = async () => {
    const input = await readFile('./02/input.txt');
    return solve(input);
};
const part1Result = await day2Part1();

console.log('Part one answer: ', part1Result);


const day2Test2 = async () => {
    const input = await readFile('./02/test-input.txt');
    return solvePart2(input);
};

const testPart2Result = await day2Test2();
console.assert( testPart2Result === 4, testPart2Result);

const day2Part2 = async () => {
    const input = await readFile('./02/input.txt');
    return solvePart2(input);
};
const part2Result = await day2Part2();
console.log('Part two answer: ', part2Result);