import { reactive, onMounted } from 'vue'
import axios from 'axios'

// initialize if authenticated and admin details
const admin = reactive({
  isAuthenticated: false,
  adminDetails: []
})

// fetch current admin
const fetchAdminDetails = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('https://achilles-web-be.onrender.com/admin/current', {
      headers: { Authorization: `Bearer ${token}` }
    })
    admin.isAuthenticated = true
    admin.adminDetails = response.data
  } catch (error) {
    admin.isAuthenticated = false
    admin.adminDetails = error
  }
  return admin
}

// setup onMounted hook
const setupAdminStore = () => {
  onMounted(async () => {
    await fetchAdminDetails()
  })
}

export { admin, fetchAdminDetails, setupAdminStore }
