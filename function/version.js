const fs = require('fs');

function incrementVersion() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const version = packageJson.version.split('.').map(Number);
    version[2] = (version[2] + 1) % 10;
    if (version[2] === 0) {
        version[1] = (version[1] + 1) % 10;
        if (version[1] === 0) {
            version[0] = version[0] + 1;
        }
    }
    packageJson.version = version.join('.');
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    return packageJson.version;
}

module.exports = { incrementVersion };