let allPOIs = [];
let filteredPOIs = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const loadAllBtn = document.getElementById('loadAllBtn');
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
    <tr>
      <td><strong>${escapeHtml(poi.name)}</strong></td>
      <td>${poi.x !== null ? poi.x : '-'}</td>
      <td>${poi.y !== null ? poi.y : '-'}</td>
      <td>${escapeHtml(poi.type || '-')}</td>
      <td>${escapeHtml(poi.bio_hostiles || '-')}</td>
      <td>${escapeHtml(poi.mech_hostiles || '-')}</td>
      <td>${escapeHtml(poi.salvage || '-')}</td>
      <td>${escapeHtml(poi.power || '-')}</td>
      <td>${escapeHtml(poi.beacon || '-')}</td>
      <td>${poi.depth !== null ? poi.depth : '-'}</td>
      <td>${poi.psi !== null ? poi.psi : '-'}</td>
      <td>${escapeHtml(poi.notes || '-')}</td>
    </tr>
  `).join('');

  showingCount.textContent = pois.length;
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
loadAllBtn.addEventListener('click', loadAllPOIs);
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
});
