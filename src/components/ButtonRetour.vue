<script setup>
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true
  }
});

const router = useRouter();

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <a-layout-header class="fixed z-10 top-0 w-full !border-none !bg-transparent !px-4">
    <div class="max-w-screen-2xl mx-auto flex items-center justify-between h-full">
      <div class="flex items-center">
        <a-button
            type="text"
            @click="goBack"
            class="!text-white mr-4 !cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-base" />
        </a-button>
        <h1 class="text-white text-xl">{{ title }}</h1>
      </div>
    </div>
  </a-layout-header>
</template>