<script setup>
import NavBar from '@/components/NavBar.vue'
import DashBoardCard from '@/components/DashBoardCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('')
const userData = ref(null)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('https://achilles-web-be.onrender.com/admin/current', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    message.value = response.data
    userData.value = response.data

    // console.log(response.data);
  } catch (error) {
    message.value = 'You are not authorized to view this page.'
  }
})

const cardMessage = ref({
  card1: {
    title: "DP's Total",
    total: 12000,
    increment: '2% since 1 month'
  },
  card2: {
    title: 'Total Certificate',
    total: 10000,
    increment: '3% since 1 week'
  },
  card3: {
    title: 'Total Birthday',
    total: 2000,
    increment: '2.3% since 1 month'
  }
})
</script>

<template>
  <NavBar :userData="userData" />
  <div class="main-content">
    <div class="dashboard-container">
      <div class="title">
        <h1>Dashboard</h1>
        <p>Here is today's report and performance</p>
      </div>
      <div class="card-container">
        <DashBoardCard
          :title="cardMessage.card1.title"
          :total="cardMessage.card1.total"
          :increment="cardMessage.card1.increment"
        />
        <DashBoardCard
          :title="cardMessage.card2.title"
          :total="cardMessage.card2.total"
          :increment="cardMessage.card2.increment"
        />
        <DashBoardCard
          :title="cardMessage.card3.title"
          :total="cardMessage.card3.total"
          :increment="cardMessage.card3.increment"
        />
      </div>
      <div class="recent-activity">
        <div class="title">
          <h3>Recent Activity</h3>
        </div>
        <div class="table">
          <div class="head">
            <h4>Name</h4>
            <h4>Type</h4>
            <h4>Date Generated</h4>
            <h4>Status</h4>
          </div>
          <div class="body">
            <div class="row">
              <p>John Doe</p>
              <p>Birthday Flyer</p>
              <p>2024-06-20</p>
              <p>Generated</p>
            </div>
            <div class="row">
              <p>Mae Doe</p>
              <p>Certificate Flyer</p>
              <p>2024-2-20</p>
              <p>Generated</p>
            </div>
            <div class="row">
              <p>John Doe</p>
              <p>Birthday Flyer</p>
              <p>2024-06-20</p>
              <p>Generated</p>
            </div>
            <div class="row">
              <p>Mae Doe</p>
              <p>Certificate Flyer</p>
              <p>2024-2-20</p>
              <p>Generated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  width: 80%;
  margin: 30px auto 0;
}

.title {
  color: var(--dark-1);
}

.dashboard-container .title h1,
.recent-activity .title h1 {
  font-family: 'Raleway';
  background: #000;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.dashboard-container .title p,
.recent-activity .title p {
  font-family: 'Montserrat';
  padding: 10px 0;
}

.card-container,
.chart {
  padding: 20px 10px;
  margin-top: 30px;
}

h3 {
  font-family: 'Raleway';
  color: var(--blue-2);
}

.barchart,
.piechart {
  color: var(--dark-2);
  border-radius: 20px;
  background: linear-gradient(30deg, var(--bright-1), #fff);
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}

.recent-activity {
  padding: 30px 20px;
  margin-top: 30px;
  background: linear-gradient(30deg, var(--bright-1), #fff);
  border-radius: 20px;
}

.table {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  font-size: clamp(10px, 1.7vw, 16px);
}

.head,
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 15px;
}

.head h4 {
  font-family: 'Poppins';
  color: #333;
}

.row {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.row p {
  font-family: 'Montserrat';
}

@media (min-width: 768px) {
  .main-content {
    width: 75vw;
    position: absolute;
    right: 0;
  }
  .card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .chart {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .barchart,
  .piechart {
    flex: 1;
    margin-right: 25px;
    height: 400px;
  }

  .dashboard-container {
    margin-top: 100px;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .main-content {
    width: 70vw;
  }
}
</style>
