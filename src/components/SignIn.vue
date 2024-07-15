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
    password:"",
    passwordConfirm:"",
})

const user = reactive({
    id: String,
    info: Object,
})


const handleSubmit = async () => {



    try{
        const response = await axios.get("/api/users/")

        const data = response.data;
        const checkMail = form.email;
        const checkPassword = sha512(form.password);

        const validInput = () =>{
            for(let i = 0; i < data.length; i += 1){
                if(data[i].contactEmail == checkMail && data[i].password === checkPassword){
                    user.id = data[i].id;
                    user.info = data[i];
                    return true;
                }
            }


            return false;
        }

        if(validInput()){
            router.push(`/accounts/${user.id}`);
            toast.success("Signed in successfully");
        }else{
            toast.error("Invalid email or password");
        }

    }catch(e){
        console.error("Failed to Sign in", e);
        toast.error("Failed to Sign in");
    }

    
}


</script>

<template>
  <section class="bg-rose-50 mt-5 mx-5 border rounded-md flex justify-center">
    <BackButton path="/"/>
    <div class="container m-10 w-4/12 py-20">
      
      <div class="bg-white px-6 pt-5 pb-10 mb-5 shadow-md rounded-md m-4 md:m-0">

        <h1 class="text-xl mb-5 font-bold text-center text-gray-700">
          Sign In
        </h1>

        <form @submit.prevent="handleSubmit">

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Email
              </label>
              
              <input  
                v-model="form.email"
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
                v-model="form.password"
                type="password"
                id="password"
                name="passsword"
                title="Password should  have  at least 6 characters, and one upper case, one lower case, and one digit"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="at least 6 characters, and one upper case, one lower case, and one digit"
                required
              />
              
              <!--
               <input  
                v-model="form.password"
                type="password"
                id="password"
                name="passsword"
                pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$" 
                title="Password should  have  at least 6 characters, and one upper case, one lower case, and one digit"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="at least 6 characters, and one upper case, one lower case, and one digit"
                required
              /> 
              -->

            </div>

            <div>
              <button 
                class="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>

        </form>

        <div class="text-gray-400 text-sm text-center font-thin mt-10">
          Do not have an account? 
          <RouterLink to="/accounts/signup" class="text-rose-500 hover:text-rose-700 hover:font-semibold">
            Sign Up
          </RouterLink>
        </div>


      </div>

      
    </div>
  </section>
</template>