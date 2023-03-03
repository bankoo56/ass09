<template>  
<v-app>
    

  <body>
    <div style="flex-basis: 40%; display: flex; align-items: center; justify-content: center;">
      <router-view></router-view>
    </div>
    

    <div class="card" style="flex-basis: 60%; opacity: 90%;">
      <v-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>

      </v-table>
    </div>
    
  </body>



</v-app>

</template>

<script setup>
 
  
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