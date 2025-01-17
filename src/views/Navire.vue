<script setup>
import {ref} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import NavireDetailsModal from "../components/Modal/NavireDetailsModal.vue";
import CardNavire from "../components/Card/CardNavire.vue";

const search = ref('');
const isModalVisible = ref(false);
const selectedCardNavire = ref(null);

const navires = [
  {
    title: 'navire',
    name: 'Clipper Trent',
    date: '13/01/25',
    blNumbers: ['HKG400227200', '24EX11215845 groupage', 'mf-022', 'mf-023', 'mf-024']
  },
  {
    title: 'navire',
    name: 'Ocean Voyager',
    date: '14/01/25',
    blNumbers: ['mf-025', 'mf-026', 'mf-027', 'mf-028']
  }
];

function handleCardClick(navire) {
  selectedCardNavire.value = navire;
  isModalVisible.value = true;
}

function handleModalClose() {
  isModalVisible.value = false;
  selectedCardNavire.value = null;
}

</script>

<template>
  <a-layout class="min-h-screen bg-secondary pt-16">

    <ButtonRetour title="Liste des dossier"/>

    <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

      <div class="mb-6">
        <SearchBar v-model="search"/>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <CardNavire
            v-for="navire in navires"
            :title="navire.title"
            :key="navire.name"
            :name="navire.name"
            :date="navire.date"
            :bl-numbers="navire.blNumbers"
            @click="handleCardClick(navire.name)"
            :class="selectedCardNavire === navire.name ? 'border-blue-500 shadow-lg' : ''"
        />
      </div>

      <NavireDetailsModal
          v-if="selectedCardNavire"
          :open="isModalVisible"
          :navire="selectedCardNavire"
          @close="handleModalClose"
      />
    </a-layout-content>
  </a-layout>
</template>
