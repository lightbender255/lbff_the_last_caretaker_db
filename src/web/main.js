import { supabase } from '../lib/supabase.js';

let allPOIs = [];
let filteredPOIs = [];
let currentSortField = null;
let currentSortDirection = 'asc';
let currentUser = null;
let currentEditingId = null;

const mainContent = document.getElementById('mainContent');
const authForm = document.getElementById('authForm');
const signOutBtn = document.getElementById('signOutBtn');
const toggleAuthBtn = document.getElementById('toggleAuthBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const clearBtn = document.getElementById('clearBtn');
const poiTableBody = document.getElementById('poiTableBody');
const totalCount = document.getElementById('totalCount');
const showingCount = document.getElementById('showingCount');
const errorContainer = document.getElementById('errorContainer');
const addPoiBtn = document.getElementById('addPoiBtn');
const addPoiModal = document.getElementById('addPoiModal');
const closeAddModalBtn = document.querySelector('#addPoiModal .close-modal');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addPoiForm = document.getElementById('addPoiForm');
const deletePoiBtn = document.getElementById('deletePoiBtn');
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const closeDeleteModalBtn = document.querySelector('#deleteConfirmModal .close-modal');

function showError(message) {
  errorContainer.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
}

function clearError() {
  errorContainer.innerHTML = '';
}

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showMainContent() {
  mainContent.style.display = 'flex';
}

function hideMainContent() {
  mainContent.style.display = 'none';
}

async function handleAuth() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError('Please enter email and password');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password
        });

        if (signUpError) {
          showError(`Sign up failed: ${signUpError.message}`);
          return;
        }

        if (signUpData) {
          currentUser = signUpData.user;
          emailInput.value = '';
          passwordInput.value = '';
          showMainContent();
          authForm.style.display = 'none';
          signOutBtn.style.display = 'block';
          await loadAllPOIs();
        }
      } else {
        showError(`Authentication failed: ${error.message}`);
      }
    } else {
      currentUser = data.user;
      emailInput.value = '';
      passwordInput.value = '';
      showMainContent();
      authForm.style.display = 'none';
      signOutBtn.style.display = 'block';
      await loadAllPOIs();
    }
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

async function handleSignOut() {
  try {
    await supabase.auth.signOut();
    currentUser = null;
    hideMainContent();
    authForm.style.display = 'flex';
    signOutBtn.style.display = 'none';
    emailInput.value = '';
    passwordInput.value = '';
    clearError();
  } catch (error) {
    showError(`Sign out failed: ${error.message}`);
  }
}

async function loadAllPOIs() {
  try {
    poiTableBody.innerHTML = '<tr><td colspan="15" class="loading">Loading...</td></tr>';
    clearError();

    const { data, error } = await supabase
      .from('poi')
      .select('*')
      .order('name');

    if (error) {
      showError(`Failed to load POIs: ${error.message}`);
      return;
    }

    allPOIs = data || [];
    filteredPOIs = allPOIs;
    totalCount.textContent = allPOIs.length;
    renderPOIs(allPOIs);
    await loadTypeFilter();
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

async function loadTypeFilter() {
  try {
    const { data, error } = await supabase
      .from('poi')
      .select('type')
      .not('type', 'is', null)
      .neq('type', 'Unknown');

    if (error) {
      console.error('Error loading type filter:', error);
      return;
    }

    const types = [...new Set(data.map(row => row.type))].sort();
    typeFilter.innerHTML = '<option value="">All Types</option>';
    types.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      typeFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading type filter:', error);
  }
}

async function searchPOIs(searchTerm) {
  if (!searchTerm.trim()) {
    filteredPOIs = allPOIs;
    renderPOIs(allPOIs);
    return;
  }

  try {
    const { data, error } = await supabase
      .from('poi')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%`)
      .order('name');

    if (error) {
      showError(`Search failed: ${error.message}`);
      return;
    }

    filteredPOIs = data || [];
    renderPOIs(filteredPOIs);
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

async function filterByType(type) {
  if (!type) {
    filteredPOIs = allPOIs;
    renderPOIs(allPOIs);
    return;
  }

  try {
    const { data, error } = await supabase
      .from('poi')
      .select('*')
      .eq('type', type)
      .order('name');

    if (error) {
      showError(`Filter failed: ${error.message}`);
      return;
    }

    filteredPOIs = data || [];
    renderPOIs(filteredPOIs);
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

function sortPOIs(field) {
  if (currentSortField === field) {
    currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortField = field;
    currentSortDirection = 'asc';
  }

  document.querySelectorAll('th.sortable').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.sort === field) {
      th.classList.add(`sort-${currentSortDirection}`);
    }
  });

  filteredPOIs.sort((a, b) => {
    let valA = a[field];
    let valB = b[field];

    if (valA === null && valB === null) return 0;
    if (valA === null) return 1;
    if (valB === null) return -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return currentSortDirection === 'asc' ? valA - valB : valB - valA;
    }

    valA = String(valA).toLowerCase();
    valB = String(valB).toLowerCase();

    if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  renderPOIs(filteredPOIs);
}

function renderPOIs(pois) {
  if (pois.length === 0) {
    poiTableBody.innerHTML = '<tr><td colspan="15" class="loading">No POIs found</td></tr>';
    showingCount.textContent = '0';
    return;
  }

  poiTableBody.innerHTML = '';
  pois.forEach(poi => {
    const row = document.createElement('tr');
    row.dataset.id = poi.id;
    row.innerHTML = `
      <td>${escapeHtml(poi.name)}</td>
      <td>${poi.x !== null ? poi.x : '-'}</td>
      <td>${poi.y !== null ? poi.y : '-'}</td>
      <td>${escapeHtml(poi.type || '-')}</td>
      <td>${escapeHtml(poi.bio_hostiles || '-')}</td>
      <td>${escapeHtml(poi.mech_hostiles || '-')}</td>
      <td>${escapeHtml(poi.salvage || '-')}</td>
      <td>${escapeHtml(poi.power || '-')}</td>
      <td>${escapeHtml(poi.beacon || '-')}</td>
      <td>${poi.depth_m !== null ? poi.depth_m : '-'}</td>
      <td>${poi.ocean_floor_depth_m !== null ? poi.ocean_floor_depth_m : '-'}</td>
      <td>${poi.top_depth_m !== null ? poi.top_depth_m : '-'}</td>
      <td>${poi.max_explored_depth_m !== null ? poi.max_explored_depth_m : '-'}</td>
      <td>${poi.max_psi_reached !== null ? poi.max_psi_reached : '-'}</td>
      <td>${escapeHtml(poi.notes || '-')}</td>
    `;

    row.addEventListener('click', () => openAddModal(poi));
    poiTableBody.appendChild(row);
  });

  showingCount.textContent = pois.length;
}

function clearFilters() {
  searchInput.value = '';
  typeFilter.value = '';
  filteredPOIs = allPOIs;
  renderPOIs(allPOIs);
}

async function openAddModal(poi = null) {
  addPoiModal.style.display = 'flex';

  addPoiForm.reset();
  currentEditingId = null;
  document.querySelector('#addPoiModal h2').textContent = 'Add New POI';
  deletePoiBtn.style.display = 'none';

  const populateSelect = async (elementId, category) => {
    const select = document.getElementById(elementId);
    if (!select) return;

    while (select.options.length > 1) {
      select.remove(1);
    }

    try {
      const { data, error } = await supabase
        .from('poi')
        .select(elementId.replace('poi', '').toLowerCase())
        .not(elementId.replace('poi', '').toLowerCase(), 'is', null)
        .not(elementId.replace('poi', '').toLowerCase(), 'eq', '');

      if (!error && data) {
        const values = [...new Set(data.map(row => row[elementId.replace('poi', '').toLowerCase()]))].sort();
        values.forEach(val => {
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

  await Promise.all([
    populateSelect('poiBioHostiles', 'Bio Hostiles'),
    populateSelect('poiMechHostiles', 'Mech Hostiles'),
    populateSelect('poiSalvage', 'Salvage'),
    populateSelect('poiPower', 'Power'),
    populateSelect('poiBeacon', 'Beacon')
  ]);

  const { data: typeData } = await supabase
    .from('poi')
    .select('type')
    .not('type', 'is', null);

  if (typeData) {
    const typeList = document.getElementById('typeList');
    typeList.innerHTML = '';
    const types = [...new Set(typeData.map(row => row.type))];
    types.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      typeList.appendChild(option);
    });
  }

  if (poi) {
    currentEditingId = poi.id;
    document.querySelector('#addPoiModal h2').textContent = 'Edit POI';
    deletePoiBtn.style.display = 'block';

    document.getElementById('poiName').value = poi.name || '';
    document.getElementById('poiX').value = poi.x || '';
    document.getElementById('poiY').value = poi.y || '';
    document.getElementById('poiType').value = poi.type || '';
    document.getElementById('poiDepthM').value = poi.depth_m || '';
    document.getElementById('poiOceanFloorDepthM').value = poi.ocean_floor_depth_m || '';
    document.getElementById('poiTopDepthM').value = poi.top_depth_m || '';
    document.getElementById('poiMaxExploredDepthM').value = poi.max_explored_depth_m || '';
    document.getElementById('poiMaxPsiReached').value = poi.max_psi_reached || '';
    document.getElementById('poiBioHostiles').value = poi.bio_hostiles || '';
    document.getElementById('poiMechHostiles').value = poi.mech_hostiles || '';
    document.getElementById('poiSalvage').value = poi.salvage || '';
    document.getElementById('poiPower').value = poi.power || '';
    document.getElementById('poiBeacon').value = poi.beacon || '';
    document.getElementById('poiNotes').value = poi.notes || '';
  }
}

function closeAddModalFunc() {
  addPoiModal.style.display = 'none';
  addPoiForm.reset();
  currentEditingId = null;
}

function openDeleteConfirmModal() {
  deleteConfirmModal.style.display = 'flex';
}

function closeDeleteConfirmModalFunc() {
  deleteConfirmModal.style.display = 'none';
}

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
    max_psi_reached: document.getElementById('poiMaxPsiReached').value ? parseFloat(document.getElementById('poiMaxPsiReached').value) : null,
    notes: document.getElementById('poiNotes').value || null
  };

  try {
    let error;
    if (currentEditingId) {
      ({ error } = await supabase
        .from('poi')
        .update(formData)
        .eq('id', currentEditingId));
    } else {
      ({ error } = await supabase
        .from('poi')
        .insert([formData]));
    }

    if (error) {
      showError(`Failed to ${currentEditingId ? 'update' : 'create'} POI: ${error.message}`);
    } else {
      closeAddModalFunc();
      await loadAllPOIs();
    }
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
});

confirmDeleteBtn.addEventListener('click', async () => {
  if (currentEditingId) {
    try {
      const { error } = await supabase
        .from('poi')
        .delete()
        .eq('id', currentEditingId);

      if (error) {
        showError(`Failed to delete POI: ${error.message}`);
      } else {
        closeDeleteConfirmModalFunc();
        closeAddModalFunc();
        await loadAllPOIs();
      }
    } catch (error) {
      showError(`Error deleting POI: ${error.message}`);
    }
  }
});

toggleAuthBtn.addEventListener('click', handleAuth);
signOutBtn.addEventListener('click', handleSignOut);
addPoiBtn.addEventListener('click', () => openAddModal(null));
closeAddModalBtn.addEventListener('click', closeAddModalFunc);
cancelAddBtn.addEventListener('click', closeAddModalFunc);
deletePoiBtn.addEventListener('click', openDeleteConfirmModal);
cancelDeleteBtn.addEventListener('click', closeDeleteConfirmModalFunc);
closeDeleteModalBtn.addEventListener('click', closeDeleteConfirmModalFunc);
clearBtn.addEventListener('click', clearFilters);

window.addEventListener('click', (e) => {
  if (e.target === addPoiModal) {
    closeAddModalFunc();
  }
  if (e.target === deleteConfirmModal) {
    closeDeleteConfirmModalFunc();
  }
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  if (searchTerm.length >= 2 || searchTerm.length === 0) {
    searchPOIs(searchTerm);
  }
});

typeFilter.addEventListener('change', (e) => {
  filterByType(e.target.value);
});

document.querySelectorAll('th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const field = th.dataset.sort;
    if (field) {
      sortPOIs(field);
    }
  });
});

emailInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleAuth();
});

passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleAuth();
});

async function checkAuthState() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (session && session.user) {
    currentUser = session.user;
    showMainContent();
    authForm.style.display = 'none';
    signOutBtn.style.display = 'block';
    await loadAllPOIs();
  } else {
    hideMainContent();
    authForm.style.display = 'flex';
    signOutBtn.style.display = 'none';
  }
}

checkAuthState();

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.user) {
    currentUser = session.user;
    showMainContent();
    authForm.style.display = 'none';
    signOutBtn.style.display = 'block';
  } else {
    currentUser = null;
    hideMainContent();
    authForm.style.display = 'flex';
    signOutBtn.style.display = 'none';
  }
});
