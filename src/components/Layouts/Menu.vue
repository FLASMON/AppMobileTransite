<script setup>
import {computed} from "vue";
import {useRouter} from 'vue-router';
import {MENUS_DATA} from "./menu-data.js";
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const router = useRouter();

const translatedMenus = computed(() => {
    return MENUS_DATA.map(menu => ({
        ...menu,
        title: t(`menu.${menu.key.toLowerCase()}`)
    }));
});

const MenuClick = ({key}) => {
    router.push({name: key});
};
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <a-card
            v-for="(item, index) in translatedMenus"
            :key="index"
            :bordered="false"
            hoverable
            @click="MenuClick(item)"
            :class="item.color"
            class="card_menu group flex items-center justify-center !cursor-pointer text-center hover:bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 h-28"
        >
            <div class="flex flex-col items-center justify-center text-center py-8">
                <font-awesome-icon
                    :icon="item.icon"
                    class="text-secondary text-4xl group-hover:text-white transition-all duration-300"
                />
                <span class="text-secondary text-lg group-hover:text-white transition-all duration-300">
      {{ item.title }}
    </span>
            </div>
        </a-card>
    </div>
</template>

<style scoped>

</style>