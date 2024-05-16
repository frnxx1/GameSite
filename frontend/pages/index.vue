<script setup lang="ts">

const { data: game } = await useFetch('localhost:3000')

</script>


<template>
  <div>
    <AppSlider />
    <div class="container-block">
      <AppSearch />
      <h1>Топ мировых игр  {{ game }}</h1>
      <div>Выбирай, играй, наслаждайся</div>
		<AppList />

    </div>
  </div>
</template>
