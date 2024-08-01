<script setup lang="ts">
import { useGamesStore } from "../store/GamesStore"
import{ ref } from 'vue'
const gamesStore = useGamesStore()
const router = useRouter();
const searchName = ref('')
// const loading = ref(false)
const filters = [
	{title: 'Шутеры', value: 'shooter'},
	{title: 'Головоломки', value: "puzzle"},
	{title: 'Ролевые', value: "role-playing-games-rpg"},
	{title: 'Экшены', value: "action"},
	{title: 'Файтинги', value: "fighting"},
	{title: 'Приключения', value: "adventure"},
	{title: 'Инди', value: "indie"},
	{title: 'Платформеры', value: "platformer"},
	{title: 'ММО', value: "massively-multiplayer"},
	{title: 'Спортивные', value: "sports"},
	{title: 'Гонки', value: "racing"},
	{title: 'Симуляторы', value: "simulation"},
	{title: 'Аркадные', value: "arcade"},
	{title: 'Казуальные', value: "casual"},
	{title: 'Стратегии', value: "strategy"},
]

//! декомпозируй поиск по имени

// const searchByName = async function () {
// 	router.push("search/")
// 	loading.value = true;
// 	console.log(searchName.value);
// 	const { data, refresh, pending } = await useAsyncData("gamesStore", () => {
// 		return gamesStore.searchByName(searchName.value)
// 	})
// 	loading.value = false;	
// 	searchName.value = ''
// }
// const searchByGenre = async function (valueGenre) {

// 	loading.value = true;
// 	console.log(valueGenre);
// 	const { data, refresh, pending } = await useAsyncData("gamesStore", () => {
// 		return gamesStore.searchByGenre(valueGenre, 1)
// 	})
// 	loading.value = false;	
// 	// searchName.value = ''
// }

</script>

<template>
  <div class="search-block__body">
    <div class="search-block__field">
        <v-text-field
		  v-model="searchName"
          :loading="gamesStore.loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search templates"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="searchByName"
        ></v-text-field>
    </div>
<div>{{ searchName }}</div>
    <div class="search-block__filter">
		<ul v-for="filter in filters" :key="filter.title">
			<li><v-chip color="orange-darken-1" variant="outlined" :value="filter.value" rounded="sm" @click="$emit('searchByGenre', filter.value)">{{ filter.title }}</v-chip></li>
		</ul>
    </div>
  </div>
</template>

<style scoped>
.search-block__body {
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
}
.search-block__field {
  flex: 0 1 50%;
  min-width: 300px;
}
.search-block__filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

ul {
    list-style-type: none;
}
</style>
