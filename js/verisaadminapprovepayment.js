// =========================
// FIREBASE IMPORTS
// =========================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {
    
    apiKey:
      
      "AIzaSyDfT9a_23fPspKhueFaa6W_2jTScWtST94",
    
    authDomain:
      
      "nasvera-project.firebaseapp.com",
    
    projectId:
      
      "nasvera-project",
    
    storageBucket:
      
      "nasvera-project.firebasestorage.app",
    
    messagingSenderId:
      
      "73717373108",
    
    appId:
      
      "1:73717373108:web:34e8753a0e403b9d6e9fe1"

};

// =========================
// INITIALIZE
// =========================

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

// =========================
// TABLE BODY
// =========================

const tableBody =
document.querySelector("tbody");

// =========================
// LOAD PAYMENTS
// =========================

onSnapshot(

  collection(db,"payments"),

  (snapshot)=>{

    tableBody.innerHTML = "";

    snapshot.forEach((docSnap)=>{

      const data =
      docSnap.data();

      const row =
      document.createElement("tr");

      row.innerHTML = `

        <td>${data.fullName}</td>

        <td>${data.plateNumber}</td>

        <td>${data.email}</td>

        <td>${data.association}</td>

        <td>

          <button
          class="view-btn"
          onclick="viewReceipt('${data.receiptImage}')">

            View

          </button>

        </td>

        <td>

          <span class="status ${data.status.toLowerCase()}">

            ${data.status}

          </span>

        </td>

        <td>

          <div class="action-btns">

            <button
            class="approve"
            onclick="updateStatus('${docSnap.id}','Approved')">

              Approve

            </button>

            <button
            class="reject"
            onclick="updateStatus('${docSnap.id}','Rejected')">

              Reject

            </button>

            <button
            class="disapprove"
            onclick="updateStatus('${docSnap.id}','Disapproved')">

              Disapprove

            </button>

          </div>

        </td>

      `;

      tableBody.appendChild(row);

    });

  }

);

// =========================
// UPDATE STATUS
// =========================

window.updateStatus =
async function(id,status){

  await updateDoc(

    doc(db,"payments",id),

    {
      status:status
    }

  );

};

// =========================
// VIEW RECEIPT
// =========================

window.viewReceipt =
function(image){

  const newWindow =
  window.open("");

  newWindow.document.write(`

    <title>Receipt Preview</title>

    <style>

      body{

        margin:0;

        background:#111;

        display:flex;

        justify-content:center;

        align-items:center;

        height:100vh;
      }

      img{

        max-width:95%;

        max-height:95%;

        border-radius:20px;
      }

    </style>

    <img src="${image}">

  `);

};