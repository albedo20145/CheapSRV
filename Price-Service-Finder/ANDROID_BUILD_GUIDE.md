# CheapSRV Android Build Guide

## Prerequisites

Before building the Android APK/AAB, you need to install the following on your local machine:

1. **Android Studio** (Ladybug 2024.2.1+ recommended)
   - Download: https://developer.android.com/studio

2. **Java JDK 21** (usually comes with Android Studio)

3. **Node.js 18+**
   - Download: https://nodejs.org/

---

## Step 1: Download Project

1. Download this project from Replit (use the Download as ZIP option)
2. Extract/unzip if needed
3. Open terminal in the `Price-Service-Finder` folder

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Build Web App

```bash
npm run build
```

This creates the `dist/public` folder with your compiled web assets.

---

## Step 4: Sync to Android

```bash
npx cap sync android
```

This copies your web assets to the Android project and updates native plugins.

**Note:** Use `npx cap copy android` for faster updates when you only changed web assets (no plugin changes).

---

## Step 5: Configure Android SDK Path

When you first open the project, Android Studio needs to know where your Android SDK is located.

**Option A: Automatic (Recommended)**
Open Android Studio and it will auto-detect your SDK location.

**Option B: Manual**
Create a file `android/local.properties` with your SDK path:
```properties
# Windows
sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk

# macOS
sdk.dir=/Users/YourName/Library/Android/sdk

# Linux
sdk.dir=/home/YourName/Android/Sdk
```

---

## Step 6: Open in Android Studio

```bash
npx cap open android
```

Android Studio will open with your project.

**First Time Setup:**
- Wait for Gradle sync to complete (can take several minutes)
- Accept any SDK license agreements when prompted
- Install missing SDK components if prompted (SDK 35)
- Wait for indexing to complete

---

## Step 7: Build Debug APK (Testing)

**Method A: Android Studio GUI**
1. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Wait for build to complete
3. Click **Locate** in the notification

**Method B: Command Line**
```bash
cd android
./gradlew assembleDebug
```

APK Location: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## Step 8: Build Release APK/AAB (Play Store)

### A. Create Signing Key (One Time Only)

Run this command in the `Price-Service-Finder` folder:

```bash
keytool -genkey -v -keystore cheapsrv-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias cheapsrv
```

You will be asked for:
- **Keystore password**: Choose a strong password (SAVE THIS!)
- **Your name, organization, city, etc.**: Fill as appropriate
- **Key password**: Can be same as keystore password

**IMPORTANT: Keep the keystore file and passwords safe! You need them for all future updates. If you lose them, you cannot update your app on Play Store.**

### B. Configure Signing in Android

Edit `android/app/build.gradle` file. Find the `android { }` block and add the `signingConfigs` section, then update the `buildTypes` section:

```gradle
android {
    namespace "com.cheapsrv.app"
    compileSdk rootProject.ext.compileSdkVersion
    
    // ADD THIS SECTION
    signingConfigs {
        release {
            storeFile file("../../cheapsrv-release-key.jks")
            storePassword "YOUR_KEYSTORE_PASSWORD"
            keyAlias "cheapsrv"
            keyPassword "YOUR_KEY_PASSWORD"
        }
    }

    defaultConfig {
        // ... keep existing config ...
    }
    
    // UPDATE THIS SECTION
    buildTypes {
        release {
            signingConfig signingConfigs.release  // ADD THIS LINE
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

**Security Note:** For production, use environment variables or a separate signing config file that's not committed to git.

### C. Build Release AAB (For Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB Location: `android/app/build/outputs/bundle/release/app-release.aab`

### D. Build Release APK (For Direct Distribution)

```bash
cd android
./gradlew assembleRelease
```

APK Location: `android/app/build/outputs/apk/release/app-release.apk`

---

## App Configuration

### Current Settings (in android/variables.gradle)

| Setting | Value |
|---------|-------|
| Min SDK | 23 (Android 6.0) |
| Target SDK | 35 (Android 15) |
| Compile SDK | 35 |

### Updating Version for Play Store

Edit `android/app/build.gradle`:

```gradle
defaultConfig {
    applicationId "com.cheapsrv.app"
    versionCode 2        // Increment this for each Play Store update
    versionName "1.1"    // User-visible version string
    // ...
}
```

---

## App Icons & Splash Screen

### Updating App Icon

Replace these files with your icon (various sizes):
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

Same for `ic_launcher_round.png` (round icon).

**Tip**: Use Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

### Updating Splash Screen

Create a splash screen image and place in:
- `android/app/src/main/res/drawable/splash.png`

The splash screen is configured in `capacitor.config.ts`.

---

## Google Play Store Checklist

Before uploading to Play Store:

- [ ] Google Developer account created ($25 one-time fee)
- [ ] App signed with release keystore
- [ ] AAB file generated (not APK)
- [ ] Privacy Policy URL ready
- [ ] App icon for store (512x512 PNG)
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (2-8 images, various device sizes)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Content rating questionnaire completed
- [ ] Target API level 35 (already configured)
- [ ] Data safety section filled
- [ ] If new account: 14-day closed testing with 20+ testers completed

---

## Updating Your App

Whenever you make changes to the web app:

```bash
# 1. Build web app
npm run build

# 2. Sync to Android (or use 'copy' for web-only changes)
npx cap sync android

# 3. Rebuild in Android Studio or via command line
cd android
./gradlew assembleDebug   # For testing
./gradlew bundleRelease   # For Play Store
```

**Or use the shortcut:**
```bash
npm run android:build
```

Before each Play Store update:
1. Increment `versionCode` in `android/app/build.gradle`
2. Update `versionName` if needed
3. Test on a real device before submitting

---

## Troubleshooting

### "SDK location not found"
- Create `android/local.properties` with your SDK path (see Step 5)
- Or open Android Studio which will auto-configure it

### Gradle Build Errors
- Update Gradle: File > Project Structure > Project > Gradle Version
- Clean project: Build > Clean Project
- Rebuild: Build > Rebuild Project
- Invalidate caches: File > Invalidate Caches / Restart

### WebView Not Loading
1. Verify `npm run build` completed successfully
2. Run `npx cap sync android` to copy assets
3. Check `capacitor.config.ts` has correct `webDir: 'dist/public'`
4. Check Android Studio Logcat for errors

### SDK 35 Not Found
1. Open SDK Manager: Tools > SDK Manager
2. Go to SDK Platforms tab
3. Check "Android 15.0 (API 35)"
4. Click Apply and wait for download

### "AAPT2 error" or Resource Errors
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## Commands Summary

```bash
# Development
npm run dev               # Start dev server

# Production Build (Web)
npm run build            # Build web app

# Android Sync
npm run android:sync     # Sync to Android
npm run android:build    # Build web + sync Android

# Open Android Studio
npm run android:open     # Or: npx cap open android

# Build APK/AAB (from android folder)
cd android
./gradlew assembleDebug     # Debug APK
./gradlew assembleRelease   # Signed Release APK
./gradlew bundleRelease     # Signed Release AAB
```

---

## File Locations Summary

| File | Location |
|------|----------|
| Web build output | `dist/public/` |
| Android project | `android/` |
| Capacitor config | `capacitor.config.ts` |
| Android SDK versions | `android/variables.gradle` |
| App build config | `android/app/build.gradle` |
| Debug APK | `android/app/build/outputs/apk/debug/` |
| Release APK | `android/app/build/outputs/apk/release/` |
| Release AAB | `android/app/build/outputs/bundle/release/` |

---

## Need Help?

- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer: https://developer.android.com
- Play Console Help: https://support.google.com/googleplay/android-developer
- Capacitor Discord: https://capacitorjs.com/discord
