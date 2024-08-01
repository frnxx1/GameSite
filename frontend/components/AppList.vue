<script setup lang="ts">
import { useGamesStore } from "../store/GamesStore"
const gamesStore = useGamesStore()

const page = ref(1)

const { pending } = await useAsyncData("gamesStore", () => {
  return gamesStore.getGames(page.value)
});

const change = async function () {
  page.value += 1
  const {pending} = await useAsyncData("gamesStore", () => {
    return gamesStore.getGames(page.value)
  });
};
</script>

<template>
  <v-row class="mt-2 mb-2" align="center" justify="center">
    <v-col
      v-for="game in gamesStore.games"
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
    <v-btn variant="outlined mt-2 mb-2" @click="change">
      {{ pending ? "Загружаем..." : "Загрузить еще" }}
    </v-btn>
  </v-row>
</template>

<style lang="scss" scoped>
.contain-card {
  position: relative;
  width: 100%;
}
</style>
