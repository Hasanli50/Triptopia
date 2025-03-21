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
