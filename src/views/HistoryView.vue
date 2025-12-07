<template>
  <div class="history-container">
    <Navbar />

    <main class="main-content">
      <div class="page-header">
        <h1>Camera Usage History</h1>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Sessions</h3>
          <p class="stat-value">{{ sessions.length }}</p>
        </div>
        <div class="stat-card highlight-border">
          <h3>Total Detections</h3>
          <p class="stat-value">{{ totalDetections.toLocaleString() }}</p>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="filter-section">
        <!-- Text Search -->
        <div class="search-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" v-model="searchQuery" placeholder="Search by date or status..." class="search-input"/>
        </div>

        <!-- Quick Filters -->
        <div class="quick-filters">
          <span class="filter-label">Quick Filter:</span>
          <button 
            class="filter-chip" 
            :class="{ active: activeFilter === 'All' }" 
            @click="setFilter('All')">
            All
          </button>
          <button 
            class="filter-chip" 
            :class="{ active: activeFilter === 'Human' }" 
            @click="setFilter('Human')">
            Human
          </button>
          <button 
            class="filter-chip" 
            :class="{ active: activeFilter === 'Animal' }" 
            @click="setFilter('Animal')">
            Animal
          </button>
          <button 
            class="filter-chip" 
            :class="{ active: activeFilter === 'Vehicle' }" 
            @click="setFilter('Vehicle')">
            Vehicle
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-container">
        <table class="history-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Detections</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="session in filteredSessions" :key="session._id">
              <td>
                <span class="status-badge" :class="session.status.toLowerCase()">
                  <span class="dot"></span>
                  {{ session.status }}
                </span>
              </td>
              <td>{{ session.date }}</td>
              <!-- UPDATED: Uses formatTime12Hour function -->
              <td>{{ formatTime12Hour(session.startTime) }}</td>
              <td>{{ session.duration }}</td>
              <td>
                <button class="detection-btn" @click="openDetectionDetails(session)">
                  {{ session.detectionsCount }} detected
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </button>
              </td>
            </tr>
            <tr v-if="filteredSessions.length === 0">
              <td colspan="5" class="empty-state">No sessions found matching your filters.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- DETAILS MODAL -->
    <div v-if="showDetailModal" class="modal-overlay" @click.self="closeDetailModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Session Details</h3>
          <button @click="closeDetailModal" class="close-btn">&times;</button>
        </div>
        
        <div class="detail-body" v-if="selectedSession">
          <div class="detail-row">
            <span>Date:</span> <strong>{{ selectedSession.date }} at {{ formatTime12Hour(selectedSession.startTime) }}</strong>
          </div>
          <div class="detail-row">
            <span>Duration:</span> <strong>{{ selectedSession.duration }}</strong>
          </div>
          
          <div class="divider"></div>
          
          <h4>Objects Detected</h4>
          <div class="tags-container">
            <span v-for="(item, index) in selectedSession.detectedItems" :key="index" class="obj-tag">
              {{ item }}
            </span>
            <span v-if="!selectedSession.detectedItems || selectedSession.detectedItems.length === 0" class="no-data">
              No specific objects recorded.
            </span>
          </div>
          
          <div class="total-count">
             Total Recognition Events: {{ selectedSession.detectionsCount }}
          </div>
        </div>
        
        <button class="modal-action-btn" @click="closeDetailModal">Close</button>
      </div>
    </div>

    <footer class="footer">
      <p>2025 AI Vision Project. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '@/components/navbar.vue';

// --- State ---
const searchQuery = ref('');
const activeFilter = ref('All'); // New state for Quick Filter
const sessions = ref([]);
const showDetailModal = ref(false);
const selectedSession = ref(null);

// --- Fetch Data ---
onMounted(async () => {
  try {
    const token = localStorage.getItem('havnet_token') || localStorage.getItem('token');
    if (!token) return;
    
    const response = await axios.get('http://localhost:3000/api/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    sessions.value = response.data;
  } catch (error) {
    console.error("Error loading history:", error);
  }
});

// --- Helper: Format 24h to 12h ---
const formatTime12Hour = (timeStr) => {
  if (!timeStr) return '';
  // Check if it's already 12h format just in case
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;

  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const m = minutes || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  
  return `${h}:${m} ${ampm}`;
};

// --- Actions ---
const setFilter = (category) => {
  activeFilter.value = category;
};

// --- Computed ---
const filteredSessions = computed(() => {
  let result = sessions.value;

  // 1. Filter by Text Search (Date or Status)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(session => 
      session.date.toLowerCase().includes(query) || 
      session.status.toLowerCase().includes(query)
    );
  }

  // 2. Filter by Quick Filter (Detected Items)
  if (activeFilter.value !== 'All') {
    const filterKey = activeFilter.value.toLowerCase();
    
    result = result.filter(session => {
      // Check if ANY item in the detectedItems array matches the filter
      // Mapping: "Human" -> "person", "Vehicle" -> "car/truck", "Animal" -> "cat/dog"
      // Or just simple text matching if your model returns "Human", "Vehicle" directly.
      
      return session.detectedItems.some(item => {
        const i = item.toLowerCase();
        
        if (filterKey === 'human') return i.includes('human') || i.includes('person');
        if (filterKey === 'vehicle') return i.includes('vehicle') || i.includes('car') || i.includes('truck') || i.includes('bus') || i.includes('motorcycle');
        if (filterKey === 'animal') return i.includes('animal') || i.includes('dog') || i.includes('cat') || i.includes('bird');
        
        return i.includes(filterKey);
      });
    });
  }

  return result;
});

const totalDetections = computed(() => {
  return sessions.value.reduce((acc, curr) => acc + (curr.detectionsCount || 0), 0);
});

const openDetectionDetails = (session) => {
  selectedSession.value = session;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedSession.value = null;
};
</script>

<style lang="scss" scoped>
/* --- Theme Variables --- */
$bg-dark: #050b14;
$bg-panel: #0f172a;
$accent-blue: #3b82f6;
$text-main: #e2e8f0;
$text-muted: #94a3b8;
$border-color: #1e293b;
$status-green: #22c55e;
$status-yellow: #eab308;
$status-red: #ef4444;

.history-container {
  background-color: $bg-dark;
  color: $text-main;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 40px 5%;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.page-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: white;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: $bg-panel;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid $border-color;
  
  h3 {
    font-size: 0.9rem;
    color: $text-muted;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 600;
    color: white;
  }

  &.highlight-border {
    border: 1px solid rgba(139, 92, 246, 0.3);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.05);
  }
}

/* --- Filter Section --- */
.filter-section {
  background: rgba(30, 41, 59, 0.3);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid $border-color;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.search-wrapper {
  position: relative;
  width: 100%;
  
  .search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
  }

  .search-input {
    width: 100%;
    padding: 12px 12px 12px 45px;
    background-color: $bg-dark;
    border: 1px solid $border-color;
    border-radius: 6px;
    color: white;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus { border-color: $accent-blue; }
    &::placeholder { color: #64748b; }
  }
}

.quick-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .filter-label {
    color: $text-muted;
    font-size: 0.9rem;
    margin-right: 5px;
  }

  .filter-chip {
    background: transparent;
    border: 1px solid $border-color;
    color: $text-muted;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: white;
    }

    &.active {
      background: rgba(59, 130, 246, 0.2);
      border-color: $accent-blue;
      color: $accent-blue;
      font-weight: 600;
    }
  }
}

/* Table */
.table-container {
  background-color: $bg-panel;
  border-radius: 8px;
  border: 1px solid $border-color;
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 18px 25px;
    text-align: left;
    border-bottom: 1px solid $border-color;
  }

  th {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: $text-muted;
    font-weight: 600;
    background-color: rgba(255,255,255,0.02);
  }

  td {
    font-size: 0.95rem;
    color: $text-main;
  }
}

/* Status Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  .dot { width: 8px; height: 8px; border-radius: 50%; background-color: $text-muted; }
  &.completed { .dot { background-color: $status-green; box-shadow: 0 0 8px rgba(34, 197, 94, 0.4); } }
  &.interrupted { .dot { background-color: $status-yellow; box-shadow: 0 0 8px rgba(234, 179, 8, 0.4); } }
  &.failed { .dot { background-color: $status-red; box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); } }
}

/* Detection Button & Modal */
.detection-btn {
  background: transparent; border: 1px solid #334155; color: $accent-blue;
  padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;
  display: flex; align-items: center; gap: 6px; transition: all 0.2s;
  &:hover { background: rgba(59, 130, 246, 0.1); border-color: $accent-blue; }
}

.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); z-index: 1000;
  display: flex; justify-content: center; align-items: center; padding: 20px;
}

.modal-content {
  background: #1e293b; border: 1px solid #334155; width: 100%; max-width: 450px;
  border-radius: 12px; padding: 25px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
  h3 { color: white; margin: 0; font-size: 1.25rem; }
  .close-btn { background: none; border: none; color: $text-muted; font-size: 1.5rem; cursor: pointer; }
}

.detail-body {
  margin-bottom: 25px;
  .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; color: $text-muted; strong { color: white; } }
  .divider { height: 1px; background: #334155; margin: 15px 0; }
  h4 { color: white; margin-bottom: 10px; font-size: 0.95rem; }
}

.tags-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
.obj-tag {
  background: rgba(59, 130, 246, 0.15); color: #60a5fa; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.3);
}
.no-data { color: $text-muted; font-size: 0.85rem; font-style: italic; }

.total-count { text-align: right; font-size: 0.85rem; color: $text-muted; }

.modal-action-btn {
  width: 100%; background: $accent-blue; color: white; border: none; padding: 10px;
  border-radius: 6px; font-weight: 600; cursor: pointer;
  &:hover { background: darken($accent-blue, 10%); }
}

.empty-state { text-align: center; color: $text-muted; padding: 40px; }
.footer { text-align: center; padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; color: #475569; margin-top: auto; }

/* Responsive */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .table-container { border: none; background: transparent; }
  .filter-section { padding: 15px; }
}
</style>