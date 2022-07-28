import sql from "../../../backend/db"

export default async function getProducts(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  const products = await sql`
    SELECT
    *
    FROM "Products"
    WHERE product_id = 1
  `
  res.json(products)
}
