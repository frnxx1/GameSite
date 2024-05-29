<script setup lang="ts">

// const { data: game } = await useFetch('https://api.igdb.com/v4/games', {
// 	method: 'POST',
// 	headers: {
// 	// 'Content-Type': 'application/json',
// 	'Client-ID': 'veftuzgvr6vae5133lstqxkz1rxy2u',
// 	Authorization: 'Bearer o6cnuwr9w0ladumfekz6fosygi55g8',
// 	},
// 	body: 'fields *;'
// 	//131913

// })
// console.log(game)
// Топ мировых игр {
//   "access_token": "o6cnuwr9w0ladumfekz6fosygi55g8",
//   "expires_in": 4793498,
//   "token_type": "bearer"
// }

//'https://id.twitch.tv/oauth2/token?client_id=veftuzgvr6vae5133lstqxkz1rxy2u&client_secret=scxzf4is2vb2108ix05inqsv9yapib&grant_type=client_credentials'

</script>


<template>
  <div>
    <AppSlider />
    <div class="container-block bg-gray-800">
      <AppSearch />
      <h1>Топ мировых игр</h1>
      <div>Выбирай, играй, наслаждайся</div>
		<AppList />
		
    </div>
	 <AppFooter />
  </div>
</template>
