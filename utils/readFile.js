import fs from 'fs';
import path from 'path';

export const readFile = async (filePath, parser) => {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFileSync(fullPath, 'utf-8');
    return parser ? parser(content) : content.split('\n');
};