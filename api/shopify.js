import fetch from 'node-fetch';

export default async function handler(req, res) {
  const shopifyDomain = 'phfitnesswereld.myshopify.com';
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN; // ← uit Environment halen

  try {
    const response = await fetch(`https://${shopifyDomain}/admin/api/2024-07/products.json?limit=5`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products from Shopify' });
  }
}
