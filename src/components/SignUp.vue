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

const transaction= {
    id: "",
    from: "",
    to: "",
    amount: "",
    time:"",              
}

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

const checkPass = () => {
    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if(pass.test(form.password)){
      return true;
    }

    toast.error("Password should  have  at least 6 characters, and one upper case, one lower case, and one digit ");
}

const createAccountNo = (email) => {
  let accountNo =  "";

  for(let i = 0; i < email.length; i += 1){
    accountNo += email.charCodeAt(i);
  }

  return accountNo;
}

const handleSubmit = async () => {

    if(form.passwordConfirm === form.password){
        try{
            const response = await axios.get("/api/users/")

            const data = response.data;
            const checkMail = form.email;

            const newEmail = () => {
                for(let i = 0; i < data.length; i++){
                    if(data[i].contactEmail === checkMail){
                      return false;
                    }
                }
                return true;
            }

            if(newEmail()){

                const userInfo = {
                    id: data.length,
                    accountNo: createAccountNo(form.email),
                    balance: Number(0),
                    name: form.name,
                    password: sha512(form.password),
                    contactEmail: checkMail,
                    contactPhone: form.phone,
                    lastTransaction: "",
                    transactions: [],
                }
                

                await axios.post("/api/users/", userInfo);
                toast.success("Account Created successfully!");
                router.push("/accounts/signin");
                
            }else{
              toast.error("Email already exists!");
            }
        }catch(e){
            console.error("Failed to create account!",e);
            toast.error("Failed to create account!");
        }

    }else{
        toast.error("Passwords do not match!");
    }
}


</script>

<template>
  <section class="bg-rose-50 mt-5 mx-5 border rounded-md flex justify-center">
    <BackButton path="/"/>
    <div class="container m-10 w-6/12 py-20  ">
      
      <div class="bg-white px-6 pt-5 pb-10 mb-5 shadow-md rounded-md m-4 md:m-0">

        <h1 class="text-xl mb-5 font-bold text-center text-gray-700">
          Sign Up
        </h1>

        <form @submit.prevent="handleSubmit">

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Name
              </label>
              
              <input 
                v-model="form.name" 
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
                v-model="form.phone"
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

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              
              <input 
                v-model="form.passwordConfirm" 
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
                class="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>

        </form>

        <div class="text-gray-400 text-sm text-center font-thin mt-10">
          Already have an account? 
          <RouterLink to="/accounts/signin" class="text-rose-500 hover:text-rose-700 hover:font-semibold">
            Sign In
          </RouterLink>
        </div>

      </div>
    </div>
  </section>
</template>

<!-- fixa@mailinator.com -->
 <!-- password  -->