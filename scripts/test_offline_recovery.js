const { localDb, remoteDb } = require('../src/electron/db');

async function testRecovery() {
    console.log('TEST: Simulating Offline Creation & Recovery...');
    const testName = `OfflineTest_${Date.now()}`;

    // 1. Simulate "Offline Create"
    // We create in local DB but DO NOT trigger the individual sync call.
    console.log(`Step 1: Creating Local Record (Simulating Offline): ${testName}`);
    const localCreated = await localDb.poi.create({
        data: {
            name: testName,
            type: 'Dev Test',
            notes: 'Created offline'
        }
    });

    // 2. Verify it is Missing from Remote
    const missing = await remoteDb.poi.findUnique({
        where: { id: localCreated.id }
    });
    if (!missing) {
        console.log('PASS: Record correctly missing from remote (Simulated Sync Failure).');
    } else {
        console.error('FAIL: Record somehow appeared in remote?');
    }

    // 3. Simulate "App Restart / Reconnect" -> Run syncAll
    console.log('Step 2: Running syncAll()...');

    // Manual syncAll implementation for script (same logic as main.js)
    const localPois = await localDb.poi.findMany();
    for (const poi of localPois) {
        await remoteDb.poi.upsert({
            where: { id: poi.id },
            update: poi,
            create: poi
        });
    }
    console.log('SyncAll Complete.');

    // 4. Verify Remote Again
    const remoteFound = await remoteDb.poi.findUnique({
        where: { id: localCreated.id }
    });

    if (remoteFound && remoteFound.name === testName) {
        console.log('PASS: Offline record successfully recovered/synced!');
    } else {
        console.error('FAIL: Record still missing after syncAll.');
    }

    // 5. Cleanup
    await localDb.poi.delete({ where: { id: localCreated.id } });
    await remoteDb.poi.delete({ where: { id: localCreated.id } });
    console.log('Cleanup Done.');
}

testRecovery().then(() => {
    setTimeout(() => process.exit(0), 1000);
});
