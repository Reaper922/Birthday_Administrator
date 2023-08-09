<script setup>
import { daysUntilBirthday, formatBirthdate } from '@/services/DateService';

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  currentDate: {
    type: Date,
    required: true
  }
});
</script>

<template>
  <div class="card">
    <h2>{{ user.name }}</h2>
    <p>
      Geburtstag: {{ formatBirthdate(user.birthdate) }}<br />
      Noch {{ daysUntilBirthday(props.currentDate, props.user.birthdate) }} Tage bis zum Geburtstag
    </p>
  </div>
</template>

<style>
.card {
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: var(--box-shadow-md);
  background: whitesmoke;
}
</style>
