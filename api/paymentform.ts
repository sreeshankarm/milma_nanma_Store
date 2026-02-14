import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const token = req.headers.authorization;
    const environment = req.headers.environment;
    const balance = req.query.balance;

    if (!token) {
      return res.status(401).json({ message: "No authorization token" });
    }

    const backendUrl = `https://nanmastagingapi.milma.in/api/paymentform${
      balance ? `?balance=${balance}` : ""
    }`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: token as string,
        environment: environment as string,
        Accept: "application/json",
      },
    });

    const data = await response.text();

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(data);
  } catch (error) {
    console.error("Payment Proxy Error:", error);
    return res.status(500).json({ message: "Proxy error" });
  }
}
