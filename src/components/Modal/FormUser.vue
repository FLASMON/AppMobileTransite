<script setup>
import {defineProps, computed, ref} from 'vue';

import {useI18n} from 'vue-i18n';
import axiosInstance from "@/config/AxiosInstance.js";
import pathAPI from "@/utils/pathAPI/pathAPI.js";
import toast from "@/utils/toast.js";
import localstorageService from "@/utils/localstorageService.js";

const {t} = useI18n();
const props = defineProps({
    crud_form: {
        type: Object,
        required: true,
    },
    open: {
        type: Boolean,
        required: true
    },
    titre: {
        type: String,
        required: true,
    }
});


const role_clients = [
    {label: 'Administrateur'},
    {label: 'Magasiner'}
];

const emit = defineEmits(['close', 'success']);

const handleClose = () => {
    emit('close');
};

const onFinish = async () => {
    const formulaire = new FormData();
    formulaire.append('nom_client', props.crud_form.nom_client);
    formulaire.append('login_client', props.crud_form.login_client);
    formulaire.append('role_client', props.crud_form.role_client);
    formulaire.append('mdp_client', props.crud_form.mdp_client);
    formulaire.append('id_parent', localstorageService.getIDclient());
    formulaire.append('id', props.crud_form.id);

    const link = props.crud_form.id > 0 ? pathAPI.subclient.edit : pathAPI.subclient.save;
    const response = await axiosInstance.post(link, formulaire);
    if (response.data.error == ''){
        props.open = false;
        toast.showToast({msg: response.data.message, duration: 3, type: 'success'})
        emit('success');
    }else{
        toast.showToast({msg: response.data.error, duration: 3, type: 'warning'})
    }
}


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
        <a-form
            :model="crud_form"
            name="basic"
            layout="vertical"
            @finish="onFinish"
        >

            <a-form-item
                :label="t('user.nom')"
                name="nom_client"
                :rules="[{ required: true, message: t('user.error_nom') }]"
            >
                <a-input v-model:value="crud_form.nom_client" placeholder="" />
            </a-form-item>

            <a-form-item
                :label="t('user.login_client')"
                name="login_client"
                :rules="[{ required: true, message: t('user.error_login_client') }]"
            >
                <a-input v-model:value="crud_form.login_client" placeholder="" />
            </a-form-item>

            <a-form-item
                :label="t('user.role')"
                name="role_client"
                :rules="[{ required: true, message: t('user.choix_role') }]"
            >
                <a-select
                    v-model:value="crud_form.role_client"
                    placeholder="Sélectionnez un rôle"
                    class="w-full"
                >
                    <a-select-option v-for="(r, index) in role_clients" :key="index" :value="r.label"> {{ r.label }}</a-select-option>
                </a-select>
            </a-form-item>


            <!-- Mot de passe -->
            <a-form-item
                :label="t('user.mdp')"
                name="mdp_client"
                :rules="[{ required: crud_form.id<=0 , message: t('user.error_mdp') }]"
            >
                <a-input-password
                    v-model:value="crud_form.mdp_client"
                    placeholder=""
                />
            </a-form-item>

            <!-- Bouton de soumission -->
            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    class="w-full bg-secondary hover:!bg-primary text-white"
                >
                    {{t('user.save')}}
                </a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style>
.full-modal .ant-modal {
    top: 20px;
    margin: auto;
}
</style>