<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <a-input
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      size="large"
      type="default"
      placeholder="Rechercher des applications..."
      class="px-5 w-full rounded-full"
  >
    <template #suffix>
      <font-awesome-icon
          icon="fa-solid fa-search"
          style="color: rgba(0, 0, 0, 0.45)"
          class="!me-0 text-blue-800 !size-4"
      />
    </template>
  </a-input>
</template>
