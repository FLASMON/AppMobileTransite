<script setup>
import ButtonRetour from "../components/ButtonRetour.vue";
import {ref, onMounted} from "vue"
import axiosInstance from "../config/AxiosInstance.js";
import pathAPI from "../utils/pathAPI/pathAPI.js";
import toast from "../utils/toast.js";
import SearchBar from "@/components/SearchBar.vue";
import debounce from "lodash/debounce.js";
import FormUser from "@/components/Modal/FormUser.vue";
import { Modal } from 'ant-design-vue';
import {useI18n} from 'vue-i18n';
import localstorageService from "@/utils/localstorageService.js";
import FilterDashboard from "@/components/Modal/FilterDashboard.vue";
const {t} = useI18n();

const totalItems = ref(0);
const is_open = ref(false);
const filtre = ref({
    filter: '',
    date_debuts: new Date().toISOString().split('T')[0],
    date_fins: new Date().toISOString().split('T')[0],
    id_navire: '',
    nom_entrepot: '',
    id_client: localstorageService.getIDclient(),
    sort: 'id|asc',
    page: '1',
    per_page: '20',
});


const data= ref([]);

const fetchData = async ()=> {
    const response = await axiosInstance.get(pathAPI.tableaubord.fetchAll,{params: filtre.value});
    data.value =response.data.data;
    totalItems.value = response.data.total;
}


const addData = ()=> {
    openModal();
}

const openModal = ()=> {
    is_open.value = true;
}

const closeModal= ()=> {
    is_open.value = false;
}
const debouncedFetchNavire = debounce(fetchData, 300);


const onSearch = (data)=> {
    filtre.value.date_debuts = data.fromDate;
    filtre.value.date_fins = data.toDate;
    filtre.value.id_navire = data.ship;
    filtre.value.nom_entrepot = data.warehouse;

    closeModal();
    fetchData();
}

const handlePageChange = (page) => {
    filtre.value.page = page;
    fetchData();
};

onMounted(() => {
    fetchData();
})
</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">

        <ButtonRetour :title="t('tableau_bord.tableau_bord')"/>

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">
            <div class="mb-6">
                <SearchBar v-model="filtre.filter" @input="debouncedFetchNavire"/>
            </div>
            <a-button @click="addData" class="!bg-primary !text-white hover:!bg-secondary hover:!text-white">
                <font-awesome-icon
                    icon="fa-solid fa-filter"
                    class="mr-2"
                />
                {{t('tableau_bord.filtrer_par')}}
            </a-button>

            <perfect-scrollbar class="h-full w-full pt-2 pb-4  overflow-hidden bg-blue-50 rounded-md">
                <div class="flex gap-1 whitespace-nowrap w-full">
                    <table class="w-full min-w-full border-collapse border border-gray-300">
                        <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-3 py-2 text-left"> {{t('tableau_bord.tab_date')}}</th>
                            <th class="border border-gray-300 px-3 py-2 text-left">{{t('tableau_bord.tab_navire')}}</th>
                            <th class="border border-gray-300 px-3 py-2 text-left">{{t('tableau_bord.bol')}}</th>
                            <th class="border border-gray-300 px-3 py-2 text-left">{{t('tableau_bord.num_declration')}}</th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.tab_entrepot')}}
                            </th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.marque')}}
                            </th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.qte_initiial')}}
                            </th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.qte_sortie')}}
                            </th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.nbre_bb')}}
                            </th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.nbre_sac')}}
                            </th>
                            <th class="border border-gray-300 px-3 py-2 text-left">
                                {{t('tableau_bord.qte_restant')}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                      <tr v-for="(d, index_dt) in data" :key="index_dt">
                            <td class="border border-gray-300 px-3 py-2 text-left">
                                {{d.date_enlevement_formatted}}
                            </td>
                            <td class="border border-gray-300 px-3 py-2 text-left">
                                {{d.nom_navire}}
                            </td >
                            <td class="border border-gray-300 px-3 py-2 text-left">
                                {{d.num_bl}}
                            </td>
                            <td class="border border-gray-300 px-3 py-2 text-left">
                                {{d.declaration_bl}}
                            </td>
                            <td class="border border-gray-300 px-3 py-2 text-center">
                                {{d.nom_entrepot}}
                            </td>
                            <td class="border border-gray-300 px-3 py-2 text-center">
                                {{d.reference_article}}
                            </td>
                            <td class="border border-gray-300 px-3 py-2 text-right">
                                {{d.qte_initial}}
                            </td>
                          <td class="border border-gray-300 px-3 py-2 text-right">
                              {{d.qte_t}}
                          </td>
                          <td class="border border-gray-300 px-3 py-2 text-right">
                              {{d.qte_sortie_bb}}
                          </td>
                          <td class="border border-gray-300 px-3 py-2 text-right">
                              {{d.qte_sortie_nbre_sac}}
                          </td>
                          <td class="border border-gray-300 px-3 py-2 text-right">
                              {{d.qte_restant}}
                          </td>
                        </tr>
                        </tbody>
                    </table>
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

            </perfect-scrollbar>


        </a-layout-content>

        <FilterDashboard :titre="t('tableau_bord.filtrer_par')"
                         :open="is_open" @close="closeModal"
                         @onSearch="onSearch"
        >

        </FilterDashboard>
    </a-layout>
</template>


<style scoped >
#qr-code-scanner {
    width: 100%;
    margin: 0 auto;
}
</style>