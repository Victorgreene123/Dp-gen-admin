import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
const router = useRouter()

const adminData = reactive({
  message: '',
  error: '',
  isAdded: false
})

const email = ref('')
const password = ref('')
const fullname = ref('')
const role = ref('Editor')

const addAdmin = async () => {
  try {
    const { data } = await axios.put('https://achilles-web-be.onrender.com/admin/add', {
      email: email.value,
      password: password.value,
      role: role.value,
      fullname: fullname.value
    })
    console.log(data)
    adminData.message = data
    adminData.isAdded = true
    
    if (adminData.isAdded) {
      router.push('/manage-admins')
    }
  } catch (error) {
    adminData.error = error
    adminData.isAdded = false

    adminInnerText.value = 'Add Admin'
    disableBtn.value = false
  }
  return adminData
}

// disable button and change text when adding admin
const adminInnerText = ref('Add Admin')
const disableBtn = ref(false)

const isAddAdmin = () => {
  adminInnerText.value = 'Adding Admin...'
  setTimeout(() => {
    disableBtn.value = true
  }, 10)
}

// setup onMounted hook
const setupAddAdmin = () => {
  onMounted(async () => {
    await addAdmin()
  })
}

export {
  setupAddAdmin,
  addAdmin,
  adminData,
  email,
  password,
  fullname,
  isAddAdmin,
  adminInnerText,
  disableBtn,
}
