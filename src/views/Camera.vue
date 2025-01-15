<script setup>
import ButtonRetour from "../components/ButtonRetour.vue";
</script>

<template>
  <a-layout class="min-h-screen bg-gray-100 py-16">
    <ButtonRetour title="Interface Caméra"/>
    <a-layout-content class="p-6 max-w-screen-2xl mx-auto w-full">
      <a-card class="w-full">
        <p>Contenu de la caméra...</p>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>