import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function sinistroClienteRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const sinistroCliente = await knex
      .table("cliente")
      .innerJoin("sinistro", "cliente.id", "=", "sinistro.id_cliente");
    return { sinistroCliente };
  });
}
