<template>
  <div class="dashboard-container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="HAV-Net Logo" class="logo-img" />
        <span>HAV - Net</span>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/live-demo">Live Demo</router-link>
        <router-link to="/history">History</router-link>
        <router-link to="/about">About Us</router-link>
      </div>
      <button class="login-btn">Login</button>
    </nav>

    <!-- Hero Section (UPDATED) -->
    <header class="hero">
      <!-- Left Side: Text -->
      <div class="hero-content">
        <h1>Real-Time Object Detection Engine</h1>
        <p class="subtitle">
          Powered by <strong>YOLOv8-seg</strong>. A custom-trained Instance Segmentation model 
          fine-tuned to detect, recognize, and segment <strong>Humans, Animals, and Vehicles</strong> 
          in complex real-world environments.
        </p>
        <div class="cta-group">
          <button class="primary-btn">Launch Live Camera</button> 
          <button class="secondary-btn">View Documentation</button>
        </div>
      </div>

      <!-- Right Side: Image (NEW) -->
      <div class="hero-image-container">
        <!-- 
           TIP: Replace this URL with a local image like: src="@/assets/img/hero-illustration.png" 
           A transparent PNG of a drone, robot, or neural network mesh looks best here.
        -->
        <img 
          src="../assets/img/bounding-box.jpg" 
          alt="AI Object Detection Visual" 
          class="hero-img"
        />
      </div>
    </header>

    <!-- Project Details & Data Section -->
    <section class="details-section">
      <div class="text-block">
        <h2>Training Data & Methodology</h2>
        <p>
          Our model has been rigorously trained on a curated dataset containing diverse instances of 
          humans, animals, and vehicles. To ensure robustness, we implemented a 
          <strong>Feedback Loop</strong> mechanism (Fine-Tuning), specifically addressing:
        </p>
        <ul class="feature-list">
          <li><strong>Occlusions:</strong> Detecting subjects partially hidden by windows or frames.</li>
          <li><strong>Pose Variation:</strong> recognizing reclining/sleeping humans previously misclassified as animals.</li>
          <li><strong>Scale Diversity:</strong> Identifying large industrial vehicles (buses/trucks) alongside standard cars.</li>
        </ul>
      </div>

      <!-- Industry Use Cases -->
      <div class="cards-grid">
        <div class="card">
          <div class="card-image construction-bg"></div>
          <div class="card-content">
            <h3>Industrial Site Safety</h3>
            <p>Prevents accidents by detecting humans entering "blind spots" near heavy machinery.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-image security-bg"></div>
          <div class="card-content">
            <h3>Smart Surveillance</h3>
            <p>Reduces false alarms by distinguishing between potential intruders (Humans) and harmless pets.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-image traffic-bg"></div>
          <div class="card-content">
            <h3>ADAS & Traffic Flow</h3>
            <p>Assists autonomous systems in making split-second decisions by differentiating pedestrians from vehicles.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Script logic remains the same
</script>

<style lang="scss" scoped>
/* Variables */
$bg-color: #050b14;
$text-color: #e2e8f0;
$accent-color: #3b82f6;
$card-bg: #0f172a;
$nav-height: 80px;

.dashboard-container {
  background-color: $bg-color;
  color: $text-color;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding: 0 5%;
  overflow-x: hidden; /* Prevent scrollbar if image is too big */
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $nav-height;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #fff;
    .logo-img { height: 30px; margin-right: 10px; }
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

  .login-btn {
    background-color: $accent-color;
    color: white;
    border: none;
    padding: 8px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    &:hover { background-color: darken($accent-color, 10%); }
  }
}

/* --- HERO SECTION UPDATED --- */
.hero {
  /* Flexbox to put text and image side by side */
  display: flex;
  align-items: center; 
  justify-content: space-between;
  gap: 40px; /* Space between the text and the image */
  padding: 80px 0 60px;
  max-width: 1200px; /* Increased width to accommodate image */
  margin: 0 auto;

  /* Left Column */
  .hero-content {
    flex: 1; /* Takes up available space */
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

  /* Right Column (Image) */
  .hero-image-container {
    flex: 1; /* Takes up equal space */
    display: flex;
    justify-content: center;
    align-items: center;
    
    .hero-img {
      max-width: 100%;
      height: auto;
      max-height: 450px; /* Keeps it from getting too tall */
      object-fit: contain;
      /* Optional: Adds a subtle blue glow to fit the theme */
      filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.2));
      animation: float 6s ease-in-out infinite;
    }
  }
}

/* Floating Animation for the image */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

/* Details Section */
.details-section {
  padding: 40px 0 80px;
  max-width: 1200px;
  margin: 0 auto;

  .text-block {
    margin-bottom: 50px;
    h2 { font-size: 1.5rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
    p { color: #94a3b8; max-width: 700px; margin-bottom: 20px; }
    .feature-list {
      list-style: none; padding: 0;
      li { margin-bottom: 10px; color: #cbd5e1; &::before { content: "•"; color: $accent-color; font-weight: bold; display: inline-block; width: 1em; } }
    }
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    .card {
      background-color: $card-bg;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #1e293b;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      &:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); border-color: $accent-color; }
      .card-image {
        height: 180px;
        background-size: cover;
        background-position: center;
        background-color: #334155;
        &.construction-bg { background-image: url('../assets/img/construction.jfif'); }
        &.security-bg { background-image: url('../assets/img/smart-cctv.jfif'); }
        &.traffic-bg { background-image: url('../assets/img/earth-night.jfif'); }
      }
      .card-content {
        padding: 25px;
        h3 { font-size: 1.2rem; margin-bottom: 10px; color: white; }
        p { font-size: 0.9rem; color: #94a3b8; line-height: 1.5; }
      }
    }
  }
}

/* Mobile Responsiveness */
@media (max-width: 900px) {
  .hero {
    flex-direction: column; /* Stack them vertically on mobile */
    text-align: center;
    
    .hero-content {
      margin-bottom: 40px;
      .cta-group { justify-content: center; }
    }

    .hero-image-container {
      width: 100%;
      .hero-img { max-height: 300px; }
    }
  }
}

@media (max-width: 768px) {
  .navbar .nav-links { display: none; }
  .hero h1 { font-size: 2.5rem; }
}
</style>