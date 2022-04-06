import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase,
ref,
set,
push,
onValue,
update,
child,
remove,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional




const firebaseConfig = {
  apiKey: "AIzaSyCtxY9curZWGN86h3sP0kldCAoeBJcfJ1A",
  authDomain: "ski-forum-1c479.firebaseapp.com",
  projectId: "ski-forum-1c479",
  storageBucket: "ski-forum-1c479.appspot.com",
  messagingSenderId: "776595877175",
  appId: "1:776595877175:web:283ae5ff1612659a607eb2",
  measurementId: "G-RT1JP5X1KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
  const mySkiDatatbase = getDatabase(app);

const auth = getAuth ();
const messageBoard = document.querySelector(".message-board")

const messageText = document.querySelector("#message");
const postToBoardButton = document.querySelector(".btn")

const emailInput = document.querySelector("input[name='email']");
const passwordInput = document.querySelector("input[name='password']");
const signUpButton = document.querySelector('.sign-up-button');
const signInButton = document.querySelector('.sign-in-button');
const signOutButton = document.querySelector('.sign-out-button');
const welcomeSpan = document.querySelector(".welcome");

signInButton.addEventListener("click", signInUser);

function signInUser() {
  let email = emailInput.value;
  let password = passwordInput.value;
  console.log(email, password);

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    welcomeSpan.textContent = `${user.email} is signed in`;
    console.log(user);
  });
}

signUpButton.addEventListener("click", signUpUser);

function signUpUser() {
  let email = emailInput.value;
  let password = passwordInput.value;
  console.log(email, password);

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    welcomeSpan.textContent = `${user.email} has signed up`;
    console.log(user);
  });
}

signOutButton.addEventListener("click", signOutUser);

function signOutUser() {
  signOut(auth)
  .then(() => {
    welcomeSpan.textContent = `You are signed out`;
  });
}

messageText.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    writeUserData(event);
  }else(postToBoardButton.addEventListener("click", writeUserData))
});

  function writeUserData(event) {
    event.preventDefault();

    let message = {
    message: messageText.value,
    votes: 0,
      
    };
    messageText.value = "";
     const postMessagesRef = ref(mySkiDatatbase, "messages");
    //  const newMessagesRef = push(postMessagesRef);
     set(push(postMessagesRef), message);
    //  set(newMessagesRef, message);
  }
 
  function getAllMessages() {
  
      const allMessagesRef = ref(mySkiDatatbase, "messages");
     
      onValue(allMessagesRef, snapshot => {
        const allMessages = snapshot.val();
        const messages = [];

        for(let id in allMessages) {
          let message = allMessages[id].message;
          let votes = allMessages[id].votes;

          let newLiTag = document.createElement("li");
          newLiTag.textContent = message;

          let deleteElement = document.createElement("i");
          deleteElement.classList.add("fa", "fa-trash", "pull-right", "delete");
          deleteElement.addEventListener("click", function(event) {
          let messageId = event.target.parentNode.getAttribute("data-id");
          let messageToUpdate = child(allMessagesRef, messageId);
          remove (messageToUpdate);
          });

          let upVoteElement = document.createElement("i");
          upVoteElement.classList.add("fa", "fa-thumbs-up", "pull-right");
          upVoteElement.addEventListener("click", function(event) {
            let messageId = event.target.parentNode.getAttribute("data-id");
            let messageToUpdate = child(allMessagesRef, messageId);
           update(messageToUpdate, { votes: ++votes });
           });
         
          let downVoteElement = document.createElement("i");
          downVoteElement.classList.add("fa", "fa-thumbs-down", "pull-right");
          downVoteElement.addEventListener("click", function(event) {
            let messageId = event.target.parentNode.getAttribute("data-id");
            let messageToUpdate = child(allMessagesRef, messageId);
           update(messageToUpdate, { votes: --votes });
          });
        

        let showVotesElement = document.createElement("div");
         showVotesElement.classList.add("pull-right");
         showVotesElement.textContent = votes;
         newLiTag.append(deleteElement, downVoteElement, upVoteElement, showVotesElement);
          
         newLiTag.setAttribute('data-id', id)
         messages.push(newLiTag);
        
        };

       

        messageBoard.innerHTML = "";
        messages.forEach(message => {
        messageBoard.append(message);
      
       
        
        
     
        });
        // messageBoard.append(newLiTag);  
      });
  }

  // writeUserData();
  window.onload = getAllMessages();

