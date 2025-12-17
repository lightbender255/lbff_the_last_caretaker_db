const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { localDb, remoteDb } = require('./db');

try {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../../node_modules', '.bin', 'electron')
  });
} catch (_) { }

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // Frameless window
    transparent: true, // Enable transparency for rounded corners
    backgroundColor: '#00000000', // Ensure completely transparent background
    autoHideMenuBar: true, // Hide menu bar
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
ipcMain.handle('close-app', () => {
  app.quit();
});

ipcMain.handle('get-all-pois', async () => {
  try {
    const pois = await localDb.poi.findMany({
      orderBy: { name: 'asc' }
    });
    return { success: true, data: pois };
  } catch (error) {
    console.error('Error fetching POIs:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-poi-by-name', async (event, name) => {
  try {
    const poi = await localDb.poi.findFirst({
      where: { name: name }
    });
    return { success: true, data: poi };
  } catch (error) {
    console.error('Error fetching POI:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('search-pois', async (event, searchTerm) => {
  try {
    const pois = await localDb.poi.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { type: { contains: searchTerm } },
          { notes: { contains: searchTerm } }
        ]
      },
      orderBy: { name: 'asc' }
    });
    return { success: true, data: pois };
  } catch (error) {
    console.error('Error searching POIs:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-pois-by-type', async (event, type) => {
  try {
    const pois = await localDb.poi.findMany({
      where: { type: type },
      orderBy: { name: 'asc' }
    });
    return { success: true, data: pois };
  } catch (error) {
    console.error('Error fetching POIs by type:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-poi-types', async () => {
  try {
    const groups = await localDb.poi.findMany({
      select: { type: true },
      distinct: ['type'],
      where: {
        type: { not: null },
        AND: [
          { type: { not: null } },
          { type: { not: 'Unknown' } }
        ]
      },
      orderBy: { type: 'asc' }
    });
    const types = groups.map(g => g.type);
    return { success: true, data: types };
  } catch (error) {
    console.error('Error fetching POI types:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-lookup-values', async (event, category) => {
  try {
    const results = await localDb.lookupValue.findMany({
      where: { category: category },
      orderBy: { value: 'asc' }
    });
    const values = results.map(r => r.value);
    return { success: true, data: values };
  } catch (error) {
    console.error('Error fetching lookup values:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-poi', async (event, poiData) => {
  try {
    const newPoi = await localDb.poi.create({
      data: poiData
    });

    // Background Sync
    remoteDb.poi.upsert({
      where: { id: newPoi.id },
      update: newPoi,
      create: newPoi
    }).catch(e => console.error('Background create sync failed:', e));

    return { success: true };
  } catch (error) {
    console.error('Error creating POI:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-poi', async (event, { id, updates }) => {
  try {
    const { id: _, ...data } = updates; // ensure id is not in data
    const updatedPoi = await localDb.poi.update({
      where: { id: id },
      data: data
    });

    // Background Sync
    remoteDb.poi.update({
      where: { id: id },
      data: data
    }).catch(e => console.error('Background update sync failed:', e));

    return { success: true };
  } catch (error) {
    console.error('Error updating POI:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-poi', async (event, id) => {
  try {
    await localDb.poi.delete({
      where: { id: id }
    });

    // Background Sync
    remoteDb.poi.delete({
      where: { id: id }
    }).catch(e => console.error('Background delete sync failed:', e));

    return { success: true };
  } catch (error) {
    console.error('Error deleting POI:', error);
    return { success: false, error: error.message };
  }
});

async function syncAll() {
  console.log('Background Sync: Starting full sync...');
  try {
    const localPois = await localDb.poi.findMany();
    for (const poi of localPois) {
      remoteDb.poi.upsert({
        where: { id: poi.id },
        update: poi,
        create: poi
      }).catch(e => { }); // ignore individual errors
    }

    const localLookups = await localDb.lookupValue.findMany();
    for (const item of localLookups) {
      remoteDb.lookupValue.upsert({
        where: { id: item.id },
        update: item,
        create: item
      }).catch(e => { });
    }
    console.log('Background Sync: Full sync initiated.');
  } catch (e) {
    console.error('Background Sync Error:', e);
  }
}

app.whenReady().then(async () => {
  createWindow();
  syncAll(); // Fire and forget full sync on startup

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
