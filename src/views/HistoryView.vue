<template>
  <div class="history-container">
    <!-- Navigation (Reused) -->
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="HAV-Net Logo" class="logo-img" />
        <span>HAV - Net</span>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/live-demo">Live Demo</router-link>
        <router-link to="/history" class="active">History</router-link>
        <router-link to="/about">About Us</router-link>
      </div>
      <button class="login-btn">Contact</button>
    </nav>

    <main class="main-content">
      <!-- Header -->
      <div class="page-header">
        <h1>Camera Usage History</h1>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Sessions</h3>
          <p class="stat-value">128</p>
        </div>
        <div class="stat-card highlight-border">
          <h3>Total Detections</h3>
          <p class="stat-value">1,432</p>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="search-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Filter sessions by date or status..." 
            class="search-input"
          />
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
            <tr v-for="session in filteredSessions" :key="session.id">
              <td>
                <span class="status-badge" :class="session.status.toLowerCase()">
                  <span class="dot"></span>
                  {{ session.status }}
                </span>
              </td>
              <td>{{ session.date }}</td>
              <td>{{ session.startTime }}</td>
              <td>{{ session.duration }}</td>
              <td>{{ session.detections }} Detections</td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="filteredSessions.length === 0">
              <td colspan="5" class="empty-state">No sessions found matching your search.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          &lt;
        </button>
        <span class="page-number" :class="{ active: currentPage === 1 }">1</span>
        <span class="page-number" :class="{ active: currentPage === 2 }">2</span>
        <span class="page-number">...</span>
        <span class="page-number">10</span>
        <button class="page-btn" @click="currentPage++">
          &gt;
        </button>
      </div>
    </main>

    <footer class="footer">
      <p>2025 AI Vision Project. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- State ---
const searchQuery = ref('');
const currentPage = ref(1);

// --- Mock Data (Based on your Screenshot) ---
const sessions = ref([
  { id: 1, status: 'Completed', date: 'Oct 28, 2025', startTime: '14:30', duration: '15 minutes', detections: 12 },
  { id: 2, status: 'Completed', date: 'Oct 25, 2025', startTime: '11:05', duration: '30 minutes', detections: 25 },
  { id: 3, status: 'Interrupted', date: 'Oct 26, 2025', startTime: '09:15', duration: '5 minutes', detections: 4 },
  { id: 4, status: 'Completed', date: 'Oct 24, 2025', startTime: '18:00', duration: '45 minutes', detections: 58 },
  { id: 5, status: 'Completed', date: 'Oct 23, 2025', startTime: '10:20', duration: '20 minutes', detections: 18 },
  { id: 6, status: 'Failed', date: 'Oct 22, 2025', startTime: '08:45', duration: '2 minutes', detections: 0 },
]);

// --- Filter Logic ---
const filteredSessions = computed(() => {
  if (!searchQuery.value) return sessions.value;
  const query = searchQuery.value.toLowerCase();
  return sessions.value.filter(session => 
    session.date.toLowerCase().includes(query) || 
    session.status.toLowerCase().includes(query)
  );
});
</script>

<style lang="scss" scoped>
/* --- Theme Variables --- */
$bg-dark: #050b14;
$bg-panel: #0f172a;
$accent-blue: #3b82f6;
$accent-purple: #8b5cf6; /* Used for the secondary card border */
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

/* Navbar (Reused) */
.navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 5%; height: 70px;
  background-color: rgba(5, 11, 20, 0.95);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  .logo { display: flex; align-items: center; font-weight: 700; color: #fff; gap: 10px; }
  .logo-img { height: 24px; }
  .nav-links a { 
    color: $text-muted; margin: 0 15px; text-decoration: none; font-size: 0.9rem;
    &.active, &:hover { color: $accent-blue; }
  }
  .login-btn { background: $accent-blue; color: white; border: none; padding: 6px 16px; border-radius: 4px; font-weight: 600; cursor: pointer; }
}

/* Main Content */
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
  margin-bottom: 40px;
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

  /* Specific styling for the second card as per design */
  &.highlight-border {
    border: 1px solid rgba(139, 92, 246, 0.3); /* Purple tint */
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.05);
  }
}

/* Filter Bar */
.filter-bar {
  margin-bottom: 20px;
}

.search-wrapper {
  position: relative;
  max-width: 100%;
  
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
    background-color: rgba(30, 41, 59, 0.5); /* Slightly lighter dark */
    border: 1px solid $border-color;
    border-radius: 6px;
    color: white;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: $accent-blue;
    }
    
    &::placeholder {
      color: #64748b;
    }
  }
}

/* Table */
.table-container {
  background-color: $bg-panel;
  border-radius: 8px;
  border: 1px solid $border-color;
  overflow-x: auto; /* Handle responsive tables */
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
    letter-spacing: 0.5px;
    background-color: rgba(255,255,255,0.02);
  }

  td {
    font-size: 0.95rem;
    color: $text-main;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
}

/* Status Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $text-muted;
  }

  /* Status Colors */
  &.completed {
    color: $text-main;
    .dot { background-color: $status-green; box-shadow: 0 0 8px rgba(34, 197, 94, 0.4); }
  }
  
  &.interrupted {
    color: $text-main;
    .dot { background-color: $status-yellow; box-shadow: 0 0 8px rgba(234, 179, 8, 0.4); }
  }

  &.failed {
    color: $text-main;
    .dot { background-color: $status-red; box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }
  }
}

.empty-state {
  text-align: center;
  color: $text-muted;
  padding: 40px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;

  .page-btn {
    background: transparent;
    border: none;
    color: $text-muted;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px 10px;
    
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
    
    &:hover:not(:disabled) {
      color: white;
    }
  }

  .page-number {
    color: $text-muted;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      background-color: rgba(59, 130, 246, 0.2);
      color: $accent-blue;
      font-weight: 600;
    }

    &:hover:not(.active) {
      color: white;
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.05);
  font-size: 0.8rem;
  color: #475569;
  margin-top: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar .nav-links { display: none; }
  .stats-grid { grid-template-columns: 1fr; }
  .table-container { border: none; background: transparent; }
  
  /* On mobile, standard tables can be tough. 
     Horizontal scroll is handled by overflow-x: auto on container */
}
</style>