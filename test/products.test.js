let request = require("supertest")

describe('GET /products', function() {
  request = request("http://localhost:3000/api")
  it('responds with status 200 and a json object', (done) => {
    request.get('/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('should have correct properties', (done) => {
    request.get('/products')
      .expect((res) => expect(res.body[0].hasOwnProperty('id')).toBeTruthy())
      .end(done)
  })
});
