import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
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

    for (const poi of pois) {
      const { error } = await supabase
        .from('poi')
        .insert({
          name: poi.name,
          x: poi.x,
          y: poi.y,
          type: poi.type,
          bio_hostiles: poi.bio_hostiles,
          mech_hostiles: poi.mech_hostiles,
          salvage: poi.salvage,
          power: poi.power,
          beacon: poi.beacon,
          depth_m: poi.depth_m,
          ocean_floor_depth_m: poi.ocean_floor_depth_m,
          top_depth_m: poi.top_depth_m,
          max_explored_depth_m: poi.max_explored_depth_m,
          max_psi_reached: poi.max_psi_reached,
          notes: poi.notes
        });

      if (error) {
        console.error(`Error inserting POI ${poi.name}:`, error);
      }
    }

    console.log('Data migration complete');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
