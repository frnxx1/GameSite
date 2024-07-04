<script setup lang="ts">

import { useGamesStore } from "../store/GamesStore"
const route = useRoute();
const gamesStore = useGamesStore()
const gameId = ref(route.params.id);

const { data: response } = await useAsyncData("gamesStore", () => {
	return gamesStore.getOneGame(gameId.value)
})

const game = ref(response.value[0]);

</script>

<template>
<div class="page__dgr">
   <div class="container-block bg-gray-800">
      <div class="product-page">
        <div class="product-page__body">
          <div class="product-page__poster">
            <v-img
              cover
              :src="game.image"
            ></v-img>
          </div>
          <div class="product-page__info">
            <h1 class="product-page__title">{{game.name}}</h1>
            <div class="product-page__raiting">
					<v-rating
									:model-value="game.rating"
									color="amber"
									density="compact"
									size="small"
									half-increments
									readonly
								></v-rating>
				</div>
            <div class="product-page__genre" ><span v-for="gen in game.genre" class="me-1">{{ gen.name }}</span></div>
            <div class="product-page__price">599 руб.</div>
				<div class="product-page__actions"><v-btn color="orange-darken-1" text="Подробнее" border></v-btn></div>
          </div>
          
      	</div>
			<div class="product-page__description" v-html=game.description></div>
    	</div>
  	</div>
</div>

</template>

<style scoped>

</style>
