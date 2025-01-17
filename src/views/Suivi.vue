<script setup>
import {ref} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import DossierDetailsModal from "../components/Modal/DossierDetailsModal.vue";
import CardSuiv from "../components/Card/CardSuiv.vue";

const search = ref('');
const isModalVisible = ref(false);
const selectedCardNavire = ref(null);

const navires = [
  {
    statut: 'En cours',
    client: 'MAISON SAMAT',
    date: '13/01/25',
    blNumbers: 'HKG400227200',
    nom_navire: 'MSC SABRINA III'
  },
  {
    statut: 'En cours',
    client: 'MAISON SAMAT',
    date: '13/01/25',
    blNumbers: 'HKG400227200',
    nom_navire: 'MSC SABRINA III'
  },
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

    <ButtonRetour title="Liste des suivie enlèvement"/>

    <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

      <div class="mb-12">
        <SearchBar v-model="search"/>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <CardSuiv
            v-for="navire in navires"
            :statut="navire.statut"
            :client="navire.client"
            :date="navire.date"
            :bl-numbers="navire.blNumbers"
            :nom-navire="navire.nom_navire"
            @click="handleCardClick(navire.client)"
            :class="selectedCardNavire === navire.client ? 'border-amber-200 shadow-lg' : ''"
            statut=""/>
      </div>

      <DossierDetailsModal
          v-if="selectedCardNavire"
          :open="isModalVisible"
          :navire="selectedCardNavire"
          @close="handleModalClose"
      />
    </a-layout-content>
  </a-layout>
</template>
