<script setup lang="ts"></script>

<template>
  <div>
    <div class="slider-container">
      <v-carousel show-arrows="hover">
      
        <v-carousel-item
          src="/img/3backgr.png" 
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="/img/backgr.jpg" 
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="/img/2backgr.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<style scoped>
.slider-container {
	position: relative;
	min-width: 100%;
}
</style>
