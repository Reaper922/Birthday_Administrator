<script setup>
import { ref } from 'vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppCard from '@/components/AppCard.vue';
import { daysUntilBirthday } from '@/services/DateService';

const isOpen = ref(false);

const currentDate = new Date();
const testUser = ref([
  {
    id: 1,
    name: 'Hans Müller',
    birthdate: '1992-9-15'
  },
  {
    id: 2,
    name: 'Julius Meister',
    birthdate: '1989-04-23'
  },
  {
    id: 3,
    name: 'Sabine Janssen',
    birthdate: '1995-06-04'
  },
  {
    id: 4,
    name: 'Christiane Mittermayer',
    birthdate: '1994-05-28'
  },
  {
    id: 5,
    name: 'Karoline Binsen',
    birthdate: '1984-11-19'
  }
]);

testUser.value.sort((userA, userB) => {
  const daysUntilBirthdayUserA = daysUntilBirthday(currentDate, userA.birthdate);
  const daysUntilBirthdayUserB = daysUntilBirthday(currentDate, userB.birthdate);
  return daysUntilBirthdayUserA - daysUntilBirthdayUserB;
});

const userSelection = testUser.value.slice(0, 4);
</script>

<template>
  <AppSidebar :isOpen="isOpen"></AppSidebar>
  <div class="wrapper" :class="{ 'sidebar-open': isOpen }">
    <header>
      <img src="/assets/icons/menu.svg" alt="Menu" class="menu-icon" @click="isOpen = !isOpen" />
      <h1><strong>B-Shampoo</strong></h1>
    </header>
    <main>
      <h2>Anstehende Geburtstage:</h2>
      <div class="card-container">
        <AppCard
          v-for="user in userSelection"
          :key="user.id"
          :user="user"
          :currentDate="currentDate"
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
  background: lightblue;
  box-shadow: var(--box-shadow-md);
  z-index: 2;
}

.menu-icon {
  height: 32px;
  cursor: pointer;
}

main {
  padding: 32px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
