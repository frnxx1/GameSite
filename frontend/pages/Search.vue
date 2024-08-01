<script setup lang="ts">
import { useGamesStore } from "../store/GamesStore"
const gamesStore = useGamesStore()


</script>

<template>
<div>
    <div class="container-block">
		
      <AppSearch />
		
		<v-row class="mt-2 mb-2" align="center" justify="center">
		<TheLoader v-if="gamesStore.loading" class="mt-2 mb-2"/>	
    <v-col v-else
      v-for="game in gamesStore.searchGames"
      cols="12"
      lg="3"
      md="4"
      sm="6"
      xs="12"
      :key="game.id"
    >
      <div class="contain-card">
        <AppCard :game="game" />
      </div>
    </v-col>
  		</v-row>
    </div>

  </div>
</template>

<style scoped>

</style>