console.log("test");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase,
ref,
set,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCI-n_JcRwS-Y7MTkcygd96q9W-GxAOxrc",
    authDomain: "ski-form.firebaseapp.com",
    databaseURL: "https://ski-form-default-rtdb.firebaseio.com",
    projectId: "ski-form",
    storageBucket: "ski-form.appspot.com",
    messagingSenderId: "785907061572",
    appId: "1:785907061572:web:4111878ac5805be958bd11",
    measurementId: "G-3MSMB6QMXT"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getDatabase(app);

console.log(app);