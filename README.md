# Apk Genn — Android package

This is a ready-to-build Android wrapper for **https://apkgenn.lovable.app**.
You do not need Android Studio: GitHub builds the APK for you.

## Fastest path (no local setup)

1. Create a new empty GitHub repository.
2. Upload every file in this folder to it (keep the folder structure).
3. Open the **Actions** tab → the "Build APK" workflow runs automatically.
4. When it turns green, open the run and download the **apk-genn-debug-apk** artifact.
5. Unzip it, copy `app-debug.apk` to your phone and install it (allow "install from unknown sources").

## Build locally instead

Requires Node 20, JDK 21 and the Android SDK.

```bash
npm install
npx cap add android
npx capacitor-assets generate --android
node scripts/patch-android.mjs
npx cap sync android
cd android && ./gradlew assembleDebug
```

APK lands in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Configuration used

| Setting | Value |
| --- | --- |
| App name | Apk Genn |
| Package id | app.lovable.apkgenn |
| Site URL | https://apkgenn.lovable.app |
| Version | 1.0.0 (1) |
| Orientation | default |
| Theme colour | #0b0f0d |
| Splash colour | #0b0f0d |
| Fullscreen | no |
| External links open in app | yes |
| Offline fallback page | yes |

Change anything in `capacitor.config.json` and push again to rebuild.

## Play Store release

The workflow builds a **debug** APK, which is perfect for sideloading but not for the Play Store.
For a release build, create a keystore, add it as repository secrets and swap
`assembleDebug` for `bundleRelease` with signing config in `android/app/build.gradle`.
