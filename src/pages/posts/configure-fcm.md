---
title: 'Configure Firebase Cloud Messaging (FCM)'
date: '2020-04-25'
slug: 'configure-fcm'
description: 'Configuration firebase push notification with CDN'

author:
  name: 'Pooya Golchian'
  bio: 'Frontend Developer'
  img: '/img/avatar/pooya-golchian.png'
---

### Configuration firebase push notification with CDN

At first, you add a CDN script in the HTML file. I'm using this library in my vue.js application on the Yiata website.
This website configures with Webpack and dotnet core 2.2.

### Step-1-Add CDN

```html
<script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-analytics.js"></script>
```

## Step-2-Config script

After adding this script at the end of body tags you are adding the firebase configs like below:

```javascript
const firebaseConfig = {
              apiKey: YOUR_API_KEY,
              authDomain: YOUR_AUTH_DOMAIN,
              databaseURL: YOUR_DATABASE_URL,
              projectId: YOUR_PROJECT_ID,
              storageBucket: YOUR_STORAGE_BUCKET,
              messagingSenderId: YOUR_messagingSenderId",
              appId: YOUR_APP_ID,
              measurementId: YOURE_measurementId
            };
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
            const messaging = firebase.messaging();
            messaging.requestPermission().then(function () {
                console.log("Have Permission");
                return messaging.getToken();
              })
              .then((token) => {
                console.log('token', token);
              })
              .catch((err) => {
                console.log("Have not Permisstion", err)
              });
            console.log('messaging', messaging)
            messaging.onMessage(payload => {
              console.log('Message received. ', payload);
              localStorage.setItem(payload.collapse_key, JSON.stringify(payload.notification));
            });
```

### Step-3-Add firebase service worker

For initial firebase configuration and connect to this service, You must add service worker js file in the root of your project.

```javascript
importScripts("https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js")
firebase.initializeApp({
              apiKey: YOUR_API_KEY,
              authDomain: YOUR_AUTH_DOMAIN,
              databaseURL: YOUR_DATABASE_URL,
              projectId: YOUR_PROJECT_ID,
              storageBucket: YOUR_STORAGE_BUCKET,
              messagingSenderId: YOUR_messagingSenderId",
              appId: YOUR_APP_ID,
              measurementId: YOURE_measurementId
})

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(payload => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  )
  const notificationTitle = "Background Message Title"
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
```

### Step-4-Add manifest json file

At the last step, You must be added SENDER_ID to manifest.json file

```javascript
{
"gcm_sender_id": 'GCM_SENDER_ID'
}

```

### Step-5-Use localStrorage to save notifications

Now you can read the local storage with getItem method to get nofications from local storage. You can set expiration date for your local storage (for example: 1 month)
