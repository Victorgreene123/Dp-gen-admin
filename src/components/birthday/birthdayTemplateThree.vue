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
.result-page,
.content {
  width: 262px;
  height: 270px;
  margin: auto;
}
.result-image {
  margin: auto;
  background-image: url('../img/birthday-template-3.png');
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
  width: 48%;
  height: 112px;
  margin-top: 35px;
  margin-left: 68px;
}
.resultImg {
  width: 100%;
  height: 100%;
}
.name,
.role {
  font-size: 2.8vw;
  color: blue;
}
.name {
  position: absolute;
  margin-top: 173px;
  margin-left: 42%;
}
.role {
  position: absolute;
  margin-top: 185px;
  margin-left: 43%;
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
  margin-top: 30px;
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .result-page {
    width: 512px;
    height: 520px;
    margin: auto;
  }
  .result-image {
    width: 100%;
    height: 100%;
  }
  .result-img {
    margin-top: 12%;
    margin-left: 26.2%;
    width: 47.5%;
    height: 42%;
  }
  .name,
  .role {
    font-size: 1.2em;
  }
  .name {
    position: absolute;
    margin-top: 64.5%;
    margin-left: 43%;
  }
  .role {
    position: absolute;
    margin-top: 69.5%;
    margin-left: 44%;
  }
  .downloadResult {
    margin-top: 30px;
    width: 34%;
    font-size: 1.5em;
    padding: 10px 30px;
  }
}
@media screen and (min-width: 1024px) {
  .result-page {
    width: 330px;
    height: 340px;
    margin: auto;
  }
  .result-image {
    width: 100%;
    height: 100%;
  }
  .result-img {
    margin-top: 13%;
    width: 48%;
    height: 42%;
    margin-left: 26%;
  }
  .name,
  .role {
    font-size: 14px;
  }
  .name {
    margin-top: 65%;
    margin-left: 43%;
  }
  .role {
    margin-top: 71%;
    margin-left: 44%;
  }

  .downloadResult {
    margin-top: 30px;
  }
}
</style>
