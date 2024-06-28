<script setup lang="ts">
import { useGamesStore } from '../store/GamesStore'
const gamesStore = useGamesStore()

const page = ref(4)
const currentPage = ref(1)

const { data: games } = await useFetch(() => `http://localhost:3001?page=${page.value}&perPage=10`, {
  immediate: true
})

const change = function (currentPage) {
	page.value = currentPage
	console.log(page.value);
	console.log(currentPage);
}


// const { data: games } = await useAsyncData('games', function () {
// 	return gamesStore.getGames()
// })




// const { data: comments } = await useFetch("https://jsonplaceholder.typicode.com/comments/")

// const commentLimit = ref(10)
// const currentPage = ref('')
// const numberOfPAge = computed(() => 500/commentLimit.value)

// const page = ref(1)
// const change = function (currentPage) {
// 	page.value = currentPage
// 	console.log(currentPage);
// 	console.log(page.value);	
// }

// console.log(numberOfPAge);
// console.log(comments);





</script>

<template>

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
	 <v-pagination
		v-model="currentPage"
		:length="15"
		:total-visible="5"
		class="my-4"
		@click="change(currentPage)"
	></v-pagination>
	<!-- <div v-for="comment in comments" :key="comment.id" class="mt-2">
		<h2>{{ comment.name }}</h2>
		<p><strong>{{ comment.email }}</strong></p>
		<p>{{ comment.body }}</p>
	</div>

	<v-pagination
		v-model="currentPage"
		:length="numberOfPAge"
		:total-visible="5"
		class="my-4"
		@click="change(currentPage)"
	></v-pagination> -->

</template>

<style scoped>

</style>

