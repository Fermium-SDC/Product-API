import sql from "../../../../backend/db"

export default async function getProductById(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  const product_id = req.query.productid;

  const products = await sql`
    SELECT
    json_build_object(
      'id', p.product_id,
      'name', p.name,
      'slogan', p.slogan,
      'description', p.description,
      'category', p.category,
      'default_price', p.default_price,
      'features', (
		    SELECT json_agg(features)
		    FROM (
		      SELECT
		      f.feature,
		      f.value
		      FROM "Features" f
		      WHERE f.product_id = ${product_id}
		    ) AS features
    	)
	  )
    FROM "Products" p
    WHERE p.product_id = ${product_id};
  `
  res.json(products[0].json_build_object)
}
