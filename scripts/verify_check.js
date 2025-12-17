const { PrismaClient: LocalClient } = require('../src/generated/client-local');
const { PrismaClient: RemoteClient } = require('../src/generated/client-remote');

async function verify() {
    console.log('Verifying Local DB...');
    const local = new LocalClient();
    try {
        const count = await local.poi.count();
        console.log(`Local POI Count: ${count}`);
        const first = await local.poi.findFirst();
        console.log('First POI:', first);

        if (count === 0) {
            console.error('FAIL: No POIs found in local DB!');
        } else {
            console.log('PASS: Local Data seems present.');
        }
    } catch (e) {
        console.error('FAIL: Local DB Error:', e);
    } finally {
        await local.$disconnect();
    }

    console.log('\nVerifying Remote DB Connection...');
    const remote = new RemoteClient();
    try {
        // Should be able to connect even if empty
        const count = await remote.poi.count();
        console.log(`Remote POI Count: ${count}`);
        console.log('PASS: Remote Connection Successful.');
    } catch (e) {
        console.error('FAIL: Remote DB Error:', e);
    } finally {
        await remote.$disconnect();
    }
}

verify();
