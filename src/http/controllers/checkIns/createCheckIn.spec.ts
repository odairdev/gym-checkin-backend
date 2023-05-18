import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { app } from "@/app";
import { createAndAuthenticateUse } from "@/utils/test/create=and-authenticate-user";

describe("Create Checkin Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a checkIn", async () => {
    const token = await createAndAuthenticateUse(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        description: "some",
        phone: "47999999999",
        latitude: -26.9055772,
        longitude: -48.6467763,
      },
    });

    const response = await request(app.server)
      .post(`/checkin/${gym.id}/create`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userLatitude: -26.9055772,
        userLongitude: -48.6467763,
      });

    expect(response.statusCode).toEqual(201);
  });
});
