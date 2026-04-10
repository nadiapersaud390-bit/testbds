/* ── Firebase Configuration & Initialization ──
   DO NOT commit real API keys to public repos!
   Consider using environment variables for production.
*/

const firebaseConfig = {
  apiKey: "AIzaSyBBnvva_YrF3_Cw442dajqvQcracwW5eyE",
  authDomain: "bds-dashboard-b6cd9.firebaseapp.com",
  projectId: "bds-dashboard-b6cd9",
  storageBucket: "bds-dashboard-b6cd9.firebasestorage.app",
  messagingSenderId: "30054871783",
  appId: "1:30054871783:web:645e1dbc2883ed8b2da842"
};
firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();
