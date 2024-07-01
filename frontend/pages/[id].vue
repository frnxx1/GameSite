<script setup lang="ts">
const route = useRoute()

const gameId = ref(route.params.id)

const { data: response } = await useFetch(() => `http://localhost:3001/${gameId.value}`)

const game = ref(response.value[0])
console.log(game)




</script>

<template>
  <div class="banner">
    <v-img
      aspect-ratio="16/9"
      cover
      :src="game.image_background"
    ></v-img>

	 <div class="poster-game">
		<div class="poster-body">
			<v-img
      cover
      :src="game.image"
    ></v-img>
		</div>

  	</div>
  </div>

  <div class="container-block">
    <div class="block">Описание: {{game.description}}</div>
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
