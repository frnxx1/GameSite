<script setup lang="ts">
definePageMeta({
	middleware: 'auth'
})
import { useGlobalStore } from "../store"
import { useAuthStore } from "../store/AuthStore"
const authStore = useAuthStore()
const globalStore = useGlobalStore()

const { data, pending, error, refresh } = await useAsyncData("authStore", () => {
	return authStore.checkToken()
});

refresh()

</script>


<template>
<!-- <app-message v-if="globalStore.message" :message="globalStore.message" ></app-message> -->
	
 <h1 v-if="authStore.user">Страница пользователя с email: {{ authStore.user.email}}<br> {{ authStore.user }}  </h1>
 <TheLoader v-else-if="pending"></TheLoader>	
 <h1 v-else>Войдите в систему</h1>

</template>

<style></style>