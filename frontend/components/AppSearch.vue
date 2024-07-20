import defineNuxtConfig from '../nuxt.config';
<script setup lang="ts">
import{ ref } from 'vue'

const searchName = ref('')

const loaded = ref(false)
const loading = ref(false)
const filters = [
	{title: 'Шутеры', value: 'shooter'},
	{title: 'Казуальные', value: 'kazual'},
	{title: 'ММО', value: 'mmo'},
	{title: 'Экшены', value: 'ecshen'},
	{title: 'Стратегии', value: 'strategy'},
]

const onClick = async function () {
	loading.value = true;
	console.log(searchName.value);

	const {data:responce} = await useFetch('http://localhost:3001/game/search', {
		method: 'POST',
		body: searchName.value
	})


	loading.value = false;
	console.log(responce.value);
	
}
</script>

<template>
  <div class="search-block__body">
    <div class="search-block__field">
        <v-text-field
		  v-model="searchName"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search templates"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="onClick"
        ></v-text-field>
    </div>
<div>{{ searchName }}</div>
    <div class="search-block__filter">
		<ul v-for="filter in filters" :key="filter.title">
			<li><v-chip color="orange-darken-1" variant="outlined" :value="filter.value" rounded="sm" >{{ filter.title }}</v-chip></li>
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
