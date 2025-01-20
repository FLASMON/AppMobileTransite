<script setup>
import {ref, onMounted} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import NavireDetailsModal from "../components/Modal/NavireDetailsModal.vue";
import CardNavire from "../components/Card/CardNavire.vue";
import axiosInstance from "../config/AxiosInstance.js";
import debounce from 'lodash/debounce'

const search = ref('');
const isModalVisible = ref(false);
const selectedCardNavire = ref(null);

const filtre = ref({
    filter: '',
    date_debut: '',
    date_fin: '',
    sort: 'date_arriver|asc',
    page: '1',
    per_page: '20',
})
const navires = ref([
    {
        title: 'navire',
        name: 'Clipper Trent',
        date: '13/01/25',
        blNumbers: ['HKG400227200', '24EX11215845 groupage', 'mf-022', 'mf-023', 'mf-024']
    },
    {
        title: 'navire',
        name: 'Ocean Voyager',
        date: '14/01/25',
        blNumbers: ['mf-025', 'mf-026', 'mf-027', 'mf-028']
    }
]);

const fetchNavire = async () => {

    try {
        const response = await axiosInstance.get('navire/fetchall', { params: filtre.value });
        navires.value = response.data.data.map(item => ({
            title: 'navire',
            name: (item.nom_navire),
            date: (item.date_arriver_formatted),
            blNumbers: item.num_bl ? item.num_bl.split(';') : [],
        }));

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


onMounted( () => {
    fetchNavire();
})

</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">
        <ButtonRetour title="Liste des dossier"/>


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
                    :bl-numbers="navire.blNumbers"
                    @click="handleCardClick(navire.name)"
                    :class="selectedCardNavire === navire.name ? 'border-blue-500 shadow-lg' : ''"
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
