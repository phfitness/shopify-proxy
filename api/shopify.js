export default async function handler(req, res) {
  const fetch = (await import('node-fetch')).default;

  const shopUrl = "https://phfitnesswereld.myshopify.com";
  const token = process.env.SHOPIFY_TOKEN;

  const endpoint = "/admin/api/2024-07/products.json?limit=250";

  try {
    const shopifyResponse = await fetch(`${shopUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    const data = await shopifyResponse.json();
    res.status(shopifyResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
