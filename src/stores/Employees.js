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
  /**
   * Sorts all employees by birthday and returns the next 4 celebrants.
   */
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

  /**
   * Sorts all employees by and returns the sorted array.
   */
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

  /**
   * Determines whether an employee's birthday is today and returns him in an array.
   */
  const getCurrentBirthdayCelebrant = computed(() => {
    const birthdayCelebrant = employees.value.filter((employee) => {
      const date = currentDate.value.toISOString().split('T')[0].substring(5);
      return date === employee.birthdate.substring(5);
    });

    return birthdayCelebrant;
  });

  /**
   * Calculates the age of an employee based on the given date string
   * @param {string} dateString The birthdate string in 'yyyy-mm-dd' format.
   * @returns
   */
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
  /**
   * Adds a new employee to the emlpoyees array. The input fields must be filled.
   * @param {Object} employee Object of the employee.
   * @returns
   */
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

  /**
   * Deletes the employee with given id from the employees array.
   * @param {Number} employeeId Id of the employee.
   */
  function deleteEmployee(employeeId) {
    employees.value = employees.value.filter((employee) => {
      return employee.id !== employeeId;
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
