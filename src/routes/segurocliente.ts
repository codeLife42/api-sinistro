import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function seguroClienteRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const seguroCliente = await knex
      .select(
        "cliente.id as cliente_id",
        "cliente.nome as cliente_nome",
        "cliente.cpf as cliente_cpf",
        "cliente.carteira as cliente_carteira",
        "seguro.valor_segurado as valor_segurado",
        "seguro.status as seguro_status",
        "seguro.nome as seguro_nome",
        "sinistro.status as sinistro_status",
        "sinistro.id as sinistro_id"
      )
      .table("cliente")
      .innerJoin("seguro", "cliente.id", "=", "seguro.id_cliente")
      .innerJoin("sinistro", "sinistro.id_cliente", "=", "cliente.id");
    return { seguroCliente };
  });
}
