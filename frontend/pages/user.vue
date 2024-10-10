<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import { useAuthStore } from "../store/AuthStore"
const authStore = useAuthStore()

const { data, pending } = await useAsyncData("authStore", () => {
  return authStore.checkToken()
});




</script>


<template>
 <h1>Страница пользователя с email: {{ data }} </h1>
</template>

<style></style>