// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(500).send("GET requests only");
    return;
  }
  res.status(200).send('This is my API. Please use a route.')
}
