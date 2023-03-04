<template>
    <v-card elevation="3" style=" padding: 3rem; width: 450px; height: 500px; justify-content: center;" image="https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg">
         <v-card-title class="text-h5 text-center">
           <v-icon size="100px">mdi-shield-lock-outline</v-icon>
         </v-card-title>
         <v-card-subtitle>
            <v-form @submit.prevent="register">
           <v-text-field 
            v-model="email"   
            label="Email"
            name="email"            
           ></v-text-field>
           <v-text-field
            v-model="password"
            label="Password"
            name="password"             
           ></v-text-field>
           <v-text-field
            v-model="Cpassword"
            label="Confirm Password"
            name="Cpassword"             
           ></v-text-field>
           
                <v-btn type="submit" block class="mt-2"  >REGISTER</v-btn>
                <router-link to="/">go to login</router-link>
            
         </v-form>
      </v-card-subtitle>
    </v-card>


</template>
<script >
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,updateProfile } from '@firebase/auth';
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
export default{
    setup() {
        const auth = getAuth();
        const email = ref([]);
        const password = ref([]);
        const Cpassword = ref([]);
        const register = () => {
			console.log('register', email.value , password.value , Cpassword.value);


            if (password.value != Cpassword.value) {
                alert("Password is not matched. please try again!!!")
                
            } else {
                createUserWithEmailAndPassword(auth,email.value,password.value)
                .then((result)=>{
                alert("Register success. !!!")
                
                }).catch((error)=>{
                alert(error.message)
                })
            }
		}
        return{
            password,
            Cpassword,
            email,
            register
        }
    }

}
</script>
  