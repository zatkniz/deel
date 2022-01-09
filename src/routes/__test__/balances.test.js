const request = require("supertest");
const app = require("../../app");

describe("POST /balances/deposit/:userId", function () {
  it("should fail if amount is not present in request body", async () => {
    const response = await request(app).post("/balances/deposit/1").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Amount is missing from request body");
  });

  it("should fail if user does not exist", async () => {
    const response = await request(app).post("/balances/deposit/1000").send({
      amount: 100,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("should fail if try to deposit more han 25% of users job", async () => {
    const response = await request(app).post("/balances/deposit/1").send({
      amount: 10000,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "You cant deposit more than 25% of the users jobs to pay"
    );
  });

  it("should pay successfully", async () => {
    const response = await request(app).post("/balances/deposit/4").send({
      amount: 1,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Amount deposit successfully to user");
  });

  //TODO: i would crete a couple of tests there to check if the balance is updated correctly
  // No services has been created yet so i can't check if the balance is updated correctly
});
