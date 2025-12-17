const fs = require('fs');
const path = require('path');

const width = 256;
const height = 256;
const buffer = Buffer.alloc(width * height * 4);

for (let i = 0; i < width * height; i++) {
    // Blue color (RGBA)
    buffer[i * 4] = 0;     // R
    buffer[i * 4 + 1] = 0; // G
    buffer[i * 4 + 2] = 255; // B
    buffer[i * 4 + 3] = 255; // A
}

// Simple PNG header and chunk structure is complex to write manually without a library.
// Instead, let's create a simple BMP file which is easier, or just use a known base64 string of a valid PNG.

const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABESURBVHhe7cEBDQAAAMKg909tDwcUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4G8NhB0AAeU0Vz0AAAAASUVORK5CYII=";
const iconPath = path.join(__dirname, 'build', 'icon.png');

if (!fs.existsSync(path.join(__dirname, 'build'))) {
    fs.mkdirSync(path.join(__dirname, 'build'));
}

fs.writeFileSync(iconPath, Buffer.from(base64Png, 'base64'));
console.log('Icon created at ' + iconPath);
