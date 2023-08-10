<script setup>
import { daysUntilNextBirthday, formatBirthdate } from '@/services/DateService';
import { useEmployeeStore } from '@/stores/Employees';

const props = defineProps({
  employee: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const employeeStore = useEmployeeStore();
</script>

<template>
  <div class="card">
    <img src="/assets/img/avatar.png" alt="Profile" class="profile" draggable="false" />
    <div class="employee-info">
      <h2>{{ employee.firstname }} {{ employee.lastname }}</h2>
      <p>
        Geburtstag: {{ formatBirthdate(employee.birthdate) }}<br />
        Noch {{ daysUntilNextBirthday(employeeStore.currentDate, props.employee.birthdate) }} Tage
        bis zum Geburtstag
      </p>
    </div>
  </div>
</template>

<style>
.card {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: var(--box-shadow-md);
  background: white;
  user-select: none;
}

.card p {
  line-height: 1.5;
}

.profile {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.employee-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 32px;
}
</style>
