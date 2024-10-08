<script setup lang="ts">
import AppMessage from "~/components/ui/AppMessage.vue";
import { useAuthStore } from "../store/AuthStore"
import { useGlobalStore } from "../store"
import { useRouter } from "vue-router"
const router = useRouter()

const authStore = useAuthStore()
const globalStore = useGlobalStore()


const submitAuth = async function (values) {
	console.log("данные для авторизации:", values);

	const { data, error, status } = await useAsyncData("authStore", () => {
		return authStore.login(values)
	})
	router.push('/user') 
}
</script>


<template>
	<app-message v-if="globalStore.message" :message="globalStore.message" ></app-message>
  <v-card class="pa-4 pa-6 mx-auto ma-4" width="350">
    <v-card-title>Войти в систему</v-card-title>
    <v-card-item>
		<AppAuth @submitAuth="submitAuth"></AppAuth>
    </v-card-item>

	 Нет аккаунта? <NuxtLink to="/singup">Зарегистрироваться</NuxtLink>
  </v-card>
</template>

<style></style>
