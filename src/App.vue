<script setup>
import { ref } from 'vue';
import { useEmployeeStore } from '@/stores/Employees';
import { formatCurrentDate } from '@/services/DateService';
import AppCard from '@/components/AppCard.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppBirthdayWishes from '@/components/AppBirthdayWishes.vue';

const employeeStore = useEmployeeStore();
const isSidebarOpen = ref(false);
</script>

<template>
  <!-- Sidebar -->
  <AppSidebar :isSidebarOpen="isSidebarOpen"></AppSidebar>
  <div class="wrapper" :class="{ 'sidebar-open': isSidebarOpen }">
    <!-- Header -->
    <header>
      <img
        src="/assets/icons/menu.svg"
        alt="Menu"
        class="menu-icon"
        @click="isSidebarOpen = !isSidebarOpen"
        draggable="false"
      />
      <img src="/assets/img/logo.png" alt="Logo" class="logo" draggable="false" />
      <h1>B-Shampoo</h1>
      <h2 class="currentDate">{{ formatCurrentDate(employeeStore.currentDate) }}</h2>
    </header>

    <!-- Main -->
    <main>
      <AppBirthdayWishes
        v-if="employeeStore.getCurrentBirthdayCelebrant.length !== 0"
      ></AppBirthdayWishes>
      <div class="card-container">
        <h2>Anstehende Geburtstage:</h2>
        <AppCard
          v-for="(employee, index) in employeeStore.getEmployeesSortedByBirthdate"
          :key="employee.id"
          :employee="employee"
          :index="index"
        ></AppCard>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  flex-grow: 1;
  margin-left: 0;
  transition: margin-left var(--transition-time);
}

.sidebar-open {
  margin-left: var(--sidebar-width);
}

header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 24px;
  box-shadow: var(--box-shadow-md);
  background: var(--color-primary);
  color: white;
  z-index: 2;
  user-select: none;
}

.menu-icon {
  height: 32px;
  cursor: pointer;
}

.logo {
  height: 32px;
}

main {
  padding: 28px 32px;
}

.currentDate {
  margin-left: auto;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}
</style>
