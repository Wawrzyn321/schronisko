'use strict';

const { exec } = require("child_process");
const concurrently = require('concurrently');

const CHECK_POSTGRES = `brew services | grep postgresql | awk '{print $2}'`

exec(CHECK_POSTGRES, (error, stdout, stderr) => {
    if (error ?? stderr) {
        throw Error("Cannot check postgres: " + error?.message ?? stderr)
    }
    
    if (stdout.trim() !== 'started') {
        throw Error("Postgres not running, run 'brew services start postgresql@14'")
    }
    return runAll();
})

function runAll() {
    return concurrently([
        {
            command: 'npm run redis --prefix=server',
            name: 'REDIS',
            prefixColor: '#DCDCDC',
        },
        {
            command: 'npm run dev --prefix=server',
            name: 'SERVER',
            prefixColor: 'magenta.bold',
        },
        {
            command: 'npm run dev --prefix=client',
            name: 'CLIENT',
            prefixColor: 'cyan.bold',
        },
        {
            command: 'npm run dev --prefix=backoffice',
            name: 'BACKOFFICE',
            prefixColor: '#23de43',
        },
    ]).then(
        () => {
            process.exit(0);
        },
        () => {
            process.exit(1);
        }
    );
}