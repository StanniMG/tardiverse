async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("✅ Logget ind (Google):", user.uid, user.displayName);

    // onAuthStateChanged håndterer resten (opret/brug profil i `users`)
  } catch (error) {
    console.error("🚨 Fejl ved login:", error);
  }
}
