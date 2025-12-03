<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <!-- These allow you to click without reloading the page -->
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <!-- This is where HomeView or AboutView will actually appear -->
  <RouterView />
</template>

<style scoped>
nav {
  padding: 20px;
  font-size: 1.5rem;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983; /* Green color for the active page */
  font-weight: bold;
}
</style>