<script setup lang="ts">

</script>

<template>
  <v-app-bar :elevation="2" height="56">
  <!-- <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
	 
	 
  </template> -->

  <v-app-bar-title>
	<v-btn variant="plain" color="orange" size="large" to="/" :ripple="false">
		GamePlatform
	</v-btn>
	
	</v-app-bar-title>

  <template v-slot:append>
	<v-btn icon="mdi-account" to="/user"></v-btn>
	<v-btn icon="mdi-magnify" to="/search"></v-btn>
	<v-btn icon="mdi-login" to="/auth"></v-btn>
  </template>
</v-app-bar>
</template>
