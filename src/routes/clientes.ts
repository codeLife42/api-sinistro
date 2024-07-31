import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import crypto from "node:crypto";

export async function clientesRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const clientes = await knex("cliente").select("*");

    return { clientes };
  });

  //Define rota post para clientes
  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      nome: z.string(),
      cpf: z.string(),
      carteira: z.string(),
    });

    const { nome, cpf, carteira } = createTransactionBodySchema.parse(
      request.body
    );

    await knex("cliente").insert({
      id: crypto.randomUUID(),
      nome,
      cpf,
      carteira,
    });

    return reply.status(201).send();
  });

  app.get("/:id", async (request, reply) => {
    const id_cliente = request.params.id as any;

    console.log(id_cliente);

    try {
      const cliente = await knex("cliente")
        .select(
          //"arquivo.arquivo as arquivo",
          "cliente.carteira as carteira",
          "cliente.cpf as cpf",
          //"arquivo.id as id",
          "sinistro.id_cliente as id_cliente",
          "sinistro.id as id_sinistro",
          //"arquivo.id_sinistro as id_sinistro",
          "sinistro.id_usuario as id_usuario",
          "cliente.nome as nome",
          "sinistro.status as status"
          //"arquivo.tipo as tipo"
        )
        .innerJoin("sinistro", "cliente.id", "=", "sinistro.id_cliente")
        //.innerJoin("arquivo", "arquivo.id_sinistro", "=", "sinistro.id")
        .where("cliente.id", "=", id_cliente);

      return reply.status(201).send(cliente);
    } catch (error) {
      console.log(error);

      reply.status(500).json({ error: "Erro interno do servidor." });
    }
  });
}
