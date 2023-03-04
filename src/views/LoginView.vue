<template>
 <v-card elevation="3" style=" padding: 3rem; width: 450px; height: 500px; justify-content: center;" image="https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg">
      <v-card-title class="text-h5 text-center">
        <v-icon size="100px">mdi-shield-lock-open-outline</v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-form @submit.prevent="login">
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
                <v-btn type="submit" block class="mt-2"  >LOGIN</v-btn>
                <router-link to="/register">go to register</router-link>
            
         </v-form>
      </v-card-subtitle>
    </v-card>


</template>
<script>
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,updateProfile, signInWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue'
export default{
    setup() {
      const auth = getAuth();
      const email= ref([]);
      const password= ref([]);
      const login = () => {
			  console.log('login', email.value, password.value);
        signInWithEmailAndPassword(auth,email.value,password.value)
        .then((result)=>{
                alert("Login success. !!!")
                }).catch((error)=>{
                alert(error.message)
                })
                
		}
        return{
            email,
            password,
            login
        }
    }

}
</script>