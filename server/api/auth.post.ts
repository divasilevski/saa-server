export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const expires = new Date()
  expires.setDate(expires.getDate() + 3);

  setCookie(event, "sso-token", "test-sso-token", {
    expires,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return {
    success: true,
    token: "test-auth-token",
    body,
  };
});
