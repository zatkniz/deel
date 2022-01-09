const request = require("supertest");
const app = require("../../app");

describe("GET /contracts", function () {
  it("should fail if there is no profile_id in request headers", async () => {
    const response = await request(app).get("/contracts");
    expect(response.statusCode).toBe(401);
  });

  it("should succeed if there is profile_id in request headers", async () => {
    const response = await request(app).get("/contracts").set("profile_id", 1);
    expect(response.statusCode).toBe(200);
  });

  it("should return values only for the request user", async () => {
    const response = await request(app).get("/contracts").set("profile_id", 1);
    expect(response.body.every((contract) => contract.client_id === 1)).toBe(
      true
    );
  });
});

describe("GET /contracts/:id", function () {
  it("should throw 404 if it wont find the contract", async () => {
    const response = await request(app)
      .get("/contracts/100")
      .set("profile_id", 1);
    expect(response.statusCode).toBe(404);
  });

  it("should return 401 if the contract is not the authenticated users", async () => {
    const response = await request(app)
      .get("/contracts/6")
      .set("profile_id", 1);
    expect(response.statusCode).toBe(401);
  });

  it("should return 401 if the contract is not the authenticated users", async () => {
    const response = await request(app)
      .get("/contracts/1")
      .set("profile_id", 1);
    expect(response.statusCode).toBe(200);
    expect(response.body.client_id).toBe(1);
    expect(response.body).toHaveProperty("id");
  });
});
