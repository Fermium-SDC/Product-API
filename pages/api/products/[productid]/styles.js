import sql from "../../../../backend/db";

export default async function getProductStyles(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  const product_id = req.query.productid;
  try {
    const styles = await sql`
    SELECT
    json_build_object(
      'product_id', p.product_id,
      'results', (
        SELECT json_agg(styles)
        FROM (
        SELECT
          s.style_id,
          s.name,
          s.original_price,
          s.sale_price,
          s.default
        FROM "Styles" s
        WHERE s.product_id = ${product_id}
        ) AS styles
      )
    )
    FROM "Products" p
    WHERE product_id = ${product_id}
    `;

    //if (styles[0].json_build_object.results === null) {
    //  styles[0].json_build_object.results = [];
    //}

    res.json(styles[0].json_build_object);
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}
