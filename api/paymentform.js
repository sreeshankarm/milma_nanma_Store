export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const balance = req.query.balance || "";

    const response = await fetch(
      `https://nanmastagingapi.milma.in/api/paymentform?balance=${balance}`,
      {
        method: "GET",
        headers: {
          Authorization: req.headers.authorization || "",
          environment: req.headers.environment || ""
        }
      }
    );

    const html = await response.text();

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(html);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Payment proxy failed" });
  }
}
