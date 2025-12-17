const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function run(command) {
    try {
        return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    } catch (e) {
        return null;
    }
}

function runInherit(command) {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (e) {
        return false;
    }
}

console.log('Checking current version...');
// Fetch to ensure we have latest from remote
run('git fetch --tags');

const lastTag = run('git describe --tags --abbrev=0') || 'No tags found (v0.0.0)';
console.log(`\x1b[36mLast Tag: ${lastTag}\x1b[0m`);

rl.question('\nEnter new version number (e.g. 1.0.1) or leave empty to cancel: ', (input) => {
    const version = input.trim();

    if (!version) {
        console.log('Operation cancelled.');
        rl.close();
        return;
    }

    // Ensure v prefix
    const tagName = version.startsWith('v') ? version : `v${version}`;

    console.log(`\nYou are regarding to create tag: \x1b[32m${tagName}\x1b[0m`);

    rl.question('Are you sure you want to create and push this tag? (y/N): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            console.log('\nCreating tag...');
            if (runInherit(`git tag ${tagName}`)) {
                console.log('Pushing tag to origin...');
                if (runInherit(`git push origin ${tagName}`)) {
                    console.log(`\n\x1b[32mSuccess! Release ${tagName} triggered.\x1b[0m`);
                    console.log('Check GitHub Actions for build status.');
                } else {
                    console.error('\x1b[31mFailed to push tag.\x1b[0m');
                }
            } else {
                console.error('\x1b[31mFailed to create tag.\x1b[0m');
            }
        } else {
            console.log('Operation cancelled.');
        }
        rl.close();
    });
});
