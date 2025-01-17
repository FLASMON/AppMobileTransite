<script setup>
import {reactive} from "vue";

const loginForm = reactive({
  username: "",
  password: "",
});

const handleLogin = () => {
  console.log("Login data:", loginForm);
};
</script>

<template>
  <a-layout class="relative min-h-screen pt-16 flex flex-col items-center justify-center px-6">

    <div class="flex flex-col items-center justify-center mb-8 z-10">
      <a-avatar shape="circle" :size="80">
        <font-awesome-icon class="me-0" icon="fa-solid fa-circle-user"/>
      </a-avatar>
      <span class="pt-2 text-3xl text-white capitalize"><strong class="font-bold">Trans'</strong>App</span>
    </div>

    <a-layout-content class="!p-0 max-w-screen-2xl bg-gray-100 w-full rounded-t-3xl z-10">
      <a-card class="w-full">
        <template #title>
          <span class="text-lg font-medium uppercase">Connexion</span>
        </template>

        <a-form layout="vertical" @submit.prevent="handleLogin">

          <a-form-item label="Nom d'utilisateur" required>
            <a-input size="large" v-model="loginForm.username" placeholder="Entrez votre nom d'utilisateur"/>
          </a-form-item>


          <a-form-item label="Mot de passe" required>
            <a-input-password size="large" v-model="loginForm.password" placeholder="Entrez votre mot de passe"/>
          </a-form-item>

          <!-- Checkbox "Se souvenir de moi" -->
          <a-form-item>
            <a-checkbox v-model="loginForm.remember">Se souvenir de moi</a-checkbox>
          </a-form-item>

          <a-form-item>
            <a-button size="large" block @click="handleLogin"
                      class="!text-white bg-primary hover:bg-secondary !border-none transition duration-300">
              Se connecter
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-layout-content>

    <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-secondary z-0">
      <div
          class="w-full h-full bg-center bg-cover opacity-15"
          style="background-image: url('/img/navire.png');"
      ></div>
    </div>
  </a-layout>
</template>

<style scoped>
</style>
