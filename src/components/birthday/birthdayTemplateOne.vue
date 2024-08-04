<script setup>
import html2canvas from 'html2canvas'
import { inject, ref } from 'vue'

const getProps = inject('getProps')
const propsData = getProps()

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
  height: 367px;
  margin: auto;
}
.content {
  width: 330px;
  height: 400px;
  margin: auto;
}
.result-image {
  margin: auto;
  background-image: url('../../img/birthday-template-1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.result-img,
.name,
.role {
  transform: rotate(-6.46deg);
}
.result-img {
  position: absolute;
  border-radius: 5px;
  background-color: #d9d9d9;
  width: 50%;
  height: 100px;
  margin-top: 80px;
  margin-left: 60px;
}
.resultImg {
  border-radius: 5px;
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
  margin-top: 190px;
  margin-left: 26%;
  color: black;
}
.role {
  position: absolute;
  margin-top: 205px;
  margin-left: 27%;
  color: black;
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
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .result-page {
    width: 512px;
    height: 614px;
    margin: auto;
  }
  .result-image {
    width: 100%;
    height: 100%;
  }
  .result-img {
    margin-top: 22%;
    margin-left: 23%;
    width: 50%;
    height: 32%;
  }
  .name,
  .role {
    font-size: 1.2em;
  }
  .name {
    position: absolute;
    margin-top: 64%;
    margin-left: 27%;
  }
  .role {
    position: absolute;
    margin-top: 69.5%;
    margin-left: 28%;
  }
  .downloadResult {
    margin-top: 30px;
    width: 34%;
    font-size: 1.5em;
  }
}
@media screen and (min-width: 1024px) {
  .result-page {
    width: 330px;
    height: 400px;
    margin: auto;
  }
  .result-image {
    width: 100%;
    height: 100%;
  }
  .result-img {
    margin-top: 22%;
    width: 50%;
    height: 32%;
    margin-left: 23%;
  }
  .resultImg {
    width: 100%;
    height: 100%;
  }
  .name,
  .role {
    font-size: 15px;
  }
  .name {
    margin-top: 63%;
  }
  .role {
    margin-top: 69%;
  }

  .downloadResult {
    margin-top: 20px;
  }
}
</style>
