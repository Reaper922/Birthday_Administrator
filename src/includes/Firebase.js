import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCp_bpJNepO1Je95o5R0-miJAds5-9eHmc',
  authDomain: 'birthday-administrator.firebaseapp.com',
  projectId: 'birthday-administrator',
  storageBucket: 'birthday-administrator.appspot.com',
  messagingSenderId: '399090160445',
  appId: '1:399090160445:web:09e8d1026b733e970bab54'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const employeesCollection = collection(db, 'employees');

export { db, employeesCollection };
