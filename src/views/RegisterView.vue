<template>
    <main>
    <v-card elevation="3" style=" padding: 3rem; width: 450px; height: 500px; margin-top: 50%;" image="https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg">
         <v-card-title class="text-h5 text-center">
           <v-icon size="100px">mdi-shield-lock-outline</v-icon>
         </v-card-title>
         <v-card-subtitle>
            <v-form @submit.prevent="register">
           <v-text-field 
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
          :rules="[rules.email]"        
           ></v-text-field>
           <v-text-field
           :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          @keyup.enter="register()"
          v-model="password"
          :rules="[rules.required, rules.length(6)]"       
           ></v-text-field>
           <v-text-field
          :type="visible ? 'text' : 'password'"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="Cpassword"
          :rules="[rules.required, rules.length(6)]"             
           ></v-text-field>
           
                <v-btn type="submit" block class="mt-2"  >REGISTER</v-btn>
                <router-link to="/">go to login</router-link>
            
         </v-form>
      </v-card-subtitle>
    </v-card>
</main>

</template>
<script setup>
import { getAuth,createUserWithEmailAndPassword} from '@firebase/auth';
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'
        const router = useRouter()
        const auth = getAuth();
        const email = ref([]);
        const password = ref([]);
        const Cpassword = ref([]);
        const visible = ref(false)
        const rules = ref({
  email: (v) => !!(v || '').match(/@/) || 'กรุณากรอก e-mail',
  required: (value) => !!value || 'กรุณากรอกรหัสผ่าน',
  length: (len) => (v) => (v || '').length >= len || `รหัสผ่านต้องมีความยาว ${len} ตัวขึ้นไป`})
        function register() {
			console.log('register', email.value , password.value , Cpassword.value);
            if (password.value != Cpassword.value) {
                alert("Password is not matched. please try again!!!")
            } else {
                createUserWithEmailAndPassword(auth,email.value,password.value)
                .then((result)=>{
                alert("Register success. !!!")
                router.push('/')
                }).catch((error)=>{
                alert(error.message)
                })
            }
            return{
            password,
            Cpassword,
            email,
            register
        }
		}

    


</script>
  