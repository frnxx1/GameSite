<script setup lang="ts">
import { useGamesStore } from "../store/GamesStore"
import{ ref } from 'vue'
const gamesStore = useGamesStore()
const emit = defineEmits()
const searchName = ref('')
const router = useRouter()


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


const searchByName = async function () {
	console.log(searchName.value);
	await emit('searchByName', searchName.value)
	searchName.value = ''
}

const searchByGenre = async function (value) {

	await emit('searchByGenre', value)
}

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
		<v-chip-group filter
        selected-class="text-primary"
        column
      >
        <v-chip	
		  	mandatory
			color="orange-darken-1" 
          v-for="filter in filters" :key="filter.title" 
			 @click.once="searchByGenre(filter.value)"
			:value = filter.value
			 >
          {{ filter.title }}
        </v-chip>
      </v-chip-group>
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
