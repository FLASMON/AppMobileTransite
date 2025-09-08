<script setup>
import ButtonRetour from "../components/ButtonRetour.vue";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { ref, onMounted, onUnmounted } from "vue";
import axiosInstance from "../config/AxiosInstance.js";
import pathAPI from "../utils/pathAPI/pathAPI.js";
import toast from "../utils/toast.js";
import router from "../routes/router.js";

const scannerRef = ref(null);
const scanResult = ref(null);
const isScanning = ref(true);
const cameraId = ref(localStorage.getItem('lastUsedCameraId') || null);

const startScanner = () => {
    const config = {
        fps: 10,
        qrbox: 550,
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    scannerRef.value = new Html5QrcodeScanner("qr-code-scanner", config, false);

    // Si on a une caméra mémorisée, on essaie de l'utiliser directement
    if (cameraId.value) {
        scannerRef.value.start(
            cameraId.value,
            {
                fps: config.fps,
                qrbox: config.qrbox,
            },
            (decodedText) => {
                handleScanSuccess(decodedText);
            },
            (error) => {
                console.error("Erreur avec la caméra mémorisée:", error);
                // Si échec, on lance le sélecteur normal
                scannerRef.value.render(handleScanSuccess, handleScanError);
            }
        );
    } else {
        // Pas de caméra mémorisée, on lance le sélecteur normal
        scannerRef.value.render(handleScanSuccess, handleScanError);
    }
};

const handleScanSuccess = (decodedText) => {
    scanResult.value = decodedText;
    // On stocke l'ID de la caméra pour la prochaine fois
    if (scannerRef.value && scannerRef.value.getRunningTrackCameraId) {
        const currentCameraId = scannerRef.value.getRunningTrackCameraId();
        if (currentCameraId) {
            localStorage.setItem('lastUsedCameraId', currentCameraId);
            cameraId.value = currentCameraId;
        }
    }
    stopScanner();
};

const handleScanError = (error) => {
    console.error("Erreur de scan:", error);
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
        const response = await axiosInstance.get(pathAPI.dossier_detail.confirm_receipt, {
            params: { id: scanResult.value },
        });
        if (response.data.error == "") {
            toast.showToast({ msg: response.data.message, duration: 3, type: "success" });
            setTimeout(() => {
                router.push({ name: "Main" });
            }, 500);
        } else {
            toast.showToast({ msg: response.data.error, duration: 3, type: "warning" });
        }
    } catch (e) {
        console.log(e);
    }
};

onMounted(() => {
    startScanner();
});

// Nettoyage quand le composant est démonté
onUnmounted(() => {
    stopScanner();
});
</script>

<template>
    <a-layout class="min-h-screen bg-secondary pt-16">
        <ButtonRetour title="Scan code" />

        <a-layout-content class="!p-6 max-w-screen-2xl bg-gray-100 mx-auto w-full rounded-t-3xl">
            <a-card class="w-full">
                <div v-if="isScanning" id="qr-code-scanner" class="border p-4 rounded"></div>

                <div v-if="!isScanning" class="mt-4 flex flex-col items-center text-center">
                    <p class="font-bold text-lg mb-4">Résultat du QR Code :</p>
                    <a-button
                        type="success"
                        class="bg-secondary hover:bg-gradient-to-r text-white rounded-md shadow-md"
                        @click="markAsReceived"
                    >
                        Marquez comme reçu
                    </a-button>
                </div>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>

<style scoped>
#qr-code-scanner {
    width: 100%;
    margin: 0 auto;
}
</style>