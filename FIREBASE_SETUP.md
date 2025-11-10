# Firebase Setup Guide

## Step 1: Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one if you haven't)
3. Click on the **⚙️ Settings icon** (gear icon) next to "Project Overview"
4. Select **Project Settings**
5. Scroll down to the **"Your apps"** section
6. If you don't have a web app yet:
   - Click **"Add app"** or the **</>** icon
   - Register your app with a nickname (e.g., "React Meetups")
   - Click **"Register app"**
7. You'll see your Firebase configuration object. Copy these values:
   - `apiKey`
   - `authDomain`
   - `databaseURL` (or `projectId` if using Firestore)
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Step 2: Enable Realtime Database

1. In Firebase Console, go to **Build** > **Realtime Database**
2. Click **"Create Database"**
3. Choose your location (select the closest to your users)
4. Choose **"Start in test mode"** (for development) or set up security rules
5. Copy the **Database URL** (it will look like: `https://your-project-id-default-rtdb.firebaseio.com`)

## Step 3: Create Environment File

1. Create a file named `.env` in the root of your project (same level as `package.json`)
2. Add the following with your actual values:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

**Important:** 
- Replace all `your-xxx-here` with your actual values from Firebase Console
- The `.env` file is already in `.gitignore` so it won't be committed to git
- **Restart your development server** after creating/updating the `.env` file

## Step 4: Update Database Rules (Important for Security)

⚠️ **You're seeing a security warning because your database is public!**

1. Go to **Realtime Database** > **Rules** tab in Firebase Console
2. Replace the current rules with one of these options:

**For Development (Quick Start):**
```json
{
  "rules": {
    "meetups": {
      ".read": true,
      ".write": true
    }
  }
}
```

**For Production (Recommended - Requires Authentication):**
```json
{
  "rules": {
    "meetups": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

3. Click **Publish** to save the rules

**See `FIREBASE_SECURITY_RULES.md` for detailed security options and best practices.**

## Step 5: Restart Your Development Server

After creating the `.env` file:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

## Troubleshooting

- **"Firebase: Error (auth/invalid-api-key)"**: Check that your API key in `.env` is correct
- **"Failed to fetch"**: Make sure Realtime Database is enabled and the URL is correct
- **Environment variables not working**: Make sure they start with `REACT_APP_` and restart the dev server

## Next Steps (Optional)

You can now use Firebase SDK in your code:
```javascript
import { database } from './config/firebase';
import { ref, push, get } from 'firebase/database';
```

The current code uses REST API which also works, but using the SDK is recommended for better features and security.

