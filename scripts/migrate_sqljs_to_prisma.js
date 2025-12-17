const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const { PrismaClient } = require('../src/generated/client-local');

async function migrate() {
    console.log('Starting migration...');
    const prisma = new PrismaClient();

    try {
        // 1. Initialize SQL.js and load old DB
        let db;
        const SQL = await initSqlJs();
        const dbPath = path.join(__dirname, '../data/the_last_caretaker.db');
        if (!fs.existsSync(dbPath)) {
            console.error('Old database not found at:', dbPath);
            return;
        }
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
        console.log('Old database loaded.');

        // 2. Migrate POIs
        const stmt = db.prepare('SELECT * FROM poi');
        const pois = [];
        while (stmt.step()) {
            pois.push(stmt.getAsObject());
        }
        stmt.free();
        console.log(`Found ${pois.length} POIs to migrate.`);

        for (const poi of pois) {
            const { id, ...data } = poi;
            await prisma.poi.create({
                data: {
                    ...data,
                }
            });
        }
        console.log('POIs migrated.');

        // 3. Migrate Lookup Values
        const result = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='lookup_values'");
        if (result.length > 0) {
            const stmtLookups = db.prepare('SELECT * FROM lookup_values');
            const lookups = [];
            while (stmtLookups.step()) {
                lookups.push(stmtLookups.getAsObject());
            }
            stmtLookups.free();
            console.log(`Found ${lookups.length} Lookup Values.`);

            for (const item of lookups) {
                const { id, ...data } = item;
                await prisma.lookupValue.create({
                    data: data
                });
            }
            console.log('Lookup Values migrated.');
        } else {
            console.log('No lookup_values table found in old DB.');
        }
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }

    console.log('Migration complete.');
}

migrate();
