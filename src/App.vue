<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
</script>

<template>
    <NavBar />
    <router-view></router-view>
</template>

<style>
body {
  background-color: lightblue;
  font-family: 'Archivo', sans-serif
}
a {
  text-decoration: none;
}
</style>
