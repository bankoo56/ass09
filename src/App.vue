<template>  
<v-app>
  <body>
      <router-view></router-view>
  </body>

</v-app>
</template>

<script setup>
import { ref } from 'vue'
import { db } from './Firebase'
import { routerViewLocationKey } from 'vue-router';
const menu = ref({
  name: '',
  price: 0,
  recipe: ''
})
const editText = ref([])
const list = ref([])
const dialog = ref(false)


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

<style scoped>
body{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem 5% 1rem 5%;  
  background-image:  url(https://i.ibb.co/vdyj8NS/925536.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

</style>