<script setup>

import {defineProps, onMounted, reactive} from "vue";
import axios from 'axios';

const userData = reactive({
    id: "100"
})

</script>

<template>


    <span>{{ userData.id }}</span>


    <div>
        
    </div>
</template>