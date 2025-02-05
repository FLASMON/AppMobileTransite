<script setup>
import {ref} from "vue";
import NavireDetailsModal from "../Modal/NavireDetailsModal.vue";
import axiosInstance from "../../config/AxiosInstance.js";
import pathAPI from "../../utils/pathAPI/pathAPI.js";
import {useI18n} from 'vue-i18n';
const {t} = useI18n();

const isModalVisible = ref(false);
const selectedCardNavire = ref(null);

const ARTICLES = ref([]);
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
    },
});

const handleCardClick = async (id_dossier) => {
    try {
        const response = await axiosInstance.get(pathAPI.dossier.get+'/'+id_dossier);
        ARTICLES.value = response.data.dossier_article;
        console.log(ARTICLES.value)
        selectedCardNavire.value = id_dossier;
        isModalVisible.value = true;

    } catch (e) {
        console.log(e)
    } finally {

    }
}

const handleModalClose = ()=> {
    selectedCardNavire.value = null;
    isModalVisible.value = false;
}
</script>

<template>
    <a-card class="w-full card_navire hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <a-card-meta class="bg-gradient-to-r from-primary to-secondary w-full p-8">
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
                <span class="text-primary font-normal">{{t('navire.numero_bl')}}</span>
            </a-divider>
            <div class="flex flex-wrap gap-2">
                <div
                    v-for="(blNumber, index) in blNumbers"
                    :key="index"
                    class="flex items-center gap-2 bg-primary/10 p-2 rounded-lg transition-colors duration-200"
                    @click="handleCardClick(blNumber.id_dossier)"
                >
                    <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short" class="!me-0 text-orange"/>
                    <span class="text-md uppercase">{{ blNumber.num_bl }}</span>
                </div>
            </div>
        </div>
    </a-card>


    <NavireDetailsModal
        v-if="selectedCardNavire"
        :open="isModalVisible"
        :navire="selectedCardNavire"
        @close="handleModalClose"
        :list_article="ARTICLES"
    />


</template>

<style scoped>
.card_navire {
    @apply z-0 relative overflow-hidden;
}

.card_navire :deep(.ant-card-body) {
    @apply !p-0;
}

.card_navire::before {
    content: "";
    @apply z-0 absolute -top-5 -right-2 bg-primary bg-opacity-10 brightness-125 h-32 w-32 rounded-full;
}
</style>
