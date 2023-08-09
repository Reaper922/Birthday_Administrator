import { addDoc, getDocs } from 'firebase/firestore';
import { employeesCollection } from '@/includes/Firebase';

async function getAllEmployees() {
  try {
    const employees = [];
    const docSnap = await getDocs(employeesCollection);
    docSnap.docs.forEach((doc) => employees.push(doc.data()));
    return employees;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addEmployee(employee) {
  try {
    await addDoc(employeesCollection, employee);
  } catch (error) {
    console.error(error);
  }
}

// async function updateEmploye() {
//   try {

//   } catch (error) {
//     console.error(error)
//   }
// }

export { addEmployee, getAllEmployees };
