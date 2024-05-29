<script setup lang="ts">
import{ ref } from 'vue'

const { game } = defineProps(['game'])
const loading = ref(false)

const reserve = function () {
	loading.value = true
	setTimeout(() => (loading.value = false), 2000)
	}

</script>

<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    max-width="340"
	 min-width="250"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="orange-darken-1"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="/img/csgo.jpg"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>{{game.name}}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Шутер</span>

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
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>

		<div class="my-4">Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange-darken-1"
        text="Купить"
      	variant="elevated"
        @click="reserve"
      ></v-btn>
		<v-btn
        color="orange-darken-1"
        text="Подробнее" 
		  border
        @click="reserve"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>