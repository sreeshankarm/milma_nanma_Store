import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { path } = req.query;

    const backendPath = Array.isArray(path) ? path.join("/") : path;

    const queryString = req.url?.split("?")[1];
    const backendUrl = `https://nanmastagingapi.milma.in/api/${backendPath}${
      queryString ? `?${queryString}` : ""
    }`;

    const authHeader = Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0]
      : req.headers.authorization;

    const envHeader = Array.isArray(req.headers.environment)
      ? req.headers.environment[0]
      : req.headers.environment;

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        Authorization: authHeader || "",
        environment: envHeader || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    res.setHeader("Content-Type", contentType || "text/plain");

    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ message: "Proxy server error" });
  }
}
