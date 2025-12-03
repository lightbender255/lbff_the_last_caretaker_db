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

        // Check columns
        let hasPsiReq = false;
        let hasMaxPsi = false;

        const stmt = db.prepare("PRAGMA table_info(poi)");
        while (stmt.step()) {
            const row = stmt.getAsObject();
            if (row.name === 'psi_requirement') hasPsiReq = true;
            if (row.name === 'max_psi_reached') hasMaxPsi = true;
        }
        stmt.free();

        if (hasMaxPsi) {
            console.log('Column max_psi_reached already exists. No migration needed.');
            return;
        }

        if (!hasPsiReq) {
            console.error('Column psi_requirement not found! Cannot rename.');
            return;
        }

        console.log('Renaming psi_requirement to max_psi_reached...');
        db.run("ALTER TABLE poi RENAME COLUMN psi_requirement TO max_psi_reached");

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
