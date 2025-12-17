const { PrismaClient: LocalClient } = require('../generated/client-local');
const { PrismaClient: RemoteClient } = require('../generated/client-remote');

const localDb = new LocalClient({
    log: ['info', 'warn', 'error'],
});

const remoteDb = new RemoteClient({
    log: ['info', 'warn', 'error'],
});

module.exports = {
    localDb,
    remoteDb
};
