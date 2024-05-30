<script setup lang="ts">
	import {useRouter} from 'vue-router'
  import { useField, useForm } from 'vee-validate'
  import * as yup from 'yup'
  import { object, string } from 'yup'
  import { toTypedSchema } from '@vee-validate/yup'

  const router = useRouter()

  const { handleSubmit, resetForm } = useForm({
	validationSchema:  toTypedSchema(  //типизирует
	object({
    email: yup.string().required('Поле email не может быть пустым').email('Некорректный email'),
    password: yup.string().required('Пароль не может быть пустым').min(6, 'Пароль должен быть не менее 6 знаков'),
  }),
	)
  })
  //убрать агрессивную проверку

  const email = useField('email')
  const password = useField('password')

  const submit = handleSubmit(values => {
   //  alert(JSON.stringify(values, null, 2))

	const {data: responce} = useFetch('http://localhost:3001/api/public/login', {
	method: 'POST',
	body: values    
})
	console.log(values);
	 resetForm()
	 router.push("/")
  })

</script>

<template>
<v-card class="pa-4 pa-6 mx-auto ma-4" width="350">
	<v-card-title>Войти в систему</v-card-title>
	<v-card-item>
		<form @submit.prevent="submit">
 
    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    ></v-text-field>

   <v-text-field
      v-model="password.value.value"
      :counter="10"
      :error-messages="password.errorMessage.value"
      label="Пароль"
    ></v-text-field>

    <v-btn
      class="me-4"
      type="submit"
		variant="tonal"
    >
      Войти
    </v-btn>
  </form>
	</v-card-item>

		
</v-card>
<!-- <v-sheet width="350" class="pa-6 mx-auto"> -->

<!-- </v-sheet> -->


</template>

<style>
</style>