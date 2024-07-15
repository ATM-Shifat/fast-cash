<script setup>

import {defineProps, ref} from 'vue'
import {RouterLink, useRoute} from 'vue-router';

const route = useRoute().path;

defineProps({
    path: {
        type: String,
        required: true,
    }
})

</script>


<template>

    <section>
      <div class="container m-5 ml-10">
        <RouterLink
          :to="path"
          class="text-rose-500 hover:text-rose-700 flex items-center"
        >
          <i class="pi pi-arrow-left mr-2"></i> Back 
        </RouterLink>

      </div>
    </section>

</template>