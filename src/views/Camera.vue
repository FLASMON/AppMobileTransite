<script setup>
import ButtonRetour from "../components/ButtonRetour.vue";
import {Html5QrcodeScanner} from "html5-qrcode";
import {ref, onMounted} from "vue"
import axiosInstance from "../config/AxiosInstance.js";
import pathAPI from "../utils/pathAPI/pathAPI.js";
import toast from "../utils/toast.js";
import router from "../routes/router.js";

const scannerRef = ref(null);
const scanResult = ref(null);
const isScanning = ref(true);

const startScanner = () => {

    // Configuration de Html5QrcodeScanner
    scannerRef.value = new Html5QrcodeScanner(
        "qr-code-scanner",
        {
            fps: 10,
            qrbox: 250, // Taille de la boîte de scan
        },
        false
    );

    scannerRef.value.render(
        (decodedText) => {
            scanResult.value = decodedText;
            stopScanner();
        },
        (error) => {
            console.error("Erreur de scan:", error);
        }
    );
};

const stopScanner = () => {
    isScanning.value = false;
    if (scannerRef.value) {
        scannerRef.value.clear();
        scannerRef.value = null;
    }
};

const markAsReceived = async () => {

        try {
            const response = await axiosInstance.get(pathAPI.dossier_detail.confirm_receipt, {params: {id: scanResult.value} });
            if (response.data.error == '') {
                toast.showToast({msg: response.data.message, duration: 3, type: 'success'})
                setTimeout(() => {
                    router.push({name: 'Main'});
                }, 500)

            }else{
                toast.showToast({msg: response.data.error, duration: 3, type: 'warning'})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }

}

onMounted(() => {
    startScanner();
})
</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">

        <ButtonRetour title="Scan code"/>

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">
            <a-card class="w-full">
                <div v-if="isScanning" id="qr-code-scanner" class="border p-4 rounded"></div>


                <div v-if="!isScanning" class="mt-4 flex flex-col items-center text-center">
                    <p class="font-bold  text-lg mb-4">Résultat du QR Code :</p>
                    <a-button
                        type="success"
                        class=" bg-secondary hover:bg-gradient-to-r text-white rounded-md shadow-md"
                        @click="markAsReceived"
                    >
                        Marquez comme reçu
                    </a-button>
                </div>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>


<style scoped >
#qr-code-scanner {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}
</style>