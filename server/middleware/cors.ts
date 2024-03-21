/**
 * Middleware to respond CORS preflight requests using OPTIONS method.
 */
export default defineEventHandler((event) => {
  const host = event.node.req.headers.host;

  if (host?.includes("divasilevski.github.io")) {
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin": "https://divasilevski.github.io",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "https://divasilevski.github.io",
      "Access-Control-Expose-Headers": "*",
    });
  }

  if (host?.includes("master--melodious-marigold")) {
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin":
        "https://master--melodious-marigold-1931f5.netlify.app",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers":
        "https://master--melodious-marigold-1931f5.netlify.app",
      "Access-Control-Expose-Headers": "*",
    });
  }

  // Answers HTTP 204 OK to CORS preflight requests using OPTIONS method :
  // if (event.method === 'OPTIONS' && isPreflightRequest(event)) {
  if (isPreflightRequest(event)) {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content";
    return "OK";
  }
});
