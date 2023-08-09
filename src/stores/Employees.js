import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { daysUntilNextBirthday } from '@/services/DateService';

export const useEmployeeStore = defineStore('employee', () => {
  // State
  const currentDate = ref(new Date());
  const employees = ref([
    {
      id: 1,
      firstname: 'Hans',
      lastname: 'Müller',
      birthdate: '1992-9-15'
    },
    {
      id: 2,
      firstname: 'Julius',
      lastname: 'Meister',
      birthdate: '1989-04-23'
    },
    {
      id: 3,
      firstname: 'Sabine',
      lastname: 'Janssen',
      birthdate: '1995-06-04'
    },
    {
      id: 4,
      firstname: 'Christiane',
      lastname: 'Mittermayer',
      birthdate: '1994-05-28'
    },
    {
      id: 5,
      firstname: 'Karoline',
      lastname: 'Binsen',
      birthdate: '1984-11-19'
    },
    {
      id: 6,
      firstname: 'Svenja',
      lastname: 'Natter',
      birthdate: '1984-8-14'
    }
  ]);

  // Getters
  const employeesSortedByBirthdate = computed(() => {
    const sortedEmployees = [...employees.value];
    sortedEmployees.sort((employeeA, employeeB) => {
      const daysUntilBirthdayEmployeeA = daysUntilNextBirthday(
        currentDate.value,
        employeeA.birthdate
      );
      const daysUntilBirthdayEmployeeB = daysUntilNextBirthday(
        currentDate.value,
        employeeB.birthdate
      );
      return daysUntilBirthdayEmployeeA - daysUntilBirthdayEmployeeB;
    });

    return sortedEmployees.slice(0, 4);
  });

  const employeesSortedByName = computed(() => {
    const sortedEmployees = [...employees.value];
    sortedEmployees.sort((employeeA, employeeB) => {
      return (
        employeeA.lastname.toLowerCase().localeCompare(employeeB.lastname.toLowerCase()) ||
        employeeA.firstname.toLowerCase().localeCompare(employeeB.firstname.toLowerCase())
      );
    });
    return sortedEmployees;
  });

  // Actions
  function addEmployee(employee) {
    employee.id = employees.value.length + 1;
    employees.value.push(employee);
  }

  return {
    currentDate,
    employees,
    employeesSortedByBirthdate,
    employeesSortedByName,
    addEmployee
  };
});
