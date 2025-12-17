# Prisma Integration Implementation Plan

## Goal

Integrate Prisma ORM to manage both a local SQLite database (replacing `sql.js`) and a remote Postgres database, enabling future synchronization capability.

## User Review Required
>
> [!IMPORTANT]
> **Dual Database Strategy**: We will generate TWO separate Prisma clients.
>
> 1. `localDb`: Connects to SQLite (replacing your current file).
> 2. `remoteDb`: Connects to the defined Postgres URL.
>
> This requires changing how you import the database in your code.
> Old: `const db = new SQL.Database(...)`
> New: `import { localDb } from './db'`

## Proposed Changes

### Dependencies

- [NEW] `prisma` (Dev dependency)
- [NEW] `@prisma/client` (Dependency)

### Configuration / Schema

We will create two separate schema files to handle the different providers (SQLite vs Postgres) while keeping the *model definition* identical.

#### [NEW] [schema.local.prisma](file:///f:/game_dev/game_tools/lbff_the_last_caretaker_db/prisma/schema.local.prisma)

- Provider: `sqlite`
- Output: `../src/generated/client-local`
- Model: `Poi` (matching existing structure)

#### [NEW] [schema.remote.prisma](file:///f:/game_dev/game_tools/lbff_the_last_caretaker_db/prisma/schema.remote.prisma)

- Provider: `postgresql`
- Output: `../src/generated/client-remote`
- Model: `Poi` (identical to local)

### Data Migration

#### [NEW] [migrate_sqljs_to_prisma.js](file:///f:/game_dev/game_tools/lbff_the_last_caretaker_db/scripts/migrate_sqljs_to_prisma.js)

- Script to read the existing `sql.js` DB or `poi_data.sql` and insert records into the new Prisma SQLite DB.

### Application Logic

#### [MODIFY] [main.js](file:///f:/game_dev/game_tools/lbff_the_last_caretaker_db/src/electron/main.js)

- Replace `sql.js` initialization with `PrismaClient` initialization.
- Refactor all IPC handlers (`get-all-pois`, `create-poi`, etc.) to use Prisma API.

## Verification Plan

### Automated Tests

- Run the migration script and verify record count matches.
- Run `npx prisma db push --schema prisma/schema.remote.prisma` to verify remote connection.

### Manual Verification

- Start the app (`npm run dev`) and verify all POIs load correctly.
- create/edit separate POIs to ensure local persistence works.
