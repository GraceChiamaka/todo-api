const chai = require("chai");
const chaiHttp = require("chai-http");
const { it, describe } = require("mocha");
const app = require("../../index");

const { expect } = chai;
chai.use(chaiHttp);

describe("/GET tasks", () => {
  it("should return all tasks", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "johnny@mailinator.com",
        password: "Johnny123",
      })
      .end((err, res) => {
        const { token } = res.body;
        chai
          .request(app)
          .get("/api/v1/tasks")
          .set({ Authorization: `Bearer ${token}` })
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(res.body).to.be.a("object");
          });
      });
    done();
  });
});
