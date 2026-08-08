import fs from "node:fs";

const gradle = "android/app/build.gradle";
let g = fs.readFileSync(gradle, "utf8");
g = g.replace(/versionCode\s+\d+/, "versionCode 1");
g = g.replace(/versionName\s+"[^"]*"/, 'versionName "1.0.0"');
fs.writeFileSync(gradle, g);

const manifestPath = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(manifestPath, "utf8");
// orientation: system default

fs.writeFileSync(manifestPath, m);

const strings = "android/app/src/main/res/values/strings.xml";
let s = fs.readFileSync(strings, "utf8");
s = s.replace(/(<string name="app_name">)[^<]*(<\/string>)/, '$1Apk Genn$2');
s = s.replace(/(<string name="title_activity_main">)[^<]*(<\/string>)/, '$1Apk Genn$2');
fs.writeFileSync(strings, s);

const colors = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#0b0f0d</color>
    <color name="colorPrimaryDark">#0b0f0d</color>
    <color name="colorAccent">#0b0f0d</color>
    <color name="splash_background">#0b0f0d</color>
</resources>
`;
fs.writeFileSync("android/app/src/main/res/values/colors.xml", colors);

console.log("Patched Android project for Apk Genn 1.0.0 (1)");
