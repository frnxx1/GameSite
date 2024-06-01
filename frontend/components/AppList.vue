<script setup lang="ts">
const {data: games} = await useFetch('https://api.igdb.com/v4/games', {
	method: 'POST',
	headers: {
	'Client-ID': 'veftuzgvr6vae5133lstqxkz1rxy2u',
	Authorization: 'Bearer o6cnuwr9w0ladumfekz6fosygi55g8',
	},
	body: 'fields *;'

})

console.log(games.value)

</script>

<template>
    <v-row>
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

