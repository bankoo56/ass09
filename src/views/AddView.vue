<template>
    
    <div style="flex-basis: 50%; display: flex; align-items: center; justify-content: center;" id="view">
        <v-card elevation="3" style=" padding: 3rem; width: 450px; height: 500px; justify-content: center;"
            image="https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg">
            <v-card-title class="text-h5 text-center">
                <v-icon size="100px">mdi-food</v-icon>
                <h2>เพิ่มรายการอาหาร</h2>
            </v-card-title>
            <v-card-subtitle>
                <v-form @submit.prevent="add" style="text-align: center;">
                    <v-text-field label="ชื่ออาหาร" variant="underlined" v-model="menu.name"></v-text-field>
                    <v-text-field type="number" label="ราคา" variant="underlined" v-model="menu.price"
                        suffix="$"></v-text-field>
                    <v-text-field label="สูตรอาหาร" variant="underlined" v-model="menu.recipe"></v-text-field>
                    <v-btn type="submit" block class="mt-2">ADD</v-btn>
                    <v-btn variant="plain" @click="logout">
                        <p> Logout</p>
                    </v-btn>

                </v-form>
            </v-card-subtitle>
        </v-card>
    </div>
    <div class="card" style="flex-basis: 50%; opacity: 90%;  height: 100%;">
      <v-btn @click="show"> แสดงรายการอาหาร</v-btn>
      <v-table>
        <thead>
          <tr>
            <th>รายการอาหาร</th>
            <th>สูตรอาหาร</th>
            <th>ราคา</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(menulist, index) in list" :key="index">
              <td>
                <p v-if="menulist != editText">{{ menulist.data.name }}</p>
                <v-text-field
                  v-else
                  variant="underlined"
                  v-model="menu.name"
                ></v-text-field>
              </td>
              <td >
                <p v-if="menulist != editText" style="max-width: 500px; ">{{ menulist.data.recipe }}</p>
                <v-text-field
                  v-else
                  variant="underlined"
                  v-model="menu.recipe"
                ></v-text-field>
              </td>
              <td>
                <p v-if="menulist != editText">{{ menulist.data.price }}</p>
                <input v-else type="number" v-model="menu.price" />
              </td>
              <td>
                <div class="text-center" v-if="menulist != editText">
                  <v-btn  variant="plain" @click="editMenu(menulist)">
                    <v-icon icon="mdi-note-edit-outline"></v-icon>
                  </v-btn>
                  <v-btn variant="plain" @click="deleteMenu(menulist.id, index)">
                    <v-icon icon="mdi-trash-can-outline"></v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn class="btnconfirm" color="green" @click="updateMenu(menulist.id)">
                    <v-icon icon="mdi-note-check-outline"></v-icon>
                  </v-btn>
                  <v-btn class="btncancel" color="red" @click="cancelUpdate()">
                    <v-icon icon="mdi-note-remove-outline"/>
                  </v-btn>
                </div>
              </td>
            </tr>
        </tbody>
      </v-table>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const menu = ref({
    name: '',
    price: 0,
    recipe: ''
})
const list = ref([])
const editText = ref([])

async function add() {
    try {
        const docRef = await addDoc(collection(db, 'Food'), menu.value)
        console.log('Document ID: ', docRef.id)
        alert('เพิ่มรายการเสร็จสิ้น')
    } catch (e) {
        console.error('Error: ', e)
    }
}
function logout() {
    const auth = getAuth()
    signOut(auth)
        .then(() => {
            if (confirm('Logout ?')) {
                router.push('/')
            }
        })
        .catch((error) => { })
}
async function show() {
  const querySnapshot = await getDocs(collection(db, 'Food'))
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
    const myDoc = ref({ id: doc.id, data: doc.data() })
    list.value.push(myDoc.value)
  })
}
function editMenu(menulist) {
  editText.value = menulist
  menu.value = menulist.data
}
async function updateMenu(id) {
  if (confirm('ยืนยันการแก้ไข ?')) {
    try {
      const washingtonRef = doc(db, 'Food', id)
      await updateDoc(washingtonRef, menu.value)
      console.log('update..')
    } catch (e) {
      console.error(e)
    }
    readUpdateMenu(id)
  }
}
async function readUpdateMenu(id) {
  const docRef = doc(db, 'Food', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists(id)) {
    console.log(id, docSnap.data())
    const newEdit = docSnap.data()
    editText.value = newEdit
  } else {
  }
}
function cancelUpdate() {
  editText.value = null
}
async function deleteMenu(id, index) {
  if (confirm('ลบรายการ ?')) {
    await deleteDoc(doc(db, 'Food', id))
    console.log('Delete document with ID:', id)
    list.value.splice(index, 1)
  }
}
</script>