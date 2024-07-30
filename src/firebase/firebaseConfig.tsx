import {initializeApp} from 'firebase/app';
import {getDatabase, ref, set, get, child} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAEoefRCdXLaW899DrwUwPqYmlECm28m1I',
  authDomain: 'draw-app-ddf13.firebaseapp.com',
  databaseURL: 'https://draw-app-ddf13-default-rtdb.firebaseio.com',
  projectId: 'draw-app-ddf13',
  storageBucket: 'draw-app-ddf13.appspot.com',
  messagingSenderId: '33330601436',
  appId: '1:33330601436:web:ea882ef0a48d85a8f68319',
  measurementId: 'G-HZR9RVFMXR',
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Thêm dữ liệu vào Firebase Realtime Database
export const addDataToRealtimeDB = async (path: string, data: any) => {
  try {
    await set(ref(db, path), data);
  } catch (e) {
    console.error('Error adding data: ', e);
  }
};

// Đọc dữ liệu từ Firebase Realtime Database
export const getDataFromRealtimeDB = async (path: string) => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      console.log('Data read successfully: ', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
  } catch (e) {
    console.error('Error reading data: ', e);
  }
};
