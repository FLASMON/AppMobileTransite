<script setup>
import {defineProps, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
const {t} = useI18n();


const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    navire: {
        type: Object,
        required: true
    },
    elements: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['close']);

const handleClose = () => {
    emit('close');
};

const menuItems = ref([
    {
        voyage: 'Voyage',
        nom_voyage: 1,
        heureDepart: 'Heure Départ',
        heure: '11:52',
        heureDechargement: 'Heure Déchargement',
        heureDech: '00:00',
        bl: 'BL',
        valeurBL: 1,
        transporteur: 'Transporteur',
        nom_transporteur: 'Transporteur 1',
        chauffeur: 'Nom Chauffeur',
        nom_chauffeur: 'Nom Chauffeur',
        numero_chauffeur: 'N° Chauffeur',
        num_chauffeur: '584758',
        permis: 'Permis',
        nom_permis: 'Non Permis',
        camion: 'N° Camion',
        numero_camion: '3548745',
        remorque: 'N° Remorque',
        numero_remorque: '54258TBA',
        destination: 'Destination',
        nom_destination: 'Tamatave',
        delivery_time: 'Delivery Time',
        time_delivery: '15:00',
        qteItems: [
            {label: 'BILL OF LADING', values: [100, 200, 300]},
            {label: 'N° Declaration', values: [12345, 67890, 11223]},
            {label: 'Qte D/T', values: [30, 25, 40]},
            {label: 'NBre SAC', values: [2, 3, 5]},
            {label: 'Nbre BIG BAG', values: [0, 1, 3]},
            {label: 'MARQUE', values: [1, 2, 3]},
            {label: 'BE', values: [5, 10, 15]}
        ]
    }
]);
</script>

<template>
    <a-modal
        :open="open"
        :title="t('suivie.detail_navire')"
        @cancel="handleClose"
        :footer="null"
        width="100%"
        wrap-class-name="full-modal"
        class="modal_detail overflow-hidden"
    >

        <div v-for="(item, index) in elements" :key="index">
            <div class="w-full bg-white p-4 my-3 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.voyage')}}</span>
                    <span class="text-white text-2xl font-bold bg-secondary px-2 py-1 rounded-tl-2xl">{{
                            item.voyage
                        }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.heure_depart')}}</span>
                    <span class="text-orange uppercase">{{ item.heure_depart }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.heure_dechargement')}}</span>
                    <span class="text-orange text-base">{{ item.heure_dechargement }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.num_bl')}}</span>
                    <span class="text-orange text-base">{{ item.bl }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.transporteur')}}</span>
                    <span class="text-orange">{{ item.transporteur }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.chauffeur')}}</span>
                    <span class="text-orange">{{ item.nom_chauffeur }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.num_chauffeur')}}</span>
                    <span class="text-orange">{{ item.num_chauffeur }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.permis')}}</span>
                    <span class="text-orange">{{ item.permis }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.num_camion')}}</span>
                    <span class="text-orange">{{ item.num_camion }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.num_remorque')}}</span>
                    <span class="text-orange">{{ item.num_remorque }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.destination')}}</span>
                    <span class="text-orange">{{ item.destination }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{t('suivie.delivery_time')}}</span>
                    <span class="text-orange">{{ item.delivery_time }}</span>
                </div>

                <a-divider orientation="center">
                    <span class="text-secondary font-medium uppercase">{{t('suivie.liste_article')}}</span>
                </a-divider>

                <perfect-scrollbar class="h-full w-full pt-2 pb-4 px-2 overflow-hidden bg-blue-50 rounded-md">
                    <div class="flex gap-1 whitespace-nowrap w-full">
                        <table class="w-full min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                   <th class="border border-gray-300 px-3 py-2 text-left"> {{t('suivie.bill_of_lading')}}</th>
                                    <th class="border border-gray-300 px-3 py-2 text-left">{{t('suivie.num_declaration')}}</th>
                                    <th class="border border-gray-300 px-3 py-2 text-left">{{t('suivie.be')}}</th>
                                    <th class="border border-gray-300 px-3 py-2 text-left">{{t('suivie.marque')}}</th>
                                    <th class="border border-gray-300 px-3 py-2 text-left">
                                        {{t('suivie.qte_d_t')}}
                                    </th>
                                    <th class="border border-gray-300 px-3 py-2 text-left">
                                        {{t('suivie.nbre_sac')}}
                                    </th>
                                    <th class="border border-gray-300 px-3 py-2 text-left">
                                        {{t('suivie.nbre_big_bag')}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(d, index_dt) in item.details" :key="index_dt">
                                    <td class="border border-gray-300 px-3 py-2 text-left">
                                        {{d.num_bl}}
                                    </td>
                                    <td class="border border-gray-300 px-3 py-2 text-left">
                                        {{d.num_ivoice}}
                                    </td >
                                    <td class="border border-gray-300 px-3 py-2 text-left">
                                        {{d.be}}
                                    </td>
                                    <td class="border border-gray-300 px-3 py-2 text-left">
                                        {{d.reference_article}}
                                    </td>
                                    <td class="border border-gray-300 px-3 py-2 text-center">
                                        {{d.qte_t}}
                                    </td>
                                    <td class="border border-gray-300 px-3 py-2 text-center">
                                        {{d.nbre_sac}}
                                    </td>
                                    <td class="border border-gray-300 px-3 py-2 text-center">
                                        {{d.nbre_big_bag}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </perfect-scrollbar>
            </div>
        </div>
    </a-modal>
</template>

<style>
.full-modal .ant-modal {
    top: 20px;
    margin: auto;
}

.ps__thumb-x {
    @apply h-[4px] bg-gray-400/30 rounded-md transition-all ease-in-out;
}

.ps--active-x .ps__thumb-x:hover {
    @apply !bg-secondary;
}

.ps--active-x .ps__rail-x {
    @apply !bg-transparent;
    color: #d4ddde;
}
table tr th {
    text-align: left!important;
}
</style>