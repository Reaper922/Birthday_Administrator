<script setup>
import { useEmployeeStore } from '@/stores/Employees';

const employeeStore = useEmployeeStore();
</script>

<template>
  <div class="wrapper">
    <h1 class="colorful">
      Happy Birthday {{ employeeStore.getCurrentBirthdayCelebrant[0].firstname }} zu deinem
      {{ employeeStore.getEmployeeAge(employeeStore.getCurrentBirthdayCelebrant[0].birthdate) }}.
      Geburtstag!
    </h1>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.colorful {
  margin-block: 32px;
  background: rgb(255, 80, 80);
  background: linear-gradient(
    90deg,
    rgba(255, 80, 80, 1) 0%,
    rgb(255, 162, 23) 25%,
    rgba(29, 253, 220, 1) 50%,
    rgba(183, 52, 252, 1) 75%,
    rgba(252, 69, 69, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  animation: anim 1s alternate infinite;
}

@keyframes anim {
  from {
    transform: scale(100%);
  }

  to {
    transform: scale(110%);
  }
}
</style>
