<template>
  <nav class="navbar">
    <!-- <div class="logo">
      <img src="@/assets/img/logo.png" alt="HAV-Net Logo" class="logo-img" />
      <span>HAV - Net</span>
    </div> -->

      <router-link to="/" class="logo">
        <img src="@/assets/img/logo.png" alt="HAV-Net Logo" class="logo-img" />
        <span>HAV - Net</span>
      </router-link>


    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/live-demo">Live Demo</router-link>
      <router-link to="/history">History</router-link>
      <router-link to="/about">About Us</router-link>
    </div>

    <!-- AUTH SECTION -->
    <div class="auth-section">
      
      <!-- 1. IF NOT LOGGED IN: Show Login Button -->
      <router-link 
        v-if="!isLoggedIn" 
        to="/login" 
        class="login-btn" 
        style="text-decoration: none;"
      >
        Login
      </router-link>

      <!-- 2. IF LOGGED IN: Show Profile Icon with Dropdown -->
      <div v-else class="profile-container" @click="toggleDropdown" @mouseleave="closeDropdown">
        <div class="profile-icon">
          <!-- User SVG Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>

        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="dropdown-menu">
           <div class="user-info" v-if="userEmail">
             <small>{{ userEmail }}</small>
           </div>
           <button @click="handleLogout" class="logout-item">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
             Logout
           </button>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State
const isLoggedIn = ref(false);
const showDropdown = ref(false);
const userEmail = ref('');

// Check Login Status
const checkLoginStatus = () => {
  const token = localStorage.getItem('havnet_token');
  isLoggedIn.value = !!token;
  
  // Optional: Decode token or get user info if you stored it
  // For now, let's just pretend we stored the email, or just show generic profile
  // You can verify this token with your backend if needed
};

// Dropdown Logic
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
  showDropdown.value = false;
};

// Logout Logic
const handleLogout = () => {
  localStorage.removeItem('havnet_token');
  isLoggedIn.value = false;
  showDropdown.value = false;
  router.push('/login');
  
  // Dispatch event so other components know (optional but good practice)
  window.dispatchEvent(new Event('auth-change'));
};

// Event Listener to update Navbar when Login happens elsewhere
const handleAuthChange = () => {
  checkLoginStatus();
};

onMounted(() => {
  checkLoginStatus();
  // Listen for login/logout events across the app
  window.addEventListener('auth-change', handleAuthChange);
});

onUnmounted(() => {
  window.removeEventListener('auth-change', handleAuthChange);
});
</script>

<style lang="scss" scoped>
$text-color: #e2e8f0;
$accent-color: #3b82f6;
$bg-card: #0f172a;
$nav-height: 80px;

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $nav-height;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  
  .logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none; /* <--- MOVED HERE */
    
    .logo-img { height: 30px; margin-right: 10px; }

    /* You can remove the span rule entirely now */
  }

  .nav-links {
    a {
      color: $text-color;
      text-decoration: none;
      margin: 0 20px;
      font-size: 0.9rem;
      transition: color 0.3s;
      &:hover, &.router-link-active { color: $accent-color; }
    }
  }

  /* Auth Section */
  .auth-section {
    display: flex;
    align-items: center;
  }

  .login-btn {
    background-color: $accent-color;
    color: white;
    border: none;
    padding: 8px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.2s;
    &:hover { background-color: darken($accent-color, 10%); }
  }
}

/* Profile Icon & Dropdown */
.profile-container {
  position: relative;
  cursor: pointer;
  padding: 5px;

  .profile-icon {
    width: 40px;
    height: 40px;
    background-color: rgba(59, 130, 246, 0.2); /* Transparent Blue */
    color: $accent-color;
    border: 1px solid rgba(59, 130, 246, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      background-color: $accent-color;
      color: white;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 55px;
    right: 0;
    width: 150px;
    background-color: $bg-card;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;

    .user-info {
      padding: 10px 15px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      color: #94a3b8;
      font-size: 0.8rem;
    }

    .logout-item {
      width: 100%;
      background: none;
      border: none;
      padding: 12px 15px;
      color: #ef4444; /* Red color for logout */
      font-size: 0.9rem;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;

      &:hover {
        background-color: rgba(239, 68, 68, 0.1);
      }
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .navbar .nav-links { display: none; }
}
</style>