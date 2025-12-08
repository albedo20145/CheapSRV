# CheapSRV - Codemagic Build Guide (Phone se APK Banana)

Yeh guide specifically un logo ke liye hai jo **bina PC ke, sirf Android phone se APK build** karna chahte hain. Codemagic ek cloud-based CI/CD service hai jo aapke liye cloud mein APK build kar deta hai.

---

## Quick Summary

| Workflow | Purpose | Keystore Required? |
|----------|---------|-------------------|
| `android-debug` | Testing ke liye debug APK | Nahi |
| `android-release` | Play Store/distribution ke liye signed APK | Haan |

**Pehle `android-debug` use karo testing ke liye, phir `android-release` jab ready ho.**

---

## Part 1: GitHub Setup

### Step 1: GitHub Account Banao

1. Phone mein browser kholo
2. https://github.com jao
3. "Sign up" pe click karo
4. Email, username aur password dalo
5. Account verify karo

### Step 2: GitHub Repository Banao

1. GitHub mein login karo
2. Right side mein "+" icon pe click karo
3. "New repository" select karo
4. Repository name dalo: `cheapsrv-app`
5. "Create repository" pe click karo

### Step 3: Project Files Upload Karo

1. Replit mein apna project kholo
2. Files panel mein 3-dot menu pe click karo
3. "Download as zip" select karo
4. Zip file download ho jayegi
5. GitHub repository mein "Add file" > "Upload files" pe click karo
6. `Price-Service-Finder` folder ke andar ke saare files drag karo
7. "Commit changes" pe click karo

**Important:** Root level pe yeh files hone chahiye:
- `package.json`
- `codemagic.yaml`
- `android/` folder
- `client/` folder

---

## Part 2: Codemagic Setup

### Step 4: Codemagic Account Banao

1. https://codemagic.io jao
2. "Start building" ya "Sign up" pe click karo
3. **"Sign up with GitHub"** pe click karo
4. GitHub account se authorize karo

### Step 5: Project Add Karo

1. Codemagic dashboard mein "Add application" pe click karo
2. "GitHub" select karo
3. Apni `cheapsrv-app` repository choose karo
4. Project type mein **"Other"** select karo
5. "Add application" pe click karo

---

## Part 3: Debug APK Build (Testing ke liye)

### Step 6: Debug Build Start Karo

1. Repository select karo
2. "Start your first build" pe click karo
3. Branch mein **"main"** select karo
4. Workflow mein **"android-debug"** select karo
5. "Start build" pe click karo

Build complete hone mein **10-15 minutes** lagte hain.

### Step 7: Debug APK Download Karo

1. Build complete hone ke baad green checkmark dikhega
2. Build pe click karo
3. "Artifacts" section mein jao
4. **`app-debug.apk`** download karo
5. Phone mein install karo

**Note:** Unknown sources allow karna hoga:
- Settings > Security > Unknown sources enable karo
- Ya: Settings > Apps > Special access > Install unknown apps

---

## Part 4: Signed Release APK (Play Store ke liye)

**Important:** Pehle keystore setup karo, phir build.

### Step 8: Keystore Banao

1. Codemagic dashboard mein apni app pe jao
2. **"Settings"** tab pe click karo
3. Left side mein **"Code signing"** pe click karo
4. **"Android"** tab open karo
5. **"Generate keystore"** pe click karo
6. Details bharo:
   - **Keystore name:** `cheapsrv_keystore`
   - **Key alias:** `cheapsrv`
   - **Validity (days):** 10000
   - **Password:** Strong password set karo
7. **"Generate"** pe click karo

**IMPORTANT:** Password yaad rakho! Isko kahi safe jagah likho. Agar bhool gaye to Play Store pe app update nahi kar paoge.

### Step 9: Signed Build Start Karo

1. Repository select karo
2. "Start new build" pe click karo
3. Branch mein **"main"** select karo
4. Workflow mein **"android-release"** select karo
5. "Start build" pe click karo

### Step 10: Signed APK Download Karo

1. Build complete hone ke baad
2. "Artifacts" section mein jao
3. Download options:
   - **`app-release-signed.apk`** - Direct distribution ke liye (sideloading/testing)
   - **`app-release-signed.aab`** - Play Store upload ke liye (required for Google Play)

---

## Part 5: Play Store Upload (Optional)

### Prerequisites:
- Google Play Developer account ($25 one-time fee)
- Signed AAB file (app-release.aab)
- App icon (512x512 PNG)
- Screenshots (phone/tablet)
- Privacy Policy URL

### Upload Steps:
1. https://play.google.com/console jao
2. "Create app" pe click karo
3. App details bharo
4. "Production" > "Create new release" pe click karo
5. **`app-release-signed.aab`** file upload karo (unsigned nahi chalega!)
6. Release notes add karo
7. Review aur publish karo

---

## Troubleshooting

### "npm install failed"
- Check karo ki package.json sahi hai
- Dependencies check karo

### "Gradle build failed"
- android/variables.gradle check karo
- SDK version 35 required hai

### "Keystore not found" (Release build mein)
- Pehle keystore generate karo (Step 8)
- Keystore name exactly `cheapsrv_keystore` hona chahiye

### "SDK not found"
- Yeh automatically fix hota hai Codemagic mein
- Agar phir bhi error aaye, build restart karo

### Build bahut slow hai
- Free plan pe queue time hota hai
- Peak hours avoid karo
- Paid plan faster hai

---

## Build Logs Dekhna

1. Build pe click karo
2. Har step pe click karke expand karo
3. Red text = error
4. "Show all output" pe click karo for full logs

---

## Pricing

### Free Plan:
- 500 build minutes/month
- 1 concurrent build
- Debug aur Release dono supported
- **Recommendation:** Hobby projects ke liye kaafi hai

### Paid Plans:
- More build minutes
- Faster builds
- Team features
- Priority support

---

## Important Notes

1. **Keystore Security:** Keystore password safe rakho. Lost password = app update impossible
2. **Version Updates:** Har Play Store update ke liye `versionCode` badhao `android/app/build.gradle` mein
3. **Build Time:** First build slow hota hai (dependencies download), baad ke builds faster hain
4. **Email:** `codemagic.yaml` mein apna email update karo notifications ke liye

---

## Files Reference

| File | Purpose |
|------|---------|
| `codemagic.yaml` | Build configuration |
| `capacitor.config.ts` | App settings (name, ID) |
| `package.json` | Dependencies |
| `android/` | Native Android code |
| `android/app/build.gradle` | Version settings |

---

## Support Links

- Codemagic Docs: https://docs.codemagic.io
- Capacitor Docs: https://capacitorjs.com/docs
- GitHub Help: https://docs.github.com
- Play Console: https://support.google.com/googleplay/android-developer

---

**Summary:**
1. GitHub pe repo banao aur files upload karo
2. Codemagic connect karo
3. `android-debug` se test APK banao
4. Sab thik ho to keystore banao
5. `android-release` se signed APK banao
6. Play Store pe upload karo (optional)

Bas yahi process hai - phone se poora APK ban jayega bina PC ke!
