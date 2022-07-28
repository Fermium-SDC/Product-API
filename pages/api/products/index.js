import sql from "../../../backend/db";

export default async function getProducts(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  const pageNum = req.query.page || 1;
  const perPage = req.query.count || 5;
  try {
    const products = await sql`
      SELECT
      *
      FROM "Products"
      ORDER BY product_id ASC LIMIT ${perPage}
      OFFSET ${pageNum * perPage - perPage}
    `;
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}
