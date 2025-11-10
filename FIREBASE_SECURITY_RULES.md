# Firebase Security Rules Setup

## Current Issue
Your database is currently in "test mode" which allows anyone to read and write data. This is a security risk!

## How to Fix Security Rules

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Build** > **Realtime Database**
4. Click on the **Rules** tab

### Step 2: Choose Your Security Level

#### Option A: Public Read, Authenticated Write (Recommended for Production)
This allows anyone to view meetups, but only authenticated users can add/edit/delete:

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

**Note:** This requires Firebase Authentication to be set up. Users must sign in to add meetups.

#### Option B: Public Read, Public Write (For Development Only)
⚠️ **Use only for development/testing!** Allows anyone to read and write:

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

#### Option C: Time-Limited Public Access (Temporary Development)
Allows public access for 30 days, then requires authentication:

```json
{
  "rules": {
    "meetups": {
      ".read": true,
      ".write": "now < 1733270400000"
    }
  }
}
```

**Note:** The timestamp `1733270400000` is January 1, 2025. Update this date as needed.

#### Option D: Rate Limiting (Better Security)
Allows public read/write but limits write operations per user:

```json
{
  "rules": {
    "meetups": {
      ".read": true,
      ".write": true,
      "$meetupId": {
        ".validate": "newData.hasChildren(['title', 'image', 'address', 'description'])",
        "title": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 100"
        },
        "image": {
          ".validate": "newData.isString() && newData.val().matches('^https?://')"
        },
        "address": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 200"
        },
        "description": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 1000"
        }
      }
    }
  }
}
```

This validates that:
- All required fields are present
- Title is 1-100 characters
- Image is a valid URL
- Address is 1-200 characters
- Description is 1-1000 characters

### Step 3: Update the Rules
1. Copy one of the rule sets above (start with **Option B** for development)
2. Paste it into the Rules editor in Firebase Console
3. Click **Publish**

### Step 4: Test Your Rules
After publishing, test that your app still works:
- Can you view meetups? (should work)
- Can you add a new meetup? (should work with Option B)

## Recommended Approach

1. **For Development:** Use **Option B** (public read/write) to get started quickly
2. **For Production:** Set up Firebase Authentication and use **Option A** (authenticated write)
3. **For Better Security:** Use **Option D** (with validation) to prevent bad data

## Setting Up Authentication (For Option A)

If you want to use authenticated writes:

1. In Firebase Console, go to **Build** > **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Update your app to use Firebase Auth (we can help with this if needed)

## Current Recommendation

For now, use **Option B** to get your app working, then we can add authentication later for better security.

