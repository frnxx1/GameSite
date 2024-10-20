<script setup lang="ts">
definePageMeta({
	middleware: 'auth'
})
import { useGlobalStore } from "../store"
import { useAuthStore } from "../store/AuthStore"
const authStore = useAuthStore()
const globalStore = useGlobalStore()

const { data, pending, error } = await useAsyncData("authStore", () => {
	return authStore.checkToken()
});

// watch(
//   () => authStore.user.value,
//   async (q, prevQ) => {
// 	console.log(q);
// 	console.log(prevQ);
// }
// )

// const user = useCookie('access_token')

</script>


<template>
<app-message v-if="globalStore.message" :message="globalStore.message" ></app-message>

 <h1 v-if="authStore.user">Страница пользователя с email: {{ authStore.user }} </h1>
 <h1 v-else>Войдите в систему</h1>
 <!-- <v-btn @click="refreshToken">
     Обновить токен
    </v-btn>
	 <v-btn @click="getAccessToken">
     Получить accessToken
    </v-btn> -->
	 {{ user }}
</template>

<style></style>