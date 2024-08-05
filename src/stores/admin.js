import { reactive, onMounted } from 'vue'
import axios from 'axios'

// initialize if authenticated and admin details
const admin = reactive({
  isAuthenticated: false,
  adminDetails: '',
  error: ''
})

// fetch current admin
const currentAdmin = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('https://achilles-web-be.onrender.com/admin/current', {
      headers: { Authorization: `Bearer ${token}` }
    })
    admin.isAuthenticated = true
    admin.adminDetails = response.data
    admin.error = ''
  } catch (error) {
    admin.isAuthenticated = false
    admin.adminDetails = ''
    admin.error = error
  }
  return admin
}

// setup onMounted hook
const setupCurrentAdmin = () => {
  onMounted(async () => {
    await currentAdmin()
  })
}

export { admin, currentAdmin, setupCurrentAdmin }
