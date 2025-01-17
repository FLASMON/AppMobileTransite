<script setup>
import Menu from "./Layouts/Menu.vue";
import MainAvatar from "./Layouts/MainAvatar.vue";
</script>

<template>
  <a-layout>
    <a-layout-content class="relative w-full h-screen max-w-screen-sm mx-auto my-auto">
      <div class=" text-white text-left p-8 bg-gradient-to-r from-primary to-secondary shadow-md rounded-b-[40px]">
        <div class="flex items-center justify-between w-full mb-8">
          <a-tooltip title="search">
            <a-button  shape="circle" size="large">
              <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>
            </a-button>
          </a-tooltip>
          <MainAvatar/>
        </div>
        <h2 class="text-2xl uppercase font-bold my-0 lg:my-4">Menu d'Applications</h2>
        <p class="text-lg leading-relaxed">
          Accédez rapidement à toutes vos applications et fonctionnalités pour une gestion efficace de vos projets
        </p>
      </div>
      <Menu class="place-content-center z-10 pt-8"/>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>
