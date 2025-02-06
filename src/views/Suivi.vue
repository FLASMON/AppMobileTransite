<script setup>
import {ref, onMounted} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import CardSuiv from "../components/Card/CardSuiv.vue";
import SuiviDetailsModal from "../components/Modal/SuiviDetailsModal.vue";
import axiosInstance from "../config/AxiosInstance.js";
import pathAPI from "../utils/pathAPI/pathAPI.js";
import debounce from "lodash/debounce.js";
import {useI18n} from 'vue-i18n';
import localstorageService from "@/utils/localstorageService.js";
const {t} = useI18n();

const search = ref('');
const isModalVisible = ref(false);
const selectedCardNavire = ref(null);
const elementDetails= ref([]);
const totalItems = ref(0);

const navires = ref([]);

const filtre = ref({
    filter: '',
    date_debut: '',
    date_fin: '',
    sort: 'date_enlevement|asc',
    page: '1',
    per_page: '15',
    client_id: localstorageService.getIDclient(),
})


const fetchAll = async () => {

    try {
        const response = await axiosInstance.get(pathAPI.suivieenlevement.fetchAll, { params: filtre.value });
        navires.value = response.data.data;
        totalItems.value = response.data.total;
    } catch (e) {
        console.log(e)
    } finally {

    }
}
const handlePageChange = (page) => {
    filtre.value.page = page;
    fetchAll();
};

async function handleCardClick(id) {
    const link = pathAPI.suivieenlevement.detail+"/"+id
    const response = await axiosInstance.get(link);
    elementDetails.value = response.data.element;

    selectedCardNavire.value = id;
    isModalVisible.value = true;
}

function handleModalClose() {
    isModalVisible.value = false;
    selectedCardNavire.value = null;
}

const debouncedFetchNavire = debounce(fetchAll, 300);

onMounted(() => {
    fetchAll();
})
</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">

        <ButtonRetour :title="t('suivie.list_suivie_enlevement')"/>

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

            <div class="mb-12">
                <SearchBar v-model="filtre.filter" @input="debouncedFetchNavire"/>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                <CardSuiv
                    v-for="navire in navires"
                    :date="navire.date_enlevement_formatted"
                    :nom-navire="navire.nom_navire"
                    @click="handleCardClick(navire.id)"
                    :class="selectedCardNavire === navire.id ? 'border-amber-200 shadow-lg' : ''"
                    statut=""/>
            </div>

            <div class="text-center pt-4">
                <a-pagination
                    v-model:current="(filtre.page)"
                    :total="totalItems"
                    :pageSize="parseInt(filtre.per_page)"
                    @change="handlePageChange"
                    show-less-items
                />
            </div>

            <SuiviDetailsModal
                v-if="selectedCardNavire"
                :open="isModalVisible"
                :navire="selectedCardNavire"
                :elements="elementDetails"
                @close="handleModalClose"/>
        </a-layout-content>
    </a-layout>
</template>
