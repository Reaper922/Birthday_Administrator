<script setup>
import { ref, watch } from 'vue';
import { useEmployeeStore } from '@/stores/Employees';
import AppEmployeeManagement from '@/components/AppEmployeeManagement.vue';

defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true
  }
});

const employeeStore = useEmployeeStore();
const isTestmodeOn = ref(false);
const simulatedDate = ref('');

// Watcher
watch(isTestmodeOn, () => {
  if (isTestmodeOn.value) {
    simulatedDate.value = new Date().toISOString().split('T')[0];
  } else {
    employeeStore.currentDate = new Date();
    simulatedDate.value = '';
  }
});

watch(simulatedDate, () => {
  if (isTestmodeOn.value) {
    employeeStore.currentDate = new Date(simulatedDate.value);
  }
});
</script>

<template>
  <transition name="sidebar-slide">
    <aside class="sidebar" v-if="isSidebarOpen">
      <!-- Employee List -->
      <AppEmployeeManagement></AppEmployeeManagement>

      <!-- Testmode -->
      <div class="testmode">
        <label for="testmode">Testmodus</label>
        <input type="checkbox" name="testmode" id="testmode" v-model="isTestmodeOn" />
      </div>

      <!-- Simulated Date -->
      <div class="simulated-date" v-if="isTestmodeOn">
        <label for="simulated-date">Datum:</label>
        <input type="date" name="simulated-date" v-model="simulatedDate" />
      </div>
    </aside>
  </transition>
</template>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: var(--sidebar-width);
  box-shadow: var(--box-shadow-md);
  font-size: 18px;
  background: white;
  z-index: 5;
  user-select: none;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active,
.container {
  transition: transform var(--transition-time);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(calc(var(--sidebar-width) * -1));
}

.testmode input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.testmode label,
.testmode input {
  cursor: pointer;
}

.testmode,
.simulated-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
