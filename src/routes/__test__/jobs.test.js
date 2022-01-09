const request = require("supertest");
const app = require("../../app");

describe("GET /jobs/unpaid", function () {
  it("should fail if there is no profile_id in request headers", async () => {
    const response = await request(app).get("/jobs/unpaid");
    expect(response.statusCode).toBe(401);
  });

  it("should succeed if there is profile_id in request headers", async () => {
    const response = await request(app)
      .get("/jobs/unpaid")
      .set("profile_id", 1);
    expect(response.statusCode).toBe(200);
  });

  it("should return values if the user is client", async () => {
    const response = await request(app)
      .get("/jobs/unpaid")
      .set("profile_id", 1);
    expect(
      response.body.some((contract) => contract.Contract.client_id === 1)
    ).toBe(true);
  });

  it("should return values if the user is contractor", async () => {
    const response = await request(app)
      .get("/jobs/unpaid")
      .set("profile_id", 7);
    expect(
      response.body.some((contract) => contract.Contract.contractor_id === 7)
    ).toBe(true);
  });
});

describe("GET /jobs/:job_id/pay", function () {
  it("should fail if there is no profile_id in request headers", async () => {
    const response = await request(app).post("/jobs/2/pay");
    expect(response.statusCode).toBe(401);
  });

  it("should fail if amount is not present in request body", async () => {
    const response = await request(app)
      .post("/jobs/2/pay")
      .send({})
      .set("profile_id", 1);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Amount is missing from request body");
  });

  it("should fail if job does not exist", async () => {
    const response = await request(app)
      .post("/jobs/200/pay")
      .send({
        amount: 100,
      })
      .set("profile_id", 1);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(
      "The job you are trying to pay does not exist"
    );
  });

  it("should fail if job has already been paid", async () => {
    const response = await request(app)
      .post("/jobs/6/pay")
      .send({
        amount: 100,
      })
      .set("profile_id", 4);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("The job has already been paid");
  });

  it("should fail if user try to pay with more that he has in his balance", async () => {
    const response = await request(app)
      .post("/jobs/1/pay")
      .send({
        amount: 10000,
      })
      .set("profile_id", 1);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Insufficient funds");
  });

  it("should fail if user try to pay with not the correct amount", async () => {
    const response = await request(app)
      .post("/jobs/3/pay")
      .send({
        amount: 99,
      })
      .set("profile_id", 2);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "The amount you are trying to pay is not the correct one"
    );
  });

  it("should fail if job does not belong to user", async () => {
    const response = await request(app)
      .post("/jobs/6/pay")
      .send({
        amount: 100,
      })
      .set("profile_id", 1);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(
      "The job you are trying to pay does not exist"
    );
  });

  it("should pay successfully", async () => {
    const response = await request(app)
      .post("/jobs/3/pay")
      .send({
        amount: 202,
      })
      .set("profile_id", 2);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Job paid successfully");

    const secondResponse = await request(app)
      .post("/jobs/3/pay")
      .send({
        amount: 202,
      })
      .set("profile_id", 2);

    expect(secondResponse.statusCode).toBe(400);
    expect(secondResponse.body.error).toBe("The job has already been paid");
  });

  //TODO: i would crete a couple of tests there to check if the balance is updated correctly
  // No services has been created yet so i can't check if the balance is updated correctly
});
