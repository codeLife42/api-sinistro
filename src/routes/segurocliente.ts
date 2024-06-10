import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function seguroClienteRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const seguroCliente = await knex
      .select(
        "cliente.nome as cliente_nome",
        "cliente.cpf as cliente_cpf",
        "cliente.carteira as cliente_carteira",
        "seguro.valor_segurado as valor_segurado",
        "seguro.status as seguro_status",
        "seguro.nome as seguro_nome"
      )
      .table("cliente")
      .innerJoin("seguro", "cliente.id", "=", "seguro.id_cliente");
    return { seguroCliente };
  });
}
