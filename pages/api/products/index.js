import sql from "../../../backend/db";

export default async function getProducts(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  try {
    const products = await sql`
      SELECT
      *
      FROM "Products"
      WHERE product_id = 1
    `;
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}
