#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectName = process.argv[2] || 'my-app';
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/milancrayon/t3headless-frontend.git";

try {
    console.log(`🚀 Creating a new project in ${projectPath}...`);

    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    process.chdir(projectPath);
    fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });

    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('\n✅ Success!');
    console.log(`\nRun: cd ${projectName} && npm run dev`);

} catch (error) {
    console.error('❌ Error:', error.message);
}