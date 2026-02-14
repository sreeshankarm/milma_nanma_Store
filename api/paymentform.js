export default async function handler(req, res) {
  try {
    const balance = req.query.balance || "";

    const response = await fetch(
      `https://nanmastagingapi.milma.in/api/paymentform?balance=${balance}`,
      {
        headers: {
          Authorization: req.headers.authorization || "",
          environment: req.headers.environment || ""
        }
      }
    );

    const html = await response.text();

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ message: "Proxy failed" });
  }
}
