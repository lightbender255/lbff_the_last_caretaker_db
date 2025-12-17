const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const { PrismaClient } = require('../src/generated/client-local');

async function migrate() {
    console.log('Starting migration...');

    // 1. Initialize Prisma
    const prisma = new PrismaClient();

    // 2. Initialize SQL.js and load old DB
    let db;
    try {
        const SQL = await initSqlJs();
        const dbPath = path.join(__dirname, '../data/the_last_caretaker.db');
        if (!fs.existsSync(dbPath)) {
            console.error('Old database not found at:', dbPath);
            return;
        }
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
        console.log('Old database loaded.');
    } catch (error) {
        console.error('Failed to load old database:', error);
        return;
    }

    // 3. Migrate POIs
    try {
        const stmt = db.prepare('SELECT * FROM poi');
        const pois = [];
        while (stmt.step()) {
            pois.push(stmt.getAsObject());
        }
        stmt.free();
        console.log(`Found ${pois.length} POIs to migrate.`);

        for (const poi of pois) {
            // Remove 'id' if explicitly set to let autoincrement work, or keep it to preserve IDs.
            // It's better to preserve IDs if possible to keep relations (though no relations yet).
            // Prisma allows setting ID if not @default(autoincrement()) or if providing it explicitly (upsert).
            // Since we want to preserve history, we explicit set ID?
            // But the schema has @default(autoincrement()).
            // Let's exclude implicit rowid or id if it wasn't a real column.
            // sql.js 'SELECT *' usually doesn't include rowid unless requested.
            // 'SELECT rowid as id, *' was used in app.
            // Let's check keys of poi object.

            // Ensure we are not inserting 'undefined' for ID if not present.
            const { id, ...data } = poi;

            // Clean nulls/undefined
            // The data from sqlite might have values.

            await prisma.poi.create({
                data: {
                    ...data,
                    // If we want to keep ID, we should check if 'id' exists in 'poi' object from SELECT *
                    // If SELECT * includes primary key, it will be there.
                    // In SQLite `poi` table creation (from sql file), id wasn't explicitly defined usually, it relies on rowid.
                    // So 'poi' object likely does NOT have 'id'.
                    // So we let Prisma generate new IDs.
                }
            });
        }
        console.log('POIs migrated.');

    } catch (error) {
        console.error('Error migrating POIs:', error);
    }

    // 4. Migrate Lookup Values
    try {
        // Check if table exists
        const result = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='lookup_values'");
        if (result.length > 0) {
            const stmt = db.prepare('SELECT * FROM lookup_values');
            const lookups = [];
            while (stmt.step()) {
                lookups.push(stmt.getAsObject());
            }
            stmt.free();
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
        console.error('Error migrating Lookup Values:', error);
    }

    console.log('Migration complete.');
}

migrate()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // const prisma = new PrismaClient(); // need instance to disconnect?
        // actually localized in function.
    });
