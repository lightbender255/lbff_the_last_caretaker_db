const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

try {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../../node_modules', '.bin', 'electron')
  });
} catch (_) { }

let mainWindow;
let db;
let dbWatcher;

async function initDatabase() {
  try {
    const SQL = await initSqlJs();
    const dbPath = path.join(__dirname, '../../data/the_last_caretaker.db');
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
    console.log('Database loaded successfully');

    // Watch for database file changes
    if (dbWatcher) {
      dbWatcher.close();
    }

    dbWatcher = fs.watch(dbPath, async (eventType) => {
      if (eventType === 'change') {
        console.log('Database file changed, reloading...');
        try {
          const newBuffer = fs.readFileSync(dbPath);
          db.close();
          db = new SQL.Database(newBuffer);
          console.log('Database reloaded successfully');

          // Notify renderer to refresh
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('database-updated');
          }
        } catch (error) {
          console.error('Error reloading database:', error);
        }
      }
    });


    // Initialize lookup table
    initLookupTable();

  } catch (error) {
    console.error('Failed to load database:', error);
  }
}

function initLookupTable() {
  try {
    // Check if table exists
    const result = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='lookup_values'");

    if (result.length === 0) {
      console.log('Creating lookup_values table...');
      db.run("CREATE TABLE lookup_values (id INTEGER PRIMARY KEY, category TEXT, value TEXT)");

      const insert = db.prepare("INSERT INTO lookup_values (category, value) VALUES (?, ?)");

      const lookups = [
        { cat: 'Salvage', val: 'Yes' },
        { cat: 'Salvage', val: 'No' },
        { cat: 'Salvage', val: 'In Progress' },
        { cat: 'Beacon', val: 'Yes' },
        { cat: 'Beacon', val: 'No' },
        { cat: 'Beacon', val: 'Restored' },
        { cat: 'Beacon', val: 'In Progress' },
        { cat: 'Bio Hostiles', val: 'Yes' },
        { cat: 'Bio Hostiles', val: 'No' },
        { cat: 'Bio Hostiles', val: 'Unknown' },
        { cat: 'Mech Hostiles', val: 'Yes' },
        { cat: 'Mech Hostiles', val: 'No' },
        { cat: 'Mech Hostiles', val: 'Unknown' },
        { cat: 'Power', val: 'Yes' },
        { cat: 'Power', val: 'No' },
        { cat: 'Power', val: 'Unknown' }
      ];

      db.exec("BEGIN TRANSACTION");
      for (const item of lookups) {
        insert.run([item.cat, item.val]);
      }
      db.exec("COMMIT");
      insert.free();

      // Save
      const data = db.export();
      const buffer = Buffer.from(data);
      const dbPath = path.join(__dirname, '../../data/the_last_caretaker.db');
      fs.writeFileSync(dbPath, buffer);
      console.log('Lookup table created and populated.');
    }
  } catch (error) {
    console.error('Error initializing lookup table:', error);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

// IPC Handlers
ipcMain.handle('get-all-pois', async () => {
  try {
    const stmt = db.prepare('SELECT rowid as id, * FROM poi ORDER BY name');
    const pois = [];
    while (stmt.step()) {
      pois.push(stmt.getAsObject());
    }
    stmt.free();
    return { success: true, data: pois };
  } catch (error) {
    console.error('Error fetching POIs:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-poi-by-name', async (event, name) => {
  try {
    const stmt = db.prepare('SELECT rowid as id, * FROM poi WHERE name = ?');
    stmt.bind([name]);
    const poi = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    return { success: true, data: poi };
  } catch (error) {
    console.error('Error fetching POI:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('search-pois', async (event, searchTerm) => {
  try {
    const stmt = db.prepare(`
      SELECT rowid as id, * FROM poi
      WHERE name LIKE ?
         OR type LIKE ?
         OR notes LIKE ?
      ORDER BY name
    `);
    const pattern = `%${searchTerm}%`;
    stmt.bind([pattern, pattern, pattern]);
    const pois = [];
    while (stmt.step()) {
      pois.push(stmt.getAsObject());
    }
    stmt.free();
    return { success: true, data: pois };
  } catch (error) {
    console.error('Error searching POIs:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-pois-by-type', async (event, type) => {
  try {
    const stmt = db.prepare('SELECT rowid as id, * FROM poi WHERE type = ? ORDER BY name');
    stmt.bind([type]);
    const pois = [];
    while (stmt.step()) {
      pois.push(stmt.getAsObject());
    }
    stmt.free();
    return { success: true, data: pois };
  } catch (error) {
    console.error('Error fetching POIs by type:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-poi-types', async () => {
  try {
    const stmt = db.prepare('SELECT DISTINCT type FROM poi WHERE type IS NOT NULL AND type != "Unknown" ORDER BY type');
    const types = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      types.push(row.type);
    }
    stmt.free();
    return { success: true, data: types };
  } catch (error) {
    console.error('Error fetching POI types:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-lookup-values', async (event, category) => {
  try {
    const stmt = db.prepare('SELECT value FROM lookup_values WHERE category = ? ORDER BY value');
    stmt.bind([category]);
    const values = [];
    while (stmt.step()) {
      values.push(stmt.getAsObject().value);
    }
    stmt.free();
    return { success: true, data: values };
  } catch (error) {
    console.error('Error fetching lookup values:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-poi', async (event, poiData) => {
  try {
    const {
      name, x, y, type, bio_hostiles, mech_hostiles,
      salvage, power, beacon, depth_m, ocean_floor_depth_m,
      top_depth_m, max_explored_depth_m, max_psi_reached, notes
    } = poiData;

    const stmt = db.prepare(`
      INSERT INTO poi (
        name, x, y, type, bio_hostiles, mech_hostiles,
        salvage, power, beacon, depth_m, ocean_floor_depth_m,
        top_depth_m, max_explored_depth_m, max_psi_reached, notes
      ) VALUES (
        @name, @x, @y, @type, @bio_hostiles, @mech_hostiles,
        @salvage, @power, @beacon, @depth_m, @ocean_floor_depth_m,
        @top_depth_m, @max_explored_depth_m, @max_psi_reached, @notes
      )
    `);

    stmt.run({
      '@name': name,
      '@x': x,
      '@y': y,
      '@type': type,
      '@bio_hostiles': bio_hostiles,
      '@mech_hostiles': mech_hostiles,
      '@salvage': salvage,
      '@power': power,
      '@beacon': beacon,
      '@depth_m': depth_m,
      '@ocean_floor_depth_m': ocean_floor_depth_m,
      '@top_depth_m': top_depth_m,
      '@max_explored_depth_m': max_explored_depth_m,
      '@max_psi_reached': max_psi_reached,
      '@notes': notes
    });

    stmt.free();

    // Save database to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    const dbPath = path.join(__dirname, '../../data/the_last_caretaker.db');
    fs.writeFileSync(dbPath, buffer);

    return { success: true };
  } catch (error) {
    console.error('Error creating POI:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-poi', async (event, { id, updates }) => {
  try {
    const fields = Object.keys(updates).map(key => `${key} = @${key}`).join(', ');
    const stmt = db.prepare(`UPDATE poi SET ${fields} WHERE rowid = @id`);

    const params = { '@id': id };
    for (const [key, value] of Object.entries(updates)) {
      params[`@${key}`] = value;
    }

    stmt.run(params);
    stmt.free();

    // Save database to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    const dbPath = path.join(__dirname, '../../data/the_last_caretaker.db');
    fs.writeFileSync(dbPath, buffer);

    return { success: true };
  } catch (error) {
    console.error('Error updating POI:', error);
    return { success: false, error: error.message };
  }
});

app.whenReady().then(async () => {
  await initDatabase();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (dbWatcher) {
    dbWatcher.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
