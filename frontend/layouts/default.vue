<template>
  <v-app>
    <!-- <AppAside></AppAside> -->
    <AppHeader></AppHeader>
    <v-main
      class="d-flex column"
      style="min-height: 300px"
    >
      <slot />
    </v-main>
	 <AppFooter />
  </v-app>
</template>

<style scoped>
	.column {
		flex-direction: column;
	}
</style>
