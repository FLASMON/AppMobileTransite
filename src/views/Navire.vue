<script setup>
import {ref} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import NavireCard from "../components/NavireCard.vue";

const search = ref('');

const ships = [
  {
    title: 'navire',
    name: 'Clipper Trent',
    date: '13/01/25',
    blNumbers: ['mf-020', 'mf-021', 'mf-022', 'mf-023', 'mf-024']
  },
  {
    title: 'navire',
    name: 'Ocean Voyager',
    date: '14/01/25',
    blNumbers: ['mf-025', 'mf-026', 'mf-027', 'mf-028']
  }
];
</script>

<template>
  <a-layout class="min-h-screen bg-gray-100 py-16">

    <ButtonRetour title="Liste des Navires"/>

    <a-layout-content class="!p-6 max-w-screen-2xl mx-auto w-full">

      <div class="mb-6">
        <SearchBar v-model="search"/>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <NavireCard
            v-for="ship in ships"
            :title="ship.title"
            :key="ship.name"
            :name="ship.name"
            :date="ship.date"
            :bl-numbers="ship.blNumbers"
        />
      </div>
    </a-layout-content>
  </a-layout>
</template>
