<script setup lang="ts">

</script>

<template>
 <!-- <v-container class="bg-surface-variant"> -->
    <v-row no-gutters>
      <v-col
        v-for="n in 4"
        :key="n"
        cols="12"
        sm="3"
      >
		<AppCard />
        <!-- <v-sheet class="ma-2 pa-2">
          One of three columns
        </v-sheet> -->
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<style scoped>

</style>

<!-- <AppCard /> -->
