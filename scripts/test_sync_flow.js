const { localDb, remoteDb } = require('../src/electron/db');

async function testSync() {
    console.log('TEST: Simulating App Background Sync...');
    const testName = `SyncTest_${Date.now()}`;

    // 1. Simulate "Create" in Main Process
    console.log(`Step 1: Local Create POI: ${testName}`);
    const localCreated = await localDb.poi.create({
        data: {
            name: testName,
            type: 'Dev Test',
            notes: 'Created by automated sync test'
        }
    });
    console.log('Local ID:', localCreated.id);

    // 2. Simulate "Background Sync" (The exact code added to main.js)
    console.log('Step 2: Triggering Background Sync (Upsert Remote)...');
    try {
        await remoteDb.poi.upsert({
            where: { id: localCreated.id },
            update: localCreated,
            create: localCreated
        });
        console.log('Background Sync Promise Resolved.');
    } catch (e) {
        console.error('Background Sync Failed:', e);
    }

    // 3. Verify Remote
    console.log('Step 3: Verifying Remote Existence...');
    const remoteFound = await remoteDb.poi.findUnique({
        where: { id: localCreated.id }
    });

    if (remoteFound && remoteFound.name === testName) {
        console.log('PASS: Record found in remote DB!');
    } else {
        console.error('FAIL: Record NOT found in remote DB.');
        console.log('Remote result:', remoteFound);
    }

    // 4. Cleanup
    console.log('Step 4: Cleanup...');
    await localDb.poi.delete({ where: { id: localCreated.id } });
    // Cleanup remote too to keep it clean
    try {
        await remoteDb.poi.delete({ where: { id: localCreated.id } });
    } catch (e) { console.log('Remote already deleted or missing'); }
    console.log('Cleanup Done.');
}

testSync().then(() => {
    // Force exit after a buffer
    setTimeout(() => process.exit(0), 1000);
});
