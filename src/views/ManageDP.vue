<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Pagination from '@/components/PagiNation.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import birthday from '@/stores/birthday'

const router = useRouter()

const message = ref('')
const userData = ref(null)
const birthdayData = ref(null)
let filteredBirthady = ref([])
let paginatedItems = ref('')

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

const handleBirthday = async () => {
  try {
    const result = await birthday(birthdayData)
    const allBirthday = result.birthdays
    filteredBirthady.value = allBirthday.map(({ caption, fullname, role, photo }) => ({
      caption,
      fullname,
      role,
      photo
    }))

    filteredBirthady.value = filteredBirthady.value.map((item, index) => ({
      id: index + 1,
      ...item
    }))

    // Computed properties for paginated items
    paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredBirthady.value.slice(start, end)
    })
    console.log(filteredBirthady.value) // Handle the resolved value here
  } catch (error) {
    console.error(error) // Handle any errors here
  }
}
//localStorage.setItem(`birthdayD`, birthdayD)

onMounted(handleBirthday)
// Sample data
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
  { id: 9, name: 'Item 9' },
  { id: 10, name: 'Item 10' },
  { id: 11, name: 'Item 11' },
  { id: 12, name: 'Item 12' },
  { id: 13, name: 'Item 13' },
  { id: 14, name: 'Item 14' },
  { id: 15, name: 'Item 15' }
])

// Pagination states
// const currentPage = ref(1)
// const itemsPerPage = ref(10) // Set items per page to 10

// // Computed properties for paginated items
// const paginatedItems = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage.value
//   const end = start + itemsPerPage.value
//   return items.value.slice(start, end)
// })
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
            <!-- <div class="row">
              <p>John Doe</p>
              <p>Birthday Flyer</p>
              <p>2024-06-20</p>
              <p>Generated</p>
              <form action="">
                <input type="text" v-model="id" class="delID" />
                <button class="delBtn">Delete</button>
              </form>
            </div>
            <div class="row">
              <p>Mae Doe</p>
              <p>Certificate Flyer</p>
              <p>2024-2-20</p>
              <p>Generated</p>
              <form action="">
                <input type="text" v-model="id" class="delID" />
                <button class="delBtn">Delete</button>
              </form>
            </div>
             <div class="row">
              <p>Mae Doe</p>
              <p>Certificate Flyer</p>
              <p>2024-2-20</p>
              <p>Generated</p>
              <form action="">
                <input type="text" v-model="id" class="delID" />
                <button class="delBtn">Delete</button>
              </form>
            </div>
            <div class="row">
              <p>John Doe</p>
              <p>Birthday Flyer</p>
              <p>2024-06-20</p>
              <p>Generated</p>
              <form action="">
                <input type="text" v-model="id" class="delID" />
                <button class="delBtn">Delete</button>
              </form>
            </div> -->

            <div class="row" v-for="item in paginatedItems" :key="item.id">
              <p>
                {{ item.fullname }}
              </p>
              <p>Bir</p>
              <p>2024-06-20</p>
              <button class="delBtn">Delete</button>
            </div>
            <Pagination
              :totalItems="filteredBirthady.length"
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
</template>

<style scoped>
.delID {
  visibility: hidden;
  padding: 0;
  width: 0;
  margin: 0;
  height: 0;
}

.delBtn {
  background: rgb(155, 3, 3);
  color: var(--bright-1);
  padding: 8px 6px;
  width: 70%;
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
