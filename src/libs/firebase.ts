import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAK46S-0UbKe4q_6EIjAMTyd4jD-8TJUOk',
	authDomain: 'monolog-1fa57.firebaseapp.com',
	databaseURL: 'https://monolog-1fa57-default-rtdb.firebaseio.com',
	projectId: 'monolog-1fa57',
	storageBucket: 'monolog-1fa57.appspot.com',
	messagingSenderId: '84985938716',
	appId: '1:84985938716:web:3f2bf41ec703669ac270d9',
	measurementId: 'G-HK9GY7X0Y1',
};

export const initializeFirebaseApp = () =>
	!getApps().length ? initializeApp(firebaseConfig) : getApp();

const app = initializeFirebaseApp(); // TODO: 要リファクタ
export const db = getFirestore(app);

export const auth = getAuth(app);
