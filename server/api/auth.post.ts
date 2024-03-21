export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  setCookie(event, "sso-token", "value", {
    maxAge: 3600000,
    secure: true,
    sameSite: "none",
  });

  return {
    success: true,
    body,
  };
});
