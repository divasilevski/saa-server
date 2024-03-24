export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  setCookie(event, "sso-token", "test-sso-token", {
    maxAge: 0,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return {
    success: true,
    body,
  };
});
