import birthday from '@/stores/birthday'
import certificate from '@/stores/certificate'
import { computed, onMounted, ref, watch } from 'vue'

// FETCH BIRTHDAY AND USE IT
const birthdayData = ref(null)
const certificateData = ref(null)

const allBirthday = ref([])
const allCertificate = ref([])

const filteredBirthady = ref([])
const filteredCertificate = ref([])

const joinBothDataTogrther = ref([])

// join both certificate and birthday
const handleBothBirthdayAndCertificate = async () => {
  try {
    const birthdayResult = await birthday(birthdayData)
    allBirthday.value = birthdayResult.birthdays
    filteredBirthady.value = allBirthday.value.map(
      ({ caption, fullname, role, photo, created_at, time }) => ({
        caption,
        fullname,
        role,
        photo,
        created_at: new Date(created_at).toISOString().split('T')[0],
        time: new Date(created_at).toISOString().split('T')[1].split('.')[0],
        type_name: 'birthday'
      })
    )

    const certificateResult = await certificate(certificateData)
    allCertificate.value = certificateResult.certificates
    filteredCertificate.value = allCertificate.value.map(
      ({ caption, fullname, role, created_at, time }) => ({
        caption,
        fullname,
        role,
        created_at: new Date(created_at).toISOString().split('T')[0],
        time: new Date(created_at).toISOString().split('T')[1].split('.')[0],
        type_name: 'certificate'
      })
    )

    joinBothDataTogrther.value = [...filteredBirthady.value, ...filteredCertificate.value]
    joinBothDataTogrther.value = joinBothDataTogrther.value.map((item, index) => ({
      id: index + 1,
      ...item
    }))
    // Initial search to populate results
    performSearch()
  } catch (error) {
    console.error(error)
  }
}

const filteredResults = ref([])
const searchCriteria = ref({
  fullname: '',
  type_name: '',
  created_at: ''
})

// perform search
const performSearch = () => {
  filteredResults.value = joinBothDataTogrther.value.filter((item) => {
    const matchName = searchCriteria.value.fullname
      ? item.fullname.toLowerCase().includes(searchCriteria.value.fullname.toLowerCase())
      : true
    const matchTypeName = searchCriteria.value.type_name
      ? item.type_name.toLowerCase() === searchCriteria.value.type_name.toLowerCase()
      : true
    const matchDate = searchCriteria.value.created_at
      ? item.created_at && item.created_at.startsWith(searchCriteria.value.created_at)
      : true

    return matchName && matchTypeName && matchDate
  })
}

// handleBothBirthdayAndCertificate when mounted
const setuphandleBothBirthdayAndCertificate = () => {
  onMounted(() => {
    handleBothBirthdayAndCertificate()
  })
}

// watch for input when seraching
const watchOnSearchInInput = () => {
  watch(searchCriteria, performSearch, { deep: true })
}

const currentPage = ref(1)
const itemsPerPage = ref(10) // Set items per page to 10

// Computed property for paginated items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredResults.value.slice(start, end)
})

// VIEW DP
const viewDP = ref(false)
let dpAboutToBeViewd = ref([])

const cancelView = () => {
  viewDP.value = !viewDP.value
}

// VIEW BIRTHDAY AND CERTIFICATE
const selectedUser = ref([])
const isBirthday = ref(false)
const viewImage = async (id) => {
  try {
    const user = joinBothDataTogrther.value.find((item) => item.id === id)
    selectedUser.value = user
    viewDP.value = true
    if (selectedUser.value.type_name === 'birthday') {
      isBirthday.value = true
    } else {
      isBirthday.value = false
    }
    dpAboutToBeViewd.value = {
      img: user.photo || '',
      name: user.fullname || '',
      role: user.role || '',
      caption: user.caption || ''
    }
  } catch (error) {
    console.error(error)
  }
}

export {
  setuphandleBothBirthdayAndCertificate,
  performSearch,
  filteredResults,
  searchCriteria,
  joinBothDataTogrther,
  watchOnSearchInInput,
  cancelView,
  viewImage,
  paginatedItems,
  itemsPerPage,
  currentPage,
  viewDP,
  isBirthday,
  dpAboutToBeViewd,
}
