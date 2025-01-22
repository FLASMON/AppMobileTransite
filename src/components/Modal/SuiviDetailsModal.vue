<script setup>
import {defineProps, ref, watch} from 'vue';

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

const menuItems = ref([
  {
    voyage: 'Voyage',
    nom_voyage: 1,
    heureDepart: 'Heure Départ',
    heure: '11:52',
    heureDechargement: 'Heure Déchargement',
    heureDech: '00:00',
    bl: 'BL',
    valeurBL: 1,
    transporteur: 'Transporteur',
    nom_transporteur: 'Transporteur 1',
    chauffeur: 'Nom Chauffeur',
    nom_chauffeur: 'Nom Chauffeur',
    numero_chauffeur: 'N° Chauffeur',
    num_chauffeur: '584758',
    permis: 'Permis',
    nom_permis: 'Non Permis',
    camion: 'N° Camion',
    numero_camion: '3548745',
    remorque: 'N° Remorque',
    numero_remorque: '54258TBA',
    destination: 'Destination',
    nom_destination: 'Tamatave',
    delivery_time: 'Delivery Time',
    time_delivery: '15:00',
    qteItems: [
      {label: 'BILL OF LADING', values: [100, 200, 300]},
      {label: 'N° Declaration', values: [12345, 67890, 11223]},
      {label: 'Qte D/T', values: [30, 25, 40]},
      {label: 'NBre SAC', values: [2, 3, 5]},
      {label: 'Nbre BIG BAG', values: [0, 1, 3]},
      {label: 'MARQUE', values: [1, 2, 3]},
      {label: 'BE', values: [5, 10, 15]}
    ]
  }
]);
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
          <span class="text-black font-medium">{{ item.voyage }}</span>
          <span class="text-white text-2xl font-bold bg-secondary px-2 py-1 rounded-tl-2xl">{{ item.nom_voyage }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.heureDepart }}</span>
          <span class="text-orange uppercase">{{ item.heure }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.heureDechargement }}</span>
          <span class="text-orange text-base">{{ item.heureDech }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.bl }}</span>
          <span class="text-orange text-base">{{ item.valeurBL }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.transporteur }}</span>
          <span class="text-orange">{{ item.nom_transporteur }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.chauffeur }}</span>
          <span class="text-orange">{{ item.nom_chauffeur }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.numero_chauffeur }}</span>
          <span class="text-orange">{{ item.num_chauffeur }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.permis }}</span>
          <span class="text-orange">{{ item.nom_permis }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.camion }}</span>
          <span class="text-orange">{{ item.numero_camion }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.remorque }}</span>
          <span class="text-orange">{{ item.numero_remorque }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.destination }}</span>
          <span class="text-orange">{{ item.nom_destination }}</span>
        </div>

        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">{{ item.delivery_time }}</span>
          <span class="text-orange">{{ item.time_delivery }}</span>
        </div>

        <a-divider orientation="center">
          <span class="text-secondary font-medium uppercase">Plus Details</span>
        </a-divider>

        <perfect-scrollbar class="h-full w-full pt-2 pb-4 px-2 overflow-hidden bg-blue-50 rounded-md">
          <div class="flex gap-1 whitespace-nowrap">
            <div
                v-for="(qteItem, idx) in item.qteItems"
                :key="idx"
                class="flex flex-col items-start gap-2 p-2"
            >
              <div class="flex items-center gap-1">
                <span class="text-md uppercase font-medium">{{ qteItem.label }}</span>
              </div>
              <div v-for="(value, valueIdx) in qteItem.values" :key="valueIdx">
                <span class="text-sm text-gray-600">{{ value.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </a-modal>
</template>

<style>
.full-modal .ant-modal {
  top: 20px;
  margin: auto;
}
 .ps__thumb-x {
   @apply h-[4px] bg-gray-400/30 rounded-md transition-all ease-in-out;
 }

.ps--active-x .ps__thumb-x:hover {
  @apply !bg-secondary;
}

.ps--active-x .ps__rail-x {
  @apply !bg-transparent;
  color: #d4ddde;
}
</style>