export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;

  const session = localStorage.getItem("admin_session");
  if (!session) return false;

  try {
    const { expiry } = JSON.parse(session);
    if (Date.now() > expiry) {
      localStorage.removeItem("admin_session");
      return false;
    }
    return true;
  } catch (e) {
    localStorage.removeItem("admin_session");
    return false;
  }
}
