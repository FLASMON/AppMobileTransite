<template>
  <a-dropdown
      trigger="click"
      placement="bottomRight"
  >
    <!-- Avatar cliquable -->
    <a-avatar
        :style="{ backgroundColor: user.color }"
        :size="40"
        class="cursor-pointer"
    >
      {{ user.name.substring(0, 1) }}
    </a-avatar>

    <!-- Menu déroulant -->
    <template #overlay>
      <a-menu class="w-[210px] !text-gray-800">
        <!-- Section utilisateur -->
        <div class="flex flex-col px-2 py-2 text-sm justify-center border-b">
          <a-avatar
              :style="{ backgroundColor: user.color }"
              :size="70"
              class="mx-auto mt-3"
          >
            <span class="text-3xl relative top-1">{{ user.name.substring(0, 1) }}</span>
          </a-avatar>
          <div class="font-medium text-center text-2xl mt-3">
            {{ user.name }}
          </div>
          <div class="truncate text-xs text-center">
            {{ user.email }}
          </div>
        </div>

        <!-- Options de menu -->
        <a-menu-item key="profile" class="text-sm !text-gray-800">
          <span @click="navigateTo('/profile/edit')">
              <font-awesome-icon class="mr-2" icon="fa-solid fa-circle-user"/>
              Profile
          </span>
        </a-menu-item>
        <a-menu-item key="logout" class="text-sm !text-gray-800">
          <span @click="navigateTo('/logout')">
              <font-awesome-icon class="mr-2" icon="fa-solid fa-right-from-bracket"/>
              Déconnexion
          </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>

// Données utilisateur (exemple)
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  color: "#3498db",
};

// Fonction de navigation
const navigateTo = (url) => {
  window.location.href = url;
};
</script>

<style scoped>

</style>
