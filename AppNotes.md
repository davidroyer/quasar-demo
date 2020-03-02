# Notes For: Quasar | Electron | Cordova

## Cordova

- When building for production, phone **CANNOT** be plugged in

- Using real device for Dev currently doesn't work for unknown reason

- To test on real device though, you can do the following:
  1. Build the ios app for production
  2. Locate and open the `.xcodeproject` file inside `src-cordova/platforms/ios`
  3. With your iphone plugged in, click the `Run` button

---

## Electron

- Currently need to update `electron-builder` to latest version because not
  included with `Quasar`

-
