<script setup>
import { ref, markRaw, provide } from 'vue'

import BirthdayTemplateOne from './birthdayTemplateOne.vue'
import BirthdayTemplateTwo from './birthdayTemplateTwo.vue'
import BirthdayTemplateThree from './birthdayTemplateThree.vue'

const props = defineProps({
  img: {
    type: String,
    required: true,
    default: ''
  },
  name: {
    type: String,
    required: true,
    default: ''
  },
  role: {
    type: String,
    required: true,
    default: ''
  }
})

const getProps = () => {
  return props
}
provide('getProps', getProps)

const slides = ref([
  markRaw(BirthdayTemplateOne),
  markRaw(BirthdayTemplateTwo),
  markRaw(BirthdayTemplateThree)
])

const currentIndex = ref(0)

const nextSlide = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = slides.value.length - 1
  }
}
</script>

<template>
  <div class="carousel">
    <button @click="prevSlide">Prev</button>
    <div class="carousel-inner">
      <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <component v-for="(slide, index) in slides" :key="index" :is="slide" class="slide" />
      </div>
    </div>
    <button @click="nextSlide">Next</button>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  display: flex;
  width: 100%;
}

.slide {
  flex: 0 0 100%;
  height: 100%;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

button:hover {
  background: rgba(0, 0, 0, 0.8);
}

button:first-of-type {
  left: 0;
}

button:last-of-type {
  right: 0;
}
</style>
