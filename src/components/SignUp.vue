<script setup>

import BackButton from "@/components/BackButton.vue";
import {useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {reactive, defineProps} from 'vue'
import sha512 from "js-sha512"


const toast = useToast();
const route = useRoute();
const router = useRouter();

defineProps({
    title:{
        type: String,
        Default: "Title"
    },
    buttonName: {
        type: String,
        Default: "Save"
    }
})

const form = reactive({
    name: "",
    email:"",
    phone:"",
    passsword:"",
    passswordConfirm:"",
})

const handleSumbit = async () => {
    
    if(form.passswordConfirm === form.passsword){

        const checkMail = sha512(String(form.email));
        try{
            const response = await axios.get("/api/users/")
            const data = response.data;

            const newEmail = () => {
                for(let i = 0; i < data.length; i++){
                    if(data[i].contactEmail === checkMail)
                        return false;

                }

                return true;
            }

            if(newEmail){

                const userInfo = {
                    name: sha512(String(form.name)),
                    email: checkMail,
                    phone: sha512(String(form.phone)),
                    password: sha512(String(form.password)),
                }


                await axios.post("/api/users/", userInfo);
                toast.success("Account Created successfully!");
                
            }


        }catch(e){
            console.error("Failed to create account!",e);
            toast.error("Failed to create account!");
        }

    }
}

</script>

<template>
  <section class="bg-rose-50 mt-5 mx-5 border rounded-md place-content-center">
    <BackButton path="/"/>
    <div class="container m-10 w-6/12 py-20  ">
      
      <div class="bg-white px-6 pt-5 pb-10 mb-5 shadow-md rounded-md m-4 md:m-0">

        <h1 class="text-xl mb-5 font-bold text-center text-gray-700">
          Sign Up
        </h1>

        <form @submit.prevent="handleSumbit">

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Name
              </label>
              
              <input 
                v-bind="form.name" 
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="John Doe"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              
              <input  
                v-bind="form.phone"
                type="text"
                id="phone"
                name="phone"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="+8801........."
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Email
              </label>
              
              <input  
                v-bind="form.email"
                type="email"
                id="email"
                name="email"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="example@mail.com"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Password
              </label>
              
              <input  
                v-bind="form.passsword"
                type="password"
                id="password"
                name="passsword"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="at least 6 characters"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              
              <input 
                v-bind="form.passswordConfirm" 
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="matche the password"
                required
              />
            </div>

            <div>
              <button 
                class="bg-rose-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>

        </form>
      </div>
    </div>
  </section>
</template>