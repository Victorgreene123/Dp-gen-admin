import DashBoard from '@/views/DashBoard.vue'
import LogIn from '@/views/LogIn.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import ManageDP from '@/views/ManageDP.vue'
import ManageAdmin from '@/views/ManageAdmin.vue'
import AddAdmin from '@/views/AddAdmin.vue'

import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login', component: LogIn },
    { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword },
    { path: '/dashboard', component: DashBoard },
    { path: '/manage-dps', name: 'manage-dps', component: ManageDP },
    { path: '/manage-admins', name: 'manage-admins', component: ManageAdmin },
    { path: '/manage-admins/add-admin', name: 'add-admin', component: AddAdmin }
  ]
})

export default router