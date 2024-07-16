<template>
    <div class="reset-password">
      <h1>Reset Password</h1>
      <form @submit.prevent="resetPassword" novalidate>
        <small></small>
        <input v-model="password" type="password" placeholder="New Password" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const password = ref('');
  const route = useRoute();
  const router = useRouter();

  const errorMessage = ref('');
  
  const resetPassword = async () => {
    try {
      const token = route.params.token;
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password: password.value });
      alert('Password reset successful');
      router.push('/login');
    } catch (error) {
      console.error('Error resetting password:', error.response?.data || error);

      errorMessage.value = error.response?.data
      document.querySelector('small').innerHTML = errorMessage.value.message//show the error in the broswer

      setTimeout(() => {
      errorMessage.value.message = '';
      document.querySelector('small').innerHTML = errorMessage.value.message//remove the error after 5seconds
      },5000)
    }
  };
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

small{
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

a{
  color: #333;
  align-self: flex-end;
  font-family: 'Poppins';
  font-size: clamp(12px, 2vw, 14px);
  padding: 5px 0;
  text-decoration: underline;
}
</style>

  