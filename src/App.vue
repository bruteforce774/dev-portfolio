<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
body {
  background-color: lightblue;
  font-family: 'Archivo', sans-serif
}

a {
  text-decoration: none;
}
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
