<script setup lang="ts">
import AppMessage from "~/components/ui/AppMessage.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/AuthStore"
import { useGlobalStore } from "../store"
const globalStore = useGlobalStore()
const authStore = useAuthStore()
const router = useRouter();

const submitSignup = async function (values){
	console.log("данные для регистрации:", values);

	const { data, error, status } = await useAsyncData("authStore", () => {
		return authStore.signup(values)
	})

	router.push('/auth') 
}



</script>

<template>
<app-message v-if="globalStore.message" :message="globalStore.message" ></app-message>
  <v-card class="pa-4 pa-6 mx-auto ma-4" width="350">
    <v-card-title>Зарегистрироваться</v-card-title>
    <v-card-item>
		<AppAuth @submitAuth="submitSignup"></AppAuth>
    </v-card-item>
	 <NuxtLink to="/auth">Вернуться к авторизации</NuxtLink>
  </v-card>
</template>

<style></style>