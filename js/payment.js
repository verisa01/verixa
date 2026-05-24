// =========================
// FIREBASE IMPORTS
// =========================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
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
// IMAGE PREVIEW
// =========================

const receiptInput =
  document.getElementById("receipt");

const receiptPreview =
  document.getElementById("receiptPreview");

const uploadText =
  document.getElementById("uploadText");

receiptInput.addEventListener(
  "change",
  
  function() {
    
    const file =
      this.files[0];
    
    if (file) {
      
      const reader =
        new FileReader();
      
      reader.onload =
        function(e) {
          
          receiptPreview.src =
            e.target.result;
          
          receiptPreview.style.display =
            "block";
          
          uploadText.style.display =
            "none";
        };
      
      reader.readAsDataURL(file);
      
    }
    
  });


// =========================
// CONVERT IMAGE TO BASE64
// =========================

function convertToBase64(file){

  return new Promise((resolve,reject)=>{

    const reader =
    new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () =>
    resolve(reader.result);

    reader.onerror = error =>
    reject(error);

  });

}

// =========================
// SUBMIT PAYMENT
// =========================

window.submitPayment =
async function(){

  const btn =
  document.getElementById("submitBtn");

  // INPUTS

  const name =
  document.getElementById("name").value;

  const plate =
  document.getElementById("plate").value;

  const email =
  document.getElementById("email").value;

  const association =
  document.getElementById("association").value;

  const receiptFile =
  document.getElementById("receipt").files[0];

  // VALIDATION

  if(
    !name ||
    !plate ||
    !email ||
    !association ||
    !receiptFile
  ){

    alert("Please complete all fields");

    return;
  }

  // PROCESS BUTTON

  btn.innerHTML =
  "Processing...";

  btn.disabled = true;

  try{

    // CONVERT IMAGE

    const receiptBase64 =
    await convertToBase64(receiptFile);

    // SAVE TO FIREBASE

    await addDoc(

      collection(db,"payments"),

      {

        fullName:name,

        plateNumber:plate,

        email:email,

        association:association,

        receiptImage:
        receiptBase64,

        status:"Pending",

        createdAt:
        serverTimestamp()

      }

    );

    // SUCCESS

    document
    .getElementById("popup")
    .style.display =
    "flex";

    btn.innerHTML =
    "Submitted";

    btn.style.background =
    "#00c853";

  }

  catch(error){

    console.log(error);

    alert("Submission Failed");

    btn.innerHTML =
    "Submit Information";

    btn.disabled = false;

  }

}

// =========================
// CLOSE POPUP
// =========================

window.closePopup =
function(){

  document
  .getElementById("popup")
  .style.display =
  "none";

}

// =========================
// COPY FUNCTION
// =========================

window.copyText =
function(id,button){

  const text =
  document.getElementById(id)
  .innerText;

  navigator.clipboard
  .writeText(text);

  button.innerHTML =
  '<i class="fa-solid fa-check"></i>';

  setTimeout(()=>{

    button.innerHTML =
    '<i class="fa-regular fa-copy"></i>';

  },1500);

}