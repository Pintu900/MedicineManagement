<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/medlist">Med List</RouterLink>
    <RouterLink to="/insert">Add Batch</RouterLink>
    <RouterLink to="/medinsert">Add Med</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid red;
}

nav a:first-of-type {
  border: 0;
}
</style>
