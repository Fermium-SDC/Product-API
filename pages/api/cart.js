import sql from "../../backend/db";

export default async function cartHandler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const cart = await sql`
        SELECT
        *
        FROM "Cart"
        ORDER BY sku_id ASC
        `;
        res.json(cart);
        break;
      } catch (error) {
        res.status(500).send("Error fetching data ", error);
        break;
      }
    case "POST":
      try {
        await sql`
        INSERT INTO "Cart" (sku_id, count)
        VALUES (${req.body.sku_id}, ${req.body.count})
        ON CONFLICT (sku_id)
        DO UPDATE
        SET count = "Cart".count + ${req.body.count}
        `;
        res.send("Posted");
        break;
      } catch (error) {
        res.status(500).send("Error posting data ", error);
        break;
      }
    case "OPTIONS":
      res.status(200).send("ok");
      break;
    default:
      res.status(500).send("GET or POST requests only");
  }
}
