<template>
  <div class="q-pa-xl">
    <div class="flex flex-center column">
      <h1 class="q-py-xl text-accent">Connectez-vous</h1>
      <q-card>
          <q-card-section>
              <q-input label="Email" type="email" outlined class="q-mb-md" v-model="form.email" />
              <q-input label="Mot de passe" type="password" outlined class="q-mb-md q-mt-lg" v-model="form.password" :rules="[ val => val.length >= 6 || 'Minimum 6 caractère']" />
              <q-btn label="Se connecter" class="full-width" color="accent" @click="handleLogin"/>
              <p class="q-mt-lg">Vous n'avez pas de compte ? <a href="/register">Inscivez vous</a></p>
            </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { Notify } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user-store'

const userStore = useUserStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await userStore.handleLogin(form.value)
    router.push({ name: 'dashboard' })
  } catch (e) {
    Notify.create('Error during login')
  }
}
</script>
