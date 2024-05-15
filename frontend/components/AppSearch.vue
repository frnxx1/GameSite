import defineNuxtConfig from '../nuxt.config';
<script setup lang="ts">
// import{ ref } from 'vue'

const loaded = ref(false)
const loading = ref(false)
const filters = [
	{title: 'Шутеры', value: 'shooter'},
	{title: 'Казуальные', value: 'kazual'},
	{title: 'ММО', value: 'mmo'},
	{title: 'Экшены', value: 'ecshen'},
	{title: 'Стратегии', value: 'strategy'},
]

const onClick = function () {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}
</script>

<template>
  <div class="search-block__body">
    <div class="search-block__field">
        <v-text-field
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

    <div class="search-block__filter">
		<ul v-for="filter in filters" :key="filter.title">
			<li><v-chip color="secondary" variant="flat" :value="filter.value">{{ filter.title }}</v-chip></li>
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
