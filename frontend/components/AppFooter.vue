<script setup lang="ts">
const icons = [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ]
</script>

<template>
<v-footer class="d-flex flex-column">
    <div class="d-flex w-100 align-center px-4">
      <strong>Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
    <strong>Misha and me (c)  —  {{ new Date().getFullYear() }}</strong>
    </div>
  </v-footer>
</template>

<style scoped>

</style>