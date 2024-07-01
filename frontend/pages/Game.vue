<script setup lang="ts"></script>

<template>
  <div class="banner">
    <v-img
      aspect-ratio="16/9"
      cover
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    ></v-img>

	 <div class="poster-game">
		<div class="poster-body">
			<v-img
      cover
      src="https://cdn.akamai.steamstatic.com/steam/apps/1086940/hero_capsule.jpg?t=1713271288"
    ></v-img>
		</div>
		

  	</div>
  </div>

  

  <div class="container-block">
    <div class="block">content text</div>
  </div>
</template>

<style scoped>
.block {
  height: 500px;
  width: 500px;
  background-color: #5a5a5a;
}
.banner {
  width: 100%;
  height: 400px;
  position: relative;
}

.poster-game{
	position: absolute;
	top: 20%;
	left: 20%;
	width: 300px;
	height: 400px;
}
.poster-body {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
