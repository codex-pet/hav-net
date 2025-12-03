<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to the Dashboard.</p>
    
    <!-- Link to go to About Page -->
    <RouterLink to="/about" class="btn">Go to About</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  
  h1 {
    color: #42b983;
  }
}
</style>