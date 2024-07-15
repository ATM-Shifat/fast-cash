<script setup>

import {defineProps} from 'vue'

defineProps({
  title: {
    type: String,
    default: "USERS TRUST US"
  },
  subtitle:{
    type: String,
    default: "We are dedicated to providing the best services to our customers."
  }
})

</script>

<template>
  <section class="bg-rose-600 py-20 mb-10">
    <div class=" mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="justify-start">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p class="mt-3 text-xl text-white sm:mt-5 sm:text-xl">
          {{ subtitle }}
        </p>
      </div>
      
      <div class="mt-10">
        <RouterLink to="/accounts/signup" :class="[ 'hover:bg-rose-900',  'border-2 border-rose-900', 'text-white font-semibold', 'rounded-md', 'p-2']">
          Sign up
        </RouterLink>    
      </div>

    </div>
  </section>
</template>