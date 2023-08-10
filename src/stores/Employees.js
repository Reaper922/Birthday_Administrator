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
      birthdate: '1992-09-15'
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
      birthdate: '1984-08-14'
    }
  ]);

  // Getters
  const getEmployeesSortedByBirthdate = computed(() => {
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

  const getEmployeesSortedByName = computed(() => {
    const sortedEmployees = [...employees.value];

    sortedEmployees.sort((employeeA, employeeB) => {
      return (
        employeeA.lastname.toLowerCase().localeCompare(employeeB.lastname.toLowerCase()) ||
        employeeA.firstname.toLowerCase().localeCompare(employeeB.firstname.toLowerCase())
      );
    });
    return sortedEmployees;
  });

  const getCurrentBirthdayCelebrant = computed(() => {
    const birthdayCelebrant = employees.value.filter((employee) => {
      const date = currentDate.value.toISOString().split('T')[0].substring(5);
      return date === employee.birthdate.substring(5);
    });

    return birthdayCelebrant;
  });

  function getEmployeeAge(dateString) {
    const birthDate = new Date(dateString);
    let age = currentDate.value.getFullYear() - birthDate.getFullYear();
    const month = currentDate.value.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && currentDate.value.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // Actions
  function addEmployee(employee) {
    employee.id = employees.value.length + 1;

    if (
      employee.firstname.length > 0 &&
      employee.lastname.length > 0 &&
      employee.birthdate.length > 0
    ) {
      employees.value.push(employee);
      console.log(employees.value);
      return 1;
    }
    return 0;
  }

  function deleteEmployee(id) {
    employees.value = employees.value.filter((employee) => {
      return employee.id !== id;
    });
  }

  return {
    currentDate,
    employees,
    getEmployeesSortedByBirthdate,
    getEmployeesSortedByName,
    getCurrentBirthdayCelebrant,
    getEmployeeAge,
    addEmployee,
    deleteEmployee
  };
});
