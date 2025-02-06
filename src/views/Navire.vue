<script setup>
import {ref, onMounted} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import NavireDetailsModal from "../components/Modal/NavireDetailsModal.vue";
import CardNavire from "../components/Card/CardNavire.vue";
import axiosInstance from "../config/AxiosInstance.js";
import debounce from 'lodash/debounce'
import pathAPI from "../utils/pathAPI/pathAPI.js";

const search = ref('');
const isModalVisible = ref(false);
const selectedCardNavire = ref(null);
import {useI18n} from 'vue-i18n';
import localstorageService from "@/utils/localstorageService.js";
const {t} = useI18n();
const totalItems = ref(0);

const filtre = ref({
    filter: '',
    date_debut: '',
    date_fin: '',
    sort: 'date_arriver|asc',
    page: '1',
    per_page: '15',
    client_id: localstorageService.getIDclient(),
})
const navires = ref([
    {
        title: '',
        name: '',
        date: '',
        bl_details: []
    }
]);

const fetchNavire = async () => {

    try {
        const response = await axiosInstance.get(pathAPI.navirebl.fetchAll, { params: filtre.value });
        navires.value = response.data.data;
        totalItems.value = response.data.total;

    } catch (e) {
       console.log(e)
    } finally {

    }
}

function handleCardClick(navire) {
    selectedCardNavire.value = navire;
    isModalVisible.value = true;
}

function handleModalClose() {
    isModalVisible.value = false;
    selectedCardNavire.value = null;
}

const debouncedFetchNavire = debounce(fetchNavire, 300);

const handlePageChange = (page) => {
    filtre.value.page = page;
    fetchNavire();
};

onMounted( () => {
    fetchNavire();
})

</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">
        <ButtonRetour :title="t('navire.list_navire')"/>


        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

            <div class="mb-6">
                <SearchBar v-model="filtre.filter" @input="debouncedFetchNavire"/>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <CardNavire
                    v-for="navire in navires"
                    :title="navire.title"
                    :key="navire.name"
                    :name="navire.name"
                    :date="navire.date"
                    :bl-numbers="navire.bl_details"
                    :class="selectedCardNavire === navire.name ? 'border-blue-500 shadow-lg' : ''"
                />
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

            <NavireDetailsModal
                v-if="selectedCardNavire"
                :open="isModalVisible"
                :navire="selectedCardNavire"
                @close="handleModalClose"
            />
        </a-layout-content>
    </a-layout>
</template>
