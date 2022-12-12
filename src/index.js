import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApMQSA5nmzRSP2LGUNJveGlLe_Xi9ukRU",
  authDomain: "ecolife-30294.firebaseapp.com",
  databaseURL: "https://ecolife-30294-default-rtdb.firebaseio.com",
  projectId: "ecolife-30294",
  storageBucket: "ecolife-30294.appspot.com",
  messagingSenderId: "398271559675",
  appId: "1:398271559675:web:7ee574eacd19e1f8e67d5e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

<script src="https://smtpjs.com/v3/smtp.js"></script>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
