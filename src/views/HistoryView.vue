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
        <div class="search-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" v-model="searchQuery" placeholder="Search by date or status..." class="search-input"/>
        </div>

        <div class="quick-filters">
          <span class="filter-label">Quick Filter:</span>
          <button class="filter-chip" :class="{ active: activeFilter === 'All' }" @click="setFilter('All')">All</button>
          <button class="filter-chip" :class="{ active: activeFilter === 'Human' }" @click="setFilter('Human')">Human</button>
          <button class="filter-chip" :class="{ active: activeFilter === 'Animal' }" @click="setFilter('Animal')">Animal</button>
          <button class="filter-chip" :class="{ active: activeFilter === 'Vehicle' }" @click="setFilter('Vehicle')">Vehicle</button>
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
              <th>Avg Confidence</th>
              <th>Duration</th>
              <th>Metrics Detections</th>
            </tr>
          </thead>
          <tbody>
            <!-- CHANGED: Added data-label attributes for mobile responsiveness -->
            <tr v-for="session in paginatedSessions" :key="session._id">
              <td data-label="Status">
                <span class="status-badge" :class="session.status.toLowerCase()">
                  <span class="dot"></span>
                  {{ session.status }}
                </span>
              </td>
              <td data-label="Date">{{ session.date }}</td>
              <td data-label="Start Time">{{ formatTime12Hour(session.startTime) }}</td>
              
              <td data-label="Avg Confidence">
                 <span class="confidence-text" v-if="session.overallConfidence > 0">
                    {{ Math.round(session.overallConfidence) }}%
                 </span>
                 <span class="confidence-text text-muted" v-else>--</span>
              </td>

              <td data-label="Duration">{{ session.duration }}</td>
              <td data-label="Detections">
                <button class="detection-btn" @click="openDetectionDetails(session)">
                  {{ session.detectionsCount }} detected
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </button>
              </td>
            </tr>
            <tr v-if="paginatedSessions.length === 0">
              <td colspan="6" class="empty-state">No sessions found.</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="pagination-controls" v-if="totalPages > 1">
          <button 
            class="page-nav-btn" 
            :disabled="currentPage === 1" 
            @click="currentPage--">
            &lt; Prev
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in totalPages" 
              :key="page"
              class="page-number-btn"
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>

          <button 
            class="page-nav-btn" 
            :disabled="currentPage === totalPages" 
            @click="currentPage++">
            Next &gt;
          </button>
        </div>
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
            <span>Date:</span> <strong>{{ selectedSession.date }} at {{ selectedSession.startTime }}</strong>
          </div>
          <div class="detail-row">
            <span>Duration:</span> <strong>{{ selectedSession.duration }}</strong>
          </div>

          <!-- NEW: Metrics Bars Section -->
          <div class="metrics-section" v-if="selectedSession.metrics">
            <h4>Prediction Metrics</h4>
            <div class="metrics-container">
              
              <!-- Bar 1: Accuracy -->
              <div class="metric-group">
                <div class="vertical-bar-bg">
                  <div class="vertical-bar-fill accuracy-gradient" :style="{ height: selectedSession.metrics.accuracy + '%' }"></div>
                  <span class="bar-value">{{ selectedSession.metrics.accuracy }}%</span>
                </div>
                <span class="bar-label">Accuracy</span>
              </div>

              <!-- Bar 2: Precision -->
              <div class="metric-group">
                <div class="vertical-bar-bg">
                  <div class="vertical-bar-fill precision-gradient" :style="{ height: selectedSession.metrics.precision + '%' }"></div>
                  <span class="bar-value">{{ selectedSession.metrics.precision }}%</span>
                </div>
                <span class="bar-label">Precision</span>
              </div>

              <!-- Bar 3: Recall -->
              <div class="metric-group">
                <div class="vertical-bar-bg">
                  <div class="vertical-bar-fill recall-gradient" :style="{ height: selectedSession.metrics.recall + '%' }"></div>
                  <span class="bar-value">{{ selectedSession.metrics.recall }}%</span>
                </div>
                <span class="bar-label">Recall</span>
              </div>

              <!-- Bar 4: F1 Score -->
              <div class="metric-group">
                <div class="vertical-bar-bg">
                  <div class="vertical-bar-fill f1-gradient" :style="{ height: selectedSession.metrics.f1Score + '%' }"></div>
                  <span class="bar-value">{{ selectedSession.metrics.f1Score }}%</span>
                </div>
                <span class="bar-label">F1 Score</span>
              </div>

            </div>
          </div>
          
          <div class="divider"></div>
          
          <h4>Objects Detected</h4>
          
          <div class="stats-list-container">
            <div v-for="(stat, index) in selectedSession.classStats" :key="index" class="stat-item">
              <span class="stat-name">{{ stat.className }}</span>
              <div class="stat-info">
                 <span class="stat-conf" title="Average Confidence">{{ Math.round(stat.avgConfidence) }}% avg</span>
                 <span class="stat-count">{{ stat.count }}x</span>
              </div>
            </div>

            <div v-if="(!selectedSession.classStats || selectedSession.classStats.length === 0) && selectedSession.detectedItems && selectedSession.detectedItems.length > 0">
               <div v-for="item in selectedSession.detectedItems" :key="item" class="stat-item simple">
                  {{ item }}
               </div>
            </div>

            <div v-if="selectedSession.detectionsCount === 0" class="no-data">
              No specific objects recorded.
            </div>
          </div>
          
          <div class="divider"></div>

          <div class="total-count">
             Total Recognition Events: {{ selectedSession.detectionsCount }}
          </div>
        </div>
        
        <button class="modal-action-btn" @click="closeDetailModal">Close</button>
      </div>
    </div>

    <!-- NEW Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import Navbar from '@/components/navbar.vue';
import Footer from '@/components/footer.vue'; // Imported Footer

// --- CONFIGURATION ---
// Use the Env variable, or default to relative path '/api' for Vercel
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '/api';

// --- State ---
const searchQuery = ref('');
const activeFilter = ref('All');
const sessions = ref([]);
const showDetailModal = ref(false);
const selectedSession = ref(null);

// --- Pagination State ---
const currentPage = ref(1);
const itemsPerPage = 8; 

// --- Fetch Data ---
onMounted(async () => {
  try {
    const token = localStorage.getItem('havnet_token') || localStorage.getItem('token');
    if (!token) return;
    
    // UPDATED: Using dynamic BACKEND_URL instead of localhost
    const response = await axios.get(`${BACKEND_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    sessions.value = response.data;
  } catch (error) {
    console.error("Error loading history:", error);
  }
});

const formatTime12Hour = (timeStr) => {
  if (!timeStr) return '';
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const m = minutes || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${m} ${ampm}`;
};

const setFilter = (category) => {
  activeFilter.value = category;
};

// --- Computed Filters ---
const filteredSessions = computed(() => {
  let result = sessions.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(session => 
      session.date.toLowerCase().includes(query) || 
      session.status.toLowerCase().includes(query)
    );
  }

  if (activeFilter.value !== 'All') {
    const filterKey = activeFilter.value.toLowerCase();
    result = result.filter(session => {
      const hasItem = session.detectedItems?.some(i => i.toLowerCase().includes(filterKey));
      const hasStat = session.classStats?.some(s => s.className.toLowerCase().includes(filterKey));
      return hasItem || hasStat;
    });
  }

  return result;
});

// --- Pagination Logic ---
const totalPages = computed(() => {
  return Math.ceil(filteredSessions.value.length / itemsPerPage);
});

const paginatedSessions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSessions.value.slice(start, end);
});

// Watcher: Reset to page 1 if user searches or filters
watch([searchQuery, activeFilter], () => {
  currentPage.value = 1;
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
  display: flex; flex-direction: column;
}

.main-content {
  flex: 1; padding: 40px 5%; max-width: 1200px; margin: 0 auto; width: 100%;
}

.page-header h1 { font-size: 1.8rem; font-weight: 600; margin-bottom: 30px; color: white; }

.stats-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;
}
.stat-card {
  background-color: $bg-panel; padding: 25px; border-radius: 8px; border: 1px solid $border-color;
  h3 { font-size: 0.9rem; color: $text-muted; margin-bottom: 10px; font-weight: 500; }
  .stat-value { font-size: 2rem; font-weight: 600; color: white; }
  &.highlight-border { border: 1px solid rgba(139, 92, 246, 0.3); box-shadow: 0 4px 20px rgba(139, 92, 246, 0.05); }
}

.filter-section {
  background: rgba(30, 41, 59, 0.3); padding: 20px; border-radius: 8px; border: 1px solid $border-color; margin-bottom: 20px;
  display: flex; flex-direction: column; gap: 15px;
}

.search-wrapper {
  position: relative; width: 100%;
  .search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: $text-muted; }
  .search-input {
    width: 100%; padding: 12px 12px 12px 45px; background-color: $bg-dark;
    border: 1px solid $border-color; border-radius: 6px; color: white; font-size: 0.95rem; outline: none; transition: border-color 0.2s;
    &:focus { border-color: $accent-blue; }
    &::placeholder { color: #64748b; }
  }
}

.quick-filters {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  .filter-label { color: $text-muted; font-size: 0.9rem; margin-right: 5px; }
  .filter-chip {
    background: transparent; border: 1px solid $border-color; color: $text-muted; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease;
    &:hover { background: rgba(255, 255, 255, 0.05); color: white; }
    &.active { background: rgba(59, 130, 246, 0.2); border-color: $accent-blue; color: $accent-blue; font-weight: 600; }
  }
}

/* Table */
.table-container { background-color: $bg-panel; border-radius: 8px; border: 1px solid $border-color; overflow-x: auto; }
.history-table {
  width: 100%; border-collapse: collapse;
  th, td { padding: 18px 25px; text-align: left; border-bottom: 1px solid $border-color; }
  th { font-size: 0.85rem; text-transform: uppercase; color: $text-muted; font-weight: 600; background-color: rgba(255,255,255,0.02); }
  td { font-size: 0.95rem; color: $text-main; }
  th:nth-child(4), td:nth-child(4) { text-align: center; }
}

/* Pagination */
.pagination-controls {
  display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; border-top: 1px solid $border-color;
  background-color: rgba(15, 23, 42, 0.5);
}
.page-nav-btn {
  background: transparent; border: 1px solid $border-color; color: $text-muted; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
  &:hover:not(:disabled) { border-color: $accent-blue; color: white; }
  &:disabled { opacity: 0.5; cursor: default; }
}
.page-numbers { display: flex; gap: 5px; }
.page-number-btn {
  background: transparent; border: none; color: $text-muted; width: 30px; height: 30px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center;
  &:hover:not(.active) { background: rgba(255,255,255,0.05); color: white; }
  &.active { background: $accent-blue; color: white; font-weight: 600; }
}

/* Badges & Buttons */
.status-badge {
  display: inline-flex; align-items: center; gap: 8px;
  .dot { width: 8px; height: 8px; border-radius: 50%; background-color: $text-muted; }
  &.completed { .dot { background-color: $status-green; box-shadow: 0 0 8px rgba(34, 197, 94, 0.4); } }
  &.interrupted { .dot { background-color: $status-yellow; } }
  &.failed { .dot { background-color: $status-red; } }
}
.confidence-text { font-weight: 600; color: #fff; &.text-muted { color: $text-muted; font-weight: 400; } }
.detection-btn {
  background: transparent; border: 1px solid #334155; color: $accent-blue;
  padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;
  display: flex; align-items: center; gap: 6px; transition: all 0.2s;
  &:hover { background: rgba(59, 130, 246, 0.1); border-color: $accent-blue; }
}

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); z-index: 1000; display: flex; justify-content: center; align-items: center; padding: 20px; }
.modal-content { background: #1e293b; border: 1px solid #334155; width: 100%; max-width: 450px; border-radius: 12px; padding: 25px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; h3 { color: white; margin: 0; font-size: 1.25rem; } .close-btn { background: none; border: none; color: $text-muted; font-size: 1.5rem; cursor: pointer; } }
.detail-body { margin-bottom: 25px; .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; color: $text-muted; strong { color: white; } } .divider { height: 1px; background: #334155; margin: 15px 0; } h4 { color: white; margin-bottom: 10px; font-size: 0.95rem; } }
.stats-list-container { display: flex; flex-direction: column; gap: 10px; }
.stat-item {
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(255,255,255,0.03); padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);
    &.simple { color: $accent-blue; }
    .stat-name { text-transform: capitalize; color: $accent-blue; font-weight: 500; }
    .stat-info {
        display: flex; gap: 12px; align-items: center;
        .stat-conf { color: #fff; font-weight: 600; font-size: 0.9rem; }
        .stat-count { color: $text-muted; font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; }
    }
}
.no-data { color: $text-muted; font-size: 0.85rem; font-style: italic; }
.total-count { text-align: right; font-size: 0.85rem; color: $text-muted; }
.modal-action-btn { width: 100%; background: $accent-blue; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; &:hover { background: darken($accent-blue, 10%); } }
.empty-state { text-align: center; color: $text-muted; padding: 40px; }

.metrics-section {
  margin: 20px 0;
  h4 { margin-bottom: 15px; color: #fff; font-size: 0.95rem; }
}

.metrics-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 160px;
  padding: 10px 0;
}

.metric-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  justify-content: flex-end;
}

.vertical-bar-bg {
  width: 36px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.08); /* Faint background track */
  border-radius: 20px;
  position: relative;
  overflow: hidden; /* Clips the inner bar */
}

.vertical-bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 20px;
  transition: height 1s ease-out; /* Smooth animation */
}

/* Specific Gradients */
.accuracy-gradient {
  background: linear-gradient(to top, #ff758c, #ff7eb3); /* Pink/Red */
}
.precision-gradient {
  background: linear-gradient(to top, #a78bfa, #c4b5fd); /* Purple */
}
.recall-gradient {
  background: linear-gradient(to top, #fbbf24, #fcd34d); /* Orange/Yellow */
}
.f1-gradient {
  background: linear-gradient(to top, #34d399, #6ee7b7); /* Green/Teal */
}

.bar-value {
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
  color: rgba(0,0,0,0.6);
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 2;
}

.bar-label {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Ensure existing divider has space */
.divider {
  margin: 20px 0;
}

/* === RESPONSIVE TABLE (CARD VIEW) === */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  
  /* Remove normal table structure */
  .table-container { background: transparent; border: none; }
  .history-table, .history-table thead, .history-table tbody, .history-table th, .history-table td, .history-table tr { 
    display: block; 
  }
  
  /* Hide table headers */
  .history-table thead tr { 
    position: absolute; top: -9999px; left: -9999px; 
  }
  
  /* Make rows look like cards */
  .history-table tr { 
    background: $bg-panel; 
    border: 1px solid $border-color; 
    border-radius: 12px; 
    margin-bottom: 15px; 
    padding: 10px 15px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  /* Style cells as key-value pairs */
  .history-table td { 
    border: none; 
    border-bottom: 1px solid rgba(255,255,255,0.05); 
    position: relative; 
    padding: 12px 0; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    text-align: right;
  }
  
  .history-table td:last-child { border-bottom: none; }
  
  /* Inject Labels */
  .history-table td::before { 
    content: attr(data-label); 
    font-weight: 600; 
    color: $text-muted; 
    text-transform: uppercase; 
    font-size: 0.75rem; 
    margin-right: 20px;
    text-align: left;
  }

  .pagination-controls { 
    flex-direction: column; 
    gap: 15px; 
    background: $bg-panel; 
    border-radius: 8px;
    border: 1px solid $border-color;
  }
}
</style>