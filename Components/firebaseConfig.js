import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGF9VxV0LksOk52tj8pfA295N5BaxPWXg",
  authDomain: "reactlab4-7a9c2.firebaseapp.com",
  projectId: "reactlab4-7a9c2",
  storageBucket: "reactlab4-7a9c2.appspot.com",
  messagingSenderId: "155376088736",
  appId: "1:155376088736:web:c26f7cf95e187b70b5bbc5"
};

const app = initializeApp(firebaseConfig);

export default app