<script setup>
import html2canvas from 'html2canvas'
import { inject, ref } from 'vue'

const getProps = inject('getProps')
const propsData = getProps()

console.log(propsData);

const capture = ref(null)

const downloadImage = async () => {
  if (capture.value) {
    try {
      const canvas = await html2canvas(capture.value, { scale: 20 })
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `achilles_drill_${propsData.name}.png`
      link.click()
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="result-page">
    <div class="content">
      <div ref="capture" class="result-image">
        <div class="result-img">
          <img class="resultImg" :src="propsData.img" alt="Uploaded Image" />
        </div>

        <p class="name">{{ propsData.name }}</p>
        <p class="role">{{ propsData.role }}</p>
      </div>
    </div>
    <button @click="downloadImage">Download</button>
  </div>
</template>

<style scoped>
.result-page {
  width: 262px;
  height: 267px;
  margin: auto;
}
.content {
  width: 330px;
  height: 350px;
  margin: auto;
}
.result-image {
  margin: auto;
  background-image: url('../img/birthday-template-2.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.result-img {
  position: absolute;
  background-color: #d9d9d9;
  width: 32%;
  height: 127px;
  margin-top: 70px;
  margin-left: 38.2px;
}
.resultImg {
  width: 100%;
  height: 100%;
}
.name,
.role {
  font-size: 2.8vw;
  color: black;
}
.name {
  position: absolute;
  margin-top: 155px;
  margin-left: 56%;
}
.role {
  position: absolute;
  margin-top: 170px;
  margin-left: 56%;
}
.downloadResult {
  width: 40%;
  padding: 10px 15px;
  background-color: #dc7360;
  color: white;
  border-radius: 20px;
  box-shadow: 2px 6px 2px #000000;
  margin-left: 60%;
  font-weight: 600;
  font-size: 1em;
  margin-top: 25px;
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .result-page {
    width: 512px;
    height: 530px;
    margin: auto;
  }
  .result-image {
    width: 100%;
    height: 100%;
  }
  .result-img {
    margin-top: 26.4%;
    margin-left: 14%;
    width: 32%;
    height: 48%;
  }
  .name,
  .role {
    font-size: 1.2em;
  }
  .name {
    position: absolute;
    margin-top: 60%;
    margin-left: 56%;
  }
  .role {
    position: absolute;
    margin-top: 65%;
    margin-left: 56%;
  }
  .downloadResult {
    margin-top: 30px;
    width: 34%;
    font-size: 1.5em;
    padding: 13px 30px;
  }
}
@media screen and (min-width: 1024px) {
  .result-page {
    width: 330px;
    height: 350px;
    margin: auto;
  }
  .result-image {
    width: 100%;
    height: 100%;
  }
  .result-img {
    margin-top: 29%;
    width: 32.3%;
    height: 45.2%;
    margin-left: 14%;
  }
  .name,
  .role {
    font-size: 13px;
  }
  .name {
    margin-top: 61%;
  }
  .role {
    margin-top: 66.5%;
  }

  .downloadResult {
    margin-top: 20px;
  }
}
</style>
