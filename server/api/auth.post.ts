export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  setCookie(event, "sso-token", "test-sso-token", {
    maxAge: 3600000,
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
