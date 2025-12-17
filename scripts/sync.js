const { localDb, remoteDb } = require('../src/electron/db');

async function sync() {
    console.log('Starting Sync: Local -> Remote');

    try {
        // 1. Sync POIs
        const localPois = await localDb.poi.findMany();
        console.log(`Found ${localPois.length} local POIs.`);

        for (const poi of localPois) {
            // Upsert ensures we update if exists, or create if not.
            // We use the same ID to maintain identity.
            await remoteDb.poi.upsert({
                where: { id: poi.id },
                update: poi,
                create: poi
            });
        }
        console.log('POIs Synced.');

        // 2. Sync LookupValues
        const localLookups = await localDb.lookupValue.findMany();
        console.log(`Found ${localLookups.length} local LookupValues.`);

        for (const item of localLookups) {
            await remoteDb.lookupValue.upsert({
                where: { id: item.id },
                update: item,
                create: item
            });
        }
        console.log('LookupValues Synced.');

    } catch (error) {
        console.error('Sync failed:', error);
    } finally {
        // We don't need to disconnect explicitly if the app is long running,
        // but for a script it helps finish the process.
        // However, db.js instances might be shared.
        // Since this is a standalone run of the script:
        // We can't easily disconnect the instances from db.js as they are exported instances.
        // But node should exit when the event loop is empty.
        // Prisma clients handle connection pooling.
        // We'll force exit to be sure.
        process.exit(0);
    }
}

sync();
