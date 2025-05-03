// import messaging from '@react-native-firebase/messaging';
// import { useEffect } from 'react';

// // Get the FCM Token
// const getFcmToken = async (userId) => {
//   try {
//     // Request permission for push notifications
//     await messaging().requestPermission();

//     // Get the token
//     const token = await messaging().getToken();
//     console.log("FCM Token:", token);

//     if (token) {
//       // Send token to your backend to store it
//       await fetch('https://yourserver.com/api/save-fcm-token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, token }),
//       });
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//   }
// };

// firebase
// npm install firebase

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDQEn3XLl1okZQDEsMncSJRslaJIujCStc",
//   authDomain: "triptopia-ef583.firebaseapp.com",
//   projectId: "triptopia-ef583",
//   storageBucket: "triptopia-ef583.firebasestorage.app",
//   messagingSenderId: "321516592707",
//   appId: "1:321516592707:web:2f2e5db17d586a90077ef6",
//   measurementId: "G-M4NLZSKS5R"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
