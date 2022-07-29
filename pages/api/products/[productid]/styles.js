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
      p.product_id,
      (
        SELECT json_agg(styles)
        FROM (
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
          ) AS "photos"
		FROM "Styles" s
        WHERE s.product_id = ${product_id}
        ) AS styles
      ) AS "results"
    FROM "Products" p
    WHERE product_id = ${product_id}
    `;

    //if (styles[0].json_build_object.results === null) {
    //  styles[0].json_build_object.results = [];
    //}

    res.json(styles[0]);
  } catch (error) {
    res.status(500).send("Error fetching data ", error);
  }
}
