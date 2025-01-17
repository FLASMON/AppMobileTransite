<script setup>
import ButtonRetour from "../components/ButtonRetour.vue";

</script>

<template>
  <a-layout class="min-h-screen bg-secondary pt-16">

    <ButtonRetour title="Liste des suivie enlèvement"/>

    <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">
      <a-card class="w-full">
        <p>Contenu de la caméra...</p>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>