<script setup>
import {useI18n} from 'vue-i18n';
const {t} = useI18n();

defineProps({
    statut: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    nomNavire: {
        type: String,
        required: true
    },
    blNumbers: {
        type: String,
        required: true
    },
});

</script>

<template>
    <a-card
        class="w-full bg-gradient-to-r from-primary to-secondary  card_navire hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <a-card-meta class="w-full p-8">
            <template #title>
                <div class="flex items-center justify-between text-white mb-2">
                    <a-tag color="#FEBA03" class="text-base uppercase">{{ statut== 1 ?   t('filtre.cloturer') : t('filtre.en_cours') }}</a-tag>
                    <span class="text-lg">{{ date }}</span>
                </div>
                <div class="flex justify-between flex-wrap">
                    <span class="text-white text-base font-normal">{{ t('dossier.numero_bl')}}</span>
                    <span class="text-lg text-yellow uppercase font-normal">{{ blNumbers }}</span>
                </div>
                <div class="flex justify-between flex-wrap">
                    <span class="text-white text-base font-normal">{{ t('dossier.navire')}}</span>
                    <span class="text-lg text-yellow font-normal uppercase">{{ nomNavire }}</span>
                </div>
            </template>
            <template #description>
                <a-divider class="!m-0"></a-divider>
                <span class="text-2xl uppercase font-medium text-white">{{ client }}</span>
            </template>
        </a-card-meta>
    </a-card>

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
