<script setup>
import {ref, onMounted} from 'vue';
import ButtonRetour from "../components/ButtonRetour.vue";
import SearchBar from "../components/SearchBar.vue";
import CardDossier from "../components/Card/CardDossier.vue";
import DossierDetailsModal from "../components/Modal/DossierDetailsModal.vue";
import axiosInstance from "../config/AxiosInstance.js";
import pathAPI from "../utils/pathAPI/pathAPI.js";
import debounce from "lodash/debounce";
import {useI18n} from 'vue-i18n';
const {t} = useI18n();


const search = ref('');
const isModalVisible = ref(false);
const selectedCardNavire = ref(null);
const activeFilter = ref('');


const filtre = ref({
    filter: '',
    date_debut: '',
    date_fin: '',
    sort: 'id|asc',
    page: '1',
    per_page: '20',
    client_id: JSON.parse(localStorage.getItem('token_client')).value,
    filtre_etat: '',
})

const navires = ref([
    {
        statut: 'En cours',
        client: 'MAISON SAMAT',
        date: '13/01/25',
        blNumbers: 'HKG400227200',
        nom_navire: 'MSC SABRINA III'
    },
    {
        statut: 'En cours',
        client: 'MAISON SAMAT',
        date: '13/01/25',
        blNumbers: 'HKG400227200',
        nom_navire: 'MSC SABRINA III'
    },
]);

const suivie_dossier = ref(null);

async function handleCardClick(ouverture_bl_numero) {

    try {
        var formulaire = new FormData();
        formulaire.append('numero_bl',ouverture_bl_numero);

        const response = await axiosInstance.post(pathAPI.dossier.getparbl, formulaire);
        suivie_dossier.value = response.data[0];
        selectedCardNavire.value = ouverture_bl_numero;
    }catch (e) {
        console.log(e)
    }finally {

    }
    isModalVisible.value = true;
}

function handleModalClose() {
    isModalVisible.value = false;
    selectedCardNavire.value = null;
}

const fetchData= async () => {
        try {
            const response = await axiosInstance.get(pathAPI.dossier.fetchAll, {params: filtre.value});
            navires.value = response.data.data
        }catch (e) {
            console.log(e)
        }finally {

        }
}

const filterByEtat = (etat) => {
    filtre.value.filtre_etat = etat;
    activeFilter.value = etat;
    fetchData();
}
const debouncedFetchNavire = debounce(fetchData, 300);


onMounted( () => {
    fetchData();
})

</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">

        <ButtonRetour :title="t('dossier.liste_dossier')"/>

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

            <div class="mb-3">
                <SearchBar v-model="filtre.filter" @input="debouncedFetchNavire"/>
            </div>
            <div class="mb-3 flex items-center gap-3">
                <!-- Bouton Tout -->
                <a-button
                    type="default"
                    @click="filterByEtat('')"
                    :class="[
                    activeFilter === '' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black',
                    'rounded-lg shadow-md'
                     ]">
                        {{t('filtre.tout')}}
                </a-button>

                <!-- Bouton En cours -->
                <a-button
                    type="default"
                    @click="filterByEtat(0)"
                    :class="[
                    activeFilter === 0 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black',
                    'rounded-lg shadow-md'
                    ]">
                    {{t('filtre.en_cours')}}
                </a-button>

                <!-- Bouton Clôturer -->
                <a-button
                    type="default"
                    @click="filterByEtat(1)"
                    :class="[
        activeFilter === 1 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black',
        'rounded-lg shadow-md'
      ]">
                    {{t('filtre.cloturer')}}
                </a-button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <CardDossier
                    v-for="navire in navires"
                    :statut="navire.etat_dossier"
                    :date="navire.ouverture_date_arriver_formatted"
                    :bl-numbers="navire.ouverture_bl_numero"
                    :nom-navire="navire.ouverture_navire"
                    @click="handleCardClick(navire.ouverture_bl_numero)"
                    :class="selectedCardNavire === navire.id ? 'border-amber-200 shadow-lg' : ''"
                    statut=""/>
            </div>
            <DossierDetailsModal
                v-if="selectedCardNavire"
                :open="isModalVisible"
                :navire="selectedCardNavire"
                :Ouverture="suivie_dossier"
                @close="handleModalClose"
            />
        </a-layout-content>
    </a-layout>
</template>
