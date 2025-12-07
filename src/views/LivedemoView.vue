<template>
  <div class="live-demo-container">
    <!-- Navigation Component -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content">
      
      <!-- Header -->
      <div class="page-header">
        <h1>Live Demo & Limitations</h1>
        <p>Experience our YOLOv8-seg model via Cloud API. Accurate detection for Humans, Animals, and Vehicles.</p>
      </div>

      <div class="split-layout">
        
        <!-- LEFT COLUMN: Camera Feed -->
        <div class="camera-section">
          <h2>Real-Time Object Detection</h2>
          
          <div ref="wrapperRef" class="video-wrapper">
            <!-- Video & Canvas -->
            <video ref="videoRef" autoplay muted playsinline class="video-feed" :class="{ hidden: !isCameraOn }"></video>
            <canvas ref="canvasRef" class="video-overlay" :class="{ hidden: !isCameraOn }"></canvas>

            <!-- 1. AVG CONFIDENCE BADGE -->
            <div v-if="isCameraOn && averageConfidence > 0" class="confidence-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>Avg Confidence: {{ Math.round(averageConfidence * 100) }}%</span>
            </div>

            <!-- 2. ANALYZING INDICATOR -->
            <div v-if="isCameraOn && isProcessing" class="status-badge">
              <div class="spinner"></div>
              <span>Analyzing...</span>
            </div>

            <!-- Placeholder State -->
            <div v-if="!isCameraOn" class="camera-placeholder">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 2l20 20"/>
                  <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4"/>
                  <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/>
                  <line x1="2" y1="2" x2="22" y2="22"/>
                </svg>
              </div>
              <h3>Camera is off</h3>
              <p>Grant permissions and click "Start Camera" to begin detection.</p>
            </div>
          </div>

          <p class="instruction-text">
            Detects: <strong>Human, Animal, Vehicle</strong> via Roboflow Cloud.
          </p>

          <div class="controls">
            <!-- UPDATED: Checks auth before opening instructions -->
            <button @click="handleStartClick" :disabled="isCameraOn" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              Start Camera
            </button>
            
            <button @click="stopCamera" :disabled="!isCameraOn" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6"/></svg>
              Stop
            </button>

             <button @click="toggleFullscreen" :disabled="!isCameraOn" class="btn btn-secondary" title="Fullscreen">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
          </div>
        </div>

        <!-- RIGHT COLUMN: Limitations -->
        <div class="limitations-section">
          <h2>Project Limitations</h2>
          <!-- Limitation Cards (Same as before) -->
          <div class="limitation-card">
            <div class="icon-box blue"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
            <div class="content"><h3>Limited Dataset Scope</h3><p>Trained specifically on Humans, common Animals, and Vehicles. Rare species may have lower confidence.</p></div>
          </div>
          <div class="limitation-card">
            <div class="icon-box purple"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg></div>
            <div class="content"><h3>Environmental Occlusion</h3><p>The model may still struggle with objects heavily obscured by window frames or dense foliage.</p></div>
          </div>
          <div class="limitation-card">
            <div class="icon-box blue-light"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5.523 4.477-10 10-10z"/><path d="M8.5 8.5v.01"/><path d="M16 16v.01"/><path d="M12 12v.01"/></svg></div>
            <div class="content"><h3>Cloud API Latency</h3><p>We use cloud processing for maximum accuracy. Frame rate depends on your internet connection speed.</p></div>
          </div>
           <div class="limitation-card">
            <div class="icon-box blue-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg></div>
            <div class="content"><h3>Lighting Conditions</h3><p>Extreme backlighting or very low-light scenarios can lead to false negatives.</p></div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- === 1. INSTRUCTION MODAL (Only shows if logged in) === -->
    <div v-if="showInstructionModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>How to Use the Live Camera Feature</h3>
          <button @click="closeModal" class="close-icon-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <p class="modal-subtitle">Follow these steps to ensure the best experience with our live detection model.</p>
        <div class="steps-list">
          <div class="step-item"><div class="step-number">1</div><div class="step-text"><h4>Allow Camera Access</h4><p>When prompted by your browser please grant permission to access your camera.</p></div></div>
          <div class="step-item"><div class="step-number">2</div><div class="step-text"><h4>Position Yourself</h4><p>Sit in a well-lit area and position your face or object clearly in the center of the camera view.</p></div></div>
          <div class="step-item"><div class="step-number">3</div><div class="step-text"><h4>Keep Objects in Frame</h4><p>For best results, ensure the object you want to be detected remains fully within the camera frame.</p></div></div>
        </div>
        <button @click="confirmStartCamera" class="modal-action-btn">Start Now</button>
      </div>
    </div>

    <!-- === 2. LOGIN REQUIRED MODAL (New) === -->
    <div v-if="showLoginPrompt" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Authentication Required</h3>
          <button @click="closeLoginPrompt" class="close-icon-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <p class="modal-subtitle">You must be logged in to use the Live Camera feature.</p>
        
        <div class="steps-list">
           <div class="step-item" style="align-items: center;">
             <div class="step-number" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
             </div>
             <div class="step-text">
               <h4>Account Needed</h4>
               <p>Please log in or create an account to access advanced AI detection features.</p>
             </div>
           </div>
        </div>

        <button @click="proceedToLogin" class="modal-action-btn">Login / Sign Up</button>
      </div>
    </div>

    <footer class="footer">
      <p>2025 AI Vision Project. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; 
import Navbar from '@/components/navbar.vue';

const router = useRouter();

// --- STATE ---
const isCameraOn = ref(false);
const isProcessing = ref(false); 
const averageConfidence = ref(0); 
const videoRef = ref(null);
const canvasRef = ref(null);
const wrapperRef = ref(null); 
const isLoggedIn = ref(false); 
let intervalId = null;

// --- SESSION RECORDING STATE ---
const sessionStartTime = ref(null);
const sessionTotalFrames = ref(0);
const sessionStatsMap = ref({}); 

// --- CONFIGURATION ---
const API_KEY = 'RPrtUyC2Xf54HEVlYY7J'; 
const MODEL_ENDPOINT = 'https://detect.roboflow.com/animal_vehicle_human_seg-t1sz5/1';
const BACKEND_URL = 'http://localhost:3000/api';

// --- MODALS STATE ---
const showInstructionModal = ref(false);
const showLoginPrompt = ref(false);

onMounted(() => {
  const token = localStorage.getItem('havnet_token') || localStorage.getItem('token');
  isLoggedIn.value = !!token;
});

// --- BUTTON LOGIC ---
const handleStartClick = () => {
  if (isLoggedIn.value) {
    showInstructionModal.value = true;
  } else {
    showLoginPrompt.value = true;
  }
};

const closeModal = () => { showInstructionModal.value = false; };
const closeLoginPrompt = () => { showLoginPrompt.value = false; };

const confirmStartCamera = () => { 
  closeModal(); 
  startCameraLogic(); 
};

const proceedToLogin = () => {
  showLoginPrompt.value = false;
  router.push('/login');
};

const toggleFullscreen = async () => {
  if (!wrapperRef.value) return;
  if (!document.fullscreenElement) {
    try { await wrapperRef.value.requestFullscreen(); } catch (err) { console.error(err); }
  } else {
    try { await document.exitFullscreen(); } catch (err) { console.error(err); }
  }
};

// --- CAMERA LOGIC ---
const startCameraLogic = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'user', 
        width: { ideal: 640 }, 
        height: { ideal: 480 } 
      },
      audio: false
    });
    
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      
      videoRef.value.onloadeddata = async () => {
        try { await videoRef.value.play(); } catch (e) { console.error(e); }

        const w = videoRef.value.videoWidth;
        const h = videoRef.value.videoHeight;
        
        // 1. Set Internal Resolution
        videoRef.value.width = w;
        videoRef.value.height = h;
        canvasRef.value.width = w;
        canvasRef.value.height = h;

        // 2. Fix Aspect Ratio Visuals (Prevents drifting boxes)
        if(wrapperRef.value) {
           wrapperRef.value.style.aspectRatio = `${w}/${h}`;
        }

        // RESET SESSION DATA
        sessionStartTime.value = new Date();
        sessionStatsMap.value = {}; 
        sessionTotalFrames.value = 0;

        isCameraOn.value = true;
        
        // Faster Interval for smoother tracking (300ms)
        intervalId = setInterval(captureAndDetect, 300); 
      };
    }
  } catch (err) {
    console.error("Camera denied:", err);
    alert("Could not access camera. Please check permissions.");
  }
};

const stopCamera = async () => {
  if (intervalId) clearInterval(intervalId);
  isProcessing.value = false;
  
  // Save before clearing
  if (isCameraOn.value && sessionStartTime.value) {
    await saveSessionToBackend();
  }

  isCameraOn.value = false;
  averageConfidence.value = 0; 
  
  if (videoRef.value && videoRef.value.srcObject) {
    const tracks = videoRef.value.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.value.srcObject = null;
  }
  
  const ctx = canvasRef.value?.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
};

// --- BACKEND SAVE FUNCTION ---
const saveSessionToBackend = async () => {
  const token = localStorage.getItem('havnet_token') || localStorage.getItem('token');
  if (!token) return;

  const endTime = new Date();
  const durationMs = endTime - sessionStartTime.value;
  
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const durationStr = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} seconds`;

  const dateStr = sessionStartTime.value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = sessionStartTime.value.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  // Calculate Stats
  const rawStats = sessionStatsMap.value;
  const detectedItems = Object.keys(rawStats);
  let totalConfidenceSum = 0;
  let totalCountSum = 0;
  
  const classStats = detectedItems.map(key => {
    const data = rawStats[key];
    totalConfidenceSum += data.totalConf;
    totalCountSum += data.count;
    return {
      className: key,
      count: data.count,
      avgConfidence: (data.totalConf / data.count) * 100 
    };
  });

  const overallConfidence = totalCountSum > 0 ? (totalConfidenceSum / totalCountSum) * 100 : 0;

  const payload = {
    date: dateStr,
    startTime: timeStr,
    duration: durationStr,
    status: 'Completed',
    detectionsCount: sessionTotalFrames.value, 
    detectedItems: detectedItems,
    overallConfidence: overallConfidence,
    classStats: classStats
  };

  try {
    await axios.post(`${BACKEND_URL}/history`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Session Saved");
  } catch (error) {
    console.error("❌ Failed to save session:", error);
  }
};

// --- API LOOP ---
const captureAndDetect = async () => {
  if (!isCameraOn.value || !videoRef.value || !canvasRef.value || isProcessing.value) return;

  isProcessing.value = true;

  try {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = videoRef.value.videoWidth;
    tempCanvas.height = videoRef.value.videoHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(videoRef.value, 0, 0);

    const imageBase64 = tempCanvas.toDataURL('image/jpeg', 0.6).split(',')[1]; // Lower quality slightly for speed

    const response = await axios({
        method: 'POST',
        url: MODEL_ENDPOINT,
        params: { api_key: API_KEY },
        data: imageBase64,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const predictions = response.data.predictions;
    
    // UPDATE SESSION STATS
    if (predictions.length > 0) {
      const total = predictions.reduce((acc, curr) => acc + curr.confidence, 0);
      averageConfidence.value = total / predictions.length;
      
      sessionTotalFrames.value += predictions.length;

      predictions.forEach(p => {
        const cls = p.class;
        if (!sessionStatsMap.value[cls]) {
          sessionStatsMap.value[cls] = { count: 0, totalConf: 0 };
        }
        sessionStatsMap.value[cls].count += 1;
        sessionStatsMap.value[cls].totalConf += p.confidence;
      });
    } else {
      averageConfidence.value = 0;
    }

    drawPredictions(predictions);

  } catch (error) {
    console.warn("API Error:", error);
  } finally {
    isProcessing.value = false;
  }
};

const drawPredictions = (predictions) => {
  if (!canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  const w = canvasRef.value.width;
  const h = canvasRef.value.height;

  ctx.clearRect(0, 0, w, h);

  predictions.forEach(pred => {
    const { class: classLabel, confidence, width: boxWidth, height: boxHeight, x: centerX, y: centerY } = pred;

    const boxX = centerX - (boxWidth / 2);
    const boxY = centerY - (boxHeight / 2);

    // === MIRROR FIX ===
    const mirroredX = w - boxX - boxWidth;
    const color = getBoxColor(classLabel);

    // 1. Draw Segmentation (Filled Mask)
    if (pred.points && pred.points.length > 0) {
      // Increased opacity to 0.4 for better visibility
      ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', ', 0.4)'); 
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(w - pred.points[0].x, pred.points[0].y); // Mirror Point
      for (let i = 1; i < pred.points.length; i++) {
        ctx.lineTo(w - pred.points[i].x, pred.points[i].y); // Mirror Points
      }
      ctx.closePath();
      ctx.fill(); 
      ctx.stroke(); 
    }

    // 2. Draw Bounding Box
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(mirroredX, boxY, boxWidth, boxHeight);

    // 3. Draw Label Background
    const text = `${classLabel} ${Math.round(confidence * 100)}%`;
    ctx.font = "bold 16px Inter";
    const tw = ctx.measureText(text).width;
    
    ctx.fillStyle = color;
    ctx.fillRect(mirroredX, boxY - 30, tw + 20, 30); // Larger background

    // 4. Draw Label Text
    ctx.fillStyle = "white";
    ctx.fillText(text, mirroredX + 10, boxY - 9);
  });
};

const getBoxColor = (className) => {
  const c = String(className).toLowerCase();
  if (c.includes('human') || c.includes('person')) return 'rgb(59, 130, 246)'; // Blue
  if (c.includes('vehicle') || c.includes('car')) return 'rgb(34, 197, 94)';   // Green
  if (c.includes('animal') || c.includes('dog') || c.includes('cat')) return 'rgb(234, 179, 8)'; // Yellow
  return 'rgb(239, 68, 68)'; // Red
};

onUnmounted(() => {
  stopCamera();
});
</script>

<style lang="scss" scoped>
/* --- THEME VARIABLES --- */
$bg-dark: #050b14;
$bg-card: #0f172a;
$bg-card-hover: #1e293b;
$accent-blue: #3b82f6;
$text-main: #e2e8f0;
$text-muted: #94a3b8;

.live-demo-container {
  background-color: $bg-dark;
  color: $text-main;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

/* Navbar handled by Component */

/* Main Content */
.main-content {
  flex: 1; padding: 40px 5%; max-width: 1400px; margin: 0 auto; width: 100%;
}

.page-header {
  text-align: center; margin-bottom: 40px;
  h1 { font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 10px; }
  p { color: $text-muted; }
}

.split-layout {
  display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px;
}

/* --- LEFT: CAMERA SECTION --- */
.camera-section {
  h2 { font-size: 1.25rem; margin-bottom: 15px; color: $text-main; }

  .video-wrapper {
    width: 100%; aspect-ratio: 16/9; background-color: #000; border-radius: 12px; overflow: hidden; position: relative; border: 1px solid #334155;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);

    /* Fullscreen Mode Override */
    &:fullscreen {
      width: 100vw; height: 100vh; border-radius: 0; border: none; display: flex; align-items: center; justify-content: center; background: black;
      .video-feed, .video-overlay { width: auto; height: 100%; aspect-ratio: 4/3; }
      .status-badge { top: 20px; right: 20px; font-size: 1rem; padding: 8px 16px; }
      .confidence-badge { top: 20px; left: 20px; font-size: 1rem; padding: 8px 16px; }
    }

    .video-feed {
      width: 100%; height: 100%; object-fit: cover;
      transform: scaleX(-1); /* Mirror Effect */
    }

    .video-overlay {
      width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none;
    }

    /* Analyzing Indicator */
    .status-badge {
      position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px);
      padding: 6px 12px; border-radius: 20px; display: flex; align-items: center; gap: 8px;
      font-size: 0.85rem; color: #fff; font-weight: 500; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;
      .spinner { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
    }

    /* Avg Confidence Badge */
    .confidence-badge {
      position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px);
      padding: 6px 12px; border-radius: 20px; display: flex; align-items: center; gap: 8px;
      font-size: 0.85rem; color: #fff; font-weight: 500; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;
      .icon { color: $accent-blue; }
    }

    .camera-placeholder {
      width: 100%; height: 100%; position: absolute; top: 0; left: 0;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(5,11,20,0.95)), url('@/assets/img/logo.png');
      background-size: cover;
      
      .icon-circle {
        background: rgba(255,255,255,0.05); padding: 20px; border-radius: 50%; margin-bottom: 20px; color: $text-muted;
      }
      h3 { color: white; font-size: 1.2rem; margin-bottom: 8px; }
      p { color: $text-muted; font-size: 0.9rem; }
    }
  }

  .instruction-text {
    margin-top: 15px; color: $text-muted; font-size: 0.85rem; text-align: center;
    strong { color: $accent-blue; }
  }

  .controls {
    margin-top: 25px; display: flex; justify-content: center; gap: 15px;
    .btn {
      display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; transition: all 0.2s;
      &:disabled { opacity: 0.5; cursor: not-allowed; }
      &.btn-primary { background-color: $accent-blue; color: white; &:hover:not(:disabled) { background-color: darken($accent-blue, 10%); } }
      &.btn-secondary { background-color: #334155; color: white; &:hover:not(:disabled) { background-color: #475569; } }
    }
  }
}

/* --- RIGHT: LIMITATIONS SECTION --- */
.limitations-section {
  h2 { font-size: 1.25rem; margin-bottom: 15px; color: $text-main; }
  
  .limitation-card {
    background-color: $bg-card; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 15px; display: flex; gap: 15px;
    transition: transform 0.2s;
    &:hover { background-color: $bg-card-hover; border-color: $accent-blue; }

    .icon-box {
      width: 40px; height: 40px; border-radius: 8px; display: flex; justify-content: center; align-items: center; flex-shrink: 0;
      &.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
      &.purple { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
      &.blue-light { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; }
      &.blue-dark { background: rgba(30, 64, 175, 0.1); color: #60a5fa; }
    }
    .content {
      h3 { font-size: 1rem; color: #fff; margin-bottom: 5px; }
      p { font-size: 0.85rem; color: $text-muted; line-height: 1.4; }
    }
  }
}

/* --- MODAL SHARED STYLES --- */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
  z-index: 9999; display: flex; justify-content: center; align-items: center; padding: 20px;
}
.modal-content {
  background: #0f172a; /* Dark Blue/Slate */
  border: 1px solid #334155;
  width: 100%; max-width: 500px;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;
  h3 { color: white; font-size: 1.5rem; font-weight: 700; margin: 0; line-height: 1.2; }
  .close-icon-btn { 
    background: none; border: none; color: $text-muted; cursor: pointer; padding: 0;
    &:hover { color: white; }
  }
}

.modal-subtitle {
  color: $text-muted; font-size: 0.95rem; margin-bottom: 25px; line-height: 1.5;
}

.steps-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }

.step-item {
  display: flex; gap: 15px; align-items: flex-start;
  .step-number { 
    width: 32px; height: 32px; 
    background: rgba(59,130,246,0.2); color: $accent-blue; 
    border-radius: 50%; display: flex; justify-content: center; align-items: center; 
    font-weight: 700; flex-shrink: 0; font-size: 0.9rem;
  }
  .step-text h4 { color: white; margin-bottom: 4px; font-size: 1rem; font-weight: 600; }
  .step-text p { color: $text-muted; font-size: 0.9rem; margin: 0; line-height: 1.4; }
}

.modal-action-btn { 
  width: 100%; background: $accent-blue; color: white; border: none; 
  padding: 14px; border-radius: 8px; font-weight: 600; font-size: 1rem;
  cursor: pointer; transition: 0.2s; 
  &:hover { background: darken($accent-blue, 10%); } 
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }

.hidden { display: none !important; }
.footer { text-align: center; padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; color: #475569; }

/* Responsive */
@media (max-width: 900px) { .split-layout { grid-template-columns: 1fr; } }
</style>