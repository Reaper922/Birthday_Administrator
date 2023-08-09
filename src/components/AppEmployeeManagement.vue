<script setup>
import { ref } from 'vue';
import { useEmployeeStore } from '@/stores/Employees';

const employeeStore = useEmployeeStore();
const firstname = ref(null);
const lastname = ref(null);
const birthdate = ref(null);

function addEmployee() {
  employeeStore.addEmployee({
    firstname: firstname.value.value,
    lastname: lastname.value.value,
    birthdate: birthdate.value.value
  });

  clearInputFields();
}

function clearInputFields() {
  firstname.value.value = '';
  lastname.value.value = '';
  birthdate.value.value = '';
}
</script>

<template>
  <!-- Employee List -->
  <div class="employee-list">
    <div
      class="employee"
      v-for="employee in employeeStore.employeesSortedByName"
      :key="employee.id"
    >
      <span>{{ employee.lastname }}, {{ employee.firstname }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 -960 960 960"
        width="48"
        fill="currentColor"
        @click="employeeStore.deleteEmployee(employee.id)"
      >
        <path
          d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
        />
      </svg>
    </div>
  </div>

  <!-- Add/Edit Employee -->
  <div class="employee-input">
    <input type="text" placeholder="Vorname" ref="firstname" />
    <input type="text" placeholder="Nachname" ref="lastname" />
    <input type="date" ref="birthdate" />
    <button type="button" @click="addEmployee">Angestellten hinzufügen</button>
  </div>
</template>

<style>
.employee-list {
  height: 300px;
  padding-block: 6px;
  border: 2px solid lightgrey;
  border-radius: var(--border-radius-sm);
  overflow-y: auto;
}

.employee {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  transition: all 0.1s ease-in-out;
}

.employee:hover {
  background: var(--color-primary);
  color: white;
}

.employee svg {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
}

.employee svg:hover {
  color: rgb(255, 48, 41);
}

.employee-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
