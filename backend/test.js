const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("./app.js");

chai.use(chaiHttp);

describe("API Routes", () => {
  after((done) => {
    app
      .close(() => {
        done();
      })
      .catch(done);
  });

  describe("GET /", () => {
    it("should update the counter", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("count");
          done();
        })
        .catch(done);
    });

    it("should handle errors when updating the counter", (done) => {
      chai
        .request(app)
        .get("/")
        .query({ url: "/favicon.ico" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        })
        .catch(done);
    });
  });

  describe("GET /api/visitorCount", () => {
    it("should return visitor count", (done) => {
      chai
        .request(app)
        .get("/api/visitorCount")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("count");
          done();
        })
        .catch(done);
    });
  });
});
