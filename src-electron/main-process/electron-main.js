import { app, BrowserWindow, nativeTheme, ipcMain } from "electron";
import ElectronGoogleOAuth2 from "@getstation/electron-google-oauth2";

const exampleToken = {
  access_token:
    "ya29.a0Adw1xeXzqFlGEKrUJML44UDM8Sbc5wSBSlmfB3WdNGsrmZjibDcVxOZg7Wr8N6CfS2rG7zYMuO1PE_j89_ypJvZxPv4IiHchUfpQw9DON8YSX1DhEHeTWO6JkWK-eLggAoAY78ge6Y5YvjAR2-jcEsSxV8ywrEDOgL0",
  refresh_token:
    "1//0103a6HBfHTy1CgYIARAAGAESNwF-L9Ir2N3JFxcjpU-W_EnclltLuOMnrvqhi80cJJReFTVL6Fl-N6LF6OviEpsl3C4Egvpn0Qk",
  scope:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.metadata.readonly openid",
  token_type: "Bearer",
  id_token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZDU1ZmY0ZTEwOTkxZDZiMGVmZDM5MmI5MWEzM2U1NGMwZTIxOGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NzA3NTY5NjM4MS1zODlrcW9odTkwcHBpNGt1bHM4NGhyYTVwbzJqa2hmNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ3MDc1Njk2MzgxLXM4OWtxb2h1OTBwcGk0a3Vsczg0aHJhNXBvMmpraGY0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyOTkwNTY4MTY4NDQ0Mzc5NjE2IiwiZW1haWwiOiJhcnRpbm1vdGlvbi5tYWlsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWksyVWU0OEoxMEo2anJhY0tjT0JvUSIsIm5hbWUiOiJEYXZpZCBSb3llciIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXFSVTN0cTNaZ0VrL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FLRjA1bkM0VmpKN2VQb3RJekNvemdMY05jTW1GbXVsYncvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkRhdmlkIiwiZmFtaWx5X25hbWUiOiJSb3llciIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTgzMTg4Nzk1LCJleHAiOjE1ODMxOTIzOTV9.dIvD71oe6oG3Vwt_x9Qs4BIO4sRABjaQuqOu1FGLSiuX1lOac4GfS2B-szvcDmnoOr0EQ-MMaDe6s9Dbqiyicb1uxlHM_ZxZ5_yjHq8hY7GmELyk6DDU08blcgSgdUjAqfVaVr1DmSzWrldOIVY_ACumcIFvG9t_PUfwfATDnTlmoQ6VqX4PFs8i9B_fyaewQlbQ_LCaP8NhG9w8UhwKu5d1db-QnHTeYjrwPcE7W3-YJowz8yq1HvPiUlSjbDQWjUeWZAx2pU7o1lmrkuSAzTs2sMwPQnPyw9a0BKkhD1ahNyuMnb4Y9cjDFY4UYjLo04JZ6Cd3mnA_WWihiLeNRg",
  expiry_date: 1583192394151
};

try {
  if (
    process.platform === "win32" &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require("fs").unlinkSync(
      require("path").join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require("path")
    .join(__dirname, "statics")
    .replace(/\\/g, "\\\\");
}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
// client_id: '47075696381-s89kqohu90ppi4kuls84hra5po2jkhf4.apps.googleusercontent.com',
// client_secret: 'Ny98ib7s5KbmkSDmlM7sD61z',
// redirect_uri: 'https://quasar-app-demo.firebaseapp.com/__/auth/handler',
// authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
// response_type: "token",
// scope: "https://www.googleapis.com/auth/userinfo.profile",

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
const myApiOauth = new ElectronGoogleOAuth2(
  "47075696381-s89kqohu90ppi4kuls84hra5po2jkhf4.apps.googleusercontent.com",
  "Ny98ib7s5KbmkSDmlM7sD61z",
  ["https://www.googleapis.com/auth/userinfo.profile"]
);

ipcMain.on("handle-token-refresh", (event, refreshToken) => {
  console.log("myApiOauth in ipcMain", myApiOauth);

  console.log("ipcMain -> handle-token-refresh", refreshToken);
  myApiOauth.setTokens({ refresh_token: refreshToken });
});

ipcMain.on("launch-google-login", event => {
  myApiOauth.openAuthWindowAndGetTokens().then(
    token => {
      event.reply("auth-success", token);
      // event.reply("auth-success", { token, userInfo });
    },
    err => {
      // TODO add app notification
      console.log("Error while getting token", err);
    }
  );
});
