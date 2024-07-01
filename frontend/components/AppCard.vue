<script setup lang="ts">
import{ ref } from 'vue'
const { game } = defineProps(['game'])


</script>

<template>
  <v-card

	height="100%"
		
	 min-width="250"
  >
    <v-img
      height="250"
      :src="game.image"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>{{game.name}}</v-card-title>

      <v-card-subtitle >
        <span v-for="gen in game.genre" class="me-1">{{ gen.name }}</span>

        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="game.rating"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          {{game.rating}}
        </div>
      </v-row>

		<div class="my-4">{{game.summary}}</div>
    </v-card-text>

    <v-card-actions class="pa-4">
      <!-- <v-btn
        color="orange-darken-1"
        text="Купить"
      	variant="elevated"
        @click="reserve"
      ></v-btn> -->
		<v-btn
        color="orange-darken-1"
        text="Подробнее" 
		  border
        
      >
		<NuxtLink :to=" '/'+ game.id ">About</NuxtLink>
	</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>