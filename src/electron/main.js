const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

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
    
  } catch (error) {
    console.error('Failed to load database:', error);
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
    const stmt = db.prepare('SELECT * FROM poi ORDER BY name');
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
    const stmt = db.prepare('SELECT * FROM poi WHERE name = ?');
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
      SELECT * FROM poi 
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
    const stmt = db.prepare('SELECT * FROM poi WHERE type = ? ORDER BY name');
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
