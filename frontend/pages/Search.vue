<script setup lang="ts">
import { useGamesStore } from "../store/GamesStore"
const gamesStore = useGamesStore()
const page = ref(1)
const genre = ref('')


const searchByGenre = async function (searchGenre) {
	console.log(searchGenre)
	genre.value = searchGenre
	const { pending } = await useAsyncData("gamesStore", () => {
		return gamesStore.searchByGenre(searchGenre, page.value)
	})	
}

//! допиши код, чтобы при клике перекидывало ан страницу поиска router.push("search/")


const moreGames = async function () {
	page.value += 1
	const { pending } = await useAsyncData("gamesStore", () => {
		return gamesStore.searchByGenre(genre.value, page.value)
	})	
}

const searchByName = async function (searchName) {
	console.log(searchName);
	const { data, refresh, pending } = await useAsyncData("gamesStore", () => {
		return gamesStore.searchByName(searchName)
	})
}


</script>

<template>
<div>
    <div class="container-block">	
      <AppSearch @searchByName="searchByName" @searchByGenre="searchByGenre"/>	
		<v-row class="mt-2 mb-2" align="center" justify="center">
    <v-col 
      v-for="game in gamesStore.gamesFoundBy"
      cols="12"
      lg="3"
      md="4"
      sm="6"
      xs="12"
      :key="game.id"
    >
      <div class="contain-card">
        <AppCard :game="game" />
      </div>
    </v-col>
	 <v-btn :disabled="gamesStore.gamesFoundBy.length == 0 || gamesStore.isSearchByName" variant="outlined mt-2 mb-2" @click="moreGames">
      {{ gamesStore.loading ? "Загружаем..." : "Загрузить еще" }}
    </v-btn>
  		</v-row>
    </div>

  </div>
</template>

<style scoped>

</style>
