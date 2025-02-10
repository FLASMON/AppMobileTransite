<script setup>
import {defineProps, computed, ref, onMounted} from 'vue';

import {useI18n} from 'vue-i18n';
import axiosInstance from "@/config/AxiosInstance.js";
import pathAPI from "@/utils/pathAPI/pathAPI.js";
import toast from "@/utils/toast.js";
import localstorageService from "@/utils/localstorageService.js";

const {t} = useI18n();
const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    titre: {
        type: String,
        required: true,
    }
});

const entrepots = ref([]);
const navires = ref([]);

const fetchEntrepot = async ()=> {
    const response = await  axiosInstance.get(pathAPI.tableaubord.entrepot, {params: {id_client: localstorageService.getIDclient()}});
    entrepots.value = response.data;
}

const fetchNavire = async ()=> {
    const response = await axiosInstance.get(pathAPI.tableaubord.navire, {params: {id_client: localstorageService.getIDclient()}});
    navires.value = response.data;
}

const filters = ref({
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    ship: 0,
    warehouse: ''
});

const emit = defineEmits(['close', 'onSearch']);

const handleClose = () => {
    emit('close');
};

const resetFiltre = () => {
    filters.value = {
        fromDate: new Date().toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0],
        ship: 0,
        warehouse: ''
    }
    onFilter();
}
const onFilter = async () => {
    emit('onSearch', filters.value)
}

onMounted(() => {
    fetchEntrepot();
    fetchNavire();
})

</script>

<template>
    <a-modal
        :open="open"
        :title="titre"
        @cancel="handleClose"
        :footer="null"
        width="100%"
        wrap-class-name="full-modal"
        class="modal_detail overflow-hidden"
    >

        <div class="flex flex-col">
            <!-- Champ Date "Du" -->
            <a-form-item class="flex flex-col">
                <label class="font-medium mb-1">{{t('tableau_bord.du')}}</label>
                <a-date-picker v-model:value="filters.fromDate" format="DD/MM/YYYY" value-format="YYYY-MM-DD" class="w-full text-center"/>
            </a-form-item>

            <!-- Champ Date "Au" -->
            <a-form-item class="flex flex-col">
                <label class="font-medium mb-1">{{t('tableau_bord.au')}}</label>
                <a-date-picker v-model:value="filters.toDate" format="DD/MM/YYYY" value-format="YYYY-MM-DD"  class="w-full text-center"/>
            </a-form-item>

            <!-- Sélection "Choix navire" -->
            <a-form-item class="flex flex-col">
                <label class="font-medium mb-1">{{t('tableau_bord.navire')}}</label>
                <a-select v-model:value="filters.ship" :placeholder="t('tableau_bord.navire')" class="w-full text-center">
                    <a-select-option v-for="(n, index) in navires" :value="n.id" :key="index"> {{n.nom_navire}}</a-select-option>

                </a-select>
            </a-form-item>

            <!-- Sélection "Entrepôt" -->
            <a-form-item class="flex flex-col">
                <label class="font-medium mb-1">{{t('tableau_bord.entrepot')}}</label>
                <a-select v-model:value="filters.warehouse" :placeholder="t('tableau_bord.entrepot')" class="w-full text-center">
                    <a-select-option v-for="(n, index) in entrepots" :value="n.nom_entrepot" :key="index"> {{n.nom_entrepot}}</a-select-option>
                </a-select>
            </a-form-item>
        </div>


            <!-- Bouton de soumission -->
            <a-form-item>
                <div class="w-full">
                    <a-button
                        html-type="submit"
                        class="bg-red-500 hover:!bg-red-600 !text-white border-none w-1/2"
                        @click="resetFiltre"
                    >
                        {{t('tableau_bord.reset_filtre')}}
                    </a-button>

                    <a-button
                        type="primary"
                        html-type="submit"
                        @click="onFilter"
                        class="w-1/2 bg-secondary hover:!bg-primary text-white"
                    >
                        {{t('tableau_bord.recherche')}}
                    </a-button>
                </div>

            </a-form-item>

    </a-modal>
</template>

<style>
.full-modal .ant-modal {
    top: 20px;
    margin: auto;
}
</style>