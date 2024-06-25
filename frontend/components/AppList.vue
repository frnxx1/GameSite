<script setup lang="ts">
import { useGamesStore } from '../store/GamesStore'
const gamesStore = useGamesStore()

const { data: games } = await useAsyncData('games', () => gamesStore.getGames())

console.log(games);


</script>

<template>

	<!-- <h2>{{games}}</h2> -->
    <v-row class="mt-2 mb-2">
      <v-col
		v-for="game in games"
		cols="12"
		lg="3"
		md="4"
      sm="6"
		xs="12"
		:key="game.id"
      >
		<AppCard  
		:game="game"	
		/>
      </v-col>
    </v-row>
</template>

<style scoped>

</style>

