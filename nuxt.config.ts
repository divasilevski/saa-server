// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // routeRules: {
  //   "/api/**": {
  //     // enable CORS
  //     cors: true, // if enabled, also needs cors-preflight-request.ts Nitro middleware to answer CORS preflight requests
  //     headers: {
  //       // CORS headers
  //       "Access-Control-Allow-Origin": "https://divasilevski.github.io", // 'http://example:6006', has to be set to the requesting domain that you want to send the credentials back to
  //       "Access-Control-Allow-Methods": "*", // 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  //       "Access-Control-Allow-Credentials": "true",
  //       "Access-Control-Allow-Headers": "https://divasilevski.github.io", // 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
  //       "Access-Control-Expose-Headers": "*",
  //       // 'Access-Control-Max-Age': '7200', // 7200 = caching 2 hours (Chromium default), https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age#directives
  //     },
  //   },
  // },
});
