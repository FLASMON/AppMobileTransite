<script setup>
import {defineProps} from 'vue';
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
    list_article: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['close']);

const handleClose = () => {
    emit('close');
};


</script>

<template>
    <a-modal
        :open="open"
        :title="t('article.list_article')"
        @cancel="handleClose"
        :footer="null"
        width="100%"
        wrap-class-name="full-modal"
        class="modal_detail overflow-hidden"
    >

        <div v-for="(item, index) in list_article" :key="index">
            <div class="w-full bg-white p-4 my-3 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{ t('article.marque') }}</span>
                    <span class="text-black-700 text-base">{{ item.reference_article }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{ t('article.code_article') }}</span>
                    <span class="text-orange uppercase">{{ item.hs_code_article }}</span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{ t('article.qte') }}</span>
                    <span class="text-orange text-base">
                        {{ item.qte_article ? item.qte_article.toLocaleString('fr-FR') : '0' }}
                    </span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium"> {{ t('article.qte_restant') }}</span>
                    <span class="text-orange text-base">
                        {{ item.qte_restant ? item.qte_restant.toLocaleString('fr-FR') : '0' }}
                    </span>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <span class="text-black font-medium">{{ t('article.entrepot') }}</span>
                    <span class="text-orange uppercase">
                        {{ item.nom_entrepot }}
                    </span>
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