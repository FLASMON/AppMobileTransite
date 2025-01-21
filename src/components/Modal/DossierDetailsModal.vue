<script setup>
import {defineProps, computed} from 'vue';
import SearchBar from "../SearchBar.vue";
import {baseUrl} from "../../config/AxiosInstance.js";

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    navire: {
        type: Object,
        required: true
    },
    Ouverture: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close']);

const handleClose = () => {
    emit('close');
};

const show_document = (nom_piece_jointe) => {
    console.log(nom_piece_jointe);
    if ((nom_piece_jointe != '' && nom_piece_jointe != null)) {
        window.open(baseUrl + "/upload/dossier/" + nom_piece_jointe, '_blank');
    }
}

const downloadZip = (id) => {
    window.open(baseUrl + "/dossier/downloadzip/" + id, '_blank');
}

const menuItems = [

    {name: 'BL', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.ouverture_bl_attachement},
    {name: 'Surestarie', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_surestarie_attachement},
    {name: 'Invoice', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.ouverture_invoice_attachement},
    {name: 'Packing list', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.ouverture_packing_list_attachement},
    {name: 'Bsc', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.ouverture_bsc_attachement},
    {name: 'Dom', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.ouverture_dom_attachement},
    {name: 'Caution', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_caution_attachement},

    {name: 'Déclaration', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.declaration_attachement},
    {name: 'Frais de DOSSIERS', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_dossier_attachment},
    {name: 'BAD', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_BAD_attachement},
    {name: 'Mictsl ( débarq)', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_mictsl_attachment},
    {name: 'Restitution ( Drop)', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_restitution_attachement},
    {name: 'Magasinage', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_magasinage_attachement},
    {name: 'Photos du visite', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_piece_jointe_visite},

    {name: 'Overstays', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_onverstays_attachement},
    {name: 'EHDN', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_EHDN_attachament},
    {name: 'Environnement', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.chargement_environnement_attachement},
    {name: 'DC', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.liquidation_montant_doc_attachement},
    {name: 'AMENDE', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.liquidation_amende_attachement},
    {name: 'FACTURE', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.facture_attachement},
    {name: 'TRESORERIE', icon: "fa-solid fa-file-pdf", dossier: props.Ouverture.tresorerie_attachement},
];
</script>

<template>
    <a-modal
        :open="open"
        title="Suivie des documents"
        @cancel="handleClose"
        :footer="null"
        width="100%"
        wrap-class-name="full-modal"
        class="modal_detail overflow-hidden"
    >
        <div class="mb-3">
            <SearchBar v-model="search"/>
        </div>

        <div class="flex items-center justify-between">
            <span class="text-base text-black font-medium">Liste des documents</span>
            <a-tooltip title="Téléchargez tous les fichiers au format ZIP" placement="left">
                <a-button type="default"
                          :disabled="Ouverture.id<=0" @click="downloadZip(Ouverture.id)"
                          class="!text-white bg-primary hover:bg-secondary !border-none transition duration-300">
                    <font-awesome-icon class="me-0" icon="fa-solid fa-download"/>
                </a-button>
            </a-tooltip>
        </div>
        <div v-for="(item, index) in menuItems" :key="index">
            <div
                class="relative w-full group bg-white px-4 py-6 my-3 rounded-lg hover:shadow-md  border border-transparent hover:border-primary transition duration-300">
                <div class="flex items-center justify-between flex-wrap gap-2 ml-8">
                    <span class="text-base text-gray-800 group-hover:text-primary font-normal">{{ item.name }}</span>
                    <a-space>
                        <a-space class="text-black font-medium">
                            <font-awesome-icon v-show="!(item.dossier != '' && item.dossier !=null)"  class="me-0 text-base text-red-500" icon="fa-solid fa-circle-xmark"/>
                            <font-awesome-icon v-show="(item.dossier != '' && item.dossier !=null)" class="me-0 text-base text-green-600" icon="fa-solid fa-circle-check"/>
                        </a-space>
                        <a-tooltip title="Téléchargez" placement="left">
                            <a-button type="default"
                                      :disabled="!(item.dossier != '' && item.dossier !=null)"
                                      @click="show_document(item.dossier)"
                                      class="!text-white group bg-primary hover:bg-secondary !border-none transition duration-300">
                                <font-awesome-icon class="me-0"
                                                   icon="fa-solid group-hover:text-white transition-all duration-300 fa-download"/>
                            </a-button>
                        </a-tooltip>
                    </a-space>
                </div>
                <div
                    class="absolute top-1/2 left-3 transform -translate-y-1/2 -translate-x-1/2 bg-primary border-[8px] border-[#EFF6FF] p-2 rounded-md transition duration-300">
                    <font-awesome-icon class="me-0 text-white text-2xl" :icon="item.icon"/>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<style>
.full-modal .ant-modal {
    top: 20px;
    margin: auto;
}
</style>