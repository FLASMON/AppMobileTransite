<script setup>

</script>

<template>
  <transition name="slide-up">
    <div v-if="visible" class="bg-blue-500 z-50 h-1/2 fixed left-0 bottom-0 w-full shadow-md p-8">
      <a-card  title="Detail Card title" :bordered="false" class="w-full">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </a-card>
    </div>
  </transition>

</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 600ms ease-out;
}

.slide-up-enter-from {
  transform: translateY(100px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 600ms ease-in;
}

.slide-up-leave-to {
  transform: translateY(-100px);
}
</style>