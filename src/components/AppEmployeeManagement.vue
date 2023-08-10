<script setup>
import { ref } from 'vue';
import { useEmployeeStore } from '@/stores/Employees';
import { formatBirthdate } from '@/services/DateService';

const employeeStore = useEmployeeStore();
const isEditing = ref(false);
const firstnameAdd = ref(null);
const lastnameAdd = ref(null);
const birthdateAdd = ref(null);
const firstnameEdit = ref(null);
const lastnameEdit = ref(null);
const birthdateEdit = ref(null);
const saveEdit = ref(null);

function addEmployee() {
  const isAdded = employeeStore.addEmployee({
    firstname: firstnameAdd.value.value,
    lastname: lastnameAdd.value.value,
    birthdate: birthdateAdd.value.value
  });

  if (isAdded) {
    clearInputFields();
  }
}

function editEmployee(employee) {
  isEditing.value = true;
  firstnameEdit.value.value = employee.firstname;
  lastnameEdit.value.value = employee.lastname;
  birthdateEdit.value.value = employee.birthdate;
  saveEdit.value.dataset.id = employee.id;
}

function updateEmployee() {
  const employeeId = Number(saveEdit.value.dataset.id);
  const employee = employeeStore.employees.find((employee) => employee.id === employeeId);
  employee.firstname = firstnameEdit.value.value;
  employee.lastname = lastnameEdit.value.value;
  employee.birthdate = birthdateEdit.value.value;
  isEditing.value = false;
}

function clearInputFields() {
  firstnameAdd.value.value = '';
  lastnameAdd.value.value = '';
  birthdateAdd.value.value = '';
}
</script>

<template>
  <!-- Employee List -->
  <div class="employee-list">
    <div
      class="employee"
      v-for="employee in employeeStore.getEmployeesSortedByName"
      :key="employee.id"
    >
      <div>
        <span>{{ employee.lastname }}, {{ employee.firstname }}</span
        ><br />
        <span> {{ formatBirthdate(employee.birthdate) }}</span>
      </div>
      <div class="edit-options">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          fill="currentColor"
          @click="editEmployee(employee)"
        >
          <path
            d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
          />
        </svg>
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
  </div>

  <!-- Add/Edit Employee -->
  <div class="employee-input-add" v-show="!isEditing">
    <input type="text" placeholder="Vorname" ref="firstnameAdd" />
    <input type="text" placeholder="Nachname" ref="lastnameAdd" />
    <input type="date" ref="birthdateAdd" />
    <button type="button" @click="addEmployee">Angestellten hinzufügen</button>
  </div>
  <div class="employee-input-edit" v-show="isEditing">
    <input type="text" placeholder="Vorname" ref="firstnameEdit" />
    <input type="text" placeholder="Nachname" ref="lastnameEdit" />
    <input type="date" ref="birthdateEdit" />
    <button type="button" @click="updateEmployee" ref="saveEdit">Änderungen speichern</button>
  </div>
</template>

<style>
.employee-list {
  min-height: 310px;
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

.edit-options {
  display: flex;
  align-items: center;
  gap: 6px;
}

.edit-options svg {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
}

.employee svg:first-of-type:hover {
  color: rgb(48, 255, 41);
}

.employee svg:last-of-type:hover {
  color: rgb(255, 48, 41);
}

.employee-input-add,
.employee-input-edit {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
