let request = require("supertest");
request = request("http://localhost:3000/api");

describe("GET /products", () => {
  it("should respond with status 200 and an array", (done) => {
    request
      .get("/products")
      .expect((res) => expect(Array.isArray(res.body)).toBeTruthy())
      .expect(200, done);
  });

  it("should have array with correct properties", (done) => {
    request
      .get("/products")
      .expect((res) => expect(res.body[0].hasOwnProperty("id")).toBeTruthy())
      .expect((res) => expect(res.body[0].hasOwnProperty("name")).toBeTruthy())
      .expect((res) =>
        expect(res.body[0].hasOwnProperty("slogan")).toBeTruthy()
      )
      .expect((res) =>
        expect(res.body[0].hasOwnProperty("description")).toBeTruthy()
      )
      .expect((res) =>
        expect(res.body[0].hasOwnProperty("category")).toBeTruthy()
      )
      .expect((res) =>
        expect(res.body[0].hasOwnProperty("default_price")).toBeTruthy()
      )
      .end(done);
  });

  it("should send correct number of products based on count query", (done) => {
    const count = 10;
    request
      .get(`/products?count=${count}`)
      .expect((res) => expect(res.body.length).toBe(count))
      .end(done);
  });
});

describe("GET /products/:productid", () => {
  const testProduct = 1;

  it("should respond with status 200 and an object", (done) => {
    request
      .get(`/products/${testProduct}`)
      .expect((res) =>
        expect(
          typeof res.body === "object" && !Array.isArray(res.body)
        ).toBeTruthy()
      )
      .expect(200, done);
  });

  it("should have correct properties", (done) => {
    request
      .get(`/products/${testProduct}`)
      .expect((res) => expect(res.body.hasOwnProperty("id")).toBeTruthy())
      .expect((res) => expect(res.body.hasOwnProperty("name")).toBeTruthy())
      .expect((res) => expect(res.body.hasOwnProperty("slogan")).toBeTruthy())
      .expect((res) =>
        expect(res.body.hasOwnProperty("description")).toBeTruthy()
      )
      .expect((res) => expect(res.body.hasOwnProperty("category")).toBeTruthy())
      .expect((res) =>
        expect(res.body.hasOwnProperty("default_price")).toBeTruthy()
      )
      .expect((res) => expect(res.body.hasOwnProperty("features")).toBeTruthy())
      .end(done);
  });

  it("should have correct properties in features array", (done) => {
    request
      .get(`/products/${testProduct}`)
      .expect((res) =>
        expect(res.body.features[0].hasOwnProperty("feature")).toBeTruthy()
      )
      .expect((res) =>
        expect(res.body.features[0].hasOwnProperty("value")).toBeTruthy()
      )
      .end(done);
  });
});

describe("GET /products/:product_id/styles", () => {
  const testProduct = 1;
  it("should respond with status 200 and an object", (done) => {
    request
      .get(`/products/${testProduct}/styles`)
      .expect((res) =>
        expect(
          typeof res.body === "object" && !Array.isArray(res.body)
        ).toBeTruthy()
      )
      .expect(200, done);
  });

  it("should have a results value of an array", (done) => {
    request
      .get(`/products/${testProduct}/styles`)
      .expect((res) =>
        expect(res.body.hasOwnProperty("product_id")).toBeTruthy()
      )
      .expect((res) => expect(res.body.hasOwnProperty("results")).toBeTruthy())
      .expect((res) => expect(Array.isArray(res.body.results)).toBeTruthy())
      .end(done);
  });
});

describe("GET /products/:product_id/realted", () => {
  const testProduct = 1;
  it("should respond with status 200 and an array", (done) => {
    request
      .get(`/products/${testProduct}/related`)
      .expect((res) => expect(Array.isArray(res.body)).toBeTruthy())
      .expect(200, done);
  });
});
