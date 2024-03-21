const ORIGINS = [
  "https://divasilevski.github.io",
  "https://master--melodious-marigold-1931f5.netlify.app",
];

/**
 * Middleware to respond CORS preflight requests using OPTIONS method.
 */
export default defineEventHandler((event) => {
  ORIGINS.forEach((origin) => {
    if (event.node.req.headers.origin?.includes(origin)) {
      setResponseHeaders(event, {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": origin,
        "Access-Control-Expose-Headers": "*",
      });
    }
  });

  // Answers HTTP 204 OK to CORS preflight requests using OPTIONS method :
  // if (event.method === 'OPTIONS' && isPreflightRequest(event)) {
  if (isPreflightRequest(event)) {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content";
    return "OK";
  }
});
