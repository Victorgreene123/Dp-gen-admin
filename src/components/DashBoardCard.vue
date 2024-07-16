<script setup>
// import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  increment: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <p>{{ title }}</p>
    <h2>{{ total }}</h2>
    <small>{{ increment }}</small>
  </div>
</template>

<style scoped>
.card {
  color: var(--dark-2);
  border-radius: 20px;
  padding: 20px 30px;
  margin-bottom: 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  flex: 1;
  margin-right: 25px;
  cursor: pointer;
  transition: transform 0.3s linear;
  
  background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edecf1 10%,
        #f6f7f8 20%,
        #f6f7f8 100%
    );
    background-size: 200%  100%;
    animation: animated 3s linear infinite;
}


@keyframes animated {
    0%{
        background-position: 50% 0;
    }
    100%{
        background-position: -150% 0;
    }
}

.card:hover{
  transform: scale(0.97);
}

p,
small,
h2 {
  padding: 8px;
}

p{
    font-family: 'Poppins';
}

small,h2{
    font-family: 'Montserrat';
}
</style>
