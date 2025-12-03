<template>
  <div class="live-demo-container">
    <!-- Navigation (Reused) -->
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="HAV-Net Logo" class="logo-img" />
        <span>HAV - Net</span>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/live-demo" class="active">Live Demo</router-link>
        <router-link to="/history">History</router-link>
        <router-link to="/about">About Us</router-link>
      </div>
      <button class="login-btn">Login</button>
    </nav>

    <!-- Main Content Grid -->
    <main class="main-content">
      
      <!-- Header -->
      <div class="page-header">
        <h1>Live Demo & Limitations</h1>
        <p>Experience our YOLOv8-seg model in real-time. Please review the operational constraints below.</p>
      </div>

      <div class="split-layout">
        
        <!-- LEFT COLUMN: Camera Feed -->
        <div class="camera-section">
          <h2>Real-Time Object Detection</h2>
          
          <div class="video-wrapper">
            <!-- Actual Video Element -->
            <video ref="videoRef" autoplay muted playsinline class="video-feed" :class="{ hidden: !isCameraOn }"></video>
            <!-- Canvas for Drawing Boxes -->
            <canvas ref="canvasRef" class="video-overlay" :class="{ hidden: !isCameraOn }"></canvas>

            <!-- Placeholder State (When Camera is Off) -->
            <div v-if="!isCameraOn" class="camera-placeholder">
              <div class="icon-circle">
                <!-- Simple SVG Camera Off Icon -->
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
            Detects: <strong>Human, Animal, Vehicle</strong>. Best used in well-lit environments.
          </p>

          <div class="controls">
            <!-- UPDATED: Clicking this now opens the instructions modal first -->
            <button @click="openInstructions" :disabled="isCameraOn" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              Start Camera
            </button>
            <button @click="stopCamera" :disabled="!isCameraOn" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6"/></svg>
              Stop Camera
            </button>
          </div>
        </div>

        <!-- RIGHT COLUMN: Limitations (Based on PDF) -->
        <div class="limitations-section">
          <h2>Project Limitations</h2>
          
          <div class="limitation-card">
            <div class="icon-box blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <div class="content">
              <h3>Limited Dataset Scope</h3>
              <p>
                Trained specifically on general Humans, common Animals (dogs, elephants, chickens), and Vehicles. 
                Rare species or unusual vehicle types may have lower confidence scores.
              </p>
            </div>
          </div>

          <div class="limitation-card">
            <div class="icon-box purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
            </div>
            <div class="content">
              <h3>Environmental Occlusion</h3>
              <p>
                While improved via fine-tuning (Activity 9), the model may still struggle with objects 
                heavily obscured by window frames or dense foliage.
              </p>
            </div>
          </div>

          <div class="limitation-card">
            <div class="icon-box blue-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5.523 4.477-10 10-10z"/><path d="M8.5 8.5v.01"/><path d="M16 16v.01"/><path d="M12 12v.01"/></svg>
            </div>
            <div class="content">
              <h3>Web Browser Resources</h3>
              <p>
                Performance depends on client hardware (GPU/CPU acceleration). Older devices 
                may experience lower FPS compared to the native Python environment.
              </p>
            </div>
          </div>

           <div class="limitation-card">
            <div class="icon-box blue-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
            </div>
            <div class="content">
              <h3>Lighting Conditions</h3>
              <p>
                Extreme backlighting or very low-light scenarios can lead to false negatives, 
                despite our efforts to include shadowed training data.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
    
    <!-- === INSTRUCTION MODAL (Initially Hidden) === -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>How to Use the Live Camera Feature</h3>
          <button @click="closeModal" class="close-icon-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <p class="modal-subtitle">Follow these steps to ensure the best experience with our live detection model.</p>
        
        <div class="steps-list">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-text">
              <h4>Allow Camera Access</h4>
              <p>When prompted by your browser please grant permission to access your camera.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-text">
              <h4>Position Yourself</h4>
              <p>Sit in a well-lit area and position your face or object clearly in the center of the camera view.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-text">
              <h4>Keep Objects in Frame</h4>
              <p>For best results, ensure the object you want to be detected remains fully within the camera frame.</p>
            </div>
          </div>
        </div>
        
        <!-- This button actually triggers the camera -->
        <button @click="confirmStartCamera" class="modal-action-btn">Start Now</button>
      </div>
    </div>
    <!-- === END MODAL === -->

    <footer class="footer">
      <p>2025 AI Vision Project. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

// --- STATE ---
const isCameraOn = ref(false);
const videoRef = ref(null);
const canvasRef = ref(null);
let model = null;
let animationId = null;

// --- MODAL STATE ---
const showModal = ref(false);
const openInstructions = () => { showModal.value = true; };
const closeModal = () => { showModal.value = false; };
const confirmStartCamera = () => { closeModal(); startCameraLogic(); };

// --- CONFIGURATION ---
const PUBLISHABLE_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY; 
const MODEL_ID = import.meta.env.VITE_ROBOFLOW_MODEL_ID; 
const MODEL_VERSION = import.meta.env.VITE_ROBOFLOW_VERSION;

// --- HELPER: Wait for External Script ---
const waitForRoboflow = async () => {
  let attempts = 0;
  // Check every 100ms, up to 50 times (5 seconds total)
  while (!window.roboflow && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  return window.roboflow;
};

// --- LOAD ROBOFLOW MODEL ---
const loadModel = async () => {
  console.log(`Attempting to load: ${MODEL_ID} v${MODEL_VERSION}`);

  // 1. Wait for the library to be available
  const rf = await waitForRoboflow();

  if (rf) {
    try {
      // 2. Load the model
      model = await rf
        .auth({ publishable_key: PUBLISHABLE_KEY })
        .load({ model: MODEL_ID, version: MODEL_VERSION });
        
      console.log("✅ Roboflow Model Loaded Successfully");
      return true;
    } catch (err) {
      console.error("❌ Error loading model:", err);
      alert("Error loading model. Check API Key and Model ID.");
      return false;
    }
  } else {
    console.error("❌ Roboflow.js library never loaded.");
    alert("Could not load the AI Engine. Please refresh the page.");
    return false;
  }
};

// --- CAMERA LOGIC ---
const startCameraLogic = async () => {
  // 1. Load Model if not loaded
  if (!model) {
    const success = await loadModel();
    if (!success) return; // Stop if model failed
  }

  // 2. Access Webcam
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
      
      // Wait for video data to load to set canvas size
      videoRef.value.onloadedmetadata = () => {
        if(canvasRef.value && videoRef.value) {
           canvasRef.value.width = videoRef.value.videoWidth;
           canvasRef.value.height = videoRef.value.videoHeight;
        }
        isCameraOn.value = true;
        // Start playing the video explicitly (needed for some browsers)
        videoRef.value.play().catch(e => console.error("Play error", e));
        detectFrame(); // Start Loop
      };
    }
  } catch (err) {
    console.error("Camera access denied:", err);
    alert("Could not access camera. Please check permissions.");
  }
};

const stopCamera = () => {
  isCameraOn.value = false;
  
  // Stop detection loop
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  // Stop Video Stream
  if (videoRef.value && videoRef.value.srcObject) {
    const tracks = videoRef.value.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.value.srcObject = null;
  }
  
  // Clear Canvas
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  }
};

// --- DETECTION LOOP ---
const detectFrame = async () => {
  // Safety Checks
  if (!isCameraOn.value || !model || !videoRef.value || !canvasRef.value) return;
  if (videoRef.value.paused || videoRef.value.ended) return;

  try {
    // 3. Detect
    const predictions = await model.detect(videoRef.value);
    
    // 4. Draw
    const ctx = canvasRef.value.getContext('2d');
    // Clear previous drawings
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    
    predictions.forEach(pred => {
      // --- MIRRORING CALCULATIONS ---
      // Because the video is CSS mirrored (transform: scaleX(-1)), 
      // we must flip the X coordinates for the canvas drawing to match the visual.
      const x = canvasRef.value.width - pred.bbox.x - (pred.bbox.width / 2);
      const y = pred.bbox.y - (pred.bbox.height / 2);
      
      // Draw Box
      ctx.strokeStyle = getBoxColor(pred.class);
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, pred.bbox.width, pred.bbox.height);
      
      // Draw Label Background
      const text = `${pred.class} ${Math.round(pred.confidence * 100)}%`;
      const textWidth = ctx.measureText(text).width;
      
      ctx.fillStyle = getBoxColor(pred.class);
      ctx.fillRect(x, y - 25, textWidth + 10, 25);
      
      // Draw Label Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.fillText(text, x + 5, y - 7);
      
      // Draw Segmentation Mask (Mirrored)
      if (pred.points && pred.points.length > 0) {
        ctx.fillStyle = getBoxColor(pred.class).replace('rgb', 'rgba').replace(')', ', 0.3)'); 
        ctx.beginPath();
        
        // Mirror the first point
        ctx.moveTo(canvasRef.value.width - pred.points[0].x, pred.points[0].y);
        
        // Mirror subsequent points
        for (let i = 1; i < pred.points.length; i++) {
            ctx.lineTo(canvasRef.value.width - pred.points[i].x, pred.points[i].y);
        }
        ctx.closePath();
        ctx.fill(); 
        ctx.strokeStyle = getBoxColor(pred.class);
        ctx.stroke(); 
      }
    });
    
    animationId = requestAnimationFrame(detectFrame);
  } catch (err) {
    console.warn("Detection warning (frame skipped):", err);
    animationId = requestAnimationFrame(detectFrame); 
  }
};

const getBoxColor = (className) => {
  // Use distinct colors for your specific classes
  if (className === 'human' || className === 'person') return '#3b82f6'; // Blue
  if (className === 'vehicle' || className === 'car') return '#22c55e'; // Green
  if (className === 'animal' || className === 'dog') return '#eab308'; // Yellow
  return '#ef4444'; // Red (default)
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

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  height: 70px;
  background-color: rgba(5, 11, 20, 0.95);
  border-bottom: 1px solid rgba(255,255,255,0.1);

  .logo { display: flex; align-items: center; font-weight: 700; color: #fff; gap: 10px; }
  .logo-img { height: 24px; }
  .nav-links a { 
    color: $text-muted; 
    margin: 0 15px; 
    text-decoration: none; 
    font-size: 0.9rem;
    &.active, &:hover { color: $accent-blue; }
  }
  .login-btn { background: $accent-blue; color: white; border: none; padding: 6px 16px; border-radius: 4px; font-weight: 600; }
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px 5%;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  h1 { font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 10px; }
  p { color: $text-muted; }
}

.split-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
}

/* --- LEFT: CAMERA SECTION --- */
.camera-section {
  h2 { font-size: 1.25rem; margin-bottom: 15px; color: $text-main; }

  .video-wrapper {
    width: 100%;
    aspect-ratio: 16/9;
    background-color: #000;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    border: 1px solid #334155;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);

    .video-feed {
      width: 100%; 
      height: 100%; 
      object-fit: cover;
      /* === MIRROR FIX === */
      transform: scaleX(-1);
    }

    .video-overlay {
      width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none;
    }

    .camera-placeholder {
      width: 100%; height: 100%; position: absolute; top: 0; left: 0;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(5,11,20,0.9)), url('@/assets/img/logo.png');
      background-size: cover;
      
      .icon-circle {
        background: rgba(255,255,255,0.05);
        padding: 20px;
        border-radius: 50%;
        margin-bottom: 20px;
        color: $text-muted;
      }
      h3 { color: white; font-size: 1.2rem; margin-bottom: 8px; }
      p { color: $text-muted; font-size: 0.9rem; }
    }
  }

  .instruction-text {
    margin-top: 15px;
    color: $text-muted;
    font-size: 0.85rem;
    text-align: center;
    strong { color: $accent-blue; }
  }

  .controls {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    gap: 20px;

    .btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 6px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      
      &:disabled { opacity: 0.5; cursor: not-allowed; }

      &.btn-primary {
        background-color: $accent-blue;
        color: white;
        &:hover:not(:disabled) { background-color: darken($accent-blue, 10%); }
      }

      &.btn-secondary {
        background-color: #334155;
        color: white;
        &:hover:not(:disabled) { background-color: #475569; }
      }
    }
  }
}

/* --- RIGHT: LIMITATIONS SECTION --- */
.limitations-section {
  h2 { font-size: 1.25rem; margin-bottom: 15px; color: $text-main; }
  
  .limitation-card {
    background-color: $bg-card;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
    display: flex;
    gap: 15px;
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

/* --- MODAL STYLES (NEW) --- */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modal-content {
  background-color: #0f172a; /* Dark Card Background */
  border: 1px solid #334155;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;

  h3 {
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .close-icon-btn {
    background: none;
    border: none;
    color: $text-muted;
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: white; }
  }
}

.modal-subtitle {
  color: $text-muted;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.step-item {
  display: flex;
  gap: 15px;
  
  .step-number {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background-color: rgba(59, 130, 246, 0.2);
    color: $accent-blue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .step-text {
    h4 {
      color: #e2e8f0;
      font-size: 1rem;
      margin-bottom: 4px;
      font-weight: 600;
    }
    p {
      color: $text-muted;
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }
}

.modal-action-btn {
  width: 100%;
  background-color: $accent-blue;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: darken($accent-blue, 10%);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.05);
  font-size: 0.8rem;
  color: #475569;
}

.hidden { display: none !important; }

/* Responsive */
@media (max-width: 900px) {
  .split-layout { grid-template-columns: 1fr; }
  .video-wrapper { aspect-ratio: 4/3; }
}
</style>