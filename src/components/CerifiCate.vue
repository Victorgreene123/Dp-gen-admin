<script setup>
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  role: {
    type: String,
    required: true,
    default: ''
  },
  type: {
    type: String,
    required: true,
    default: ''
  }
})

const contentToDownload = ref(null)
const certificateText = ref('')

const updateCertificateText = () => {
  switch (props.type) {
    case 'Certificate of Service':
      certificateText.value = `For his role as ${props.role} with Achilles Drill, having been a dynamic and dedicated member of the team. Your commitment and contributions are highly valued and appreciated.`
      break
    case 'Certificate of Excellence':
      certificateText.value = 'For outstanding performance and exceptional contributions to Achilles Drill. Your excellence in executing tasks and your unwavering dedication have set a high standard for others.'
      break
    case 'Certificate of Achievement':
      certificateText.value = 'In recognition of your significant achievements and exceptional performance at Achilles Drill. Your hard work and perseverance have greatly contributed to the success of the team.'
      break
    case 'Certificate of Appreciation':
      certificateText.value = 'In gratitude for your invaluable contributions and unwavering support to Achilles Drill. Your dedication and hard work are truly appreciated and have made a remarkable difference.'
      break
    case 'Certificate of Recognition':
      certificateText.value = 'In recognition of your exceptional skills and outstanding dedication to Achilles Drill. Your consistent efforts and professional excellence have greatly benefited the organization.'
      break
    default:
      certificateText.value = ''
  }
}

const downloadAsHTML = async () => {
  if (contentToDownload.value) {
    const canvas = await html2canvas(contentToDownload.value)
    canvas.toBlob((blob) => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'certificate.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
}

onMounted(() => {
  contentToDownload.value = document.querySelector('.certificate_bg')
  updateCertificateText()
})
</script>

<template>
  <!--<main class="main" id="app">-->
  <!--  <div class="certificate">-->
  <!--    <div class="certificate_bg" ref="contentToDownload">-->
  <!--      <img-->
  <!--        alt="certificate-image"-->
  <!--        src="../img/certificate.jpeg"-->
  <!--        class="certificate_img"-->
  <!--        width="500"-->
  <!--        height="400"-->
  <!--      />-->
  <!--      <h1 class="certificate_title">{{ type }}</h1>-->
  <!--      <h1 class="certificate_name">{{ name }}</h1>-->
  <!--      <p class="certificate_text" v-if="certificateText">{{ certificateText }}</p>-->
  <!--    </div>-->
  <!--    <button class="certificate_btn" @click="downloadAsHTML">Download</button>-->
  <!--  </div>-->
  <!--</main>-->
  <h1>hh</h1>
</template>

