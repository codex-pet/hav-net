<template>
  <div class="about-container">
    <!-- Navigation Component -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content">
      
      <!-- Hero Header -->
      <div class="header-section">
        <h1>Meet Our Contributors</h1>
        <p class="subtitle">
          The collaborative effort and technical expertise behind the <strong>HAV-Net</strong> project, 
          bringing a diverse set of skills to real-time computer vision.
        </p>
      </div>

      <!-- Contributors Grid -->
      <div class="contributors-grid">
        
        <!-- Member 1: Peter Robert C. Ayono -->
        <div class="profile-card">
          <div class="avatar-wrapper">
            <!-- Avatar Seed: Peter -->
            <img src="../assets/img/peter-ayono.jpeg" alt="Peter" />
          </div>
          <div class="card-content">
            <h2>Peter Robert C. Ayono</h2>
            <span class="role">Fullstack Developer</span>
            
            <div class="divider"></div>

            <div class="section">
              <h4>Contributions</h4>
              <ul class="contributions-list">
                <li>Integrated the YOLOv8 model with the web application.</li>
                <li>Developed the backend API for handling image requests.</li>
                <li>Managed state and logic for the live camera feed.</li>
              </ul>
            </div>

            <div class="section">
              <h4>Skills & Background</h4>
              <div class="skills-container">
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">Mongo-DB</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Member 2: Earl Jarvy N. Almosera -->
        <div class="profile-card">
          <div class="avatar-wrapper">
            <!-- Avatar Seed: Jarvy -->
            <img src="../assets/img/earl-jarvy.jfif" alt="Jarvy" />
          </div>
          <div class="card-content">
            <h2>Earl Jarvy N. Almosera</h2>
            <span class="role">UI/UX Designer</span>
            
            <div class="divider"></div>

            <div class="section">
              <h4>Contributions</h4>
              <ul class="contributions-list">
                <li>Designed the modern, dark-themed dashboard interface.</li>
                <li>Created the user flow for the Live Demo experience.</li>
                <li>Ensured visual consistency and mobile responsiveness.</li>
              </ul>
            </div>

            <div class="section">
              <h4>Skills & Background</h4>
              <div class="skills-container">
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">CSS/SCSS</span>
                <span class="skill-tag">User Research</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Member 3: Kenneth Bobby D. Binondo -->
        <div class="profile-card">
          <div class="avatar-wrapper">
            <!-- Avatar Seed: Bobby -->
            <img src="../assets/img/kenneth-bobby.jfif" alt="Bobby" />
          </div>
          <div class="card-content">
            <h2>Kenneth Bobby D. Binondo</h2>
            <span class="role">Documentation Specialist</span>
            
            <div class="divider"></div>

            <div class="section">
              <h4>Contributions</h4>
              <ul class="contributions-list">
                <li>Authored the comprehensive technical documentation.</li>
                <li>Analyzed model performance metrics and error logs.</li>
                <li>Structured the Activity reports and dataset details.</li>
              </ul>
            </div>

            <div class="section">
              <h4>Skills & Background</h4>
              <div class="skills-container">
                <span class="skill-tag">Technical Writing</span>
                <span class="skill-tag">Data Analysis</span>
                <span class="skill-tag">Research</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
// Import Components
import Navbar from '@/components/navbar.vue';
import Footer from '@/components/footer.vue';
</script>

<style lang="scss" scoped>
/* --- Theme Variables --- */
$bg-dark: #050b14;
$bg-card: #0f172a;
$border-color: #1e293b;
$accent-blue: #3b82f6;
$accent-purple: #8b5cf6;
$text-main: #e2e8f0;
$text-muted: #94a3b8;

.about-container {
  background-color: $bg-dark;
  color: $text-main;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 60px 5%;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Header */
.header-section {
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #8b5cf6; /* Purple Title */
    margin-bottom: 15px;
  }

  .subtitle {
    color: $text-muted;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    font-size: 1.05rem;
  }
}

/* Contributors Grid */
.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

/* Profile Card */
.profile-card {
  background-color: $bg-card;
  border: 1px solid $border-color;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: left;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-8px);
    border-color: $accent-blue;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .avatar-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 20px;
    border: 3px solid #1e293b;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-content {
    width: 100%;
    
    h2 {
      font-size: 1.25rem;
      color: white;
      margin-bottom: 5px;
      text-align: center;
    }

    .role {
      display: block;
      color: $accent-blue;
      font-size: 0.9rem;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 500;
    }

    .divider {
      height: 1px;
      background-color: rgba(255, 255, 255, 0.1);
      margin-bottom: 20px;
    }

    .section {
      margin-bottom: 20px;

      h4 {
        color: $text-muted;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }
    }

    /* Contributions List */
    .contributions-list {
      list-style-type: none;
      padding: 0;
      
      li {
        position: relative;
        padding-left: 15px;
        font-size: 0.9rem;
        color: #cbd5e1;
        margin-bottom: 6px;
        line-height: 1.4;

        &::before {
          content: "+";
          position: absolute;
          left: 0;
          color: $accent-blue;
          font-weight: bold;
        }
      }
    }

    /* Skills Tags */
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .skill-tag {
        background-color: rgba(59, 130, 246, 0.15); /* Transparent Blue */
        color: #60a5fa;
        font-size: 0.75rem;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 600;
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header-section h1 { font-size: 2rem; }
  .contributors-grid { grid-template-columns: 1fr; }
}
</style>