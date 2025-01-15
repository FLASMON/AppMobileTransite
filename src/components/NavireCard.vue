<script setup>

defineProps({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  blNumbers: {
    type: Array,
    required: true
  }
});


</script>

<template>
  <a-card
      class="w-full card_navire hover:shadow-lg transition-shadow duration-300">
    <a-card-meta class="bg-gradient-to-r from-blue-600 to-blue-900 w-full p-8">
      <template #title>
        <div class="flex items-center justify-between text-white">
          <span class="capitalize text-lg font-light">{{ title }}</span>
          <span class="text-base">{{ date }}</span>
        </div>
      </template>
      <template #description>
        <span class="text-2xl uppercase font-medium text-white">{{ name }}</span>
      </template>
    </a-card-meta>
    <div class="px-6 pb-8">
      <a-divider orientation="left" orientation-margin="0" class="!my-4">
        <span class="text-blue-800 font-normal">Numéro BL</span>
      </a-divider>
      <div class="flex flex-wrap gap-2">
        <div
            v-for="(blNumber, index) in blNumbers"
            :key="index"
            class="flex items-center gap-2 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short" class="!me-0 text-blue-800"/>
          <span class="text-md uppercase">{{ blNumber }}</span>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.card_navire {
  @apply z-0 relative overflow-hidden;
}

.card_navire :deep(.ant-card-body) {
  @apply !p-0;
}
</style>
