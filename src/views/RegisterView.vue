<template>
    <v-card elevation="3" style=" padding: 3rem; width: 450px; height: 500px; justify-content: center;" image="https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg">
         <v-card-title class="text-h5 text-center">
           <v-icon size="100px">mdi-shield-lock-outline</v-icon>
         </v-card-title>
         <v-card-subtitle>
            <v-form @submit.prevent="register">
            <v-text-field 
            v-model="register_form.username"   
            label="Username"
            name="username"            
           ></v-text-field>
           <v-text-field 
            v-model="register_form.email"   
            label="Email"
            name="email"            
           ></v-text-field>
           <v-text-field
            v-model="register_form.password"
            label="Password"
            name="password"            
            
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
export default{
    setup() {
        const auth = getAuth();
        const register_form = ref([]);
        const email = register_form.email;
        const password = register_form.password;
        const register = () => {
			console.log('register', register_form.value);
            createUserWithEmailAndPassword(auth,email,password)
            .then((result)=>{
                alert("สร้างเรียบร้อย")
            }).catch((error)=>{
                alert(error.message)
            })
		}
        
        return{
            register_form,
            register
        }
    }

}
</script>
  