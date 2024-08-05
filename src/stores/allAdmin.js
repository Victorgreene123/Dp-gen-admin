import axios from 'axios'
import { onMounted, reactive } from 'vue'

const allAdminData = reactive({
  all: [],
  error: ''
})

const allAdmin = async () => {
  try {
    const { data } = await axios.get('https://achilles-web-be.onrender.com/admin/all')
    // console.log(data)
    allAdminData.all = data
  } catch (error) {
    allAdminData.error = error
  }
  return allAdmin
}

// setup onMounted hook
const setupAllAdmin = () => {
  onMounted(async () => {
    await allAdmin()
  })
}

export { setupAllAdmin, allAdminData }
