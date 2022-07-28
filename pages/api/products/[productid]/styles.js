import sql from "../../../../backend/db";

export default async function getProductStyles(req, res) {
  const product_id = req.query.productid;
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
  res.json(styles[0].json_build_object);
}
