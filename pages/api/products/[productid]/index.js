import sql from "../../../../backend/db";

export default async function getProductById(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  const product_id = req.query.productid;
  try {
    const products = await sql`
    SELECT
      p.product_id AS "id",
      p.name,
      p.slogan,
      p.description,
      p.category,
      p.default_price,
      (
        SELECT json_agg(features)
        FROM (
          SELECT
          f.feature,
          f.value
          FROM "Features" f
          WHERE f.product_id = ${product_id}
        ) AS features
      ) AS "features"
    FROM "Products" p
    WHERE p.product_id = ${product_id}
  `;
    res.json(products[0]);
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}
