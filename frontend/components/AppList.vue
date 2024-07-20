<script setup lang="ts">
import { useGamesStore } from "../store/GamesStore"

const gamesStore = useGamesStore()

const page = ref(1)
const currentPage = ref(1)

const { data: games, refresh, pending } = await useAsyncData("gamesStore", () => {
  return gamesStore.getGames(page.value)
})

const change = function (currentPage) {
  page.value = currentPage
  refresh()
}


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
      <v-skeleton-loader
        :loading="pending"
        elevation="12"
        type="card, list-item-two-line, actions"
      >
	<div class="contain-card">
		   <AppCard :game="game" />
	</div>
     

      </v-skeleton-loader>
    </v-col>
  </v-row>
  <v-pagination
    v-model="currentPage"
    :length="50"
    :total-visible="5"
    class="my-4"
    @click="change(currentPage)"
  ></v-pagination>
</template>

<style lang="scss" scoped>

	.contain-card {
		position: relative;
		width: 100%;
	}
</style>
