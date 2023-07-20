import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
  apiKey: "AIzaSyDEA4jZUtcYz2x_kteud_Lu5xhEsky4yxM",
  authDomain: "warehousedata-291af.firebaseapp.com",
  projectId: "warehousedata-291af",
  storageBucket: "warehousedata-291af.appspot.com",
  messagingSenderId: "49576787994",
  appId: "1:49576787994:web:869a23cb05a2741d7b91a3",
  measurementId: "G-Z1DJZL326Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      result &&
        toast.success("Successfully LogIn!...", {
          position: "top-left",
          theme: "colored",
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export { auth, provider, signInWithGoogle };