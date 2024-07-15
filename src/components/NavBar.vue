<script setup>

import {defineProps, reactive, onMounted} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import {sha512} from 'js-sha512'

const route = useRoute();

const navBarOptions = reactive({
  showAccountOptions: false,
  showSignOptions: true,
});

const isActive = (routePath) => {
    return route.path === routePath;
} 

defineProps({
    user: {
      id: String,
    }
    
})


onMounted(() => {
  // console.log(route.path.includes("sign"))
  // console.log(route.path.includes("accounts"))

  if(!route.path.includes("sign")){
    navBarOptions.showAccountOptions = true;
  }
  if(route.path.includes("accounts")){
    navBarOptions.showSignOptions = false;
  }
});

</script>

<template>
<nav class=" bg-rose-700">
  <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
    <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-start md:item-strech">
          
          <div class="flex flex-1">
            <!-- Logo -->
          <RouterLink to="/" class="flex flex-shrink-0 items-center mr-4 text-white justify-start">
            <i class="pi pi-wallet text-white text-3xl mr-2 mb-2"></i>
            <span class="hidden md:block text-white text-2xl font-bold">
                Fast-Cash
            </span>
          </RouterLink>

          <!-- Navigation item -->
          <RouterLink to="/" :class="[isActive('/') ? 'bg-rose-800 font-medium' : 'hover:bg-rose-800', 'text-white', 'bold', 'rounded-md', 'px-3', 'py-2', 'mx-2']">
            Home
          </RouterLink>
          <RouterLink to="/accounts/trasfer" :class="[isActive('/trasfer') ? 'bg-rose-800 font-medium' : 'hover:bg-rose-800', 'text-white', 'rounded-md', 'px-3', 'py-2', 'mx-2']">
            Transfer
          </RouterLink>  
          </div>    

          <div  v-if="navBarOptions.showAccountOptions" class="md:ml-auto ">
            
            <div v-if="navBarOptions.showSignOptions">
              <RouterLink to="/accounts/signin" :class="[isActive('/signin') ? 'bg-rose-800 font-medium' : 'hover:bg-rose-800', 'text-white', 'rounded-md', 'px-3', 'py-2', 'mx-2']">
                Sign in
              </RouterLink>
              <span class="text-white font-thin">or</span>
              <RouterLink to="/accounts/signup" :class="[isActive('/signup') ? 'bg-rose-800 font-medium' : 'hover:bg-rose-800', 'text-white', 'rounded-md', 'px-3', 'py-2', 'mx-2']">
                Sign up
              </RouterLink>
            </div>
            
            <div v-else>
              <RouterLink  :to="`/accounts/0/profile`" :class="[isActive('/profile') ? 'bg-rose-800 font-medium' : 'hover:bg-rose-800', 'text-white', 'rounded-md', 'px-3', 'py-2', 'mx-2']">
                Profile
              </RouterLink>
              <RouterLink to="/" :class="['hover:bg-rose-800', 'text-white', 'rounded-md', 'px-3', 'py-2', 'mx-2']">
                Sign out
              </RouterLink>
            </div>

          </div>

        </div>
    </div>
  </div>
</nav>
</template>



