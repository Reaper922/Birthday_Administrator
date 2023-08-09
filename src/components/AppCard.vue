<script setup>
import { computed } from 'vue';

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

const daysUntilBirthday = computed(() => {
  const currentYear = props.currentDate.getFullYear();
  const currentUserBirthday = new Date(props.user.birthdate).setFullYear(currentYear);
  const nextUserBirthday = new Date(props.user.birthdate).setFullYear(currentYear + 1);
  const diffInMillSec = currentUserBirthday - props.currentDate;
  const diffInDays = Math.floor(diffInMillSec / (1000 * 60 * 60 * 24));

  console.log(nextUserBirthday);

  if (diffInDays < 0) {
    return Math.floor((nextUserBirthday - props.currentDate) / (1000 * 60 * 60 * 24));
  }

  return diffInDays;
});

const formatedBirthdate = computed(() => {
  const dateArr = props.user.birthdate.split('-');

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
});
</script>

<template>
  <div class="card">
    <h2>{{ user.name }}</h2>
    <span>Geburtstag: {{ formatedBirthdate }}</span
    ><br />
    <span>Noch {{ daysUntilBirthday }} Tage bis zum Geburtstag</span>
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
