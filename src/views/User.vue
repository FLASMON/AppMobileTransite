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
const {t} = useI18n();

const is_open = ref(false);
const filtre = ref({
    filter: '',
    date_debut: '',
    date_fin: '',
    sort: 'nom_client|asc',
    page: '1',
    per_page: '20',
    client_id: localstorageService.getIDclient(),
});

const form = ref({
    id_parent: localstorageService.getIDclient(),
    login_client: "",
    mdp_client: "",
    role_client: "",
    nom_client: "",
    is_show: 0,
    id: ''
});


const users= ref([]);

const fetchUser = async ()=> {
    const response = await axiosInstance.get(pathAPI.subclient.fetchAll,{params: filtre.value});
    users.value =response.data.data;
}


const addData = ()=> {
    form.value = ({
        id_parent: localstorageService.getIDclient(),
        login_client: "",
        mdp_client: "",
        role_client: "",
        nom_client: "",
        is_show: 0,
        id: ''
    });
    openModal();

}

const openModal = ()=> {
    is_open.value = true;
}

const closeModal= ()=> {
    is_open.value = false;
}
const debouncedFetchNavire = debounce(fetchUser, 300);

const editUser = async (id)=> {
    const response = await axiosInstance.get(pathAPI.subclient.get,{params: {id: id}});
    form.value = response.data;
    openModal();
}

const deleteUser = async (id) => {
    Modal.confirm({
        title: () => t('user.msg_delete'),
        async onOk() {
            const response = await axiosInstance.get(pathAPI.subclient.delete,{params: {id: id}});
            if (response.data.error == ''){
                toast.showToast({msg: response.data.message, duration: 3, type: 'success'})
                fetchUser()
            }else{
                toast.showToast({msg: response.data.error, duration: 3, type: 'warning'})
            }
        },
        onCancel() {
            console.log('Cancel');
        },
        class: 'test',
    });


}

const succesInsert = ()=> {
    closeModal();
    fetchUser();
}
onMounted(() => {
    fetchUser();
})
</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">

        <ButtonRetour :title="t('user.list_user')"/>

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">

            <div class="mb-6">
                <SearchBar v-model="filtre.filter" @input="debouncedFetchNavire"/>
            </div>
            <a-button @click="addData" class="!bg-primary !text-white hover:!bg-secondary hover:!text-white">
                {{t('user.nouveau_user')}}
            </a-button>



                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pr-0 pl-0">
                    <div
                        v-for="(u, index) in users"
                        :key="index"
                        class="bg-white shadow-lg rounded-lg p-4"
                    >
                        <!-- Maintient toujours la disposition horizontale avec flex-row -->
                        <div class="flex flex-row items-center space-x-4">
                            <!-- Avatar - toujours à gauche -->
                            <div class="flex-shrink-0">
                                <div class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
                                    <font-awesome-icon
                                        icon="fa-solid fa-user"
                                        class="text-secondary text-4xl group-hover:text-white transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <!-- Infos utilisateur - toujours à droite -->
                            <div class="flex flex-col flex-1 text-left">
                                <h2 class="text-lg font-semibold text-gray-800">{{ u.nom_client }}</h2>
                                <p class="text-gray-600 mb-1">{{ u.login_client }}</p>
                                <p class="text-gray-600 font-semibold p-0 m-0 uppercase">{{ u.role_client }}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-2 mt-5">
                            <button
                                class="bg-primary hover:!bg-secondary text-white py-2 px-4 rounded transition-colors duration-300"
                                @click="editUser(u.id)"
                            >
                                <font-awesome-icon icon="fa-solid fa-edit" class="mr-2" />

                            </button>
                            <button
                                class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300"
                                @click="deleteUser(u.id)"
                            >
                                <font-awesome-icon icon="fa-solid fa-trash" class="mr-2" />

                            </button>
                        </div>

                    </div>
                </div>



        </a-layout-content>

        <form-user :titre="t('user.nouveau_user')" :open="is_open" @close="closeModal"
            @success="succesInsert"
                   :crud_form="form"
        >

        </form-user>
    </a-layout>
</template>


<style scoped >
#qr-code-scanner {
    width: 100%;
    margin: 0 auto;
}
</style>