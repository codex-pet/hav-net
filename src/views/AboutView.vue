<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about">
    <h1>About Page</h1>
    <p>This is the about section.</p>
    
    <!-- Link to go back to Dashboard -->
    <RouterLink to="/" class="btn">Back to Dashboard</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.about {
  padding: 20px;
}
</style>