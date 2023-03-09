<template>
  <div>
 <v-card elevation="3" style=" padding: 3rem; width: 450px; height: 500px; margin-top: 50%;" image="https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg">
      <v-card-title class="text-h5 text-center">
        <v-icon size="100px">mdi-shield-lock-open-outline</v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-form @submit.prevent="login">
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
          @keyup.enter="login()"
          v-model="password"
          :rules="[rules.required, rules.length(6)]"
           ></v-text-field>
                <v-btn type="submit" block class="mt-2"  >LOGIN</v-btn>
                <router-link to="/register">go to register</router-link>
            
         </v-form>
      </v-card-subtitle>
    </v-card>
</div>

</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {getAuth,signInWithEmailAndPassword,} from 'firebase/auth'
      const router = useRouter()
      const auth = getAuth();
      const email= ref([]);
      const password= ref([]);
      const visible = ref(false)
      const rules = ref({
      email: (v) => !!(v || '').match(/@/) || 'กรุณากรอก e-mail',
      required: (value) => !!value || 'กรุณากรอกรหัสผ่าน',
      length: (len) => (v) => (v || '').length >= len || `รหัสผ่านต้องมีความยาว ${len} ตัวขึ้นไป`})
function login() {
			  console.log('login', email.value, password.value);
        signInWithEmailAndPassword(auth,email.value,password.value)
        .then((result)=>{
                alert("Login success. !!!")
                router.push('add')
                }).catch((error)=>{
                alert(error.message)
                })
                return
		}
</script>