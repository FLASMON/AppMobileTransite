<script setup>
import {defineProps} from 'vue';
import SearchBar from "../SearchBar.vue";

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

  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
  { name: 'Article de Friperie', icon: "fa-solid fa-file-pdf"},
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
    <div class="mb-3">
      <SearchBar v-model="search"/>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-base text-black font-medium">Liste des documents</span>
      <a-tooltip title="Téléchargez tous les fichiers au format ZIP" placement="left">
        <a-button type="default" class="!text-white bg-primary hover:bg-secondary !border-none transition duration-300">
          <font-awesome-icon class="me-0" icon="fa-solid fa-download"/>
        </a-button>
      </a-tooltip>
    </div>
      <div v-for="(item, index) in menuItems" :key="index">
        <div class="relative w-full bg-white px-4 py-6 my-3 rounded-lg">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <span class="text-base text-black font-medium ml-8">{{ item.name }}</span>
            <a-space>
            <span class="text-black font-medium">
<!--            <font-awesome-icon class="me-0" icon="fa-solid fa-download"/>-->
            <font-awesome-icon class="me-0" icon="fa-solid fa-download"/>
            </span>
              <a-tooltip title="Téléchargez" placement="left">
                <a-button type="default">
                  <font-awesome-icon class="me-0" icon="fa-solid fa-download"/>
                </a-button>
              </a-tooltip>
            </a-space>
          </div>
          <div class="absolute top-1/2 left-3 transform -translate-y-1/2 -translate-x-1/2 bg-secondary p-2 rounded-md">
            <font-awesome-icon class="me-0 text-white text-2xl" :icon="item.icon"/>
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