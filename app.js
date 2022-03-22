

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase,
ref,
set,
push,
onValue,
update,
child,
remove
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
  
  // email change
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const mySkiDatatbase = getDatabase(app);

const messageBoard = document.querySelector(".message-board")

const messageText = document.querySelector("#message");
const postToBoardButton = document.querySelector(".btn")



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
        messageBoard.append(message)
        });

        // messageBoard.append(newLiTag);  
      });
  }


  // writeUserData();
  window.onload = getAllMessages();

