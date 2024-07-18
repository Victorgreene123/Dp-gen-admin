<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login" novalidate>
      <small></small>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button
        type="submit"
        @click="isLogin"
        :class="{ isLogin: loginText === 'Loging In...' }"
        :disabled="disableBtn"
      >
        {{ loginText }}
      </button>
      <!-- <router-link to="/forgot-password">Forgot password?</router-link> -->
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('') //error messgae in browser

const loginText = ref('Login')
const disableBtn = ref(false)

const isLogin = () => {
  loginText.value = 'Loging In...'
  setTimeout(() => {
    disableBtn.value = true
  }, 10)
}

const login = async () => {
  try {
    const { data } = await axios.post('https://achilles-web-be.onrender.com/admin/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', data.access_token)
    router.push('/dashboard')
  } catch (error) {
    loginText.value = 'Login'
    disableBtn.value = false

    console.error('Login failed:', error.response?.data || error)
    errorMessage.value = error.response?.data
    document.querySelector('small').innerHTML = errorMessage.value.message //show the error in the broswer

    setTimeout(() => {
      errorMessage.value.message = ''
      document.querySelector('small').innerHTML = errorMessage.value.message //remove the error after 5seconds
    }, 5000)
  }
}
</script>

<style scoped>
div {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

h1 {
  padding: 10px;
  font-size: clamp(40px, 3vw, 50px);
  font-family: 'Raleway';
  background: linear-gradient(183deg, var(--blue-2), var(--dark-1), var(--blue-1));
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  max-width: 400px;
  padding: 30px 20px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

small {
  font-family: 'Montserrat';
  font-size: clamp(11px, 2vw, 12px);
  padding: 5px 0;
  color: var(--red-1);
}

input {
  margin-bottom: 20px;
  padding: 12px 5px;
  border-radius: 20px;
  font-family: 'Montserrat';
  width: 100%;
  color: #333;
  border: 2px solid #333;
  background: linear-gradient(30deg, var(--bright-1), #fff);
}

button {
  font-family: 'Montserrat';
  padding: 12px;
  border-radius: 20px;
  width: 100%;
  color: var(--bright-1);
  background: var(--blue-2);
  font-size: clamp(14px, 3vw, 16px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

a {
  color: #333;
  align-self: flex-end;
  font-family: 'Poppins';
  font-size: clamp(12px, 2vw, 14px);
  padding: 5px 0;
  text-decoration: underline;
}
</style>
