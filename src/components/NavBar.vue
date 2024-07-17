<script setup>
import { ref } from 'vue'

// Define the reactive state for the hamburger menu
const isActive = ref(false)

// Define the method to toggle the class
const toggleClass = () => {
  isActive.value = !isActive.value
}

const props = defineProps({
  userData: Object
})

</script>

<template>
  <nav :class="{ active: isActive }">
    <router-link to="/mainmenu" class="mainmenu1">Main menu</router-link>
    <div class="menu-bar">
      <router-link to="/" class="logo"><img src="../img/logo.png" alt="logo" /></router-link>
      <div @click="toggleClass" class="hamburger-menu">
        <span class="line line1"></span>
        <span class="line line2"></span>
      </div>
    </div>
    <ul class="nav-link-container">
      <ul>
        <img src="../img/logo.png" alt="logo" style="padding-bottom: 20px" />
        <li>
          <router-link to="/dashboard" class="mainmenu2"
            ><i class="fa-solid fa-chart-line"></i>Dashboard</router-link
          >
        </li>
        <li>
          <router-link to="/manage-dps"
            ><i class="fa-solid fa-list-check"></i>Manage DPs</router-link
          >
        </li>
        <li>
          <router-link to="/manage-admins"
            ><i class="fa-solid fa-user-tie"></i>Manage Admins</router-link
          >
        </li>
        <li class="profile-1">
          <!-- <img src="../img/pic.jpeg" alt="potriat" /> -->
        </li>
      </ul>

      <ul class="profile">
        <li>
          <router-link to="/settings"
            ><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</router-link
          >
        </li>
        <li>
          <i class="fa-solid fa-user"></i>
          <span>
            <h4>{{ userData ? userData.admin.fullname: 'Loading...' }}</h4>
            <small>{{ userData ? userData.admin.email: 'Loading...' }}</small>
          </span>
        </li>
      </ul>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

nav.active .line {
  top: auto;
  bottom: auto;
  background: var(--dark-2);
}
nav.active .line.line1 {
  transform: rotate(45deg);
}

nav.active .line.line2 {
  transform: rotate(-45deg);
}

li {
  list-style-type: none;
  margin: 10px 10px 20px 10px;
  font-weight: 500;
}

li a {
  color: var(--dark-2);
  font-size: 12px;
}
li a i {
  padding-right: 8px;
}
a {
  font-family: 'Montserrat', sans-serif;
}

.nav-link-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 40px;
  backdrop-filter: blur(10px);
  background: var(--bright-1);
  background: linear-gradient(30deg, var(--bright-1), #fff);
  height: 100vh;
  position: fixed;
  z-index: 1;
  width: 70vw;
  right: 0;
  transform: translateX(100%);
  transition: all 0.3s ease-in-out;
}

nav.active .nav-link-container {
  box-shadow: -8px 2px 5px rgba(0, 0, 0, 0.4);
  transform: translateX(0);
}

.nav-link-container ul:first-child {
  margin-top: 60px;
  padding: 10px 0 0 15px;
}

.nav-link-container ul:nth-of-type(2) {
  padding: 10px 0 0 15px;
}

.nav-link-container ul:nth-of-type(2) li:last-child {
  border-top: 1px solid #fff;
  padding: 15px 2px;
  display: flex;
  align-items: center;
}

.nav-link-container ul:nth-of-type(2) li:last-child img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #fff;
}
.nav-link-container ul:nth-of-type(2) li:last-child span {
  margin-left: 15px;
  color: var(--dark-2);
}

.nav-link-container ul:nth-of-type(2) li:last-child span h4 {
  font-family: 'Poppins';
}

.nav-link-container ul:nth-of-type(2) li:last-child span small {
  font-weight: 300;
  font-family: 'Montserrat';
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px 3px 0;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  background: linear-gradient(30deg, var(--bright-1), #fff);
}

.mainmenu1 {
  display: none;
}

.logo {
  height: 50px;
  display: inline-block;
}

.logo img {
  height: 50px;
  transform: scale(0.6);
  margin-left: -15px;
}

.hamburger-menu {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

.line {
  display: inline-block;
  height: 2px;
  width: 20px;
  background: var(--dark-2);
  position: absolute;
  transition: all 0.3s ease-in-out;
}

.line.line1 {
  top: 20px;
}

.line.line2 {
  bottom: 20px;
}

.profile-1 {
  display: none;
}

@media (min-width: 768px) {
  nav {
    background: linear-gradient(30deg, var(--bright-1), #fff);
    width: 25vw;
    position: fixed;
    flex: 1;
  }

  .nav-link-container {
    position: static;
    width: auto;
    display: flex;
    backdrop-filter: none;
    background: transparent;
    height: 100vh;
    transform: translateX(0);
    box-shadow: 2px 2px 100px rgba(0, 0, 0, 0.15);
    background: var(--linear-gradient-1);
  }

  .nav-link-container ul li a {
    background: var(--blue-2);
    color: var(--bright-1);
    display: inline-block;
    padding: 8px 6px;
    width: 70%;
    border-radius: 20px;
    box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.4);
    background: #000;
  }

  .nav-link-container ul li a i {
    padding: 5px 10px 5px 10px;
  }

  .hamburger-menu {
    display: none;
  }

  .menu-bar {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    nav {
      width: 30vw;
    }
  }
}
</style>
