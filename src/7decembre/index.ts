import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input7.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');

interface File {
    isDirectory: boolean;
    size: number | null;
    name: string;
    files?: Array<File>;
}

enum Step {
    Start,
    LS,
    CD,
    LOOP
}

let currentStep: Step = Step.Start;
let count = 0;
let allFiles: Array<File> = [];
let fileToComplete = "";

function findIndexOfDirectory(name: string, files: Array<File>) {
    return files.findIndex(f => {
        return f.name === name;
    })
}

function parcourtInput(tab: Array<string>, files: Array<File>, ii: number) {

    for (let i = ii; i < tab.length; i++) {
        let line = tab[i];

        if (currentStep === Step.Start && line.includes('$ cd /')) {
            currentStep = Step.LS;
            continue;
        }

        if (currentStep === Step.LS && line.includes('$ ls')) {
            continue;
        }

        if (currentStep === Step.LS && !line.includes('$ cd')) {

            let file: File;

            if (line.includes('dir')) {
                file = {
                    name: line.split('dir ')[1],
                    size: null,
                    isDirectory: true,
                    files: []
                }
            } else {
                file = {
                    name: line.split(' ')[1],
                    size: +line.split(' ')[0],
                    isDirectory: false
                }
            }

            files.push(file);
            continue;

        }


        if (currentStep === Step.LS && line.includes('$ cd') && !line.includes('$ cd ..')) {
            currentStep = Step.CD;
            fileToComplete = line.split('$ cd ')[1];
            continue;
        }

        if (currentStep === Step.CD && line.includes('$ ls')) {
            let index = findIndexOfDirectory(fileToComplete, files);

            currentStep = Step.LS;
            let loop = parcourtInput(tab, files[index].files || [], i + 1);
            files[index].files = loop?.files;
            i = loop?.i || i;
            files[index].size = files[index].files?.reduce((acc, cur) => {
                return acc + (cur.size || 0);
            }, 0) || 0;
            let size = files[index].size || 0;
            if (size < 100000) {
                count += size;
            }
            continue;
        }

        if (line.includes('..')) {
            currentStep = Step.LS;
            return {files: files, i: i};
        }
        if (line === "\n") {
            return {files: files, i: i};
        }

    }

}

allFiles = parcourtInput(tab, allFiles, 0)?.files || [];

console.log('Somme des répertoires < 100000 : ' + count);

let sizes: Array<number> = [];

function findMin(files: Array<File>) {

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.isDirectory) {
            let size = file.size || 0;
            sizes.push(size);
            if (file.files) {
                findMin(file.files);
            } else {
                return;
            }
        }
    }
}

let max = 0
for (let i = 0; i < allFiles.length; i++) {
    let file = allFiles[i];
    let size = file.size || 0;
    max += size;
}
let toFind = (30000000 - (70000000 - max));
findMin(allFiles);

console.log('Le plus petit répertoire à supprimer pour la maj :' +sizes.sort((a, b) => {
    return a < b ? -1 : 1
}).filter(c => c > toFind)[0]);
