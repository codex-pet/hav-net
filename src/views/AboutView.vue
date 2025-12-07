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

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-links">
        <a href="#">Home</a>
        <a href="#">Live Demo</a>
        <a href="#">About Us</a>
        <a href="#">Privacy Policy</a>
      </div>
      
      <div class="social-icons">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
      </div>

      <p class="copyright">2025 HAV-Net Project Team. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// Import the separated Navbar component
import Navbar from '@/components/navbar.vue';
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

/* Navbar styles removed - handled by component */

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
    color: #8b5cf6; /* Purple Title as per design */
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

/* Footer */
.footer {
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  background-color: #02060a;
  margin-top: auto;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;

    a {
      color: $text-muted;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
      
      &:hover { color: $accent-blue; }
    }
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    color: $text-muted;

    svg {
      cursor: pointer;
      transition: color 0.2s, transform 0.2s;
      
      &:hover {
        color: white;
        transform: translateY(-2px);
      }
    }
  }

  .copyright {
    color: #475569;
    font-size: 0.8rem;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header-section h1 { font-size: 2rem; }
  .contributors-grid { grid-template-columns: 1fr; }
}
</style>