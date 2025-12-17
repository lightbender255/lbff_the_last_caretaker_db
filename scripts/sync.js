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
        process.exit(1);
    } finally {
        try {
            await localDb.$disconnect();
            await remoteDb.$disconnect();
        } catch (disconnectError) {
            console.error('Error disconnecting:', disconnectError);
        }
    }
}

sync();
