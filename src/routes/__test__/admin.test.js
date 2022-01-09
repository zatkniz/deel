const request = require("supertest");
const app = require("../../app");

describe("GET /admin/best-profession", function () {
  it("should return the correct result", async () => {
    const response = await request(app).get("/admin/best-profession");

    const correctResult = {
      profession: "Programmer",
      count: 1,
      total_amount: 2020,
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(correctResult);
  });
});

describe("GET /admin/best-clients", function () {
  it("should return the correct result", async () => {
    const response = await request(app).get("/admin/best-clients");

    const correctResult = [
      { fullName: "Ash Kethcum", id: 6, paid: 2020 },
      { fullName: "Mr Robot", id: 8, paid: 442 },
    ];

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(correctResult);
  });

  it("should return 2 result as default limit is 2", async () => {
    const response = await request(app).get("/admin/best-clients");

    expect(response.body.length).toBe(2);
  });

  it("should return 3 when limit is set to 3", async () => {
    const response = await request(app).get("/admin/best-clients?limit=3");

    expect(response.body.length).toBe(3);
  });
});
