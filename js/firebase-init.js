// FILE: js/firebase-init.js
// Firebase is already initialized via CDN scripts in index.html.
// This file exposes db and auth as global window variables
// so all other JS files can access them without imports.

window.db   = firebase.firestore();
window.auth = firebase.auth();
