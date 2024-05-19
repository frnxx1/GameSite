<script setup lang="ts">

const { data: game } = await useFetch('http://localhost:3001', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: { 
          Name: ``,
          Description: ``,
          Image: ``, 
        }
        })

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
