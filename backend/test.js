const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("./app.js");

chai.use(chaiHttp);

describe("API Routes", () => {
  after(async () => {
    app.close(() => {});
  });

  describe("GET /", () => {
    it("should update the counter", async () => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("count");
        });
    });

    it("should handle errors when updating the counter", async () => {
      chai
        .request(app)
        .get("/")
        .query({ url: "/favicon.ico" })
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe("GET /api/visitorCount", () => {
    it("should return visitor count", async () => {
      chai
        .request(app)
        .get("/api/visitorCount")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("count");
        });
    });
  });
});
