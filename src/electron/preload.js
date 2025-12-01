const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('dbAPI', {
  getAllPOIs: () => ipcRenderer.invoke('get-all-pois'),
  getPOIByName: (name) => ipcRenderer.invoke('get-poi-by-name', name),
  searchPOIs: (searchTerm) => ipcRenderer.invoke('search-pois', searchTerm),
  getPOIsByType: (type) => ipcRenderer.invoke('get-pois-by-type', type),
  getPOITypes: () => ipcRenderer.invoke('get-poi-types')
});
