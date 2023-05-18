import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUse(app: FastifyInstance, isAdmin = true) {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  await request(app.server).post("/users").send({});

  const response = await request(app.server).post("/users/authenticate").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  return response.body.token;
}
