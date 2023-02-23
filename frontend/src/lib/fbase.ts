import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB3bzaBjiqekazj1mndDY4rhIsCE-Vcfjs",
    authDomain: "no1recipe-aea4c.firebaseapp.com",
    projectId: "no1recipe-aea4c",
    storageBucket: "no1recipe-aea4c.appspot.com",
    messagingSenderId: "847292256844",
    appId: "1:847292256844:web:0a8125cf24785386981ae9"
};

const firebaseApp  = initializeApp(firebaseConfig);

export const authService = getAuth(firebaseApp)
export default firebaseApp
