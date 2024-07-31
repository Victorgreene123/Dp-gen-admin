<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Pagination from '@/components/PagiNation.vue'
import axios from 'axios'
// import { useRouter } from 'vue-router'
import birthday from '@/stores/birthday'
import certificate from '@/stores/certificate'

// const router = useRouter()

const message = ref('')
const userData = ref(null)

// for pagination
const currentPage = ref(1)
const itemsPerPage = ref(10) // Set items per page to 10

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('https://achilles-web-be.onrender.com/admin/current', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    message.value = response.data
    userData.value = response.data

    // console.log(response.data);
  } catch (error) {
    message.value = 'You are not authorized to view this page.'
    console.log(message.value)
    // router.push('/')
  }
})

// FETCH BIRTHDAY AND USE IT
const birthdayData = ref(null)
let filteredBirthady = ref([])
let paginatedItems = ref('')
let allBirthday = ref([])

const certificateData = ref(null)
let filteredCertificate = ref([])
let allCertificate = ref([])

let joinBothDataTogrther = ref([]

)
const handleBothBirthdayAndCertificate = async () => {
  try {
    const birthdayResult = await birthday(birthdayData)
    allBirthday.value = birthdayResult.birthdays
    filteredBirthady.value = allBirthday.value.map(({ caption, fullname, role, photo }) => ({
      caption,
      fullname,
      role,
      photo,
      type_name: 'birthday'
    }))

    const certificateResult = await certificate(certificateData)
    allCertificate.value = certificateResult.certificates
    filteredCertificate.value = allCertificate.value.map(({ caption, fullname, role }) => ({
      caption,
      fullname,
      role,
      type_name: 'certificate'
    }))

     joinBothDataTogrther.value = [...filteredBirthady.value, ...filteredCertificate.value]
    joinBothDataTogrther.value = joinBothDataTogrther.value.map((item, index) => ({
      id: index + 1,
      ...item
    }))
    console.log(joinBothDataTogrther)

    // PAGINATION
    // Computed properties for paginated items
    paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return joinBothDataTogrther.value.slice(start, end)
    })
  } catch (error) {
    console.error(error)
  }
}

onMounted(handleBothBirthdayAndCertificate)

// VIEW DP
const viewDP = ref(false)
const cancelView = () => {
  viewDP.value = !viewDP.value
}

// VIEW BIRTHDAY
const selectedUser = ref([])
const viewImage = async (id) => {
  try {
    const user = filteredBirthady.value.find((item) => item.id === id)
    selectedUser.value = user
    viewDP.value = true
  } catch (error) {
    console.error(error)
  }
}

// DOWNLOAD BIRTHDAY
const downloadImage = async () => {
  if (selectedUser.value && selectedUser.value.photo) {
    try {
      const response = await fetch(selectedUser.value.photo)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedUser.value.fullname}_photo.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url) // Clean up the URL object
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  } else {
    console.error('No image to download or image URL is invalid')
  }
}
</script>

<template>
  <NavBar :userData="userData" />
  <div class="main-content">
    <div class="managedp-container">
      <div class="title">
        <h1>Manage Generated DPs</h1>
        <p>Check in generated DPs</p>
      </div>

      <div class="search-container">
        <div class="input-container">
          <input type="text" id="search" placeholder="Search by name" />
          <input type="date" id="dateFilter" name="dateFilter" placeholder="Filter by date" />
        </div>
        <select id="typeFilter">
          <option value="">All Types</option>
          <option value="Certificate">Certificate</option>
          <option value="Birthday Flyer">Birthday Flyer</option>
        </select>
      </div>
      <div class="all-dps">
        <div class="table">
          <div class="head">
            <h4>Name</h4>
            <h4>Type</h4>
            <h4>Date</h4>
            <h4>View</h4>
          </div>
          <div class="body">
            <div class="row" v-for="item in paginatedItems" :key="item.id">
              <p>
                {{ item.fullname }}
              </p>
              <p>Bir</p>
              <p>2024-06-20</p>
              <button class="viewBtn" @click="viewImage(item.id)">View</button>
            </div>
            <Pagination
              :totalItems="joinBothDataTogrther.length"
              :itemsPerPage="itemsPerPage"
              v-model="currentPage"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="batch-download">
      <div class="title">
        <h2>Batch Download</h2>
        <p>Generate multiple certuficate</p>
        <input type="file" id="csvUpload" />
        <button>Generate Certificate</button>
      </div>
    </div>
  </div>

  <div class="view-dp" :class="{ active: viewDP }">
    <i class="fa-solid fa-x" @click="cancelView"></i>
    <img :src="selectedUser.photo" alt="User Photo" />
    <div class="btns">
      <button @click="downloadImage">Download</button>
    </div>
  </div>
</template>

<style scoped>
.view-dp.active {
  display: flex;
}

.view-dp {
  position: fixed;
  height: 90vh;
  width: 90vw;
  backdrop-filter: blur(20px);
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: none;
}

.view-dp img {
  height: 300px;
  width: 300px;
}

.view-dp .fa-x {
  position: fixed;
  top: 40px;
  right: 40px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}

.view-dp .btns {
  width: 300px;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.view-dp .btns button {
  border-radius: 20px;
  background: #000;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  font-family: 'Montserrat';
  background: green;
}

.delID {
  visibility: hidden;
  padding: 0;
  width: 0;
  margin: 0;
  height: 0;
}

.viewBtn {
  background: var(--blue-2);
  color: var(--bright-1);
  padding: 8px 6px;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.4);
}

.managedp-container,
.batch-download {
  width: 80%;
  margin: 30px auto 0;
}

.managedp-container {
  margin-top: 100px;
}

.batch-download {
  margin-top: 60px;
}
.title {
  color: var(--dark-1);
}

.managedp-container .title h1 {
  font-family: 'Raleway';
  background: #000;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.batch-download h2 {
  font-family: 'Raleway';
  color: var(--blue-2);
}

.managedp-container .title p,
.batch-download .title p {
  font-family: 'Montserrat';
  padding: 10px 0;
}

.search-container {
  margin-top: 20px;
}

.input-container {
  display: flex;
  justify-content: space-between;
}

input {
  display: block;
  border-radius: 20px;
  border: 2px solid var(--dark-1);
  padding: 8px 10px;
  font-family: 'Montserrat';
  margin-bottom: 10px;
  width: 40%;
}

input[type='date'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #f3f3f3;
  border: 1px solid #ccc;
}

input[type='date']::-webkit-inner-spin-button,
input[type='date']::-webkit-calender-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input[type='date']:focus {
  border-color: #5b9dd9;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
}

.batch-download button {
  margin-top: 2em;
  border-radius: 20px;
  background: #000;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  font-family: 'Montserrat';
  width: 40%;
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
  margin-bottom: 15px;
}

.head h4 {
  font-family: 'Poppins';
  color: #333;
}

.row {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.row p {
  font-family: 'Montserrat';
}

.all-dps {
  padding: 30px;
  margin-top: 30px;
  background: linear-gradient(30deg, var(--bright-1), #fff);
  border-radius: 20px;
}

.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
