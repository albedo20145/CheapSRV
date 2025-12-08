# CheapSRV - React Native Expo Project

This project is a High-Fidelity Web Prototype of the CheapSRV mobile application. It is built using React (Vite) but structured and styled to mimic a React Native experience.

## 📱 Project Overview

**CheapSRV** is a price comparison and information app for OTT plans, AI tools, and SMM services.
- **Safety First:** No in-app purchases. All "Buy" actions redirect to external official websites.
- **Monetization:** Google AdMob (Banner, Native, Interstitial).
- **Design:** Premium Midnight Blue + Neon Cyan Glassmorphism.

## 🚀 How to Port to React Native (Expo)

Since this is a web prototype, here are the steps to convert this code into a real Android/iOS app using Expo.

### 1. Initialize New Expo Project
```bash
npx create-expo-app CheapSRV
cd CheapSRV
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-status-bar react-native-paper
npx expo install expo-ads-admob
```

### 2. Copy Assets & Data
- Copy `client/src/data/db.ts` to your Expo project.
- Copy images to `assets/`.

### 3. Adapt Components
Replace HTML elements with React Native primitives:

| Web (HTML) | React Native |
|------------|--------------|
| `<div>` | `<View>` |
| `<span>` / `<p>` / `<h1>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<img src="...">` | `<Image source={{ uri: ... }}` |
| `window.open(url)` | `Linking.openURL(url)` |
| `className="..."` | `style={styles.container}` (or use `NativeWind`) |

### 4. AdMob Integration
In `app.json`:
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"
      },
      "package": "com.cheapsrv.app"
    }
  }
}
```

In your code:
```javascript
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyy';

<BannerAd
  unitId={adUnitId}
  size={BannerAdSize.ANCHOR_ADAPTIVE_BANNER}
/>
```

### 5. Play Store Compliance Checklist
- [ ] **Disclaimer:** Ensure the "Information Only" disclaimer is visible on all detail pages.
- [ ] **No In-App Billing:** Do not use `expo-in-app-purchases`. All payments must happen on the provider's website via browser.
- [ ] **Privacy Policy:** Add a link to your privacy policy in the Profile section.
- [ ] **Ads:** Mark the app as "Contains Ads" in the Play Console.

### 6. Build for Android
```bash
eas build -p android --profile preview
```

## 📂 Folder Structure (Web Prototype)

- `client/src/pages/`: Application screens (Splash, Onboarding, Home, etc.)
- `client/src/components/`: Reusable UI components (Cards, Ads, Nav)
- `client/src/data/`: Mock database
- `client/src/lib/`: State management (Zustand)

## 🎨 Design System
- **Primary Color:** Neon Cyan (`#06b6d4`)
- **Background:** Midnight Blue (`#0f172a`)
- **Font:** Outfit (Headings), Rajdhani (UI)
