import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

let serviceAccountKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Production (Render) injection
  serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local Development fallback
  const __dirname = path.resolve();
  const keyPath = path.join(__dirname, "src", "config", "serviceAccountKey.json");
  serviceAccountKey = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
}

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);
export default auth;
