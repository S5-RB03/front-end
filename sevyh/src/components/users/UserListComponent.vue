<template>
    <ul>
        <li v-for="user in users" :key="user.uuid">
            {{ user.uuid }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

type User = {
    uuid: string;
    username: string;
    email: string;
};

const users = ref<User[]>([]);

const fetchData = async () => {
    try{
        const response = await fetch('http://localhost:3003/api/v1/users/uuids');
        if(response.ok){
            const jsonResponse = await response.json();
            users.value = jsonResponse;
            console.log(users.value);
        }else{
            console.error('Failed to fetch users:', await response.text());
        }
    }catch(error){
        console.error('Error fetching users:', error);
    }
};

onMounted(fetchData);

</script>