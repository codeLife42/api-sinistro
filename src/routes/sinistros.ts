import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import crypto from "node:crypto";

export async function sinistrosRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const sinistros = await knex("sinistro").select("*");

    return { sinistros };
  });

  app.get("/sinistrosclientes", async (request, reply) => {
    const sinistros = await knex("sinistro").select("*");

    return { sinistros };
  });

  //Define rota post para sinistro
  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      status: z.string(),
      id_usuario: z.string(),
      id_cliente: z.string(),
    });

    const { status, id_usuario, id_cliente } =
      createTransactionBodySchema.parse(request.body);

    await knex("sinistro").insert({
      id: crypto.randomUUID(),
      status,
      id_usuario,
      id_cliente,
    });

    return reply.status(201).send();
  });

  app.patch("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      id_sinistro: z.string()
    });
  });
}
