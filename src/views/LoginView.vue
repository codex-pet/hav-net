<template>
  <div class="page-container">
    <!-- Navigation Component -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content">
      <div class="auth-card">
        <div class="card-header">
          <div class="icon-circle">
            <svg v-if="authMode === 'login'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          </div>
          <h2>{{ getTitle() }}</h2>
          <p class="subtitle">{{ getSubtitle() }}</p>
        </div>

        <form @submit.prevent="handleAuth" class="auth-form">
          
          <!-- ============================ -->
          <!-- STEP 1: PERSONAL INFO      -->
          <!-- ============================ -->
          <div v-if="authMode === 'signup' && signupStep === 1" class="step-container slide-in">
            
            <div class="input-group">
              <label>Full Name</label>
              <div class="input-wrapper">
                <input v-model="formData.fullName" type="text" placeholder="John Doe" required />
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            </div>

            <div class="input-group">
              <label>Contact Number</label>
              <div class="input-wrapper">
                <input v-model="formData.contactNumber" type="tel" placeholder="0912 345 6789" required />
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
            </div>

          </div>

          <!-- ============================ -->
          <!-- STEP 2 / LOGIN: CREDENTIALS  -->
          <!-- ============================ -->
          <div v-if="authMode === 'login' || (authMode === 'signup' && signupStep === 2)" class="step-container slide-in">
            
            <div class="input-group">
              <label>Email Address</label>
              <div class="input-wrapper">
                <input v-model="formData.email" type="email" placeholder="name@example.com" required />
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
            </div>

            <div class="input-group">
              <label>Password</label>
              <div class="input-wrapper">
                <input v-model="formData.password" type="password" placeholder="••••••••" required />
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>

            <!-- Confirm Password (Only for Signup Step 2) -->
            <div v-if="authMode === 'signup'" class="input-group">
              <label>Confirm Password</label>
              <div class="input-wrapper">
                <input v-model="formData.confirmPassword" type="password" placeholder="••••••••" required />
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
            </div>

          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- ACTIONS AREA -->
          <div class="actions-group">
            
            <!-- Button: Next (Signup Step 1) -->
            <button 
              v-if="authMode === 'signup' && signupStep === 1" 
              type="button" 
              class="submit-btn" 
              @click="nextStep"
            >
              Next Step
            </button>

            <!-- Button: Submit (Login OR Signup Step 2) -->
            <button 
              v-else 
              type="submit" 
              class="submit-btn" 
              :disabled="isLoading"
            >
              <span v-if="!isLoading">{{ authMode === 'login' ? 'Login' : 'Create Account' }}</span>
              <div v-else class="spinner"></div>
            </button>

            <!-- Button: Back (Signup Step 2 Only) -->
            <button 
              v-if="authMode === 'signup' && signupStep === 2" 
              type="button" 
              class="back-btn" 
              @click="prevStep"
            >
              Back
            </button>
          </div>

        </form>

        <div class="card-footer">
          <p v-if="authMode === 'login'">
            Don't have an account? 
            <a href="#" @click.prevent="switchMode('signup')">Sign up</a>
          </p>
          <p v-else>
            Already have an account? 
            <a href="#" @click.prevent="switchMode('login')">Login</a>
          </p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>2025 AI Vision Project. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Navbar from '@/components/navbar.vue';

const router = useRouter();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '/api';

// --- STATE ---
const authMode = ref('login'); 
const signupStep = ref(1); // 1 = Details, 2 = Credentials
const isLoading = ref(false);
const errorMessage = ref('');

const formData = reactive({
  email: '',
  password: '',
  fullName: '',
  contactNumber: '',
  confirmPassword: ''
});

// --- HELPER TEXT ---
const getTitle = () => {
  if (authMode.value === 'login') return 'Welcome Back';
  if (signupStep.value === 1) return 'Personal Details';
  return 'Security Setup';
};

const getSubtitle = () => {
  if (authMode.value === 'login') return 'Enter your credentials to access your account.';
  if (signupStep.value === 1) return 'Step 1 of 2: Let us know who you are.';
  return 'Step 2 of 2: Secure your account.';
};

// --- METHODS ---
const switchMode = (mode) => {
  authMode.value = mode;
  signupStep.value = 1; // Reset step when switching
  errorMessage.value = '';
  // Reset Form
  formData.email = '';
  formData.password = '';
  formData.fullName = '';
  formData.contactNumber = '';
  formData.confirmPassword = '';
};

// Validate Step 1 before moving to Step 2
const nextStep = () => {
  errorMessage.value = '';
  if (!formData.fullName.trim() || !formData.contactNumber.trim()) {
    errorMessage.value = "Please fill in your name and contact number.";
    return;
  }
  signupStep.value = 2;
};

// Go back to Step 1
const prevStep = () => {
  errorMessage.value = '';
  signupStep.value = 1;
};

const handleAuth = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // 1. Validation for Signup (Final Step)
    if (authMode.value === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }
    }

    const endpoint = authMode.value === 'login' ? '/login' : '/signup';
    
    // 2. Prepare Payload
    const payload = {
      email: formData.email,
      password: formData.password
    };

    if (authMode.value === 'signup') {
      payload.fullName = formData.fullName;
      payload.contactNumber = formData.contactNumber;
    }

    // 3. Send Request
    const response = await axios.post(`${BACKEND_URL}${endpoint}`, payload);

    if (authMode.value === 'signup') {
      authMode.value = 'login';
      signupStep.value = 1; // Reset
      alert('Account created! Please login.');
      formData.password = '';
      formData.confirmPassword = '';
    } else {
      const token = response.data.token;
      localStorage.setItem('havnet_token', token);
      window.dispatchEvent(new Event('auth-change'));
      router.push('/live-demo');
    }

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage.value = err.response.data.message;
    } else if (err.message) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = "Server error. Is the backend running?";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
/* --- VARIABLES --- */
$bg-dark: #050b14;
$bg-card: #0f172a;
$bg-input: rgba(255, 255, 255, 0.03);
$border-color: #334155;
$accent-blue: #3b82f6;
$text-main: #e2e8f0;
$text-muted: #94a3b8;
$error-color: #ef4444;

.page-container {
  background-color: $bg-dark;
  color: $text-main;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex; flex-direction: column;
}

/* Main Content */
.main-content {
  flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px;
}

/* Auth Card */
.auth-card {
  background-color: $bg-card;
  border: 1px solid $border-color;
  border-radius: 16px;
  width: 100%; max-width: 440px;
  padding: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.4s ease-out;

  .card-header {
    text-align: center; margin-bottom: 30px;
    .icon-circle {
      width: 60px; height: 60px; background: rgba(59, 130, 246, 0.1); color: $accent-blue;
      border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 15px auto;
    }
    h2 { font-size: 1.5rem; color: white; margin-bottom: 8px; }
    .subtitle { color: $text-muted; font-size: 0.9rem; line-height: 1.5; }
  }
}

/* Form Styles */
.auth-form { display: flex; flex-direction: column; gap: 16px; }

/* Animation container for switching steps */
.step-container {
  display: flex; flex-direction: column; gap: 16px;
}

.input-group {
  display: flex; flex-direction: column; gap: 8px;
  label { font-size: 0.9rem; font-weight: 500; color: $text-main; }
  .input-wrapper {
    position: relative;
    input {
      width: 100%; background: $bg-input; border: 1px solid $border-color; padding: 12px 12px 12px 40px;
      border-radius: 8px; color: white; font-size: 1rem; transition: all 0.2s;
      &:focus { outline: none; border-color: $accent-blue; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
      &::placeholder { color: #64748b; }
    }
    .input-icon {
      position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none;
    }
  }
}

/* Animations */
.slide-in { animation: fadeIn 0.4s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }

/* Error Banner */
.error-banner {
  background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: $error-color;
  padding: 12px; border-radius: 8px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;
}

/* Actions */
.actions-group {
  display: flex; flex-direction: column; gap: 10px; margin-top: 10px;
}

/* Submit Button */
.submit-btn {
  background: $accent-blue; color: white; border: none; padding: 14px; width: 100%;
  border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s;
  display: flex; justify-content: center; align-items: center;
  &:hover:not(:disabled) { background: darken($accent-blue, 10%); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
}

/* Back Button */
.back-btn {
  background: transparent; color: $text-muted; border: none; padding: 10px; width: 100%;
  font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: color 0.2s;
  &:hover { color: white; text-decoration: underline; }
}

.spinner { width: 20px; height: 20px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }

/* Footer Links */
.card-footer {
  text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid $border-color;
  p { color: $text-muted; font-size: 0.9rem; }
  a { color: $accent-blue; text-decoration: none; font-weight: 600; &:hover { text-decoration: underline; } }
}

.footer { text-align: center; padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; color: #475569; margin-top: auto; }

@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
</style>