<script setup>
import ButtonRetour from "../components/ButtonRetour.vue";
import {ref, onMounted} from "vue"
import axiosInstance from "../config/AxiosInstance.js";
import pathAPI from "../utils/pathAPI/pathAPI.js";
import toast from "../utils/toast.js";
import SearchBar from "@/components/SearchBar.vue";
import NavireDetailsModal from "@/components/Modal/NavireDetailsModal.vue";
import CardNavire from "@/components/Card/CardNavire.vue";
import debounce from "lodash/debounce.js";


const filtre = ref({
    filter: '',
    date_debut: '',
    date_fin: '',
    sort: 'date_arriver|asc',
    page: '1',
    per_page: '20',
    client_id: JSON.parse(localStorage.getItem('token_client')).value,
})

const utilisateur = ref({
    nom_client: "",
    login_client: "",
    mdp_client: "",
    role: ""
});

const fetchUser = ()=> {

}

const debouncedFetchNavire = debounce(fetchUser, 300);

onMounted(() => {
    fetchUser();
})
</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">

        <ButtonRetour title="Liste Utilisateur"/>

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

            <div class="mb-6">
                <SearchBar v-model="filtre.filter" @input="debouncedFetchNavire"/>
            </div>
            <a-button class="!bg-primary !text-white hover:!bg-secondary hover:!text-white">
                Nouveau Utilisateur
            </a-button>

            <div class="bg-white shadow-lg rounded-lg p-4 w-full max-w-md flex items-center mt-4">
                <div class="mr-4">
                    <div class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
                        <font-awesome-icon
                            icon="fa-solid fa-user"
                            class="text-secondary text-4xl group-hover:text-white transition-all duration-300"
                        />
                    </div>
                </div>

                <!-- Partie droite : Informations -->
                <div class="flex-1">
                    <h2 class="text-lg font-semibold text-gray-800">{{ utilisateur.nom_client }}</h2>
                    <p class="text-gray-600">@{{ utilisateur.login_client }}</p>

                    <!-- Badge Rôle -->
                    <span
                        class="inline-block mt-2 px-3 py-1 text-sm font-medium text-white rounded"
                        :class="utilisateur.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'">
                    {{ utilisateur.role }}
                </span>
                </div>
            </div>
        </a-layout-content>

    </a-layout>
</template>


<style scoped >
#qr-code-scanner {
    width: 100%;
    margin: 0 auto;
}
</style>