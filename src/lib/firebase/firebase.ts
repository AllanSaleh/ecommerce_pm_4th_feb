import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-XScT71rpdw6et-1OvVvNdHFOXDioJbQ",
  authDomain: "ecommerce-demo-a1bd3.firebaseapp.com",
  projectId: "ecommerce-demo-a1bd3",
  storageBucket: "ecommerce-demo-a1bd3.firebasestorage.app",
  messagingSenderId: "1022044839276",
  appId: "1:1022044839276:web:949b0dddac1a61435f6749"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)