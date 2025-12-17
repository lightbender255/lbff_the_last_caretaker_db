const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function analyze() {
    const SQL = await initSqlJs();
    const dbPath = path.join(__dirname, 'data/the_last_caretaker.db');
    const buffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(buffer);

    const columns = ['type', 'bio_hostiles', 'mech_hostiles', 'salvage', 'power', 'beacon'];

    console.log('--- Distinct Values Analysis ---');

    for (const col of columns) {
        console.log(`\n[${col}]`);
        try {
            const stmt = db.prepare(`SELECT DISTINCT ${col} FROM poi WHERE ${col} IS NOT NULL AND ${col} != '' ORDER BY ${col}`);
            while (stmt.step()) {
                const row = stmt.getAsObject();
                console.log(`- ${row[col]}`);
            }
            stmt.free();
        } catch (e) {
            console.log(`Error analyzing ${col}: ${e.message}`);
        }
    }
}

analyze();
