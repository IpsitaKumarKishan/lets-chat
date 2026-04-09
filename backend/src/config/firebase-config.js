import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

let serviceAccountKey;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production (Render) injection
    serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Local Development fallback
    const __dirname = path.resolve();
    const keyPath = path.join(__dirname, "src", "config", "serviceAccountKey.json");
    serviceAccountKey = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
  }
} catch (error) {
  console.error("CRITICAL BOOT ERROR: FIREBASE_SERVICE_ACCOUNT is either missing or contains invalid JSON! Did you forget a quotation mark or curly brace?", error.message);
}

let app;
try {
  app = initializeApp({
    credential: cert(serviceAccountKey),
  });
} catch(error) {
  console.error("CRITICAL BOOT ERROR: Firebase initialization crashed! Your Service Account Key might have missing values inside it.", error.message);
}

const auth = app ? getAuth(app) : null;
export default auth;
