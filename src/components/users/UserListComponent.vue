<template>
    <div v-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else-if="hasError" class="alert alert-danger" role="alert">
        <p v-if="retryCount < 5">Failed to load users. Retrying in {{ retryTimer }} seconds...</p>
        <p v-if="retryCount >= 5">No more retries. Please check your connection.</p>
    </div>
    <ul v-else>
        <li v-for="user in users" :key="user.uuid">
            <button @click="setReceiverId(user.uuid)">{{ user.uuid }}</button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useReceiverStore } from '@/stores/receiverStore';
import router from '@/router';

const receiverStore = useReceiverStore();

const setReceiverId = (uuid: string) => {
    receiverStore.setReceiverId(uuid);
    router.push({ name: 'chat' });
}

type User = {
    uuid: string;
    username: string;
    email: string;
};

const users = ref<User[]>([]);
const isLoading = ref(false);
const hasError = ref(false);
const retryCount = ref(0);
const retryTimer = ref(5);

const fetchData = async () => {
    isLoading.value = true;
    try {
        const response = await fetch(import.meta.env.VITE_USERSERVICE_URL as String + '/v1/users/uuids');
        if(response.ok){
            const jsonResponse = await response.json();
            users.value = jsonResponse;
            hasError.value = false;
            retryCount.value = 0;
            isLoading.value = false;
        }else{
            throw new Error('Failed to fetch users');
        }
    } catch(error) {
        hasError.value = true;
        if (retryCount.value < 5) {
            retryCount.value += 1;
            startRetryTimer();
        } else {
            isLoading.value = false;
        }
    }
};


const startRetryTimer = () => {
    retryTimer.value = 5;
    const intervalId = setInterval(() => {
        if (retryTimer.value > 0) {
            retryTimer.value -= 1;
        } else {
            clearInterval(intervalId);
            fetchData();
        }
    }, 1000);
};

onMounted(fetchData);
</script>
