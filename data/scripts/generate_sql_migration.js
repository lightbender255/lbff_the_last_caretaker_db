import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

async function generateMigration() {
  try {
    const SQL = await initSqlJs();
    const dbPath = path.join(process.cwd(), 'data/the_last_caretaker.db');
    const buffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(buffer);

    const stmt = db.prepare('SELECT * FROM poi');
    const pois = [];
    while (stmt.step()) {
      pois.push(stmt.getAsObject());
    }
    stmt.free();

    console.log(`Found ${pois.length} POIs in SQLite database`);

    let sqlStatements = [];

    for (const poi of pois) {
      const values = [
        `'${poi.name.replace(/'/g, "''")}'`,
        poi.x !== null ? poi.x : 'NULL',
        poi.y !== null ? poi.y : 'NULL',
        poi.type !== null ? `'${poi.type.replace(/'/g, "''")}'` : 'NULL',
        poi.bio_hostiles !== null ? `'${poi.bio_hostiles.replace(/'/g, "''")}'` : 'NULL',
        poi.mech_hostiles !== null ? `'${poi.mech_hostiles.replace(/'/g, "''")}'` : 'NULL',
        poi.salvage !== null ? `'${poi.salvage.replace(/'/g, "''")}'` : 'NULL',
        poi.power !== null ? `'${poi.power.replace(/'/g, "''")}'` : 'NULL',
        poi.beacon !== null ? `'${poi.beacon.replace(/'/g, "''")}'` : 'NULL',
        poi.depth_m !== null ? poi.depth_m : 'NULL',
        poi.ocean_floor_depth_m !== null ? poi.ocean_floor_depth_m : 'NULL',
        poi.top_depth_m !== null ? poi.top_depth_m : 'NULL',
        poi.max_explored_depth_m !== null ? poi.max_explored_depth_m : 'NULL',
        poi.max_psi_reached !== null ? poi.max_psi_reached : 'NULL',
        poi.notes !== null ? `'${poi.notes.replace(/'/g, "''")}'` : 'NULL'
      ];

      const statement = `INSERT INTO poi (name, x, y, type, bio_hostiles, mech_hostiles, salvage, power, beacon, depth_m, ocean_floor_depth_m, top_depth_m, max_explored_depth_m, max_psi_reached, notes) VALUES (${values.join(', ')});`;
      sqlStatements.push(statement);
    }

    console.log(sqlStatements.join('\n'));
    process.exit(0);
  } catch (error) {
    console.error('Generation failed:', error);
    process.exit(1);
  }
}

generateMigration();
