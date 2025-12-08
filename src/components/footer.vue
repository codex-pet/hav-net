<template>
  <footer class="footer">
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/live-demo">Live Demo</a>
      <a href="/about">About Us</a>
      <a href="#">Privacy Policy</a>
    </div>
    
    <div class="social-icons">
      <!-- Icon 1: GitHub -->
      <a href="https://github.com/codex-pet" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </a>

      <!-- Icon 2: LinkedIn -->
      <a href="https://www.linkedin.com/in/peter-ayono" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </a>

      <!-- Icon 3: Instagram (Replaced Twitter) -->
      <a href="https://www.instagram.com/p3tirrrr_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
    </div>

    <p class="copyright">2025 HAV-Net Project Team. All Rights Reserved.</p>
  </footer>
</template>

<script setup>
// Logic for footer (if any) goes here
</script>

<style lang="scss" scoped>
/* --- Variables (Required for standalone component) --- */
$accent-blue: #3b82f6;
$text-muted: #94a3b8;

.footer {
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  background-color: #02060a;
  margin-top: auto;
  width: 100%;

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

    /* Style the anchor tag wrapping the SVG */
    a {
      color: $text-muted;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      svg {
        transition: color 0.2s, transform 0.2s;
      }
      
      /* Apply hover effects to the SVG when the Link is hovered */
      &:hover svg {
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
</style>