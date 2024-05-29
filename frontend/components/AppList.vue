<script setup lang="ts">
const {data: games} = await useFetch('https://api.igdb.com/v4/games', {
	method: 'POST',
	headers: {
	// 'Content-Type': 'application/json',
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
        v-for="n in 4"	  
      >
		<AppCard  
		v-for="game in games"
		:game="game"	
		/>

      </v-col>
    </v-row>
</template>

<style scoped>

</style>

<!-- <AppCard /> -->
