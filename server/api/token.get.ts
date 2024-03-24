export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  const ssoToken = cookies["sso-token"];

  return {
    success: ssoToken === "test-sso-token",
    token: "test-auth-token",
  };
});
