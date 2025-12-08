<template>
  <nav class="navbar">

    <!-- LOGO -->
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo.png" alt="HAV-Net Logo" class="logo-img" />
      <span>HAV - Net</span>
    </router-link>

    <!-- DESKTOP NAV LINKS (Hidden on Mobile) -->
    <div class="nav-links desktop-only">
      <router-link to="/">Home</router-link>
      <router-link to="/live-demo">Live Demo</router-link>
      <router-link to="/history">History</router-link>
      <router-link to="/about">About Us</router-link>
    </div>

    <!-- AUTH / MOBILE MENU SECTION -->
    <div class="auth-section">
      
      <!-- SCENARIO 1: NOT LOGGED IN -->
      <template v-if="!isLoggedIn">
        <!-- Desktop: Standard Login Button -->
        <router-link to="/login" class="login-btn desktop-only">
          Login
        </router-link>

        <!-- Mobile: Hamburger Menu (Hidden on Desktop) -->
        <div class="profile-container mobile-only" @click="toggleDropdown">
          <div class="hamburger-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>

          <!-- Mobile Dropdown (Logged Out) -->
          <div v-if="showDropdown" class="dropdown-menu">
            <div class="mobile-nav-list">
              <router-link to="/" @click="closeDropdown">Home</router-link>
              <router-link to="/live-demo" @click="closeDropdown">Live Demo</router-link>
              <router-link to="/history" @click="closeDropdown">History</router-link>
              <router-link to="/about" @click="closeDropdown">About Us</router-link>
              <div class="divider"></div>
              <router-link to="/login" class="mobile-login-item" @click="closeDropdown">
                Login
              </router-link>
            </div>
          </div>
        </div>
      </template>

      <!-- SCENARIO 2: LOGGED IN (Profile Icon acts as Menu) -->
      <div v-else class="profile-container" @click="toggleDropdown">
        <div class="profile-icon">
          <!-- User SVG Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>

        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="dropdown-menu">
           <!-- User Info -->
           <div class="user-info">
             <span class="email-text">{{ userEmail || 'Loading...' }}</span>
           </div>

           <!-- Mobile Navigation Links (Hidden on Desktop via CSS) -->
           <div class="mobile-nav-list">
              <router-link to="/" @click="closeDropdown">Home</router-link>
              <router-link to="/live-demo" @click="closeDropdown">Live Demo</router-link>
              <router-link to="/history" @click="closeDropdown">History</router-link>
              <router-link to="/about" @click="closeDropdown">About Us</router-link>
              <div class="divider"></div>
           </div>

           <!-- Logout -->
           <button @click.stop="handleLogout" class="logout-item">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
             Logout
           </button>
        </div>
      </div>

    </div>
  </nav>

  <!-- Overlay to close menu when clicking outside -->
  <div v-if="showDropdown" class="click-overlay" @click="closeDropdown"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; 

const router = useRouter();

// --- CONFIGURATION ---
// Use the Env variable, or default to relative path '/api' for Vercel
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '/api';

// State
const isLoggedIn = ref(false);
const showDropdown = ref(false);
const userEmail = ref('');

// --- FETCH USER FUNCTION ---
const fetchCurrentUser = async () => {
  const token = localStorage.getItem('havnet_token');
  
  // If no token, user isn't logged in
  if (!token) {
    userEmail.value = 'Guest';
    return;
  }

  try {
    // UPDATED: Using dynamic BACKEND_URL instead of localhost
    const response = await axios.get(`${BACKEND_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Set the email from response
    userEmail.value = response.data.email;
  } catch (error) {
    console.error("Failed to fetch user", error);
    // Optional: If token is expired/invalid, force logout
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        handleLogout();
    }
    userEmail.value = 'Unknown User';
  }
};

// Check Login Status
const checkLoginStatus = () => {
  const token = localStorage.getItem('havnet_token');
  isLoggedIn.value = !!token;

  if (isLoggedIn.value) {
    fetchCurrentUser(); 
  }
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
  userEmail.value = ''; // Clear email on logout
  router.push('/login');
  window.dispatchEvent(new Event('auth-change'));
};

const handleAuthChange = () => {
  checkLoginStatus();
};

onMounted(() => {
  checkLoginStatus();
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

/* Utilities */
.mobile-only { display: none; }
.desktop-only { display: block; }

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
  padding: 0 5%;
  position: relative;
  z-index: 50;
  
  .logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    z-index: 51;
    
    .logo-img { height: 45px; margin-right: 15px; }
  }

  /* Desktop Links */
  .nav-links {
    &.desktop-only { display: flex; }
    
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
    text-decoration: none;
    padding: 8px 24px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.2s;
    &:hover { background-color: darken($accent-color, 10%); }
  }
}

/* Profile Container */
.profile-container {
  position: relative;
  cursor: pointer;
  padding: 5px;
  user-select: none;

  .profile-icon, .hamburger-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
  }

  .profile-icon {
    background-color: rgba(59, 130, 246, 0.2);
    color: $accent-color;
    border: 1px solid rgba(59, 130, 246, 0.5);
    &:hover {
      background-color: $accent-color;
      color: white;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
  }

  .hamburger-icon {
    color: $text-color;
    &:hover {
      color: $accent-color;
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
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

    /* --- KEY FIX: Hidden by default on Desktop --- */
    .mobile-nav-list {
      display: none; /* Changed from flex to none */
      flex-direction: column;
      
      a {
        padding: 12px 15px;
        color: $text-color;
        text-decoration: none;
        font-size: 0.9rem;
        border-bottom: 1px solid rgba(255,255,255,0.03);
        transition: background 0.2s;
        
        &:hover, &.router-link-active {
            background-color: rgba(255,255,255,0.05);
            color: $accent-color;
        }
      }

      .mobile-login-item {
        color: $accent-color;
        font-weight: 600;
      }
    }
    
    .divider {
        height: 1px;
        background: rgba(255,255,255,0.1);
        margin: 0;
    }

    .logout-item {
      width: 100%;
      background: none;
      border: none;
      padding: 12px 15px;
      color: #ef4444;
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

.click-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 40;
    background: transparent;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile Responsiveness Rules */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block; }
  
  .navbar { padding: 0 15px; }

  /* --- KEY FIX: Show the list ONLY on Mobile --- */
  .profile-container .dropdown-menu .mobile-nav-list {
      display: flex;
  }
}
</style>