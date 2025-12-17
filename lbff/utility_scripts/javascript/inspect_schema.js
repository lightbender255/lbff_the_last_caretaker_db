const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function inspectSchema() {
    const SQL = await initSqlJs();
    const dbPath = path.join(__dirname, 'data/the_last_caretaker.db');
    const buffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(buffer);

    const stmt = db.prepare("PRAGMA table_info(poi)");
    console.log('--- POI Table Schema ---');
    while (stmt.step()) {
        const row = stmt.getAsObject();
        console.log(`${row.cid}: ${row.name} (${row.type})`);
    }
    stmt.free();
}

inspectSchema();
