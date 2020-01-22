#!/usr/bin/env node

const { spawn } = require('child_process');

const EXCLUDE_PACKAGE_IDS = [
    'Chocolatey'
];

function getLocalPackageList() {
    return new Promise((resolve, reject) => {
        const p = spawn('choco', ['list', '-l']);
        let stdout = '';
        p.stdout.on('data', data => {
            stdout += data.toString('utf-8');
        });
        //p.stderr.pipe(process.stderr)
        p.on('error', err => {
            reject(err);
        });
        p.on('close', code => {
            resolve(stdout);
        });
    });
}

(async () => {
    try {
        const text = await getLocalPackageList();
        const lines = text.split('\n').map(e => e.trim());
        process.stdout.write(Buffer.from([0xEF, 0xBB, 0xBF]));
        process.stdout.write('<?xml version="1.0" encoding="utf-8"?>\r\n');
        process.stdout.write('<packages>\r\n');
        for (const line of lines) {
            const cols = line.split(' ');
            if (cols.length === 0) break;
            if (cols.length !== 2) continue;
            const [ id, version ] = cols;
            if (EXCLUDE_PACKAGE_IDS.includes(id)) continue;
            process.stdout.write(`  <package id="${id}" version="${version}" />\r\n`);
        }
        process.stdout.write('</packages>')
    } catch (err) {
        console.error(err)
    }
})()