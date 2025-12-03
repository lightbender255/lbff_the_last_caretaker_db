let allPOIs = [];
let filteredPOIs = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const clearBtn = document.getElementById('clearBtn');
const poiTableBody = document.getElementById('poiTableBody');
const totalCount = document.getElementById('totalCount');
const showingCount = document.getElementById('showingCount');
const errorContainer = document.getElementById('errorContainer');

// Load all POIs
async function loadAllPOIs() {
  try {
    showLoading();
    const result = await window.dbAPI.getAllPOIs();

    if (result.success) {
      allPOIs = result.data;
      filteredPOIs = allPOIs;
      totalCount.textContent = allPOIs.length;
      renderPOIs(allPOIs);
      await loadTypeFilter();
      clearError();
    } else {
      showError(`Failed to load POIs: ${result.error}`);
    }
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

// Load type filter options
async function loadTypeFilter() {
  try {
    const result = await window.dbAPI.getPOITypes();

    if (result.success) {
      typeFilter.innerHTML = '<option value="">All Types</option>';
      result.data.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error loading type filter:', error);
  }
}

// Search POIs
async function searchPOIs(searchTerm) {
  if (!searchTerm.trim()) {
    filteredPOIs = allPOIs;
    renderPOIs(allPOIs);
    return;
  }

  try {
    const result = await window.dbAPI.searchPOIs(searchTerm);

    if (result.success) {
      filteredPOIs = result.data;
      renderPOIs(result.data);
    } else {
      showError(`Search failed: ${result.error}`);
    }
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

// Filter by type
async function filterByType(type) {
  if (!type) {
    filteredPOIs = allPOIs;
    renderPOIs(allPOIs);
    return;
  }

  try {
    const result = await window.dbAPI.getPOIsByType(type);

    if (result.success) {
      filteredPOIs = result.data;
      renderPOIs(result.data);
    } else {
      showError(`Filter failed: ${result.error}`);
    }
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

// Render POIs in table
function renderPOIs(pois) {
  if (pois.length === 0) {
    poiTableBody.innerHTML = '<tr><td colspan="12" class="loading">No POIs found</td></tr>';
    showingCount.textContent = '0';
    return;
  }

  poiTableBody.innerHTML = pois.map(poi => `
    <tr data-id="${poi.id}">
      <td class="editable" data-field="name">${escapeHtml(poi.name)}</td>
      <td class="editable" data-field="x">${poi.x !== null ? poi.x : '-'}</td>
      <td class="editable" data-field="y">${poi.y !== null ? poi.y : '-'}</td>
      <td class="editable" data-field="type">${escapeHtml(poi.type || '-')}</td>
      <td class="editable" data-field="bio_hostiles">${escapeHtml(poi.bio_hostiles || '-')}</td>
      <td class="editable" data-field="mech_hostiles">${escapeHtml(poi.mech_hostiles || '-')}</td>
      <td class="editable" data-field="salvage">${escapeHtml(poi.salvage || '-')}</td>
      <td class="editable" data-field="power">${escapeHtml(poi.power || '-')}</td>
      <td class="editable" data-field="beacon">${escapeHtml(poi.beacon || '-')}</td>
      <td class="editable" data-field="beacon">${escapeHtml(poi.beacon || '-')}</td>
      <td class="editable" data-field="depth_m">${poi.depth_m !== null ? poi.depth_m : '-'}</td>
      <td class="editable" data-field="ocean_floor_depth_m">${poi.ocean_floor_depth_m !== null ? poi.ocean_floor_depth_m : '-'}</td>
      <td class="editable" data-field="top_depth_m">${poi.top_depth_m !== null ? poi.top_depth_m : '-'}</td>
      <td class="editable" data-field="max_explored_depth_m">${poi.max_explored_depth_m !== null ? poi.max_explored_depth_m : '-'}</td>
      <td class="editable" data-field="max_psi_reached">${poi.max_psi_reached !== null ? poi.max_psi_reached : '-'}</td>
      <td class="editable" data-field="notes">${escapeHtml(poi.notes || '-')}</td>
    </tr>
  `).join('');

  showingCount.textContent = pois.length;
  attachEditListeners();
}

function attachEditListeners() {
  document.querySelectorAll('.editable').forEach(cell => {
    cell.addEventListener('dblclick', handleCellEdit);
  });
}

function handleCellEdit(e) {
  const cell = e.target;
  if (cell.classList.contains('editing')) return;

  const currentText = cell.innerText === '-' ? '' : cell.innerText;
  const originalContent = cell.innerHTML;

  cell.classList.add('editing');
  cell.contentEditable = true;
  cell.focus();

  // Select all text
  document.execCommand('selectAll', false, null);

  const save = async () => {
    cell.contentEditable = false;
    cell.classList.remove('editing');
    const newText = cell.innerText.trim();
    const newValue = newText === '' ? null : newText;

    // Restore original if no change (simple check)
    if (newText === currentText) {
      cell.innerHTML = originalContent; // Restore to keep formatting/escaping if needed
      return;
    }

    const id = cell.parentElement.dataset.id;
    const field = cell.dataset.field;

    try {
      const result = await window.dbAPI.updatePOI(id, { [field]: newValue });
      if (result.success) {
        // Flash green
        cell.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
        setTimeout(() => cell.style.backgroundColor = '', 1000);
        // Update data in local array if needed, or just reload
        loadAllPOIs();
      } else {
        showError(`Update failed: ${result.error}`);
        cell.innerHTML = originalContent;
      }
    } catch (error) {
      showError(`Error: ${error.message}`);
      cell.innerHTML = originalContent;
    }
  };

  const handleBlur = () => {
    save();
    cell.removeEventListener('blur', handleBlur);
    cell.removeEventListener('keydown', handleKeydown);
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      cell.blur();
    } else if (e.key === 'Escape') {
      cell.contentEditable = false;
      cell.classList.remove('editing');
      cell.innerHTML = originalContent;
      cell.removeEventListener('blur', handleBlur);
      cell.removeEventListener('keydown', handleKeydown);
    }
  };

  cell.addEventListener('blur', handleBlur);
  cell.addEventListener('keydown', handleKeydown);
}

// Show loading message
function showLoading() {
  poiTableBody.innerHTML = '<tr><td colspan="12" class="loading">Loading...</td></tr>';
}

// Show error message
function showError(message) {
  errorContainer.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
}

// Clear error message
function clearError() {
  errorContainer.innerHTML = '';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Clear all filters
function clearFilters() {
  searchInput.value = '';
  typeFilter.value = '';
  filteredPOIs = allPOIs;
  renderPOIs(allPOIs);
}

// Event Listeners
clearBtn.addEventListener('click', clearFilters);

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  if (searchTerm.length >= 2 || searchTerm.length === 0) {
    searchPOIs(searchTerm);
  }
});

typeFilter.addEventListener('change', (e) => {
  filterByType(e.target.value);
});

// Load POIs on startup
window.addEventListener('DOMContentLoaded', () => {
  console.log('Database Viewer Ready');
  loadAllPOIs();

  // Listen for database updates
  window.dbAPI.onDatabaseUpdated(() => {
    console.log('Database updated externally, refreshing...');
    loadAllPOIs();
  });
});

// Modal Elements
const addPoiModal = document.getElementById('addPoiModal');
const addPoiBtn = document.getElementById('addPoiBtn');
const closeAddModal = document.querySelector('#addPoiModal .close-modal');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addPoiForm = document.getElementById('addPoiForm');
const typeList = document.getElementById('typeList');

// Modal Functions
async function openAddModal() {
  addPoiModal.style.display = 'flex';

  // Helper to populate select
  const populateSelect = async (elementId, category) => {
    const select = document.getElementById(elementId);
    if (!select) return;

    select.innerHTML = '<option value="">Select...</option>';
    try {
      const result = await window.dbAPI.getLookupValues(category);
      if (result.success) {
        result.data.forEach(val => {
          const option = document.createElement('option');
          option.value = val;
          option.textContent = val;
          select.appendChild(option);
        });
      }
    } catch (e) {
      console.error(`Error populating ${category}:`, e);
    }
  };

  // Populate all dropdowns
  await Promise.all([
    populateSelect('typeList', 'Type'), // Note: typeList is a datalist, handled separately below if needed, but keeping existing logic for now
    populateSelect('poiBioHostiles', 'Bio Hostiles'),
    populateSelect('poiMechHostiles', 'Mech Hostiles'),
    populateSelect('poiSalvage', 'Salvage'),
    populateSelect('poiPower', 'Power'),
    populateSelect('poiBeacon', 'Beacon')
  ]);

  // Populate type datalist (keeping existing logic for Type as it allows custom values)
  window.dbAPI.getPOITypes().then(result => {
    if (result.success) {
      typeList.innerHTML = '';
      result.data.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        typeList.appendChild(option);
      });
    }
  });
}

function closeAddModalFunc() {
  addPoiModal.style.display = 'none';
  addPoiForm.reset();
}

// Add POI Event Listeners
addPoiBtn.addEventListener('click', openAddModal);
closeAddModal.addEventListener('click', closeAddModalFunc);
cancelAddBtn.addEventListener('click', closeAddModalFunc);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === addPoiModal) {
    closeAddModalFunc();
  }
});

// Handle Form Submission
addPoiForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('poiName').value,
    x: document.getElementById('poiX').value ? parseFloat(document.getElementById('poiX').value) : null,
    y: document.getElementById('poiY').value ? parseFloat(document.getElementById('poiY').value) : null,
    type: document.getElementById('poiType').value || null,
    depth_m: document.getElementById('poiDepthM').value ? parseFloat(document.getElementById('poiDepthM').value) : null,
    ocean_floor_depth_m: document.getElementById('poiOceanFloorDepthM').value ? parseFloat(document.getElementById('poiOceanFloorDepthM').value) : null,
    top_depth_m: document.getElementById('poiTopDepthM').value ? parseFloat(document.getElementById('poiTopDepthM').value) : null,
    max_explored_depth_m: document.getElementById('poiMaxExploredDepthM').value ? parseFloat(document.getElementById('poiMaxExploredDepthM').value) : null,
    bio_hostiles: document.getElementById('poiBioHostiles').value || null,
    mech_hostiles: document.getElementById('poiMechHostiles').value || null,
    salvage: document.getElementById('poiSalvage').value || null,
    power: document.getElementById('poiPower').value || null,
    beacon: document.getElementById('poiBeacon').value || null,
    salvage: document.getElementById('poiSalvage').value || null,
    power: document.getElementById('poiPower').value || null,
    beacon: document.getElementById('poiBeacon').value || null,
    max_psi_reached: document.getElementById('poiMaxPsiReached').value ? parseFloat(document.getElementById('poiMaxPsiReached').value) : null,
    notes: document.getElementById('poiNotes').value || null
  };

  try {
    const result = await window.dbAPI.createPOI(formData);

    if (result.success) {
      closeAddModalFunc();
      loadAllPOIs(); // Refresh grid
      // Optional: Show success message
    } else {
      alert(`Failed to create POI: ${result.error}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
