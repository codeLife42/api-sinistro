import { fastify, FastifyInstance } from "fastify";
import { knex } from "../database";
import fs from "fs";
import fastifyMultipart from "@fastify/multipart";
import pump from "pump";
import { z } from "zod";

export async function sinistroClienteRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const sinistroCliente = await knex
      .table("cliente")
      .innerJoin("sinistro", "cliente.id", "=", "sinistro.id_cliente");
    return { sinistroCliente };
  });
}
