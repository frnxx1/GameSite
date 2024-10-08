<script setup lang="ts">
const props = defineProps({
	message: {
   //  type: Object,
   //  required: true,
  },
});

//!принять правильно пропс! 
</script>

<template>
	<div class="container-block mt-3 mb-2">	
	<v-alert variant="outlined" :text="message.text" :type="message.type" ></v-alert>
	</div>
</template>

<style scoped>

</style>

<!-- :text="message.text"
 :type="message.type" 
-->