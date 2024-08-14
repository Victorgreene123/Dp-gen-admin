<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { admin, setupCurrentAdmin } from '../stores/admin.js'
import { allAdminData,setupAllAdmin  } from '../stores/allAdmin.js'

const router = useRouter()
// set up admin current details
setupCurrentAdmin()
if (!admin.isAuthenticated) {
  // router.push('/')
}
console.log(admin)

//set up all admin details
setupAllAdmin()

const dataAvailable = ref(false)
const maxRetries = 20
const retryInterval = 1000
let adminn = ref('')

const waitForData = async () => {
  let retries = 0

  while (retries < maxRetries) {
    try {
      adminn.value = await allAdminData.all.admins
      if (adminn.value && adminn.value.length > 0) {
        // Exit the function if data is available
        return
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    }

    console.log(adminn.value ? adminn.value.length : 'No data')
    retries++
    console.log(retries)
    await new Promise((resolve) => setTimeout(resolve, retryInterval))
  }

  console.log('No data available after maximum retries.')
  dataAvailable.value = true // Set to true even if no data is found to avoid infinite waiting
}

onMounted(waitForData)

const deleteUser = async (userId) => {
  try {
    
    const stringUserId = String(userId);

    await axios.delete('https://achilles-web-be.onrender.com/admin/remove', {
      data: { _id: stringUserId }
    });

    console.log('User deleted successfully');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};

</script>

<template>
  <NavBar :userData="userData" />
  <div class="main-content">
    <div class="manageadmin-container">
      <div class="title">
        <h1>Manage Admin</h1>
      </div>
      <div class="add-admin">
        <router-link to="manage-admins/add-admin">Add Admin</router-link>
      </div>
      <div class="all-admin">
        <div class="table">
          <div class="head">
            <h4>Name</h4>
            <h4>Email</h4>
            <h4>Role</h4>
            <h4>Action</h4>
          </div>
          <div class="body">
            <div class="row" v-for="item in adminn" :key="item._id">
              <p>{{item.fullname}}</p>
              <p>{{item.email}}</p>
              <p>{{item.role}}</p>
              <button  @click="deleteUser(item._id)">Delete</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manageadmin-container {
  width: 80%;
  margin: 30px auto 0;
}

.manageadmin-container {
  margin-top: 100px;
}

.title {
  color: var(--dark-1);
}

.manageadmin-container .title h1 {
  font-family: 'Raleway';
  background: #000;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.all-admin {
  padding: 30px;
  margin-top: 30px;
  background: linear-gradient(30deg, var(--bright-1), #fff);
  border-radius: 20px;
}

.table {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  font-size: clamp(10px, 2vw, 16px);
}

.head,
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
  margin-bottom: 15px;
}

.head h4 {
  font-family: 'Poppins';
  color: #333;
  text-align: center;
}

.row {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.row p {
  font-family: 'Montserrat';
  text-align: center;
}

.add-admin {
  margin: 30px 0 20px 0;
}

.add-admin a {
  padding: 12px 20px;
  background: #000;
  color: #fff;
  border-radius: 20px;
  font-family: 'Montserrat';
  box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.4);
}

.del{
  padding: 12px 15px;
  background: var(--red-1);
  color: #fff;
  border-radius: 20px;
  font-family: 'Montserrat';
}
  
@media (min-width: 768px) {
  .main-content {
    width: 75vw;
    position: absolute;
    right: 0;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .main-content {
    width: 70vw;
  }
}
</style>
