import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdwrJ9GUh-b1lkEcF_hGg3mZWTKmpTZrM",
  authDomain: "pc-parts-market-c203c.firebaseapp.com",
  projectId: "pc-parts-market-c203c",
  appId: "1:253731956670:web:0702ee48e8eaf741613bef",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
