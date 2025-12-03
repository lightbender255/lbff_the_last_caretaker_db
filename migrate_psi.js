const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function migrate() {
    try {
        const SQL = await initSqlJs();
        const dbPath = path.join(__dirname, 'data/the_last_caretaker.db');

        if (!fs.existsSync(dbPath)) {
            console.error('Database file not found!');
            return;
        }

        const buffer = fs.readFileSync(dbPath);
        const db = new SQL.Database(buffer);

        // Check if psi column exists
        let hasPsi = false;
        let hasPsiReq = false;

        const stmt = db.prepare("PRAGMA table_info(poi)");
        while (stmt.step()) {
            const row = stmt.getAsObject();
            if (row.name === 'psi') hasPsi = true;
            if (row.name === 'psi_requirement') hasPsiReq = true;
        }
        stmt.free();

        if (hasPsiReq) {
            console.log('Column psi_requirement already exists. No migration needed.');
            return;
        }

        if (!hasPsi) {
            console.error('Column psi not found! Cannot rename.');
            return;
        }

        console.log('Renaming psi to psi_requirement...');
        db.run("ALTER TABLE poi RENAME COLUMN psi TO psi_requirement");

        // Save database
        const data = db.export();
        const newBuffer = Buffer.from(data);
        fs.writeFileSync(dbPath, newBuffer);
        console.log('Migration successful!');

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
