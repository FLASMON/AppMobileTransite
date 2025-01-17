<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  navire: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

const menuItems = [
  {
    marque: 'Marque',
    nom_marque: 'Article de Friperie',
    codeArticle: 'Code Article',
    numberCode: '69030000',
    quantite: 'Quantite',
    valeurQte: 15000,
    quantite_restant: 'Quantite restant',
    valeurQte_restant: 54,
    entrepot: 'Entrepot',
    nom_entrepot: 'smmc',
    designation: 'Désignation',
    contenu_designation: 'Laravel values beauty. We love clean code just as much as you do. Simple, elegant syntax puts amazing functionality at your fingertips. Every feature has been thoughtfully considered to provide a wonderful developer experience.'
  }
  , {
    marque: 'Marque',
    nom_marque: 'Article de Friperie',
    codeArticle: 'Code Article',
    numberCode: '69030000',
    quantite: 'Quantite',
    valeurQte: 15000,
    quantite_restant: 'Quantite restant',
    valeurQte_restant: 54,
    entrepot: 'Entrepot',
    nom_entrepot: 'smmc',
    designation: 'Désignation',
    contenu_designation: 'Experimental feature and might change eature and might change'
  }, {
    marque: 'Marque',
    nom_marque: 'Article de Friperie',
    codeArticle: 'Code Article',
    numberCode: '69030000',
    quantite: 'Quantite',
    valeurQte: 15000,
    quantite_restant: 'Quantite restant',
    valeurQte_restant: 54,
    entrepot: 'Entrepot',
    nom_entrepot: 'smmc',
    designation: 'Désignation',
    contenu_designation: 'Experimental feature and might change eature and might change'
  }
]
</script>

<template>
  <a-modal
      :open="open"
      title="Detail navire"
      @cancel="handleClose"
      :footer="null"
      width="100%"
      wrap-class-name="full-modal"
      class="modal_detail overflow-hidden"
  >
    <div v-for="(item, index) in menuItems" :key="index">
      <div class="w-full bg-white p-4 my-3 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.marque }}</span>
          <span class="text-black-700 text-base">{{ item.nom_marque }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.codeArticle }}</span>
          <span class="text-orange uppercase">{{ item.numberCode }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.quantite }}</span>
          <span class="text-orange text-base">{{ item.valeurQte.toFixed(2) }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.quantite_restant }}</span>
          <span class="text-orange text-base">{{ item.valeurQte_restant.toFixed(2) }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.entrepot }}</span>
          <span class="text-orange uppercase">{{ item.nom_entrepot }}</span>
        </div>

        <a-divider orientation="center">
          <span class="text-secondary font-medium uppercase">{{ item.designation }}</span>
        </a-divider>

        <div class="w-full text-gray-800 text-md text-justify">
          <span>{{ item.contenu_designation }}</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style>
.full-modal .ant-modal {
  top: 20px;
  margin: auto;
}
</style>