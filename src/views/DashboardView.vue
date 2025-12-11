<template>
  <div class="dashboard-container">
    <!-- Navigation Bar Component -->
    <Navbar />

    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content">
        <h1>Real-Time Object Detection Engine</h1>
        <p class="subtitle">
          Powered by <strong>YOLOv8-seg</strong>. A custom-trained Instance Segmentation model 
          fine-tuned to detect, recognize, and segment <strong>Humans, Animals, and Vehicles</strong> 
          in complex real-world environments.
        </p>
        <div class="cta-group">
          <router-link to="/live-demo" class="primary-btn" style="text-decoration: none;">Launch Live Camera</router-link>
          <button class="secondary-btn" @click="openDocs">View Documentation</button>
        </div>
      </div>

      <div class="hero-image-container">
        <img 
          src="../assets/img/bounding-box.jpg" 
          alt="AI Object Detection Visual" 
          class="hero-img"
        />
      </div>
    </header>

    <!-- Main Content Wrapper -->
    <section class="details-section">
      
      <!-- 1. Methodology Text -->
      <div class="text-block">
        <h2>Training Data & Methodology</h2>
        <p>
          Our model has been rigorously trained on a curated dataset containing diverse instances of 
          humans, animals, and vehicles. To ensure robustness, we implemented a 
          <strong>Feedback Loop</strong> mechanism (Fine-Tuning), specifically addressing:
        </p>
        <ul class="feature-list">
          <li><strong>Occlusions:</strong> Detecting subjects partially hidden by windows or frames (e.g., <em>human-erl.jfif</em>).</li>
          <li><strong>Pose Variation:</strong> Recognizing reclining/sleeping humans previously misclassified as animals.</li>
          <li><strong>Scale Diversity:</strong> Identifying large industrial vehicles (buses/trucks) alongside standard cars.</li>
        </ul>
      </div>

      <!-- 2. Training Configuration & Performance (NEW SECTION) -->
      <div class="training-container">
        <h2 class="section-title">Training Configuration & Performance</h2>
        
        <div class="training-grid">
          <!-- Left Card: Specs -->
          <div class="info-card">
            <div class="card-header">
              <span class="icon">💾</span>
              <h3>Training Specs & Data</h3>
            </div>
            
            <div class="spec-list">
              <div class="spec-row">
                <span class="label">Dataset Size:</span>
                <span class="value">2,676 Annotated Images</span>
              </div>
              <div class="spec-row">
                <span class="label">Data Source:</span>
                <span class="value">Phone Camera (Real-world) & Web Scraping</span>
              </div>
              <div class="spec-row">
                <span class="label">Annotation Method:</span>
                <span class="value">Precise Polygon Masks (Instance Seg)</span>
              </div>
              <div class="spec-row">
                <span class="label">Training Epochs:</span>
                <span class="value">100 (with Periodic Fine-Tuning)</span>
              </div>
              <div class="spec-row">
                <span class="label">Strategy:</span>
                <span class="value">Dynamic Feedback Loop & Augmentation</span>
              </div>
            </div>
          </div>

          <!-- Right Card: Findings -->
          <div class="info-card">
            <div class="card-header">
              <span class="icon">📊</span>
              <h3>Findings & Challenges</h3>
            </div>

            <div class="challenge-content">
              <div class="finding-item">
                <h4>🏆 Success Metric:</h4>
                <p>
                  Model achieved stable training with Box Loss < 0.025 and <strong>mAP@50 of 99.5%</strong>, 
                  producing tight and accurate segmentation masks even in complex backgrounds.
                </p>
              </div>

              <div class="finding-item">
                <h4>⚠️ Main Challenge:</h4>
                <p>
                  Early versions displayed class confusion due to loose bounding boxes capturing excessive 
                  background noise, leading the model to misinterpret green textures as vehicle characteristics.
                </p>
              </div>

              <div class="finding-item">
                <h4>✅ Resolution:</h4>
                <p>
                  Integrated an active learning pipeline where mispredictions were surfaced, re-labeled, 
                  and iteratively introduced into training, improving robustness against occlusion and edge-cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Real-World Applications -->
      <div class="applications-container">
        <div class="section-header centered-header">
          <h2>Real-World Applications</h2>
          <p>Practical scenarios where our model ensures safety and automation.</p>
        </div>

        <!-- 2x2 Grid Layout -->
        <div class="cards-grid">
          
          <!-- App 1: ADAS -->
          <div class="card">
            <div class="card-image traffic-bg"></div>
            <div class="card-content">
              <h3>Autonomous Driving (ADAS)</h3>
              <p>Enables self-driving systems to react appropriately by distinguishing between vehicles (predictable), humans (unpredictable), and animals (darting hazards).</p>
            </div>
          </div>

          <!-- App 2: Smart Home -->
          <div class="card">
            <div class="card-image security-bg"></div>
            <div class="card-content">
              <h3>Smart Home Security</h3>
              <p>Filters out false alarms from swaying trees or passing cars. Specifically targets human intruders while ignoring harmless pets in the driveway.</p>
            </div>
          </div>

          <!-- App 3: Construction -->
          <div class="card">
            <div class="card-image construction-bg"></div>
            <div class="card-content">
              <h3>Construction Site Safety</h3>
              <p>Monitors danger zones around heavy machinery. Triggers alarms if a human is detected in a "blind spot" near a backing-up dump truck.</p>
            </div>
          </div>

          <!-- App 4: Wildlife -->
          <div class="card">
            <div class="card-image wildlife-bg"></div>
            <div class="card-content">
              <h3>Highway Wildlife Preservation</h3>
              <p>Monitors rural highways to detect animals entering the roadway, triggering digital warning signs for drivers to prevent collisions.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/navbar.vue'; 
import Footer from '@/components/footer.vue'; 

const openDocs = () => {
  const url = 'https://drive.google.com/drive/folders/13iVmLivEO-eSfPG1EIaT00ixjphyrrZu?fbclid=IwY2xjawOJUcJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEeIApEnYGDaZzHnCxFn0HDHeG8avFTGJUYPwuRbO9-wPE6G3VGwjgxORZXft8_aem_5o33MIgr5haprF0syClO8g';
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped>
/* Variables */
$bg-color: #050b14;
$text-color: #e2e8f0;
$accent-color: #3b82f6;
$card-bg: #0f172a;
$card-border: #1e293b;

.dashboard-container {
  background-color: $bg-color;
  color: $text-color;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* --- HERO SECTION --- */
.hero {
  display: flex;
  align-items: center; 
  justify-content: space-between;
  gap: 40px; 
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 5% 60px;

  .hero-content {
    flex: 1; 
    max-width: 650px;

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 20px;
      background: linear-gradient(to right, #fff, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 40px;
    }

    .cta-group {
      display: flex;
      gap: 15px;

      .primary-btn {
        background-color: $accent-color;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
        &:hover { transform: translateY(-2px); }
      }

      .secondary-btn {
        background-color: transparent;
        color: $text-color;
        border: 1px solid #334155;
        padding: 12px 30px;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        &:hover { border-color: $text-color; }
      }
    }
  }

  .hero-image-container {
    flex: 1; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    .hero-img {
      max-width: 100%;
      height: auto;
      max-height: 450px; 
      object-fit: contain;
      filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.2));
      animation: float 6s ease-in-out infinite;
    }
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

/* --- DETAILS SECTION --- */
.details-section {
  padding: 40px 0 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 5%;
  margin-bottom: 40px;

  /* Methodology Text Block */
  .text-block {
    margin-bottom: 60px; 
    h2 { 
      font-size: 1.5rem; 
      color: #64748b; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      margin-bottom: 20px; 
    }
    p { 
      color: #94a3b8; 
      max-width: 700px; 
      margin-bottom: 20px; 
    }
    .feature-list {
      list-style: none; 
      padding: 0;
      li { 
        margin-bottom: 10px; 
        color: #cbd5e1; 
        &::before { 
          content: "•"; 
          color: $accent-color; 
          font-weight: bold; 
          display: inline-block; 
          width: 1em; 
        } 
      }
    }
  }

  /* --- NEW TRAINING CONFIGURATION SECTION --- */
  .training-container {
    margin-bottom: 80px;

    .section-title {
      font-size: 2rem;
      color: white;
      margin-bottom: 30px;
      font-weight: 700;
    }

    .training-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;

      .info-card {
        background-color: #0b1121; /* Darker card bg */
        border: 1px solid #1e293b;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 15px;

          .icon { font-size: 1.5rem; }
          h3 { font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin: 0; }
        }

        /* Specs Styling */
        .spec-list {
          .spec-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #1e293b;
            &:last-child { border-bottom: none; }

            .label { color: #94a3b8; }
            .value { color: #e2e8f0; font-weight: 600; text-align: right; }
          }
        }

        /* Findings Styling */
        .challenge-content {
          .finding-item {
            margin-bottom: 20px;
            &:last-child { margin-bottom: 0; }

            h4 {
              font-size: 1rem;
              color: #e2e8f0;
              margin-bottom: 5px;
            }
            p {
              font-size: 0.9rem;
              color: #94a3b8;
              line-height: 1.5;
              margin: 0;
            }
          }
        }
      }
    }
  }

  /* --- APPLICATIONS SECTION --- */
  .applications-container {
    .centered-header {
      text-align: center;
      margin-bottom: 40px;
      
      h2 {
        font-size: 2.2rem;
        color: white;
        margin-bottom: 10px;
        font-weight: 700;
      }
      p {
        color: #94a3b8;
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }

    /* 2x2 Grid Layout */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Enforces 2 columns */
      gap: 30px;

      .card {
        background-color: $card-bg;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid $card-border;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); 
          border-color: $accent-color; 
        }

        .card-image {
          height: 220px; 
          background-size: cover;
          background-position: center;
          background-color: #334155;

          &.construction-bg { background-image: url('../assets/img/construction.jfif'); }
          &.security-bg { background-image: url('../assets/img/smart-cctv.jfif'); }
          &.traffic-bg { background-image: url('../assets/img/earth-night.jfif'); }
          &.wildlife-bg { background-image: url('../assets/img/highway-wildlife.jfif'); } 
        }

        .card-content {
          padding: 25px;
          flex-grow: 1; 

          h3 { font-size: 1.4rem; margin-bottom: 12px; color: white; }
          p { font-size: 0.95rem; color: #94a3b8; line-height: 1.6; }
        }
      }
    }
  }
}

/* Mobile Responsiveness */
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    text-align: center;
    .hero-content { margin-bottom: 40px; .cta-group { justify-content: center; } }
    .hero-image-container { width: 100%; .hero-img { max-height: 300px; } }
  }

  .details-section {
    /* Stack Training Grid on Tablet/Mobile */
    .training-container .training-grid {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  
  /* Stack Applications on Mobile */
  .details-section .applications-container .cards-grid {
    grid-template-columns: 1fr;
  }
  .section-title  {text-align:center;} .text-block h2 {text-align:center;}
}
</style>