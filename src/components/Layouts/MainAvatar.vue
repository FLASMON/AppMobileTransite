<template>
    <a-dropdown
        trigger="click"
        placement="bottomRight"
    >
        <!-- Avatar cliquable -->
        <a-avatar
            :size="40"
            class="bg-white text-zinc-900 cursor-pointer"
        >
            <font-awesome-icon class="" icon="fa-solid fa-cog"/>
        </a-avatar>

        <!-- Menu déroulant -->
        <template #overlay>
            <a-menu class="w-[210px] !text-gray-800">
                <a-menu-item key="profile" class="text-sm !text-gray-800"  @click="changeLangue('fr')">
                      <span>
                        {{ t('menu.langue_fr') }}
                      </span>
                </a-menu-item>
                <a-menu-item key="logout" class="text-sm !text-gray-800" @click="changeLangue('en')">
                      <span >
                        {{ t('menu.langue_en') }}
                      </span>
                </a-menu-item>

            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup>
import {ref} from 'vue'
import LocalStorageService from "@/utils/localstorageService.js";
import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n();
const currentLang = ref(locale.value);


const user = {
    name: "John Doe",
    email: "john.doe@example.com",
};

// Fonction de navigation
const navigateTo = (url) => {
    window.location.href = url;
};

const changeLangue = (lang) => {
    locale.value = lang;
    currentLang.value = lang;
    LocalStorageService.setItem('langue_transapp', lang);
}
</script>

<style scoped>

</style>
