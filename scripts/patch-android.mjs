import fs from "node:fs";

const config = JSON.parse(fs.readFileSync("capacitor.config.json", "utf8"));
const appName = config.appName || "App";
const bg = (config.plugins && config.plugins.SplashScreen && config.plugins.SplashScreen.backgroundColor)
  || (config.android && config.android.backgroundColor)
  || "#0b0f0d";

const gradle = "android/app/build.gradle";
let g = fs.readFileSync(gradle, "utf8");
g = g.replace(/versionCode\s+\d+/, "versionCode 1");
g = g.replace(/versionName\s+"[^"]*"/, 'versionName "1.0.0"');
fs.writeFileSync(gradle, g);

const strings = "android/app/src/main/res/values/strings.xml";
let s = fs.readFileSync(strings, "utf8");
s = s.replace(/(<string name="app_name">)[^<]*(<\/string>)/, `$1${appName}$2`);
s = s.replace(/(<string name="title_activity_main">)[^<]*(<\/string>)/, `$1${appName}$2`);
fs.writeFileSync(strings, s);

const colors = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">${bg}</color>
    <color name="colorPrimaryDark">${bg}</color>
    <color name="colorAccent">${bg}</color>
    <color name="splash_background">${bg}</color>
</resources>
`;
fs.writeFileSync("android/app/src/main/res/values/colors.xml", colors);

// Android 12+ (API 31) ships its own system Splash Screen that, without an
// explicit theme override, grabs the launcher icon and plays a default
// zoom/expand-in animation before the app's own splash ever shows. This
// neutralizes that default animation so the transition is instant and
// clean, regardless of how the launcher icon itself looks.
const v31Dir = "android/app/src/main/res/values-v31";
fs.mkdirSync(v31Dir, { recursive: true });
const v31Styles = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">${bg}</item>
        <item name="windowSplashScreenAnimationDuration">1</item>
        <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>
    </style>
</resources>
`;
fs.writeFileSync(`${v31Dir}/styles.xml`, v31Styles);

console.log(`Patched Android project for ${appName} 1.0.0 (1)`);
