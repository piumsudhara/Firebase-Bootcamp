import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({ /* config */ });
const auth = getAuth();
onAuthStateChanged(auth, user => { console.log(user); });
