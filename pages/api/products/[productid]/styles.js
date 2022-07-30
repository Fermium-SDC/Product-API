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
        s.style_id,
        s.name,
        s.original_price,
        s.sale_price,
        s.default AS "default?",
        (
          SELECT json_agg(photos)
          FROM (
            SELECT
              ph.thumbnail_url,
              ph.url
            FROM "Photos" ph
            WHERE style_id = s.style_id
          ) AS photos
        ) AS "photos",
        (SELECT json_object_agg(sk.sku_id,
          (
            SELECT json_build_object(
              'quantity', sk.quantity,
              'size', sk.size)
            FROM "SKUs"
            WHERE sku_id = sk.sku_id
          )
        )
         FROM "SKUs" sk
         WHERE style_id = s.style_id
      ) AS "skus"
      FROM "Styles" s
      WHERE s.product_id = ${product_id}
    `;

    //if (styles[0].json_build_object.results === null) {
    //  styles[0].json_build_object.results = [];
    //}

    res.json({ product_id: product_id, results: styles });
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}
