import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1QpgC-8gYFfUYZB2dmL1PrjNpHg9K6SU",
  authDomain: "ecolifetest-749da.firebaseapp.com",
  projectId: "ecolifetest-749da",
  storageBucket: "ecolifetest-749da.appspot.com",
  messagingSenderId: "1089737700653",
  appId: "1:1089737700653:web:748e3611bf51630e91cfa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<script src="https://smtpjs.com/v3/smtp.js"></script>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
