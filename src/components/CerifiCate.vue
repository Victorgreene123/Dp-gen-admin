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
  },
  certificateText: {
    type: String,
    required: true,
    default: ''
  }
})

const contentToDownload = ref(null)

//const updateCertificateText = () => {
  
//}

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

//onMounted(() => {
  //contentToDownload.value = document.querySelector('.certificate_bg')
  //updateCertificateText()
//})
</script>

<template>
  <main class="main" id="app">
    <div class="certificate">
      <div class="certificate_bg" ref="contentToDownload">
        <img
          alt="certificate-image"
          src="../img/new certificate-1.jpg"
          class="certificate_img"
          width="500"
          height="400"
        />
        <h1 class="certificate_title">{{ type }}</h1>
        <h1 class="certificate_name">{{ name }}</h1>
        <p class="certificate_text">{{ certificateText }}</p>
      </div>
      <button class="certificate_btn" @click="downloadAsHTML">Download</button>
    </div>
  </main>
  <h1>hh</h1>
</template>

<style scoped>
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px;
  padding: auto 10px;
}
#app {
  height: 100vh;
  position: relative;
}
#app::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.certificate_bg {
  z-index: 10;
  position: relative;
  text-align: center;
}
.certificate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.certificate_img {
  display: relative;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}
.certificate_btn {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  background-color: #dc7630;
  border-radius: 9999px;
  margin-top: 20px;
  margin-left: 275px;
  padding: 10px 26px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 2px 6px 2px #000;
}
.certificate_name {
  position: absolute;
  white-space: nowrap;
  font-size: 35px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-weight: 600;
}
.certificate_text {
  font-size: 18px;
  font-weight: 400;
  position: absolute;
  top: 60%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -60%);
  color: #000;
  z-index: 30;
  line-height: 1.5rem;
}
.certificate_title{
  font-size: 19px;
  font-weight: 500;
  position: absolute;
  top: 28%;
  left: 50%;
  white-space: nowrap;
  z-index: 10;
  transform: translate(-50%, -60%);
  color: #fff;
  z-index: 30;
}
@media (min-width: 1025px){
  .certificate_text{
    font-size: 12px;
    line-height: 1rem;
    top: 55%;
    padding: 0;
    width: 350px;
  }
  .certificate_name{
    font-size: 19px;
    top: 42%;
  }
}
@media (max-width: 1024px) {
  .certificate_img {
    width: 85%;
  }
  .certificate_btn {
    margin-left: 50%;
    padding: 10px 20px;
  }
}
@media (min-width: 771px) and (max-width: 1024px){
  .certificate_name{
    font-size: 27px;
    top: 42%;
  }
  .certificate_text{
    top: 58%;
    font-size: 18px;
    line-height: 1.6rem;
    width: 450px;
  }
  .certificate_title{
    font-size: 26px;
    top: 27%;
  }
}
@media (min-width: 768px) and (max-width: 770px){
  .certificate_name{
    font-size: 25px;
    top: 42%;
  }
  .certificate_text{
    top: 61%;
    font-size: 18px;
    line-height: 1.6rem;
    width: 450px;
  }
  .certificate_title{
    font-size: 20px;
    top: 27%;
  }
}
@media (min-width: 421px) and (max-width: 767px){
  .certificate_name{
    font-size: 14px;
    top: 42%;
  }
  .certificate_text{
    top: 60%;
    font-size: 10px;
    padding: 0;
    line-height: 0.8rem;
  }
  .certificate_title{
    font-size: 14px;
    top: 27%;
  }
}
@media (min-width: 200px) and (max-width: 420px){
  .certificate_name{
    font-size: 10px;
    top: 42%;
  }
  .certificate_text{
    top: 57%;
    font-size: 8px;
    padding: 0;
    line-height: 0.5rem;
  }
  .certificate_title{
    font-size: 10px;
    top: 27%;
  }
}
</style>