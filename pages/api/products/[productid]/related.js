import sql from "../../../../backend/db";

export default async function getRelatedProducts(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).send("ok")
    return;
  }
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  const product_id = req.query.productid;
  try {
    const products = await sql`
    SELECT
    related_id
    FROM "Related Products"
    WHERE product_id = ${product_id};
  `.values()
    res.json(products.map(row => row[0]));
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}