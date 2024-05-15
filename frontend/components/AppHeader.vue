<script setup lang="ts">

</script>

<template>
  <v-app-bar :elevation="2" height="56">
  <!-- <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template> -->

  <v-app-bar-title>GamePlatform</v-app-bar-title>

  <template v-slot:append>
    <v-btn icon="mdi-heart"></v-btn>

    <v-btn icon="mdi-magnify"></v-btn>

    <v-btn icon="mdi-dots-vertical"></v-btn>
  </template>
</v-app-bar>
</template>
